const express = require('express')
const app = express()
const cors = require('cors')

const logger = require('./loggerMiddleware')

app.use(express.json())
app.use(cors())
app.use(logger)

let notes = [
  {
    id: 1,
    content: 'Me tengo que suscribir a @midudev en YouTube',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Tengo que estudiar las clases del FullStack Bootcamp',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'Repasar los retos de JS de midudev',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>My Notes</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)

  const note = notes.find(note => note.id === id)

  if (!note) return res.status(404).end()

  if (note) return res.json(note)
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(404).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof important !== 'undefined' ? note.important : false
  }

  notes = [...notes, newNote]

  res.status(201).send(newNote)
})

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found'
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
