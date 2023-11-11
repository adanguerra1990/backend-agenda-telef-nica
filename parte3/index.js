//  importar el módulo Express y crean una nueva aplicación Express
const express = require('express');
const morgan = require('morgan')
const app = express();

morgan.token('body', (request, response) => JSON.stringify(request.body))

// habilita el middleware express.json(), que permite a la aplicación parsear los cuerpos de las solicitudes entrantes con contenido tipo JSON
app.use(express.json());
app.use(morgan(':method :url :status :response-time ms - :body'))

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

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.floor(Math.random(...persons.map(p => p.id)) * 100000000) : 0

    return maxId
};

app.post('/api/persons', (request, response) => {
    const body = request.body;
    console.log('Body... ', body)

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number is missing'
        });
    };

    const nameExists = persons.some(person => person.name === body.name);
    if (nameExists) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        "id": generateId(),
        "name": body.name,
        "number": body.number,
        "date": new Date().toString()
    }

    persons = persons.concat(person)

    console.log({persons})

    response.json(person)
    console.log({person})
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id)
    console.log(persons);


    response.status(204).end()
})


const PORT = 3001;
app.listen(PORT);
console.log(`Server Running on port ${PORT}`)
