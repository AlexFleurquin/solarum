import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import orderBy from "lodash.orderby";

import { Loader, SelectAndConnectWalletButton } from "components";
import * as anchor from "@project-serum/anchor";

import { SolanaLogo } from "components";
import styles from "./index.module.css";
import { getTweets, authorFilter, sendTweet } from "./tweets";
import { useProgram } from "./useProgram";
import { Header } from "views/Header";

const endpoint = "https://explorer-api.devnet.solana.com";

const connection = new anchor.web3.Connection(endpoint);

export const SolanaTweeterView: FC = ({}) => {
  const [isAirDropped, setIsAirDropped] = useState(false);
  const wallet = useAnchorWallet();

  const airdropToWallet = async () => {
    if (wallet) {
      setIsAirDropped(false);
      const signature = await connection.requestAirdrop(
        wallet.publicKey,
        1000000000
      );

      const tx = await connection.confirmTransaction(signature);
      setIsAirDropped(true);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
      <div className={styles.container}>
        <Header />

        <div className="pt-2">
          <div className="hero min-h-16 pt-4">
            <div className="hero-content">
              <div className="max-w-lg">
                <h1 className="mb-5 font-sans font-bold text-5xl">
                  Solana Twitter <SolanaLogo />
                </h1>

                <p className="mb-5">
                  Voici une version simplifiée de Twitter en tant que Solana
                  dApp. <br />
                  Il vise à être la construction de l'interface utilisateur
                  Next.JS pour{" "}
                  <a
                    href="https://lorisleiva.com/create-a-solana-dapp-from-scratch"
                    target="_blank"
                    className="link font-bold"
                    rel="noreferrer"
                  >
                    créer un tutoriel Solana dApp de zéro
                  </a>{" "}
                </p>

                <p className="font-sans text-sm">
                  L'interface se connecte au Devnet de Solana.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex my-16">
          <div className="mr-4 font-sans text-sm">
            Besoin de SOL sur son portefeuille de test ?
          </div>
          <div className="mr-4">
            <button
              className="btn rounded-lg bg-blue-500 px-2 py-1 text-xs"
              onClick={airdropToWallet}
            >
              Airdrop 1 SOL
            </button>
          </div>
          {isAirDropped ? (
            <div className="opacity-50">Le SOL faucets a été envoyé</div>
          ) : null}
        </div>

        <div className="max-w-6xl">
          {!wallet ? (
            <SelectAndConnectWalletButton onUseWalletClick={() => {}} />
          ) : (
            <TwitterScreen />
          )}
        </div>
      </div>
    </div>
  );
};

const TwitterScreen = () => {
  const wallet: any = useAnchorWallet();
  const [activeTab, setActiveTab] = useState(0);
  const [tweets, setTweets] = useState<unknown[]>([]);
  const [profileTweets, setProfileTweets] = useState<unknown[]>([]);
  const { program } = useProgram({ connection, wallet });
  const [lastUpdatedTime, setLastUpdatedTime] = useState<number>();

  useEffect(() => {
    fetchTweets();
    fetchProfileTweets();
  }, [wallet, lastUpdatedTime]);

  const fetchTweets = async () => {
    if (wallet && program) {
      try {
        const tweets = await getTweets({
          program,
          // topicFilter('solana'),
        });
        setTweets(tweets);
      } catch (error) {
        // set error
      }
    }
  };

  const fetchProfileTweets = async () => {
    if (wallet && program) {
      try {
        const tweets = await getTweets({
          program,
          // topicFilter('solana'),
          filter: [authorFilter(wallet?.publicKey.toBase58())],
        });
        setProfileTweets(tweets);
      } catch (error) {
        // set error
      }
    }
  };

  const onTweenSent = (newTweet: unknown) => {
    setTweets((prevState) => ({
      ...prevState,
      newTweet,
    }));
  };

  const sortedTweets = orderBy(tweets, ["timestamp"], ["desc"]);

  return (
    <div className="flex w-full">
      <div className="mr-8">
        <ul className="menu p-4 overflow-y-auto bg-base-100 text-base-content">
          <li className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-500 hover:rounded-full">
            <a
              className={activeTab === 0 ? "active" : ""}
              onClick={() => setActiveTab(0)}
            >
              {" "}
              <div className="flex items-center text-left">
                <HomeIcon className="h-6 w-6 text-white-500" />
                <span className="pl-2 font-sans font-bold text-sm">
                  Accueil
                </span>
              </div>
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-500 hover:rounded-full">
            <a
              className={activeTab === 1 ? "active" : ""}
              onClick={() => setActiveTab(1)}
            >
              <div className="flex items-center text-left">
                <UserIcon className="h-7 w-7 text-white-500" />
                <span className="pl-2 font-sans font-bold text-sm">Profil</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-6xl">
        {activeTab === 0 ? (
          <div className="text-xs">
            <NetTweet onTweenSent={onTweenSent} />
            {sortedTweets.map((t: any) => (
              <Tweet key={(t as any).key} content={t} />
            ))}
          </div>
        ) : (
          <TwitterProfile tweets={profileTweets} wallet={wallet} />
        )}
      </div>
    </div>
  );
};

type NetTweet = {
  onTweenSent: (t: any) => void;
};

const NetTweet: FC<NetTweet> = ({ onTweenSent }) => {
  const wallet: any = useAnchorWallet();
  const { program } = useProgram({ connection, wallet });
  const [content, setContent] = useState<string>("");

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value) {
      setContent(value);
    }
  };

  const onTweetSendClick = async () => {
    if (!content || !program) return;

    const topic = "default";
    const tweet = await sendTweet({
      wallet,
      program,
      topic,
      content,
    });

    console.log("added new tweet: ", tweet);
    setContent("");
    onTweenSent(tweet);
  };

  return (
    <div className="mb-8 pb-4 border-b border-gray-200 flex ">
      <div className="avatar placeholder mr-4">
        <div className="rounded-full bg-gray-100 text-center items-center w-14 h-14">
          Moi
        </div>
      </div>
      <div className="form-control flex-1 mx-2">
        <textarea
          className="textarea h-16 w-full dark:bg-gray-800 text-xl rounded-lg px-2 py-1"
          placeholder="Quoi de neuf ?"
          value={content}
          onChange={onContentChange}
        ></textarea>
      </div>
      <div className="flex items-end">
        <button
          className="btn bg-white bg-blue-400 font-bold font-sans text-white rounded-full px-4 py-2"
          onClick={onTweetSendClick}
        >
          Tweeter
        </button>
      </div>
    </div>
  );
};

