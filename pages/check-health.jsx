import Head from "next/head";
import { Footer } from "../components/Footer";
import Form from "../components/Form";
import Navbar from "../components/Navbar";

export default function CheckHealth() {
  return (
    <div>
      <Head>
        <title>Check Plant Health</title>
        <meta name="description" content="Check your plant's health with Hamagon." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-HamagonDark min-h-screen pb-10">
        <Navbar />
        <Form />
      </main>
    </div>
  );
}

// export default CheckHealth;
