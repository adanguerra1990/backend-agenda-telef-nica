const express = require('express');
const app = express();

let persons = [
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

app.get('/info', (request, response) => {
    const date = new Date();
    const numberOfEntries = persons.length;
    response.send(`<h1>Hora de la Solicitud: ${date}</h1><h2>Número de entradas en la agenda telefónica: ${numberOfEntries}</h2>`)
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    person ? response.json(person) : response.status(404).end();
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id)
    console.log(persons);
    

    response.status(204).end()

})



const PORT = 3001;
app.listen(PORT);
console.log(`Server Running on port ${PORT}`)
