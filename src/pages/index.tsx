import type { NextPage } from "next";
import Head from "next/head";
import { Footer, Header, HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solarum dApp</title>
        <meta name="description" content="This site will fly high 🦤" />
      </Head>
      <Header />
      <HomeView />
      <Footer />
    </div>
  );
};

export default Home;
