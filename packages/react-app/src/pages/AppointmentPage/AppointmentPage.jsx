import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useArjs } from 'arjs-react';
import { useContractFunction, useEthers } from '@usedapp/core';

import { ethers } from 'ethers';
import PageBase from '../PageBase/PageBase';
import TextAreaInput from '../../components/Inputs/TextArea';
import StringInput from '../../components/Inputs/StringInput';

import ArweaveService from '../../services/ArweaveService';
import { addresses, interfaces } from '../../contracts/ContractContext';

const AppointmentPage = () => {
  const { library, account } = useEthers();
  const signer = library && library.getSigner();

  const { register, handleSubmit, control, setValue } = useForm();
  const isLoading = React.useRef(false);
  const isLoaded = React.useRef(false);

  const wallet = useArjs();

  const onTxSubmitted = (newTxId) => {
    console.log({ newTxId });
    setValue('recordId', newTxId);
  };

  const onSubmit = (data) => {
    console.log({ data });
    const { doctorsNotes } = data;
    ArweaveService.saveAppointmentOutcome(wallet, doctorsNotes, onTxSubmitted);
  };

  const onError = (errors) => {
    console.log({ errors });
  };

  const arweaveTransactionId = useWatch({
    control,
    name: 'recordId',
  });

  React.useEffect(() => {
    if (
      !arweaveTransactionId ||
      isLoading.current ||
      isLoaded.current ||
      arweaveTransactionId === 'test'
    )
      return;
    isLoading.current = true;
    console.log('FETCHING TX STATUS');
    setTimeout(() => {
      ArweaveService.getTransactionStatus(wallet, arweaveTransactionId).then(
        (result) => {
          console.log({ result });
          isLoading.current = false;
          isLoaded.current = true;
        }
      );
    }, 3000);
  }, [arweaveTransactionId, wallet]);

  const { send } = useContractFunction(
    new ethers.Contract(
      addresses.medicalRecord,
      interfaces.medicalRecord,
      signer
    ),
    'mintRecord'
  );
  const onMintRecord = () => {
    send(account, arweaveTransactionId);
  };

  return (
    <PageBase>
      <div className="container mx-auto space-y-4">
        <div className="rounded-xl">
          <div className="bg-gray-400 w-96 h-96" />
        </div>
        <form
          className="rounded-xl space-y-4"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <TextAreaInput
            title="Doctor's notes"
            subtext="Write down diagnosis, prescription etc"
            placeholder="Patient complains about a headache"
            isTextArea
            register={register('doctorsNotes', { required: true })}
          />
          <div>
            <button
              type="submit"
              className="btn rounded-md text-md font-bold bg-chetwode-blue border-chetwode-blue"
            >
              <div className="w-full flex flex-row justify-between items-center">
                <div className="flex-grow">Finalize Appointment</div>
              </div>
            </button>
          </div>
        </form>
        <div className="rounded-xl space-y-4">
          <p className="text-4xl uppercase font-bold text-chetwode-blue mb-6 mt-12">
            NFT Medical Record
          </p>
          <StringInput
            title="Arweave Transaction ID"
            subtext=""
            disabled
            placeholder="Transaction ID"
            register={register('recordId')}
            control={control}
          />
          <button
            type="button"
            className="btn rounded-md text-md font-bold bg-chetwode-blue border-chetwode-blue"
            onClick={onMintRecord}
          >
            <div className="w-full flex flex-row justify-between items-center">
              <div className="flex-grow">Mint NFT Medical Record</div>
            </div>
          </button>
        </div>
      </div>
    </PageBase>
  );
};

export default AppointmentPage;
