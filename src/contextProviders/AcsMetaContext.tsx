import React from "react";
import { ACSMetaModel } from "../types";
const AcsMetaContext = React.createContext<ACSMetaModel | null>(null);
export default AcsMetaContext;
