import React from 'react';
import PropTypes from 'prop-types';

import { shortenArweaveAddress } from '../../utils/address';
import ConnectIcon from './Connect.svg';
import ConnectedIcon from './Connected.svg';

const onArweaveConnect = async (wallet, setBalance, setAddress) => {
  const balance = await wallet.getBalance('self');
  setBalance(wallet.getArweave().ar.winstonToAr(balance));
  const address = await wallet.getAddress();
  setAddress(address);
};

const ArweaveConnection = ({ wallet }) => {
  const permission = { permissions: ['SIGN_TRANSACTION'] };

  const activate = (connector, key) => {
    wallet.connect(connector, key);
  };

  const [balance, setBalance] = React.useState('Requesting...');
  const [address, setAddress] = React.useState(undefined);

  wallet.ready(() => {
    if (wallet.status === 'connected') {
      onArweaveConnect(wallet, setBalance, setAddress);
    }
  });

  React.useEffect(() => {
    console.log({ balance, address });
  }, [balance, address]);
  return (
    <div className="flex flex-row justify-end">
      {address ? (
        <div className="flex flex-col items-center w-max">
          <div className="flex flex-row space-x-6 rounded-3xl px-4 py-2 border-2 w-max">
            <span className="text-white whitespace-nowrap">
              <p className="ml-2">{shortenArweaveAddress(address)}</p>
            </span>
            <img src={ConnectedIcon} alt="Connected" className="w-4" />
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="btn flex flex-row space-x-6 rounded-3xl px-4 py-2 border-2 w-max bg-maroon-flush border-maroon-flush"
          onClick={() => activate('arconnect', permission)}
        >
          <span className="text-white whitespace-nowrap">
            Connect to Arweave
          </span>
          <img src={ConnectIcon} alt="Connect" className="w-4" />
        </button>
      )}
    </div>
  );
};

ArweaveConnection.propTypes = {
  wallet: PropTypes.shape().isRequired,
};

export default ArweaveConnection;
