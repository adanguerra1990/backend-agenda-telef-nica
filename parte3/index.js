const express = require('express');
const app = express();

const persons = [
    {
        "id": 1,
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
    },
    {
        "id": 2,
        "name": "Dan Abramov",
        "number": "12-43-234345",
    },
    {
        "id": 3,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
    }
];

app.get('/', (request, response) => {
    response.send('<h1>Hola Mundo</h1>');
})

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

const PORT = 3001;
app.listen(PORT);
console.log(`Server Running on port ${PORT}`)
