const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(express.json())

app.listen(5001, console.log('1er servidor levantado'))

const indexUrl = path.join(__dirname, 'index.html')

app.get('/', (req, res)=>{
    res.sendFile(indexUrl)
})

const themeTable = JSON.parse(fs.readFileSync('repertorio.json'))
const escribir = () => {
    fs.writeFileSync('repertorio.json', JSON.stringify(themeTable))
}

app.get('/canciones', (req, res) =>{
    res.json(themeTable)
})

app.post('/canciones', (req, res) =>{
    const newTheme = req.body
    themeTable.push(newTheme)
    escribir()
    res.send('Nueva canción agregada a la tabla de canciones')

})

app.put('/canciones/:id', (req, res) =>{
    const { id } = req.params
    const themeModify = req.body
    const index = themeTable.findIndex(t => t.id==id)
    themeTable[index] = themeModify
    escribir()
    res.send('Cancion modificada con exito')

})

app.delete('/canciones/:id', (req, res) =>{
    const { id } = req.params
    const index = themeTable.findIndex(t => t.id==id)
    themeTable.splice(index, 1)
    escribir()
    res.send('Canción eliminada con exito de la tabla')
})