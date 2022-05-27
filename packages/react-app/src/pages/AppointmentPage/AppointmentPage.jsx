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

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      recordId: 'test',
    },
  });
  // const [txId, setTxId] = React.useState(undefined);
  const isLoading = React.useRef(false);
  const isLoaded = React.useRef(false);

  const wallet = useArjs();

  const onTxSubmitted = (newTxId) => {
    console.log({ newTxId });
    setValue(newTxId);
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
        <div className="bg-minsk rounded-xl p-6">
          <p className="text-2xl uppercase font-bold text-saffron-mango mb-6">
            Video Conference
          </p>
          <div className="flex flex-row justify-around">
            <div className="">
              <div className="bg-gray-400 w-96 h-96" />
            </div>
            <div className="">
              <div className="bg-gray-400 w-96 h-96" />
            </div>
          </div>
        </div>
        <form
          className="bg-minsk rounded-xl p-6 space-y-4"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <p className="text-2xl uppercase font-bold text-saffron-mango mb-6">
            Doctor&apos;s Notes
          </p>
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
              className="btn rounded-md text-md font-bold bg-heliotrope border-heliotrope"
            >
              <div className="w-full flex flex-row justify-between items-center">
                <div className="flex-grow">Finalize Appointment</div>
              </div>
            </button>
          </div>
        </form>
        {arweaveTransactionId ? (
          <div className="bg-minsk rounded-xl p-6 space-y-4">
            <p className="text-2xl uppercase font-bold text-saffron-mango mb-6">
              NFT Medical Record
            </p>
            <StringInput
              title="Record ID"
              subtext=""
              // disabled
              placeholder="Transaction ID"
              register={register('recordId')}
              control={control}
            />
            <button
              type="button"
              className="btn rounded-md text-md font-bold bg-heliotrope border-heliotrope"
              onClick={onMintRecord}
            >
              <div className="w-full flex flex-row justify-between items-center">
                <div className="flex-grow">Mint NFT Medical Record</div>
              </div>
            </button>
          </div>
        ) : null}
      </div>
    </PageBase>
  );
};

export default AppointmentPage;
