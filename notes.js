const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notesData = loadNotes();
    const notePosition = findNote(title);

    if (notePosition > -1) {
        console.log(chalk.red("Note already present."));
        return;
    }
    const newNote = {
        title: title,
        body: body
    };
    notesData.push(newNote);
    updateNotes(notesData);
    console.log(chalk.green("Note added"));
}

const removeNote = (title) => {
    const notesData = loadNotes();
    const notePosition = findNote(title);

    if (notePosition === -1) {
        console.log(chalk.red("Note not found"));
    } else {
        notesData.splice(notePosition, 1);
        updateNotes(notesData);
        console.log(chalk.green("Note Removed"));
    }
}

const listNotes = () => {
    const notesData = loadNotes();
    if (notesData.length === 0) {
        console.log(chalk.red("No notes found."));
    }
    else {
        for (note of notesData) {
            console.log(chalk.cyan(note.title));
        }
    }
}

const readNote = (title) => {
    const notesData = loadNotes();
    const notePosition = findNote(title);
    if (notePosition === -1) {
        console.log(chalk.red("Note not found"));
    }
    else {
        console.log(chalk.yellow(notesData[notePosition].body));
    }
}

const loadNotes = () => {
    try {
        const notesData = JSON.parse(fs.readFileSync('./notes.json').toString());
        return notesData;
    } catch (e) {
        return [];
    }
}
const updateNotes = (newNotesData) => {
    fs.writeFileSync('./notes.json', JSON.stringify(newNotesData));
}

const findNote = (title) => {
    const notesData = loadNotes();
    return notesData.findIndex((note) => note.title === title);
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}