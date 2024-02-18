
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Lire les données existantes depuis le fichier JSON
fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier user.json :', err);
        rl.close();
        return;
    }

    let users = [];
    if (data) {
        users = JSON.parse(data);
    }

    // Créer un nouvel objet pour les données de l'utilisateur
    let userData = {};

    // Générer le prochain accountID
    userData.accountID = generateNextAccountID(users);
    userData.pin= generatePIN();

    rl.question("Entrer votre nom : ", (name) => {
        userData.name = name;
    
            
        //rl.question("Entrer votre code PIN : ", (pin) => {
          //  userData.pin = pin;
        
            rl.question("Entrer votre solde : ", (balance) => {
                userData.balance = balance;

            // Ajouter les données de l'utilisateur à la liste des utilisateurs
            users.push(userData);

            // Convertir les données en JSON
            const updatedDataJSON = JSON.stringify(users, null, 3);

            // Écrire les données mises à jour dans le fichier JSON
            fs.writeFile('users.json', updatedDataJSON, (err) => {
                if (err) {
                    console.error('Erreur lors de l\'écriture dans le fichier users.json :', err);
                } else {
                    console.log('Les données ont été enregistrées avec succès dans users.json');
                }
                rl.close();
            });
        });
    });
});

function generatePIN() {
    const pin = Math.floor(1000 + Math.random() * 9000); // Génère un nombre aléatoire entre 1000 et 9999
    return pin.toString(); // Convertit le nombre en chaîne de caractères
}

// Fonction pour générer le prochain accountID
function generateNextAccountID(users) {
    if (users.length === 0) {
        return 'ACC1001'; // Si aucun compte n'existe, commencer par ACC1001
    } else {
        // Trouver le dernier accountID et l'incrémenter pour générer le prochain
        const lastAccountID = users[users.length - 1].accountID;
        const numericPart = parseInt(lastAccountID.substring(3)); // Extraire la partie numérique
        const nextNumericPart = numericPart + 1;
        return 'ACC' + nextNumericPart;
    }
}
