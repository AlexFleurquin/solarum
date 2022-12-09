import Link from "next/link";
import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import Image from "next/image";
import NFT from "/public/nft.jpeg";
import News from "/public/news.png";

export const HomeView: FC = ({}) => {
  const { publicKey } = useWallet();

  const onClick = () => {};

  return (
    <div className="container mx-auto w-full">
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
    </div>
  );
};
