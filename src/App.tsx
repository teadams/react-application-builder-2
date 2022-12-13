import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AcsMetaContextProvider } from "./contextProviders";

const queryClient = new QueryClient();

function AcsApp(props) {
  return (
    <AcsMetaContextProvider>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </AcsMetaContextProvider>
  );
}

export default AcsApp;
