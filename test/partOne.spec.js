const { getBalanceByCategoryInPeriod } = require('./partOne');

const motherTransactions = [
  {
    id: '11ff73b5-e771-441c-886a-498d93b5093d',
    sourceAccount: 'my_account',
    targetAccount: 'restaurant',
    amount: -9600,
    currency: 'EUR',
    category: 'eating_out',
    time: '2021-04-08T05:15:56.905Z',
  },
  {
    id: '8c3ec38d-1821-4d49-aef1-2385cb3c2b1b',
    sourceAccount: 'my_account',
    targetAccount: 'cinema',
    amount: -5700,
    currency: 'EUR',
    category: 'entertainment',
    time: '2021-04-07T21:16:57.819Z',
  },
  {
    id: 'd1c77d7c-ccda-453c-ac01-444e9d5abca3',
    sourceAccount: 'my_account',
    targetAccount: 'book_store',
    amount: -7400,
    currency: 'EUR',
    category: 'entertainment',
    time: '2021-04-07T22:46:44.071Z',
  },
  {
    id: '837127ab-f523-4b11-bed3-ae488be4545d',
    sourceAccount: 'my_account',
    targetAccount: 'fitness_club',
    amount: -9200,
    currency: 'EUR',
    category: 'sports',
    time: '2021-04-05T01:55:16.646Z',
  },
];

describe('getBalanceByCategoryInPeriod()', () => {
  let transactions;
  let categories;
  let start;
  let end;
  let balance;
  let expectedBalance;

  it('returns the correct balance when categories match and there are transactions in given period', () => {
    given_some_transactions_with_matched_categories_and_dates_in_range();
    when_balance_is_asked();
    then_balance_should_be_correct();
  });

  it('returns balance zero when categories match and there are not transactions in given period', () => {
    given_some_transactions_with_matched_categories_and_dates_out_range();
    when_balance_is_asked();
    then_balance_should_be_zero();
  });

  it('returns balance zero when categories do not match and there are transactions in given period', () => {
    given_some_transactions_with_mismatched_categories_and_dates_in_range();
    when_balance_is_asked();
    then_balance_should_be_zero_with_mismatched_categories();
  });

  it('returns correct balance when some categories match and some do not and there are transactions in given period', () => {
    given_some_transactions_with_some_mismatched_categories_and_dates_in_range();
    when_balance_is_asked();
    then_balance_should_be_correct_with_some_mismatched_categories();
  });

  it('returns balance zero when there are no transactions', () => {
    given_no_transactions();
    when_balance_is_asked();
    then_balance_should_be_empty();
  });

  it('returns empty balance when no categories are given', () => {
    given_some_transactions_with_no_categories();
    when_balance_is_asked();
    then_balance_should_be_empty();
  });

  it('returns empty balance when no dates are given', () => {
    given_some_transactions_with_no_dates();
    when_balance_is_asked();
    then_balance_should_be_empty();
  });

  it('returns balance zero when end date is lesser that start date', () => {
    given_some_transactions_with_dates_set_wrong();
    when_balance_is_asked();
    then_balance_should_be_zero();
  });

  function given_some_transactions_with_matched_categories_and_dates_in_range() {
    transactions = motherTransactions;
    categories = ['sports', 'entertainment'];
    start = new Date('2021-04-01');
    end = new Date('2021-04-30');
  }

  function given_some_transactions_with_matched_categories_and_dates_out_range() {
    transactions = motherTransactions;
    categories = ['sports', 'entertainment'];
    start = new Date('2022-04-01');
    end = new Date('2022-04-30');
  }

  function given_some_transactions_with_mismatched_categories_and_dates_in_range() {
    transactions = motherTransactions;
    categories = ['rent', 'transport'];
    start = new Date('2021-04-01');
    end = new Date('2021-04-30');
  }

  function given_some_transactions_with_some_mismatched_categories_and_dates_in_range() {
    transactions = motherTransactions;
    categories = ['eating_out', 'transport'];
    start = new Date('2021-04-01');
    end = new Date('2021-04-30');
  }

  function given_no_transactions() {
    transactions = [];
    categories = ['sports', 'entertainment'];
    start = new Date('2021-04-01');
    end = new Date('2021-04-30');
  }

  function given_some_transactions_with_no_categories() {
    transactions = motherTransactions;
    categories = [];
    start = new Date('2021-04-01');
    end = new Date('2021-04-30');
  }

  function given_some_transactions_with_no_dates() {
    transactions = motherTransactions;
    categories = ['sports', 'entertainment'];
    start = undefined;
    end = undefined;
  }

  function given_some_transactions_with_dates_set_wrong() {
    transactions = motherTransactions;
    categories = ['sports', 'entertainment'];
    start = new Date('2021-04-01');
    end = new Date('2021-03-30');
  }

  function when_balance_is_asked() {
    balance = getBalanceByCategoryInPeriod(transactions, categories, start, end);
  }

  function then_balance_should_be_correct() {
    expectedBalance = { sports: -9200, entertainment: -13100 };
    expect(balance).toEqual(expectedBalance);
  }

  function then_balance_should_be_zero() {
    expectedBalance = { sports: 0, entertainment: 0 };
    expect(balance).toEqual(expectedBalance);
  }

  function then_balance_should_be_zero_with_mismatched_categories() {
    expectedBalance = { rent: 0, transport: 0 };
    expect(balance).toEqual(expectedBalance);
  }

  function then_balance_should_be_correct_with_some_mismatched_categories() {
    expectedBalance = { eating_out: -9600, transport: 0 };
    expect(balance).toEqual(expectedBalance);
  }

  function then_balance_should_be_empty() {
    expectedBalance = {};
    expect(balance).toEqual(expectedBalance);
  }
});

/*
ALL DATA EXISTS
- category exists and date is in range
- category exists but date is out of range
- all category does not match but date is in range
- some categories does not match but date is in range

EMPTY PARAMETERS
- transactions are empty
- categories are empty
- dates are empty

WRONG PARAMETERS
- end date is lesser than start date
*/
