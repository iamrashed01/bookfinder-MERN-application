import Head from "next/head";
import Header from "../components/header";
function Home({ count, incrementCounter }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </div>
  );
}

export default Home;
