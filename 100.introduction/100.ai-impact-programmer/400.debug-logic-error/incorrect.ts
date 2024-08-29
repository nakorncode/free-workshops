export class BankAccount {
  private accountNumber: string;
  private balance: number;
  private transactions: Transaction[];

  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.transactions = [];
  }

  deposit(amount: number): void {
    // Logical error: Doesn't check for negative deposits
    this.balance += amount;
    this.transactions.push(new Transaction('deposit', amount));
  }

  withdraw(amount: number): boolean {
    // Logical error: Allows overdraft without any limit
    this.balance -= amount;
    this.transactions.push(new Transaction('withdrawal', amount));
    return true;
  }

  getBalance(): number {
    return this.balance;
  }

  getTransactionHistory(): Transaction[] {
    // Logical error: Returns the actual array instead of a copy
    return this.transactions;
  }

  getAccountNumber(): string {
    return this.accountNumber;
  }
}

export class Transaction {
  private type: 'deposit' | 'withdrawal';
  private amount: number;
  private date: Date;

  constructor(type: 'deposit' | 'withdrawal', amount: number) {
    this.type = type;
    this.amount = amount;
    this.date = new Date();
  }

  getAmount(): number {
    return this.amount;
  }

  getType(): string {
    return this.type;
  }

  getDate(): Date {
    // Logical error: Returns the actual Date object instead of a copy
    return this.date;
  }
}

export class Bank {
  private accounts: BankAccount[];

  constructor() {
    this.accounts = [];
  }

  createAccount(accountNumber: string, initialBalance: number): BankAccount {
    // Logical error: Doesn't check if account number already exists
    const newAccount = new BankAccount(accountNumber, initialBalance);
    this.accounts.push(newAccount);
    return newAccount;
  }

  findAccount(accountNumber: string): BankAccount | undefined {
    // Logical error: Returns the first account that matches instead of ensuring uniqueness
    return this.accounts.find(account => account.getAccountNumber() === accountNumber);
  }

  transferMoney(fromAccount: BankAccount, toAccount: BankAccount, amount: number): boolean {
    // Logical error: Doesn't check if fromAccount has sufficient funds
    fromAccount.withdraw(amount);
    toAccount.deposit(amount);
    return true;
  }
}

export class Customer {
  private name: string;
  private accounts: BankAccount[];

  constructor(name: string) {
    this.name = name;
    this.accounts = [];
  }

  addAccount(account: BankAccount): void {
    this.accounts.push(account);
  }

  getTotalBalance(): number {
    // Logical error: Incorrectly handles empty account array
    if (this.accounts.length === 0) {
      return 1000; // Incorrectly assumes a default balance for customers with no accounts
    }
    return this.accounts.reduce((total, account) => total + account.getBalance(), 0);
  }
}

function runBankSimulation() {
  const bank = new Bank();
  const customer1 = new Customer("Alice");
  const customer2 = new Customer("Bob");

  const account1 = bank.createAccount("ACC001", 1000);
  const account2 = bank.createAccount("ACC002", 500);

  customer1.addAccount(account1);
  customer2.addAccount(account2);

  // Logical error: Doesn't check the return value of withdraw
  account1.withdraw(1500);  // This should fail but doesn't

  bank.transferMoney(account2, account1, 1000);  // This should fail but doesn't

  // Logical error: Modifying the returned array
  const transactions = account1.getTransactionHistory();
  transactions.push(new Transaction('deposit', 1000000));  // This shouldn't be possible

  console.log(`Alice's balance: ${customer1.getTotalBalance()}`);
  console.log(`Bob's balance: ${customer2.getTotalBalance()}`);

  const nonExistentAccount = bank.findAccount("ACC003");
  if (nonExistentAccount) {
    nonExistentAccount.deposit(100);
  } else {
    // Logical error: Silently ignoring the fact that the account doesn't exist
    console.log("Deposit successful"); // This log is incorrect
  }

  // Logical error: Modifying the returned Date object
  const lastTransaction = account1.getTransactionHistory()[0];
  lastTransaction.getDate().setFullYear(2000);  // This shouldn't affect the original date

  // Logical error: Creating multiple accounts with the same account number
  bank.createAccount("ACC001", 2000);  // This should fail but doesn't

  // Logical error: Negative deposit
  account1.deposit(-500);  // This should fail but doesn't

  console.log(`Final balance for ACC001: ${account1.getBalance()}`);
}

runBankSimulation();
