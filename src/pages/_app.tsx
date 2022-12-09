import React from "react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { ThemeProvider } from "next-themes";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/App.css";

// set custom RPC server endpoint for the final website
// const endpoint = "https://explorer-api.devnet.solana.com";
// const endpoint = "http://127.0.0.1:8899";
const endpoint = "https://ssc-dao.genesysgo.net";

const WalletProvider = dynamic(
  () => import("../contexts/ClientWalletProvider"),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider>
          <Component {...pageProps} />
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
