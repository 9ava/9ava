class BankAccount {
  #balance: number = 0;

  deposit(amount: number) {
    // this.#balance += amount;
    // this.#balance = this.#balance + amount;
  }

  getBalance() {
    console.log(this.#balance);
  }

  setBalance(amount: number) {
    amount = amount * 1.1;
    this.#balance = amount;
  }
}

let account = new BankAccount();

account.setBalance(1000);
account.getBalance();
