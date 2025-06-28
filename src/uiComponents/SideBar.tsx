import React, { useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import profile from "../../public/profile.png";
import Icon from "./Icon";

interface SideBarProps {
  children: React.ReactNode;
  username: string;
  logout: () => void;
  title?: string;
}

const SideBar = ({ children, username, logout, title }: SideBarProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    const currentRef: any = ref.current;
    if (currentRef.classList.contains("translate-x-full")) {
      currentRef.classList.remove("translate-x-full");
      currentRef.classList.add("translate-x-0");
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    } else if (!currentRef.classList.contains("translate-x-full")) {
      currentRef.classList.remove("translate-x-0");
      currentRef.classList.add("translate-x-full");
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    }
  };

  return (
    <>
      <div className="bg-theme-light-gray h-full p-4 pb-28 md:block hidden">
        <div className="flex flex-col flex-wrap h-full">
          {/* <Image
            src={logo}
            alt="logo"
            className="mx-auto object-contain p-2 w-24 h-12 mb-6"
          /> */}

          <h1 className="text-dark mb-6 font-bold">{title}</h1>
          {children}

          <div className="flex gap-4 justify-center flex-col flex-wrap items-center mt-20">
            <div className="mt-4 flex flex-col items-center">
              <Image
                src={profile}
                alt="profile"
                className="rounded-full w-12 h-12 object-cover"
              />
              <p className="text-dark m-0 p-0 mt-2 mb-6">
                {username ? username : ""}
              </p>
              <button
                type="button"
                onClick={logout}
                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-2 py-1 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-xs"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-2 block md:hidden bg-theme-light-gray px-2 md:px-0">
        <div className="container mx-auto">
          <nav className="flex justify-between items-center">
            <div>
              <Icon
                icon="home"
                className="mx-4"
                size="lg"
                onClick={toggleMenu}
              />
            </div>
          </nav>
        </div>
      </section>

      <div
        ref={ref}
        className="h-full overflow-auto fixed top-0 right-0 bg-theme-light-gray p-10 translate-x-full transition-transform transform w-80 z-20"
      >
        <Icon
          icon="xmark"
          className="absolute top-10 right-10"
          size="lg"
          onClick={toggleMenu}
        />

        <div className="flex gap-4 justify-center flex-col flex-wrap items-center">
          <div className="mt-4 flex flex-col items-center">
            <Image
              src={profile}
              alt="profile"
              className="rounded-full w-12 h-12 object-cover"
            />
            <p className="text-dark m-0 p-0 mt-2 mb-2">
              {username ? username : ""}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap flex-col justify-start items-start gap-6 mt-6 mb-30">
          <div className="flex flex-col flex-wrap gap-2 bg-transparent p-2 rounded-[8px] transition duration-200 ease-in">
            {children}
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="inline-flex mt-16 justify-center rounded-md border border-transparent bg-red-600 px-2 py-1 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-xs"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default SideBar;
