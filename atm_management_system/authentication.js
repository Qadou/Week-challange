const readline = require('readline');
const { checkBalance, deposit, withdraw, viewTransactions } = require('./operations');
const users = require('./users.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function start() {
    try {
        const user = await authenticateUser();
        console.log(`Welcome, ${user.name}!`);

        while (true) {
            console.log("Choose an option:");
            console.log("1. Check Balance");
            console.log("2. Deposit");
            console.log("3. Withdraw");
            console.log("4. View Transactions");
            console.log("5. Exit");

            const choice = await askForChoice();

            switch (choice) {
                case '1':
                    await checkBalance(user.accountID);
                    break;
                case '2':
                    const amount = await askAmount();
                    await deposit(user.accountID, amount);
                    break;
                case '3':
                    const amount1 = await askAmount();
                    await withdraw(user.accountID, amount1);
                    break;
                case '4':
                    await viewTransactions(user.accountID);
                    break;
                case '5':
                    console.log("Exiting...");
                    rl.close(); // Fermez readline ici lorsque l'utilisateur choisit de quitter
                    return;
                default:
                    console.log("Invalid choice. Please choose again.");
            }
        }
    } catch (error) {
        console.error(error);
    }
}


async function askForChoice() {
    return new Promise((resolve, reject) => {
        rl.question("Enter your choice: ", (choice) => {
            resolve(choice);
        });
    });
}

async function authenticateUser() {
    return new Promise((resolve, reject) => {
        rl.question("Enter your account ID: ", (accountID) => {
            rl.question("Enter your PIN: ", (pin) => {
                const user = users.find(u => u.accountID === accountID && u.pin === pin);
                if (user) {
                    resolve(user);
                } else {
                    reject(new Error("Authentication failed. Invalid credentials."));
                }
            });
        });
    });
}

function askAmount() {
    return new Promise((resolve, reject) => {
        rl.question('Enter the amount: $', (amount) => {
            const parsedAmount = parseFloat(amount);
            if (isNaN(parsedAmount) || parsedAmount <= 0) {
                reject(new Error('Invalid amount. Please enter a valid number greater than zero.'));
            } else {
                resolve(parsedAmount);
            }
        });
    });
}

start(); 
