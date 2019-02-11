const express = require('express')
const bodyParser = require('body-parser') 
var morgan = require('morgan')
const app = express()
const cors = require('cors')


let persons = [
      {
        "name": "Arto Hellas",
        "number": "34333",
        "id": 1
      },
      {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
      },
      {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
      },
      {
        "name": "asddasd",
        "number": "ddd",
        "id": 4
      },
      {
        "name": "asddasd ",
        "number": "dd",
        "id": 5
      }
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}



app.use(bodyParser.json())
app.use(express.static('build'))
app.use(requestLogger)
app.use(morgan('tiny'))
app.use(cors())

morgan.token('body', req => JSON.stringify(req.body))

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const length = persons.length
  const date = new Date()
  res.send(`<p>Puhelinluettelossa ${length} henkilön tiedot</p>` + date)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  if (body.number === undefined) {
    return response.status(400).json({ error: 'number missing' })
  }

  if (persons.filter(person => (person.name === body.name)).length > 0) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 100000),
  }
  persons = persons.concat(person)

  response.json(person)
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})