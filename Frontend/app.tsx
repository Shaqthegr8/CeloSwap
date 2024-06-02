// import React from 'react';
// import { BrowserRouter as Router, Route, } from 'react-router-dom';
// import { WagmiConfig } from 'wagmi';
// import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
// import { Alfajores } from '@celo-tools/use-contractkit';
// import Home from './app/(tabs)/(Home)';

// // Create wagmi client
// const { chains, provider } = configureChains([Alfajores], [
//   // Define providers here if needed
// ]);

// const wagmiClient = createClient({
//   autoConnect: true,
//   provider,
// });

// const App: React.FC = () => {
//   return (
//     <WagmiConfig client={wagmiClient}>
//       <RainbowKitProvider chains={chains}>
//         <Router>
//           <Switch>
//             <Route path="/" exact component={Home} />
//             <Route path="/product/:id" exact component={Product} />
//           </Switch>
//         </Router>
//       </RainbowKitProvider>
//     </WagmiConfig>
//   );
// };

// export default App;
