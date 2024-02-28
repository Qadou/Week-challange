const jwt = require('jsonwebtoken');
const data = require('../data.json')
const login = (req, res) => {
    const username = req.body.username
    const password = req.body.password
   
    // const user = data.find((u) => u.username === username && u.password === password)
    const user = data.find((data) => data.username == username && data.password === password )
    if (!user) {
    return res.send("user not found")}

    const token = jwt.sign({ user: username }, 'arkx', { expiresIn: '2h' });
    console.log(token)
    res.send(`welcome ${username}`)
   
    
  };
  
  const ensureToken = (req, res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, "arkx", (err, data)=>{
        if (err) return res.sendStatus(403) 
        req.user = data
        next()
    })
  }
 const protected = (req, res) => {
    jwt.verify(req.token, 'secret_key', (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({ data });
      }
    });
  };
module.exports ={login,ensureToken,protected}