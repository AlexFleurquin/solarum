import Link from "next/link";
import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useTheme } from "next-themes";

import Image from "next/image";
import NFT from "assets/images/NFT.jpg";
import News from "assets/images/news.png";

import { Logo } from "components";
import { SunIcon, MoonIcon } from "components";

export const HomeView: FC = ({}) => {
  const { publicKey } = useWallet();

  const onClick = () => {};

  const { systemTheme, theme, setTheme } = useTheme();

  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <button role="button" onClick={() => setTheme("light")}>
          <SunIcon />
        </button>
      );
    } else {
      return (
        <button role="button" onClick={() => setTheme("dark")}>
          <MoonIcon />
        </button>
      );
    }
  };

  return (
    <div className="container mx-auto w-full p-8 h-screen">
      <div className="flex justify-between max-w-8xl">
        <div className="flex items-center">
          <button>
            <Logo />
          </button>
          <span className="text-lg font-sans font-bold pl-4">Solarum</span>
        </div>

        <div className="flex items-center">
          <WalletMultiButton className="btn-connect">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 pr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
              />
            </svg>
            Portefeuille
          </WalletMultiButton>
          <span className="ml-6">{renderThemeChanger()}</span>
        </div>
      </div>

      <div className="pt-8 max-w-6xl">
        <div className="px-4 py-12">
          <div className="grid gap-8- items-start justify-center">
            <div
              className="relative group"
              data-aos="fade-down"
              data-aos-delay="800"
            >
              <div className="relative px-2 py-2 border dark:border-gray-600 hover:shadow-lg rounded-full leading-none flex items-center bg-white dark:bg-gray-800">
                <span className="dark:bg-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                  <span className="font-sans bg-gradient-to-r text-transparent bg-clip-text from-gray-500 to-gray-600 text-sm">
                    Nouveau
                  </span>
                </span>
                <a className="font-sans px-2 hover:text-gray-700 dark:hover:text-white text-gray-400 transition duration-200 text-sm">
                  Découvrez votre gallerie NFT &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-center">
          <div className="max-w-2xl">
            <h1 className="p-2 text-4xl font-sans ">
              Hello <span className="font-bold">Solana World</span> 👋🏼
            </h1>
            <p className="my-5 font-sans">
              Ce template comprend de superbes outils <br></br>pour rapidement
              développer et déployer des dApps sur Solana.
            </p>
            <p className="font-sans">
              {publicKey ? <>Votre addresse: {publicKey.toBase58()}</> : null}
            </p>
          </div>
        </div>

        <div className="max-w-full mx-auto my-16">
          <ul className="grid grid-cols-5 gap-6 content-center">
            <li className="col-span-2 bg-white border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg">
              <Link href="/gallery" passHref>
                <div className="flex">
                  <Image
                    src={NFT}
                    alt="NFT"
                    width="150px"
                    height="150px"
                    className="rounded-xl shadow"
                  />
                  <div className="p-4">
                    <a className="grow text-2xl font-sans font-bold">
                      Gallerie NFT
                    </a>
                  </div>
                </div>
              </Link>
            </li>

            {/* <li className="mb-5">
                <Link href="/mint">
                  <a className="text-4xl font-bold hover:underline">
                    🍬 -- Candy Machine Mint UI
                  </a>
                </Link>
              </li> */}
            <li className="col-span-2 bg-white border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg">
              <Link href="/tweeter" passHref>
                <div className="flex ">
                  <Image
                    src={News}
                    alt="NFT"
                    width="150px"
                    height="150px"
                    className="rounded-xl flex-none items-center"
                  />
                  <div className="p-4">
                    <a className="grow text-2xl font-sans font-bold">
                      Solana Tweet
                    </a>
                  </div>
                </div>
              </Link>
            </li>

            <li className="max-w-sm p-4 bg-white border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg">
              <div className="flex flex-col justify-around">
                <a href="#">
                  <h5 className=" text-2xl font-sans font-semibold tracking-tight text-gray-900 dark:text-white">
                    Académie
                  </h5>
                </a>

                <a
                  href="https://solana.com/fr/developers"
                  className="inline-flex items-center text-blue-600"
                >
                  Commencer
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                  </svg>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <footer className="fixed bottom-0 w-full left-0">
        <div className="py-2 md:py-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Bottom area */}
            <div className="flex items-center justify-between">
              {/* Social links */}
              <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
                <li>
                  <a
                    href="https://twitter.com/flexsender"
                    className="flex justify-center items-center text-black dark:text-white hover:text-orange-200 rounded-full transition duration-150 ease-in-out"
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-8 h-8 fill-current"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                    </svg>
                  </a>
                </li>
                <li className="ml-4">
                  <a
                    href="https://github.com/AlexFleurquin"
                    className="flex justify-center items-center text-black dark:text-white hover:text-orange-200 rounded-full transition duration-150 ease-in-out"
                    aria-label="Github"
                  >
                    <svg
                      className="w-8 h-8 fill-current"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                    </svg>
                  </a>
                </li>
                <li className="ml-4">
                  <a
                    href="https://www.linkedin.com/in/alexfleurquin/"
                    className="flex justify-center items-center text-black dark:text-white hover:text-orange-200 rounded-full transition duration-150 ease-in-out"
                    aria-label="Linkedin"
                  >
                    <svg
                      className="w-8 h-8 fill-current"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z" />
                    </svg>
                  </a>
                </li>
              </ul>

              {/* Copyrights note */}
              <div className="text-gray-400 text-sm mr-4">
                &copy; 2022 Alex Fleurquin.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
