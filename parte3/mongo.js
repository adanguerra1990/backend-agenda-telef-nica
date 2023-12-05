const mongoose = require('mongoose')
const { model ,Schema } = mongoose

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://ajguerra160790:${password}@cluster0.abloyy3.mongodb.net/agenda-telefónica?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new Schema({
    name: String,
    number: String    
})

const Person = model('Person', personSchema)

Person.find({}).then(result => {
    console.log('phonobook:')
    result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
})

// const person = new Person({
//     name: name,
//     number: number 
// })

// person.save().then(result => {
//     console.log(`added ${name} number ${number} to phonebook`)
//     mongoose.connection.close()
// })