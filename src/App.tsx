import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React, { useContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import {
  AcsMetaContextProvider,
  AcsAuthContextProvider,
} from "./contextProviders";
import { setTenantColors } from "../../lib/acsTenantParams";
import GreetrContext from "../../contextProviders/GreetrContext";

const queryClient = new QueryClient();

function AcsApp(props: any) {
  const greetrInfo = useContext(GreetrContext);

  useEffect(() => {
    setTenantColors(greetrInfo?.acsTenantSetup);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <AcsMetaContextProvider>
        <AcsAuthContextProvider>{props.children}</AcsAuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </AcsMetaContextProvider>
    </QueryClientProvider>
  );
}

export default AcsApp;
