const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes')

//Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: "Note title", 
            demandOption: true, 
            type: 'string'
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body);
    },
})

// Remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title)
    }
})

// Read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: () => {
        console.log('Read a note')
    }
})

// List command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: () => {
        console.log('List all notes')
    }
})


yargs.parse();
