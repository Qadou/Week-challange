const data = require('../data.json')
const fs = require('fs');


const home = (res,req)=> {
    req.send('<h1>welcome to security challange</h1>');
}
const setsession = (req, res) => {
    req.session.user = 'username';
    res.cookie('user', 'username', { maxAge: 6000 });
    res.send('Session set');
  }
function getAllUsers() {
    try {
      const usersData = fs.readFileSync("./data.json", "utf-8");
      return JSON.parse(usersData);
    } catch (error) {
      console.error("Error reading users data:", error);
      return [];
    }
  }
  function getAllusersController(req, res) {
    try {
      const users = getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }
  
const addUser = (req, res)=>{
    let id = data.length + 1;

    try {
      const { username, password } = req.body;
      const newuser = { id, username, password };
  
      let userData = fs.readFileSync('./data.json', "utf-8");
      let users = JSON.parse(userData);
  
      users.push(newuser);
      fs.writeFileSync('./data.json', JSON.stringify(users, null, 2));
  
      res.status(201).json(newuser);
    } catch (error) {
      console.error("Error creating new post:", error);
      res.status(500).json({ error: "Could not create post" });
    }
}
const searchById = (req, res) => {
    const id = parseInt(req.params.id);
    foundPost = data.find((data) => data.id == id);
    if (foundPost) {
      res.send(foundPost);
    } else {
      res.send("user does not exist");
    }
  };


module.exports = {home,addUser,searchById, getAllusersController,setsession}