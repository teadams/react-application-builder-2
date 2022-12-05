import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";

function App(props) {
//  return <ModelContextProvider></ModelContextProvider>;
  return <>This is a test {props.children}</>;
}

export default App;
