const categorizeSimilarTransactions = (transactions) => {
  if (!transactions.length) {
    return [];
  }

  const categorizedTransactions = transactions.filter((transaction) => transaction.category);

  return transactions.reduce((accum, curr) => {
    if (!curr.category) {
      const similarTransactions = getSimilarTransactions(categorizedTransactions, curr);

      if (similarTransactions.length) {
        curr.category = getCategory(similarTransactions, curr);
        return [...accum, curr];
      } else {
        return [...accum, curr];
      }
    } else {
      return [...accum, curr];
    }
  }, []);
};

const MIN_DIFF = 1000;

const getSimilarTransactions = (transactions, currentTransaction) => {
  return transactions.filter(
    (transaction) =>
      transaction.category &&
      transaction.targetAccount === currentTransaction.targetAccount &&
      Math.abs(currentTransaction.amount - transaction.amount) <= MIN_DIFF
  );
};

const getCategory = (similarTransactions, currentTransaction) => {
  let category;
  let minDiff = MIN_DIFF;

  for (let i = 0; i < similarTransactions.length; i++) {
    const transaction = similarTransactions[i];
    const currentDiff = Math.abs(currentTransaction.amount - transaction.amount);
    if (currentDiff <= minDiff) {
      minDiff = currentDiff;
      category = transaction.category;
    }
  }

  return category;
};

module.exports = categorizeSimilarTransactions;
