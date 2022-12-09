import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useTheme } from "next-themes";

import { Logo } from "components";
import { SunIcon, MoonIcon } from "components";

export const Header: FC = ({}) => {
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
    <div className="container mx-auto w-full p-8">
      <div className="flex justify-between max-w-8xl">
        <div className="flex items-center">
          <button>
            <Logo />
          </button>
          <span className="text-lg font-sans font-bold pl-4">Solarum</span>
        </div>

        <div className="flex items-center">
          <WalletMultiButton className="btn-connect">
            Portefeuille
          </WalletMultiButton>
          <span className="ml-6">{renderThemeChanger()}</span>
        </div>
      </div>
    </div>
  );
};
