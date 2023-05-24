const fs = require('fs');
const chalk = require('chalk')

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    note
        ? console.log(chalk.inverse(note.title), note.body)
        : console.log(chalk.red.inverse("No note found"))
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('new note added!')
    } else {
        console.log('Note title taken')
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const remainingNotes = notes.filter((note) => title !== note.title)

    saveNotes(remainingNotes)
    notes.length === remainingNotes.length 
        ? console.log(chalk.red.inverse('No note by that title'))
        : console.log(chalk.green.inverse('note deleted'))
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}


module.exports = {
    addNote,
    removeNote,
    readNote
}