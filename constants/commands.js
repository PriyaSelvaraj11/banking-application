class Command {
    static CREATE = new Command('Create', 0);
    static DEPOSIT = new Command('Deposit', 1);
    static WITHDRAW = new Command('Withdraw', 2);
    static BALANCE = new Command('Balance', 3);
    static TRANSFER = new Command('Transfer', 4);

    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
    toString() {
        return `${this.name}`;
    }
    getId() {
        return this.id;
    }
}

module.exports = Command;
