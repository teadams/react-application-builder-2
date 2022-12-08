import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryFunction,
  QueryFunctionContext,
  useQuery,
} from "react-query";
import AcsMetaContextProvider from "./contextProviders/AcsMetaContextProvider";

const getObjectType = (queryFunctionContext: QueryFunctionContext) => {
  const { queryKey } = queryFunctionContext;
  const [objectType, filters] = queryKey;
  console.log(objectType);
  console.log(filters);
};

// objectType, {id: 1}
const TestQuery = (props: { objectType: string }) => {
  const { objectType } = props;
  const { data } = useQuery([objectType, { id: 1 }], getObjectType);
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
        <TestQuery objectType="jobStages" />
        {props.children}
      </QueryClientProvider>
    </AcsMetaContextProvider>
  );
}

export default AcsApp;
