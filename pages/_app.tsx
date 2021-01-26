import "@styles/main.css";
import { FC } from "react";
import type { AppProps } from "next/app";
import { Head } from "@components/common";

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  return (
    <>
      <Head />
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
