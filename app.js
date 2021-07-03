const yargs = require('yargs');
const notes= require('./notes');

yargs.command({
    command:"add",
    describe:"add  note",
    builder:{
        title:{
            describe:"title of note",
            type:"string",
            demandOption:true
        },
        body:{
            describe:"description of note",
            type:"string",
            demandOption:true
        }
    },
    handler:(argv)=>{
        notes.addNote(argv.title,argv.body);
    }
})

yargs.command({
    command:"remove",
    describe:"remove a note",
    builder:{
        title:{
            describe:"title of note",
            type:"string",
            demandOption:true
        }
    },
    handler:(argv)=>{
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command:"list",
    describe:"list all notes",
    handler:()=>{
        notes.listNotes();
    }
})

yargs.command({
    command:"read",
    describe:"read a note",
    builder:{
        title:{
            describe:"title of note",
            type:"string",
            demandOption:true
        }
    },
    handler:(argv)=>{
        notes.readNote(argv.title);
    }
})
yargs.parse();