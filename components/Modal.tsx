import React, { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import {
  PlusIcon,
  ThumbUpIcon,
  XIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  PauseIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import { Element, Genre } from "../typings";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import { baseUrl } from "../constants/moive";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((res) => res.json());

      // https://api.themoviedb.org/3/search/movie?api_key=${
      //   process.env.NEXT_PUBLIC_API_KEY
      // }&language=en-US&query=${search}&page=1&include_adult=false

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos.results[index]?.key);
        if (data?.genres) {
          setGenres(data.genres);
        }
      }
    }
    fetchMovie();
  }, [movie]);

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]">
          <XIcon className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          {trailer ? (
            <>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer}`}
                width="100%"
                height="100%"
                style={{ position: "absolute", top: "0", left: "0" }}
                playing={playing}
                muted={muted}
                controls={false}
              />
              <div className="text-xs md:text-lg absolute bottom-10 flex w-full items-center justify-between px-10">
                <div className="flex space-x-2">
                  <button
                    className="w-8 h-8 md:w-11 md:h-11 modalButton "
                    onClick={() => setPlaying(!playing)}>
                    {playing ? (
                      <>
                        <PauseIcon className="w-4 h-4 md:w-7 md:h-7 text-white" />
                      </>
                    ) : (
                      <>
                        <FaPlay className="w-3 h-3 md:w-6 md:h-6 text-white" />
                      </>
                    )}
                  </button>
                  <button className="w-8 h-8 md:w-11 md:h-11 modalButton">
                    <PlusIcon className="w-4 h-4 md:w-11 md:h-11" />
                  </button>
                  <button className="w-8 h-8 md:w-11 md:h-11 modalButton">
                    <ThumbUpIcon className="w-4 h-4 md:w-7 md:h-7" />
                  </button>
                </div>
                <button
                  className="w-8 h-8 md:w-11 md:h-11 modalButton"
                  onClick={() => setMuted(!muted)}>
                  {muted ? (
                    <VolumeOffIcon className="w-4 h-4 md:w-11 md:h-11 lg:w-9 lg:h-9" />
                  ) : (
                    <VolumeUpIcon className="w-4 h-4 md:w-11 md:h-11 lg:w-9 lg:h-9" />
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="absolute top-0 left-0 -z-10 w-[100%] h-[100%]">
                {movie?.poster_path || movie?.backdrop_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${
                      movie?.backdrop_path || movie?.poster_path
                    }`}
                    className="rounded-sm object-cover md:rounded"
                    fill
                    alt="movieImg"
                    sizes="medium"
                    priority
                  />
                ) : (
                  <img
                    src="/comingsoon.jpg"
                    className="w-full h-full rounded-sm object-fit md:rounded"
                    alt=""
                  />
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light ">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-ligth md:flex-row">
              <div>
                <h2 className="font-bold text-xl pb-2">
                  {movie?.name || movie?.original_name || movie?.title}
                </h2>
                <p className="w-5/6">{movie?.overview}</p>
              </div>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genre: </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original Languages: </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total Votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default Modal;
