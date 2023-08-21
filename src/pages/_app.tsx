import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import { NextUIProvider } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion"
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
    <Head>
      <link rel="shortcut icon" href="/logo.jpg" type="image/x-icon" />
    </Head>
    <AnimatePresence>
      <NextUIProvider>
        <Navbar />
        <Component {...pageProps} />
      </NextUIProvider>
    </AnimatePresence>
    </>
  )
};

export default api.withTRPC(MyApp);
