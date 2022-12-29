import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import {
  AcsMetaContextProvider,
  AcsAuthContextProvider,
} from "./contextProviders";

const queryClient = new QueryClient();

function AcsApp(props: any) {
  return (
    <AcsAuthContextProvider>
      <AcsMetaContextProvider>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </AcsMetaContextProvider>
    </AcsAuthContextProvider>
  );
}

export default AcsApp;
