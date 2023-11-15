import Layout from "@/components/Layout";
import { store } from "@/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/utlis/theme";
import '../styles/global.css'
import SnackBar from "@/components/SnackBar";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
            <SnackBar/>
          </Layout>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
