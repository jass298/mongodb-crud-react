var express = require('express');
var mongoose = require('mongoose');
var app = express();
var Employee = require('./employe');
const bodyParser = require('body-parser');
var database = require('./model/database');
const cors = require('cors');

app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cors());

mongoose.connect(database.url);
console.log(database.url + ' database(CrudFirst) connected....');

//get data from database

app.get('/', async (req, res) => {
    var s = await Employee.find();
    res.json(s)
})

//post request via mongoose

app.post('/create', (req, res) => {
    Employee.create({
        id: req.body.id,
        name: req.body.name,
        salary: req.body.salary,
        age: req.body.age
    });
    res.json('employe model created')
})



//find by id

app.get('/find', async (req, res) => {
    try {
        let id = req.body.id;
        console.log(id);
        let findId = { id: id };
        let employeId = await Employee.find(findId);
        res.json(employeId)
    }
    catch (err) {
        console.log(err)
    }
});

//delete by id

// app.get('/delete/:id', async (req, res) => { //check on postman /server through id//req.params.id is for testing on server
app.post('/delete', async (req, res) => {
    let id = req.body.id;
    console.log(id);

    let findId = await Employee.deleteOne({ 'id': id });
    if (findId)
        res.json({ 'deleted id': id })
})


//update
app.post('/update', async (req, res) => {
    const { id, name, salary, age } = req.body;
    await Employee.updateOne(
        // { id: id },
        {
            $set: {
                id: req.body.id,
                name: name,
                salary: salary,
                age: age
            }
        }
    )
    res.json('employe model updated')
})



//server is listenning on this port
app.listen(8000, () => {
    console.log("App listening on port:8000")
})



