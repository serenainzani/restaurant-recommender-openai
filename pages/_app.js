import "../styles/globals.css";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }) {
    return (
        <NextUIProvider className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
            <Component {...pageProps} />
        </NextUIProvider>
    );
}

export default MyApp;
