import React from "react";
import { ACSAuthContext } from "../types";
const AcsAuthContext = React.createContext<ACSAuthContext | null>(null);
export default AcsAuthContext;
