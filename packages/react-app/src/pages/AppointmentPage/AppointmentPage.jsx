import React from 'react';
import { useForm } from 'react-hook-form';
import { useArjs } from 'arjs-react';

import PageBase from '../PageBase/PageBase';
import TextAreaInput from '../../components/Inputs/TextArea';
import StringInput from '../../components/Inputs/StringInput';

import ArweaveService from '../../services/ArweaveService';

const AppointmentPage = () => {
  const { register, handleSubmit } = useForm();
  const [txId, setTxId] = React.useState(undefined);
  const isLoading = React.useRef(false);
  const isLoaded = React.useRef(false);

  const wallet = useArjs();

  const onTxSubmitted = (newTxId) => {
    console.log({ newTxId });
    setTxId(newTxId);
  };

  const onSubmit = (data) => {
    console.log({ data });
    const { doctorsNotes } = data;
    ArweaveService.saveAppointmentOutcome(wallet, doctorsNotes, onTxSubmitted);
  };

  const onError = (errors) => {
    console.log({ errors });
  };

  React.useEffect(() => {
    if (!txId || isLoading.current || isLoaded.current) return;
    isLoading.current = true;
    console.log('FETCHING TX STATUS');
    setTimeout(() => {
      ArweaveService.getTransactionStatus(wallet).then((result) => {
        console.log({ result });
        isLoading.current = false;
        isLoaded.current = true;
      });
    }, 3000);
  }, [txId, wallet]);

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
        {txId ? (
          <div className="bg-minsk rounded-xl p-6 space-y-4">
            <p className="text-2xl uppercase font-bold text-saffron-mango mb-6">
              NFT Medical Record
            </p>
            <StringInput title="Record ID" subtext="" disabled value={txId} />
            <button
              type="button"
              className="btn rounded-md text-md font-bold bg-heliotrope border-heliotrope"
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
