import AuthContextProvider from "@/context/auth-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Toaster
        position={"bottom-left"}
        reverseOrder={false}
        toastOptions={{
          style: {
            marginLeft: "64px",
            boxSizing: "border-box",
            boxShadow: "0px 16px 28px rgba(0, 0, 0, 0.3)",
          },
        }}
      />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
