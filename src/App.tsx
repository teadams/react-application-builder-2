import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import {
	AcsMetaContextProvider,
	AcsAuthContextProvider,
} from "./contextProviders";

const queryClient = new QueryClient();

function AcsApp(props: any) {
	return (
		<QueryClientProvider client={queryClient}>
			<AcsMetaContextProvider>
				<AcsAuthContextProvider>{props.children}</AcsAuthContextProvider>
			</AcsMetaContextProvider>
		</QueryClientProvider>
	);
}

export default AcsApp;
//<ReactQueryDevtools initialIsOpen={false} />
