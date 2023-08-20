import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import { NextUIProvider } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AnimatePresence>
      <NextUIProvider>
        <Navbar />
        <Component {...pageProps} />
      </NextUIProvider>
    </AnimatePresence>
  )
};

export default api.withTRPC(MyApp);
