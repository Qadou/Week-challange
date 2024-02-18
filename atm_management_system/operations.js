
const fs = require('fs').promises;
const usersData = require('./users.json');
const rl = require('readline');



async function checkBalance(accountID) {
    try {
        const user = usersData.find(user => user.accountID === accountID);
        if (!user) {
            throw new Error('User not found');
        }
        console.log(`Your current balance is: ${user.balance}`);
    } catch (error) {
        console.error(error.message);
    }
}


async function deposit(accountID, amount) {
    try {
        const userIndex = usersData.findIndex(user => user.accountID === accountID);
        if (userIndex === -1) {
            throw new Error('User not found');
        }
        usersData[userIndex].balance += amount;
        usersData[userIndex].transactions.push({ type: 'deposit', amount: amount, date: new Date().toISOString() });
        await saveUsersData();
        console.log(`Dépôt de ${amount} réussi.`);
    } catch (error) {
        console.error(error.message);
    } 
}

async function withdraw(accountID, amount) {
    try {
        const userIndex = usersData.findIndex(user => user.accountID === accountID);
        if (userIndex === -1) {
            throw new Error('User not found');
        }
        if (usersData[userIndex].balance < amount) {
            throw new Error('Insufficient funds');
        }
        usersData[userIndex].balance -= amount;
        usersData[userIndex].transactions.push({ type: 'withdraw', amount, date: new Date().toISOString() });
        await saveUsersData();
        console.log(`Withdrawal of ${amount} successful.`);
    } catch (error) {
        console.error(error.message);
    }
}

async function viewTransactions(accountID) {
    try {
        const user = usersData.find(user => user.accountID === accountID);
        if (!user) {
            throw new Error('User not found');
        }
        console.log('Transaction History:');
        user.transactions.forEach(transaction => {
            console.log(`${transaction.date} - ${transaction.type}: $${transaction.amount}`);
        });
    } catch (error) {
        console.error(error.message);
    }
}

async function saveUsersData() {
    try {
        await fs.writeFile('./users.json', JSON.stringify(usersData, null, 2));
    } catch (error) {
        console.error('Error saving user data:', error.message);
    }
}

module.exports = { checkBalance, deposit, withdraw, viewTransactions };
