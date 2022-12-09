import Link from "next/link";
import { FC, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";

import { Loader, SolanaLogo, SelectAndConnectWalletButton } from "components";
import { NftCard } from "./NftCard";
import { Header } from "views/Header";
import { Footer } from "views/Footer";
const walletPublicKey = "3EqUrFrjgABCWAnqMYjZ36GcktiwDtFdkNYwY6C6cDzy";

export const GalleryView: FC = ({}) => {
  const { connection } = useConnection();
  const [walletToParsePublicKey, setWalletToParsePublicKey] =
    useState<string>(walletPublicKey);
  const { publicKey } = useWallet();

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: walletToParsePublicKey,
    connection,
  });

  console.log("nfts", nfts);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setWalletToParsePublicKey(value.trim());
  };

  const onUseWalletClick = () => {
    if (publicKey) {
      setWalletToParsePublicKey(publicKey?.toBase58());
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
      <div>
        <Header />

        <div className="pt-2">
          <div className="hero min-h-16 p-0 pt-10">
            <div className=" hero-content w-full">
              <div className="w-full">
                <h1 className="mb-5 text-5xl font-sans font-bold">
                  NFT Gallery on Solana <SolanaLogo />
                </h1>

                <div className="w-full min-w-full">
                  <p className="mb-5 font-sans">
                    Voici un exemple très basique de gallerie NFT. Il analyse le
                    réseau principal. <br />
                    Il utilise le paquet de{" "}
                    <a
                      href="https://www.npmjs.com/package/@nfteyez/sol-rayz-react"
                      target="_blank"
                      className="link font-sans font-bold"
                      rel="noreferrer"
                    >
                      @nfteyez/sol-rayz-react
                    </a>{" "}
                    pour récupérer les NFT pour un portefeuille spécifique.
                  </p>
                  <div>
                    <div className="form-control mt-8">
                      <label className="input-group text-xs text-gray-400">
                        <span>Copier l'adresse de votre portefeuille</span>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Entrer l'adresse de votre pourtefeuille"
                            className="w-full input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 font-sans text-sm"
                            value={walletToParsePublicKey}
                            onChange={onChange}
                          />

                          <SelectAndConnectWalletButton
                            onUseWalletClick={onUseWalletClick}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="my-2">
                  {error ? (
                    <div>
                      <p className="text-sm text-red-500">
                        Une erreur est survenue : {(error as any)?.message}
                      </p>
                    </div>
                  ) : null}

                  {!error && isLoading ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    <NftList nfts={nfts} error={error} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

type NftListProps = {
  nfts: NftTokenAccount[];
  error?: Error;
};

const NftList = ({ nfts, error }: NftListProps) => {
  if (error) {
    return null;
  }

  if (!nfts?.length) {
    return (
      <div className="text-center text-2xl pt-16">
        Pas de NFT trouvé dans votre portefeuille.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      {nfts?.map((nft) => (
        <NftCard key={nft.mint} details={nft} onSelect={() => {}} />
      ))}
    </div>
  );
};
