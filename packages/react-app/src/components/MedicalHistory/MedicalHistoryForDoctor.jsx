/* eslint-disable no-unused-vars */
import React from 'react';
import { useEthers } from '@usedapp/core';
import { useArjs } from 'arjs-react';

import useRecordsOf from '../../hooks/useRecordsOf';

import { addresses } from '../../contracts/ContractContext';
import ArweaveService from '../../services/ArweaveService';

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

const MedicalHistoryForDoctor = () => {
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
    <ul className="w-full steps steps-vertical">
      {medicalRecords
        ? medicalRecords.map((record, idx) => (
            <li data-content="✓" className="step step-neutral w-full">
              <div className="flex flex-row justify-between items-center w-full text-left">
                {record}
              </div>
            </li>
          ))
        : null}
    </ul>
  );
};

export default MedicalHistoryForDoctor;
