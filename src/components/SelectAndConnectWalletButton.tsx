import { FC, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

type Props = {
  onUseWalletClick: () => void;
};

export const SelectAndConnectWalletButton: FC<Props> = ({
  onUseWalletClick,
}) => {
  const { setVisible } = useWalletModal();
  const { wallet, connect, connecting, publicKey } = useWallet();

  useEffect(() => {
    if (!publicKey && wallet) {
      try {
        connect();
      } catch (error) {
        console.log("Error connecting to the wallet: ", (error as any).message);
      }
    }
  }, [wallet]);

  const handleWalletClick = () => {
    try {
      if (!wallet) {
        setVisible(true);
      } else {
        connect();
      }
      onUseWalletClick();
    } catch (error) {
      console.log("Error connecting to the wallet: ", (error as any).message);
    }
  };

  return (
    <button
      className="font-sans font-light px-4 py-2 text-sm text-gray-900 dark:text-gray-100 bg-white border border-gray-300 dark:border-gray-400 rounded-xl hover:shadow-lg hover:bg-white dark:bg-gray-800 dark:border-gray-700"
      onClick={handleWalletClick}
      disabled={connecting}
    >
      {publicKey ? <div>Connecté</div> : <div>Connecter</div>}
    </button>
  );
};
