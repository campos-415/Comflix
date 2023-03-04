import Image from "next/image";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { baseUrl } from "../constants/moive";
import { Movie } from "../typings";
import { DocumentData } from "firebase/firestore"


interface Props {
  movie: Movie | DocumentData
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);


  
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:min-w-[260px] md:hover:scale-105 lg:min-w-[300px] lg:min-h-[150px]"
    onClick={() => {
      setShowModal(true),
      setCurrentMovie(movie)
      console.log(movie)
    }}>
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
    </div>
  );
}

export default Thumbnail;
