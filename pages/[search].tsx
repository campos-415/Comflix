import Head from "next/head";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import { modalState, searchState } from "../atoms/modalAtom";
import Banner from "../components/Banner";
import Header from "../components/Header";
import { Movie } from "../typings";
import Modal from "../components/Modal";
import MoviePage from "../components/MoviePage";
import { useEffect, useState } from "react";


function movies() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const search = useRecoilValue(searchState);
  const [movie, setMovie] = useState<Movie[]>([]);
  const api = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`;
  // console.log(search)

  useEffect(() => {
    console.log(search);
    const fetchPostData = async () => {
      const res = await fetch(api);
      const data = await res.json();
      setMovie(data.results);
    };
    fetchPostData();
  }, [search]);

  console.log(movie);

  const showModal = useRecoilValue(modalState);
  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}>
      <Head>
        <title>Comflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">


        <Banner netflixOriginals={movie} />
        <section className="md:space-y-24">
          <MoviePage movies={movie} title="Fast" />
        </section>
      </main>
      <Modal />
    </div>
  );
}

export default movies;

