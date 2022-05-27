import React from 'react';
import { useForm } from 'react-hook-form';

import PageBase from '../PageBase/PageBase';
import TextAreaInput from '../../components/Inputs/TextArea';
import SubmitButton from './components/SubmitButton';

const AppointmentPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log({ data });
  };

  const onError = (errors) => {
    console.log({ errors });
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
            Appointment Outcome
          </p>
          <TextAreaInput
            title="Doctor's notes"
            subtext="Write down diagnosis, prescription etc"
            placeholder="Patient complains about a headache"
            isTextArea
            register={register('appointmentOutcome', { required: true })}
          />
          <div>
            <SubmitButton>Finish Appointment</SubmitButton>
          </div>
        </form>
      </div>
    </PageBase>
  );
};

export default AppointmentPage;
