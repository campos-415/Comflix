import Image from "next/image";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../constants/moive";
import { Movie } from "../typings";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface Props {
  netflixOriginals: Movie[] ;
}

function Banner({ netflixOriginals }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          className="object-cover"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt="bannerImg"
          fill
          priority
        />
      </div>

      <h1 className="text-2xl md:text-4xl lg:text-7xl ">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl text-shadow-md">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          {" "}
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> PLay
        </button>
        <button
          onClick={() => {
            setShowModal(true),
            setCurrentMovie(movie)
          }}
          className="bannerButton bg-[gray]/70">
          More Info{" "}
          <InformationCircleIcon className="h-4 w-4 text-black md:h-7 md:w-7" />
        </button>
      </div>
    </div>
  );
}

export default Banner;
