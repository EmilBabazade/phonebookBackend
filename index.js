const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send(persons);
})

app.get('/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if(!person) {
    response.status(404).end()
    return
  }
  response.send(person)
})

app.delete('/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if(!person) {
    response.status(404).end()
    return
  }
  persons = persons.filter(p => p.id !== id);
  response.status(204).end()
})

app.post('/', (request, response) => {
  const person = request.body;
  if(!person.name) {
    response.status(400).send('Name is not present!')
    return
  }
  if(!person.number) {
    response.status(400).send('Number is not present!')
    return
  }
  if(persons.find(p => p.name.toLowerCase().trim() === person.name.toLowerCase().trim()) !== undefined) {
    response.status(400).send(`${person.name} is already present!`)
    return  
  }
  const maxId = Math.max(...persons.map(p => p.id));
  person.id = maxId + 1;
  persons.push(person);
  response.status(201).send(person)
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p><br/><p>${Date()}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
