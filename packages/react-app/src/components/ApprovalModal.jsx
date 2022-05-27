import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ethers, BigNumber } from 'ethers';
import { useContractFunction, useEthers, useTokenAllowance, useToken } from '@usedapp/core';

import Spinner from './Spinner/Spinner';

const ApprovalModal = ({ isOpen, closeModal, contractAddress, spenderAddress, value }) => {
  const { library, account } = useEthers();
  const signer = library && library.getSigner();

  const { state: approvalState, send: approve } = useContractFunction(
    new ethers.Contract(contractAddress, abis.erc20.interface, signer),
    'approve',
  );
  const [approvedValue, setApprovedValue] = React.useState(ethers.BigNumber.from(0));
  const approvalInProgress = React.useRef(false);
  const onApprove = () => {
    approvalInProgress.current = true;
    approve(spenderAddress, approvedValue);
  };

  const allowance = useTokenAllowance(contractAddress, account, spenderAddress) ?? ethers.BigNumber.from(0);
  const tokenInfo = useToken(contractAddress);

  React.useEffect(() => {
    setApprovedValue(value);
  }, [value]);

  React.useEffect(() => {
    if (approvalState.status === 'Success' && approvalInProgress.current) {
      approvalInProgress.current = false;
      closeModal();
    }
  }, [approvalState, closeModal]);

  return (
    <>
      <div className={classNames('modal', { 'modal-open': isOpen })}>
        <div className="modal-box">
          {approvalState.status === 'Mining' ? (
            <Spinner />
          ) : (
            <>
              <p>
                You need to approve Router contract to spend your{''}
                {tokenInfo ? ` ${tokenInfo.symbol}` : ''} tokens.
              </p>
              <p>You can save fees by pre-approving large amount.</p>
              <div className="form-control">
                <label className="label" htmlFor="newApprovedValue">
                  <span className="label-text">Approve</span>
                </label>
                <div className="relative">
                  <input
                    id="newApprovedValue"
                    type="text"
                    className="w-full input input-primary input-bordered"
                    value={approvedValue ? approvedValue.toString() : ''}
                    onChange={event => setApprovedValue(ethers.BigNumber.from(event.target.value))}
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 rounded-l-none btn bg-cornflower-blue border-cornflower-blue text-lg font-extralight"
                    onClick={() => onApprove()}
                  >
                    APPROVE
                  </button>
                </div>
              </div>
              <div className="form-control">
                <label className="label" htmlFor="currentlyApproved">
                  <span className="label-text">Allowance</span>
                </label>
                <div className="relative">
                  <input
                    id="currentlyApproved"
                    type="text"
                    className="w-full input input-primary input-bordered"
                    value={allowance.toString()}
                    disabled
                  />
                </div>
              </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

ApprovalModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  spenderAddress: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(BigNumber).isRequired,
};

export default ApprovalModal;
