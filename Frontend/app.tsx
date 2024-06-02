import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { WagmiConfig, createClient, configureChains, defaultChains } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { CeloAlfajores } from '@celo-tools/hardhat-celo';
import Home from './components/Home';
import Product from './components/Product';

// Create wagmi client
const { chains, provider } = configureChains([CeloAlfajores], [
  // Define providers here if needed
]);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
});

const App: React.FC = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/product/:id" exact component={Product} />
          </Switch>
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
