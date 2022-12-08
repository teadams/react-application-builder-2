import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import { QueryClient, QueryClientProvider, QueryFunction } from "react-query";
import AcsMetaContextProvider from "./contextProviders/AcsMetaContextProvider";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  QueryFunctionContext,
} from "react-query";

const getObjectType = (queryFunctionContext: QueryFunctionContext) => {
  const { queryKey } = queryFunctionContext;
  console.log(queryKey);
};

const TestQuery = (props: { objectType: string }) => {
  const { objectType } = props;
  const { data } = useQuery([objectType], getObjectType);
};

// Write getObject
// Look up parateters to use query
// Decide on the parameters to getRemote
//    ojbectType, id, get

const queryClient = new QueryClient();

function AcsApp(props) {
  return (
    <AcsMetaContextProvider>
      <QueryClientProvider client={queryClient}>
        <TestQuery />
        {props.children}
      </QueryClientProvider>
    </AcsMetaContextProvider>
  );
}

export default AcsApp;
