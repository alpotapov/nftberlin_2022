import React from 'react';
import PropTypes from 'prop-types';
import { useEthers } from '@usedapp/core';

const expectedChainId = parseInt(process.env.REACT_APP_NETWORK_ID, 10);
const expectedChainName = process.env.REACT_APP_NETWORK_NAME;

export const useDisconnectReason = () => {
  const { account, chainId } = useEthers();
  const [disconnectReason, setDisconnectReason] =
    React.useState('initializing');

  React.useEffect(() => {
    if (!account) {
      setDisconnectReason('no-connection');
      return;
    }
    if (chainId !== expectedChainId) {
      setDisconnectReason('wrong-network');
      return;
    }
    setDisconnectReason('');
  }, [chainId, account]);

  return disconnectReason;
};

const ConnectionError = ({ reason }) => {
  const connectionErrors = {
    'no-connection': (
      <div className="flex flex-col space-y-4">
        <p>Press Connect Wallet button to connect with Metamask.</p>
      </div>
    ),
    'wrong-network': (
      <div>
        <p>
          Choose <span className="capitalize">{expectedChainName}</span> (ID:{' '}
          {expectedChainId}) network in your Metamask wallet.
        </p>
      </div>
    ),
    initializing: null,
  };
  return (
    <div className="container mx-auto">
      <div className="flex-grow my-8 mx-4">
        <p className="text-5xl uppercase font-extralight">Not Connected</p>
        <div className="mt-8">{connectionErrors[reason]}</div>
      </div>
    </div>
  );
};

ConnectionError.propTypes = {
  reason: PropTypes.string.isRequired,
};

export default ConnectionError;
