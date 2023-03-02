import Image from "next/image";
import React from "react";
import { baseUrl } from "../constants/moive";
import { Movie } from "../typings";

interface Props {
  // when usign firebase
  // movie: Movie || DocumentData
  movie: Movie;
}

function Thumbnail({ movie }: Props) {



  
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:min-w-[260px] md:hover:scale-105 lg:min-w-[300px] lg:min-h-[150px] ">
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
