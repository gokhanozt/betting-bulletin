import React from "react";
import BetsList from "./components/BetsList/BetsList";
import Basket from "./components/Basket/Basket";
import { BasketProvider } from "./context/BasketContext";
import "./styles/main.scss";

const App = () => {
  return (
    <BasketProvider>
      <div className="App">
        <h1>Bülten</h1>
        <BetsList />
        <Basket />
      </div>
    </BasketProvider>
  );
};

export default App;
