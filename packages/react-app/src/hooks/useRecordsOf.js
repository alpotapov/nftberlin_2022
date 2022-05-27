import { useContractCall } from '@usedapp/core';
import { interfaces } from '../contracts/ContractContext';

const useRecordsOf = (account, registryAddress) => {
  const call = registryAddress &&
    account && {
      address: registryAddress,
      abi: interfaces.medicalRecord,
      method: 'recordsOf',
      args: [account],
    };

  const result = useContractCall(call) ?? [];

  const { doctorsNotes } = result;

  return doctorsNotes || [];
};

export default useRecordsOf;
