// pages/_app.jsx
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { CartProvider } from "../lib/cartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <Header />
        <main className="min-h-screen">
          <Component {...pageProps} />
        </main>
        <Footer />
      </CartProvider>
    </SessionProvider>
  );
}
