import React from 'react';
import { useEthers } from '@usedapp/core';
import { useArjs } from 'arjs-react';

import useRecordsOf from '../../hooks/useRecordsOf';

import PageBase from '../PageBase/PageBase';
import { addresses } from '../../contracts/ContractContext';
import ArweaveService from '../../services/ArweaveService';

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
      <div className="container mx-auto">Hoell</div>
    </PageBase>
  );
};

export default PatientDashboard;
