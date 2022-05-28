/* eslint-disable no-unused-vars */
import React from 'react';
import { useEthers } from '@usedapp/core';
import { useArjs } from 'arjs-react';
import { Link } from 'react-router-dom';

import useRecordsOf from '../../hooks/useRecordsOf';

import PageBase from '../PageBase/PageBase';
import { addresses } from '../../contracts/ContractContext';
import ArweaveService from '../../services/ArweaveService';

const fakeDates = [
  '04.04.2020',
  '05.06.2020',
  '12.12.2020',
  '28.08.2021',
  '01.02.2022',
];
const fakeDoctors = [
  'Dr. Apple',
  'Dr. Orange',
  'Dr. Pineapple',
  'Dr. Kiwi',
  'Dr.Watermelon',
];
const fakeDoctorSpecializations = [
  'Psychologist',
  'Dermatologist',
  'Ophtalmologist',
  'Cardiologist',
  'Gastroenterologist',
];

const PatientDashboard = () => {
  const { account } = useEthers();
  const wallet = useArjs();

  const isLoading = React.useRef(false);
  const [medicalRecords, setMedicalRecords] = React.useState([]);

  const medicalRecordsAddresses = useRecordsOf(
    account,
    addresses.medicalRecord
  );

  React.useEffect(() => {
    if (
      wallet.status !== 'connected' ||
      !medicalRecordsAddresses ||
      isLoading.current
    )
      return;
    isLoading.current = true;
    Promise.allSettled(
      medicalRecordsAddresses.map((record) =>
        ArweaveService.getTransactionData(wallet, record)
      )
    ).then((records) => {
      console.log({ records });
      setMedicalRecords(
        records
          .filter((record) => record.status === 'fulfilled')
          .map((record) => record.value)
      );
    });
  }, [medicalRecordsAddresses, wallet]);

  React.useEffect(() => {
    console.log({ medicalRecords });
  }, [medicalRecords]);

  return (
    <PageBase>
      <div className="container mx-auto">
        <div className="text-chetwode-blue text-4xl">Medical History</div>
        <div className="py-6">
          <ul className="w-full steps steps-vertical">
            {medicalRecords
              ? medicalRecords.reverse().map((record, idx) => (
                  <li data-content="✓" className="step step-neutral w-full">
                    <div className="flex flex-row justify-between items-center w-full">
                      {fakeDoctors[idx]} {fakeDoctorSpecializations[idx]}
                      <label
                        htmlFor={`details-${idx}`}
                        className="btn rounded-md text-md font-bold bg-chetwode-blue border-chetwode-blue"
                      >
                        Show Details
                      </label>
                    </div>
                    <input
                      type="checkbox"
                      id={`details-${idx}`}
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">
                          Appointment with {fakeDoctors[idx]}{' '}
                          {fakeDoctorSpecializations[idx]}
                        </h3>
                        <p className="py-4">{record}</p>
                        <div className="modal-action">
                          <label htmlFor={`details-${idx}`} className="btn">
                            Yay!
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              : null}
          </ul>
        </div>
        <div className="text-chetwode-blue text-4xl">Upcoming Appointments</div>
        <div className="py-6 flex flex-row justify-between items-center">
          You have an appointment on 28.05.2022 with Dr. Watermelon,
          Psychiatrist
          <Link
            className="btn rounded-md text-md font-bold bg-chetwode-blue border-chetwode-blue"
            to="/appointment"
          >
            To Video Call
          </Link>
        </div>
      </div>
    </PageBase>
  );
};

export default PatientDashboard;
