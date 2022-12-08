import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AcsMetaContextProvider } from "./contextProviders";
import { useGetObjectDataById } from "./hooks";

const TestQuery = (props: { objectType: string }) => {
  const { objectType } = props;
  const { data } = useGetObjectDataById(
    objectType,
    "a518aa59-8256-41e3-b4df-51de10cd74df"
  );
  console.log(data);
};

const queryClient = new QueryClient();

function AcsApp(props) {
  return (
    <AcsMetaContextProvider>
      <QueryClientProvider client={queryClient}>
        <TestQuery objectType="jobStages" />
        {props.children}
      </QueryClientProvider>
    </AcsMetaContextProvider>
  );
}

export default AcsApp;
