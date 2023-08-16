import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="pr-14 pt-10">
      <div className="flex min-h-[70px] w-full items-start justify-between bg-zinc-900">
        <a
          href="/"
          className="flex select-none items-center text-2xl text-white"
        >
          <img
            alt="tokopedia-logo"
            src="https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg"
          />
          <h2 className="font-bauhaus  text-tokopedia px-2 text-3xl">play</h2>
        </a>
        <a href="/search">
          <FaMagnifyingGlass className="h-6 w-6 text-white" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
