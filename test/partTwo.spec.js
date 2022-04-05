const categorizeSimilarTransactions = require('./partTwo');

describe('categorizeSimilarTransactions()', () => {
  let transactions;
  let enhancedTransactions;
  let expectedTransactions;

  it('returns empty array if transactions is empty', () => {
    given_no_transactions();
    when_they_are_categorized();
    then_transactions_should_be_empty();
  });

  it('should not categorize when there are no similar target accounts', () => {
    given_some_transactions_with_no_similar_target_accounts();
    when_they_are_categorized();
    then_transactions_should_be_the_same();
  });

  it('should not categorize when there are similar target accounts but amount difference is greater than 1000', () => {
    given_some_transactions_with_similar_target_accounts_but_diff_greater_than_1000();
    when_they_are_categorized();
    then_transactions_should_be_the_same();
  });

  it('should categorize when there are similar target accounts and several transactions with amount difference lesser than 1000', () => {
    given_some_transactions_with_similar_target_accounts_and_several_diff_lesser_than_1000();
    when_they_are_categorized();
    then_transactions_should_be_categorized();
  });

  it('should categorize when there are several similar target accounts', () => {
    given_some_transactions_with_several_similar_target_accounts();
    when_they_are_categorized();
    then_transactions_should_be_categorized2();
  });

  function given_no_transactions() {
    transactions = [];
  }

  function given_some_transactions_with_no_similar_target_accounts() {
    transactions = [
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -620,
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'restaurant',
        amount: -350,
        category: 'eating_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'bar',
        amount: -1690,
        time: '2021-04-12T08:20:00Z',
      },
    ];
  }

  function given_some_transactions_with_similar_target_accounts_but_diff_greater_than_1000() {
    transactions = [
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -1620,
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -350,
        category: 'eating_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -1690,
        time: '2021-04-12T08:20:00Z',
      },
    ];
  }

  function given_some_transactions_with_similar_target_accounts_and_several_diff_lesser_than_1000() {
    transactions = [
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -620,
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -350,
        category: 'eating_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf88',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -550,
        category: 'gift_card',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -1690,
        time: '2021-04-12T08:20:00Z',
      },
    ];
  }

  function given_some_transactions_with_several_similar_target_accounts() {
    transactions = [
      {
        id: 'c4b87308-2240-4cbc-a7df-e727e314d27c',
        sourceAccount: 'my_account',
        targetAccount: 'supermarket',
        amount: -6100,
        currency: 'EUR',
        category: 'groceries',
        time: '2021-02-26T17:33:25.116Z',
      },
      {
        id: 'a9d0c132-c789-4445-834c-f146f2de71d2',
        sourceAccount: 'my_account',
        targetAccount: 'supermarket',
        amount: -3400,
        currency: 'EUR',
        category: 'groceries',
        time: '2021-03-20T21:02:15.593Z',
      },
      {
        id: '5849bbd4-4c43-4756-8144-a03d9613fbe7',
        sourceAccount: 'my_account',
        targetAccount: 'supermarket',
        amount: -8500,
        currency: 'EUR',
        category: 'groceries',
        time: '2021-03-25T17:17:35.917Z',
      },
      {
        id: '2941475f-189f-4a1d-9237-3f8221bc4585',
        sourceAccount: 'my_account',
        targetAccount: 'supermarket',
        amount: -1500,
        currency: 'EUR',
        category: 'groceries',
        time: '2021-03-25T21:02:30.670Z',
      },
      {
        id: '1ef987ea-8622-47e2-b90c-aa3495a0e253',
        sourceAccount: 'my_account',
        targetAccount: 'supermarket',
        amount: -3600,
        currency: 'EUR',
        time: '2021-02-16T11:18:59.331Z',
      },
      {
        id: 'HERE',
        sourceAccount: 'my_account',
        targetAccount: 'supermarket',
        amount: -4500,
        currency: 'EUR',
        time: '2021-04-02T14:21:13.404Z',
      },
      {
        id: '90149102-8fa5-4e26-b693-c2eca0b8077f',
        sourceAccount: 'my_account',
        targetAccount: 'supermarket',
        amount: -1700,
        currency: 'EUR',
        time: '2021-02-01T09:15:26.351Z',
      },
    ];
  }

  function when_they_are_categorized() {
    enhancedTransactions = categorizeSimilarTransactions(transactions);
  }

  function then_transactions_should_be_empty() {
    expectedTransactions = [];
    expect(enhancedTransactions).toEqual(expectedTransactions);
  }

  function then_transactions_should_be_the_same() {
    expectedTransactions = transactions;
    expect(enhancedTransactions).toEqual(expectedTransactions);
  }

  function then_transactions_should_be_categorized() {
    expectedTransactions = [
      {
        id: 'a001bb66-6f4c-48bf-8ae0-f73453aa8dd5',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -620,
        category: 'gift_card',
        time: '2021-04-10T10:30:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf73',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -350,
        category: 'eating_out',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'bfd6a11a-2099-4b69-a7bb-572d8436cf88',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -550,
        category: 'gift_card',
        time: '2021-03-12T12:34:00Z',
      },
      {
        id: 'a8170ced-1c5f-432c-bb7d-867589a9d4b8',
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -1690,
        time: '2021-04-12T08:20:00Z',
      },
    ];
    expect(enhancedTransactions).toEqual(expectedTransactions);
  }

  function then_transactions_should_be_categorized2() {
    expectedTransactions = [
      {
        id: 'c4b87308-2240-4cbc-a7df-e727e314d27c',
        sourceAccount: 'my_account',
        targetAccount: 'supermarket',
        amount: -6100,
        currency: 'EUR',
        category: 'groceries',
        time: '2021-02-26T17:33:25.116Z',
      },
      {
        id: 'a9d0c132-c789-4445-834c-f146f2de71d2',
        sourceAccount: 'my_account',
        targetAccount: 'supermarket',
        amount: -3400,
        currency: 'EUR',
        category: 'groceries',
        time: '2021-03-20T21:02:15.593Z',
      },
      {
        id: '5849bbd4-4c43-4756-8144-a03d9613fbe7',
        sourceAccount: 'my_account',
        targetAccount: 'supermarket',
        amount: -8500,
        currency: 'EUR',
        category: 'groceries',
        time: '2021-03-25T17:17:35.917Z',
      },
      {
        id: '2941475f-189f-4a1d-9237-3f8221bc4585',
        sourceAccount: 'my_account',
        targetAccount: 'supermarket',
        amount: -1500,
        currency: 'EUR',
        category: 'groceries',
        time: '2021-03-25T21:02:30.670Z',
      },
      {
        id: '1ef987ea-8622-47e2-b90c-aa3495a0e253',
        sourceAccount: 'my_account',
        targetAccount: 'supermarket',
        amount: -3600,
        currency: 'EUR',
        category: 'groceries',
        time: '2021-02-16T11:18:59.331Z',
      },
      {
        id: 'HERE',
        sourceAccount: 'my_account',
        targetAccount: 'supermarket',
        amount: -4500,
        currency: 'EUR',
        time: '2021-04-02T14:21:13.404Z',
      },
      {
        id: '90149102-8fa5-4e26-b693-c2eca0b8077f',
        sourceAccount: 'my_account',
        targetAccount: 'supermarket',
        amount: -1700,
        currency: 'EUR',
        category: 'groceries',
        time: '2021-02-01T09:15:26.351Z',
      },
    ];
    expect(enhancedTransactions).toEqual(expectedTransactions);
  }
});