const Tweet = ({ content }: any) => {
  return (
    <div className="mb-8 border-b border-gray-200 flex max-w-4xl">
      <div className="avatar placeholder mr-4">
        <div className="mb-4 rounded-full bg-neutral-focus text-neutral-content w-14 h-14">
          {content.authorDisplay.slice(0, 2)}
        </div>
      </div>
      <div>
        <div className="flex text-sm">
          <div className="font-bold">{content.authorDisplay}</div>
          <div className="mx-2 opacity-50">·</div>
          <div className="opacity-50">{content.createdAgo}</div>
        </div>
        <div className="text-xl font-sans">{content.content}</div>
        {content.topic ? (
          <div className="text-pink-400 my-2">#{content.topic}</div>
        ) : null}
      </div>
    </div>
  );
};

const TwitterProfile = ({ tweets, wallet }: any) => {
  return (
    <div className="flex-1 text-left w-full">
      <div>Profile</div>
      <div>{wallet.publicKey.toString()}</div>

      <div className="my-8">
        {tweets.length === 0 ? (
          <div className="text-3xl opacity-50 text-center">
            Il n'y a pas de tweets
          </div>
        ) : null}
        {tweets.map((t: any) => (
          <Tweet key={t.key} content={t} />
        ))}
      </div>
    </div>
  );
};
