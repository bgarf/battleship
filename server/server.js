const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const static_path = path.join(__dirname, '..', 'public')

app.use(express.static(static_path))

app.get('/', (req, res) => res.sendFile(path.join(static_path, 'index.html')))

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))