// backend.js
import express from "express";
import cors from "cors";
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});    
function generateRandomID() {
    return Math.random().toString();
  }
const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }
 const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});
const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
    
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

const addUser = (user) => {
    
    if (!user['id']){

        user['id'] = generateRandomID();

    }

    users['users_list'].push(user);
    return user;
}
const deleteUser = (user) => {
    
    const index = users['users_list'].findIndex((u) => u.id === user.id);

    if (index !== -1) {
        users['users_list'].splice(index, 1);
    }

    return user;
    
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    const addedUser = addUser(userToAdd);
    res.status(201).send(addedUser);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];//or req.params.id
    let result = findUserById(id);

    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        deleteUser(result)
        res.send(204);
    }   

});