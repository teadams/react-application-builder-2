import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import AcsMetaContextProvider from "./contextProviders/AcsMetaContextProvider";

function AcsApp(props) {
  return (
    <AcsMetaContextProvider>
      This is a test {props.children}
    </AcsMetaContextProvider>
  );
}

export default AcsApp;
