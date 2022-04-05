const getBalanceByCategoryInPeriod = (transactions, categories, start, end) => {
  if (!transactions.length || !categories || !start || !end) {
    return {};
  }

  let initialValue = {};
  categories.forEach((category) => {
    initialValue[category] = 0;
  });

  return transactions.reduce((accum, curr) => {
    if (categories.includes(curr.category) && isDateInRange(curr.time, start, end)) {
      return {
        ...accum,
        [curr.category]: accum[curr.category] + curr.amount,
      };
    }
    return accum;
  }, initialValue);
};

const isDateInRange = (date, start, end) => {
  const targetDate = new Date(date);
  return targetDate.getTime() >= start.getTime() && targetDate.getTime() < end.getTime();
};

module.exports = { getBalanceByCategoryInPeriod };
