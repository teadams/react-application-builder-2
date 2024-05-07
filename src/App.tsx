import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import {
	AcsMetaContextProvider,
	AcsAuthContextProvider,
} from "./contextProviders";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
		},
	},
});

function AcsApp(props: any) {
	return (
		<QueryClientProvider client={queryClient}>
			<AcsMetaContextProvider>
				<AcsAuthContextProvider>{props.children}</AcsAuthContextProvider>
			</AcsMetaContextProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default AcsApp;
