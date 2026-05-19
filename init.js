const mongoose = require("mongoose");

main()
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/NoteNest");
}
const Note=require("./models/note");
let AllNotes = [
    {
        title: "Learn MongoDB",
        description: "Complete schema, models, and CRUD operations."
    },
    {
        title: "DSA Practice",
        description: "Solve 3 array questions and 2 linked list problems."
    },
    {
        title: "NoteNest Features",
        description: "Add authentication, edit notes, and delete notes."
    },
    {
        title: "Portfolio Ideas",
        description: "Create a modern portfolio using React and Tailwind."
    },
    {
        title: "Interview Preparation",
        description: "Revise Java OOP concepts and DBMS basics."
    }
];
Note.insertMany(AllNotes);