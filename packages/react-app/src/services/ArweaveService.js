const saveAppointmentOutcome = async (wallet, notes, onTxSubmitted) => {
  const transaction = await wallet.transaction({ data: notes });
  await wallet.sign(transaction);
  const result = await wallet.post(transaction);
  console.log({ result, transaction });
  onTxSubmitted(transaction.id);
};

const getTransactionStatus = async (wallet, transactionId) => {
  const arweave = await wallet.getArweave();
  const result = await arweave.transactions.getStatus(transactionId);
  return result;
};

export default {
  saveAppointmentOutcome,
  getTransactionStatus,
};
