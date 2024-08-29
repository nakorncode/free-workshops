export class BankAccount {
  private accountNumber: string;
  private balance: number;
  private transactions: Transaction[];

  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = Math.max(initialBalance, 0); // Fixed: Ensure initial balance is non-negative
    this.transactions = [];
  }

  deposit(amount: number): boolean { // Fixed: Return boolean to indicate success
    if (amount <= 0) { // Fixed: Prevent negative deposit amounts
      console.error("Deposit amount must be positive");
      return false;
    }
    this.balance += amount;
    this.transactions.push(new Transaction('deposit', amount));
    return true;
  }

  withdraw(amount: number): boolean { // Fixed: Return boolean to indicate success
    if (amount <= 0) { // Fixed: Prevent negative withdrawal amounts
      console.error("Withdrawal amount must be positive");
      return false;
    }
    if (this.balance < amount) { // Fixed: Check for sufficient funds
      console.error("Insufficient funds");
      return false;
    }
    this.balance -= amount;
    this.transactions.push(new Transaction('withdrawal', amount));
    return true;
  }

  getBalance(): number {
    return this.balance;
  }

  getTransactionHistory(): Transaction[] {
    return [...this.transactions]; // Fixed: Return a copy to prevent external modification
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

  getType(): 'deposit' | 'withdrawal' { // Fixed: Return exact type
    return this.type;
  }

  getDate(): Date {
    return this.date;
  }
}

export class Bank {
  private accounts: Map<string, BankAccount>; // Fixed: Use Map for unique account numbers

  constructor() {
    this.accounts = new Map();
  }

  createAccount(accountNumber: string, initialBalance: number): BankAccount {
    if (this.accounts.has(accountNumber)) { // Fixed: Prevent duplicate account creation
      throw new Error("Account with this number already exists");
    }
    const newAccount = new BankAccount(accountNumber, initialBalance);
    this.accounts.set(accountNumber, newAccount);
    return newAccount;
  }

  findAccount(accountNumber: string): BankAccount | undefined {
    return this.accounts.get(accountNumber);
  }

  transferMoney(fromAccount: BankAccount, toAccount: BankAccount, amount: number): boolean {
    if (fromAccount.withdraw(amount)) { // Fixed: Ensure withdrawal is successful
      return toAccount.deposit(amount); // Fixed: Ensure deposit is successful
    }
    return false;
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

  account1.withdraw(1500); // Fixed: Should fail due to insufficient funds

  if (!bank.transferMoney(account2, account1, 1000)) { // Fixed: Check if transfer was successful
    console.error("Transfer failed");
  }

  const transactions = account1.getTransactionHistory();
  console.log(transactions); // Show the transaction history

  const nonExistentAccount = bank.findAccount("ACC003");
  if (nonExistentAccount) {
    if (!nonExistentAccount.deposit(100)) { // Fixed: Check if deposit was successful
      console.error("Deposit failed");
    }
  } else {
    console.log("Account not found"); // Fixed: Correct message for non-existent account
  }

  // Avoid direct manipulation of transaction history
  // const lastTransaction = account1.getTransactionHistory()[0];
  // lastTransaction.getDate().setFullYear(2000); // Fixed: Do not manipulate transaction dates directly

  // Fixed: Handle duplicate account creation
  try {
    bank.createAccount("ACC001", 2000);
  } catch (error) {
    console.error(error.message);
  }

  if (!account1.deposit(-500)) { // Fixed: Check if deposit was successful
    console.error("Deposit failed");
  }

  console.log(`Final balance for ACC001: ${account1.getBalance()}`);
}

runBankSimulation();
