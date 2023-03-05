import React, { useEffect, useState } from "react";
import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchState } from "../atoms/modalAtom";
import { useRouter } from "next/router";

function Header() {
  const [isScroll, setIsScroll] = useState(false);
  const [search, setSearch] = useRecoilState<string>(searchState);
  const router = useRouter();
  const { logout } = useAuth();


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <header className={`${isScroll && "bg-[#141414]"} `}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href="/">
          <div className="flex items-center">
            <img
              src="https://com-flix.vercel.app/assets/logo.svg"
              width={60}
              height={60}
              className="cursor-pointer object-contain"
            />
            <h1 className="text-2xl font-bold">
              Com<span className="text-[#1d9bf0]">flix</span>
            </h1>
          </div>
        </Link>
        

        <ul className="hidden space-x-4 md:flex ">
          <li className="HeaderLink">Home</li>
          <li className="HeaderLink">Tv Shows</li>
          <li className="HeaderLink">Movies</li>
          <li className="HeaderLink">News & Popular</li>
          <li className="HeaderLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <form>
          <div className="group flex items-center bg-transparent  p-3 rounded-full relative">
            <button
              onClick={(e) => {
                e.preventDefault()
                router.push(`/${search}`)
              }}>
              <SearchIcon className="group text-[#1d9bf0] w-5 -z-50 " />
            </button>
            <input
              type="text"
              className="bg-transparent placeholder-gray-500 outline-none 
            text-[#d9d9d9] pl-5 pr-5 border border-[#1d9bf0]/50 
            focus:border-[#1d9bf0] rounded-full focus:bg-[#141414] absolute inset-0 md:relative md:inset-x-2 focus:relative focus:inset-x-[1px] focus:shadow-lg "
              onChange={(e) => {
                setSearch(e.target.value)
                // console.log(e.target.value);
              }}
            />
          </div>
        </form>

        <img
          onClick={logout}
          src="https://rb.gy/g1pwyx"
          alt=""
          className="cursor-pointer rounded"
        />
      </div>
    </header>
  );
}

export default Header;
