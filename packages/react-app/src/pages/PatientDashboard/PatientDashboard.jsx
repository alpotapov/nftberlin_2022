import React from 'react';
import { useEthers } from '@usedapp/core';

import useRecordsOf from '../../hooks/useRecordsOf';

import PageBase from '../PageBase/PageBase';
import { addresses } from '../../contracts/ContractContext';

const PatientDashboard = () => {
  const { account } = useEthers();

  const medicalRecords = useRecordsOf(account, addresses.medicalRecord);

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
