import React from 'react';
import PropTypes from 'prop-types';
import { ArjsProvider } from 'arjs-react/dist/cjs';

import ConnectPage from '../ConnectPage/ConnectPage';

import { useDisconnectReason } from '../../components/ConnectionError';
import WalletConnection from '../../components/WalletConnection/WalletConnection';
import ArweaveConnection from '../../components/ArweaveConnection/ArweaveConnection';

const PageBase = ({ children }) => {
  const disconnectReason = useDisconnectReason();

  if (disconnectReason) {
    return <ConnectPage disconnectReason={disconnectReason} />;
  }

  return (
    <ArjsProvider
      connectors={{
        arconnect: true,
        arweave: true,
      }}
      enableSWC={false}
    >
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-vivid-violet via-valhalla to-haiti">
        <div className="bg-pattern bg-no-repeat bg-top">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between items-center my-6">
              <div className="">
                <ArweaveConnection />
              </div>
              <div className="md:ml-8">
                <WalletConnection />
              </div>
            </div>
          </div>

          {/* <div className="border border-black h-0 w-full"/> */}

          <div className="flex-grow flex flex-col min-h-full pb-6">
            {children}
          </div>
        </div>
      </div>
    </ArjsProvider>
  );
};

PageBase.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageBase;
