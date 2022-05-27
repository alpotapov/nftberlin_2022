import React from 'react';
import ReactDOM from 'react-dom';
import { DAppProvider, ChainId } from '@usedapp/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ArjsProvider } from 'arjs-react';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import abis from './contracts/hardhat_contracts.json';

const localMulticallAddress = abis[31337].localhost.contracts.Multicall.address;

const config = {
  readOnlyChainId: ChainId.Goerli,
  multicallAddresses: {
    [ChainId.Hardhat]: localMulticallAddress,
  },
};

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ArjsProvider
      connectors={{
        arconnect: true,
        arweave: true,
      }}
      enableSWC={false}
    >
      <DAppProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </DAppProvider>
    </ArjsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
