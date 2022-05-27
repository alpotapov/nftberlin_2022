import React from 'react';
import PropTypes from 'prop-types';

import ConnectPage from '../ConnectPage/ConnectPage';

import { useDisconnectReason } from '../../components/ConnectionError';
import WalletConnection from '../../components/WalletConnection/WalletConnection';

const PageBase = ({ children }) => {
  const disconnectReason = useDisconnectReason();

  if (disconnectReason) {
    return <ConnectPage disconnectReason={disconnectReason} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-vivid-violet via-valhalla to-haiti">
      <div className="bg-pattern bg-no-repeat bg-top">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between items-center my-6">
            <div className="md:ml-8">
              <WalletConnection />
            </div>
          </div>
        </div>

        {/* <div className="border border-black h-0 w-full"/> */}

        <div className="flex-grow flex flex-col min-h-full">{children}</div>
      </div>
    </div>
  );
};

PageBase.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageBase;
