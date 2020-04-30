import React from "react";

let {
  Provider: SwapiServiceProvider,
  Consumer: SwapiServiceConsumer
} = React.createContext();

export {
  SwapiServiceConsumer,
  SwapiServiceProvider
}