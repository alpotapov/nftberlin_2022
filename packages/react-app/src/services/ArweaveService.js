const saveAppointmentOutcome = async (wallet, notes, onTxSubmitted) => {
  const transaction = await wallet.transaction({ data: notes });
  console.log({ transaction, wallet });
  await wallet.sign(transaction);
  console.log({ transaction });
  const result = await wallet.post(transaction);
  console.log({ result, transaction });
  onTxSubmitted(transaction.id);
};

const getTransactionStatus = async (wallet, transactionId) => {
  const arweave = await wallet.getArweave();
  const result = await arweave.transactions.getStatus(transactionId);
  return result;
};

const getTransactionData = async (wallet, transactionId) => {
  const arweave = await wallet.getArweave();
  const result = await arweave.transactions.getData(transactionId, {
    decode: true,
    string: true,
  });
  console.log({ result });
  return result;
};

export default {
  saveAppointmentOutcome,
  getTransactionStatus,
  getTransactionData,
};
