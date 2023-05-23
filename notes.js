const fs = require('fs');
const chalk = require('chalk')

const getNotes = function () {
    return "Your notes..."
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => {
        return note.title === title
    })

    if (duplicateNotes.length === 0 ) {
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

const removeNote = function (title){
    const notes = loadNotes()
    const remainingNotes = notes.filter((note) => {
        return title !== note.title
    })
    saveNotes(remainingNotes)
    notes.length === remainingNotes.length 
        ? console.log(chalk.red('No note by that title'))
        : console.log(chalk.green('note deleted'))
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}


module.exports = {
    getNotes,
    addNote,
    removeNote
}