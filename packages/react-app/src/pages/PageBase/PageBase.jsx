import React from 'react';
import PropTypes from 'prop-types';
import { useArjs } from 'arjs-react';
import { Link } from 'react-router-dom';

import ConnectPage from '../ConnectPage/ConnectPage';

import { useDisconnectReason } from '../../components/ConnectionError';
import WalletConnection from '../../components/WalletConnection/WalletConnection';
import ArweaveConnection from '../../components/ArweaveConnection/ArweaveConnection';

const PageBase = ({ children }) => {
  const disconnectReason = useDisconnectReason();

  const wallet = useArjs();

  if (disconnectReason) {
    return <ConnectPage disconnectReason={disconnectReason} />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-pattern bg-no-repeat bg-top">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:justify-end items-center my-6">
            <div className="">
              <Link to="/">Patient Dashboard</Link>
            </div>
            <div className="flex-grow flex flex-row justify-end">
              <div className="">
                <ArweaveConnection wallet={wallet} />
              </div>
              <div className="md:ml-8">
                <WalletConnection />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="border border-black h-0 w-full"/> */}

        <div className="flex-grow flex flex-col min-h-full pb-6">
          {children}
        </div>
      </div>
    </div>
  );
};

PageBase.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageBase;
