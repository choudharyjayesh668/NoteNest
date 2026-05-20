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
    },
    {
        title: "Learn Express Routing",
        description: "Practice GET, POST, PATCH and DELETE routes in Express."
    },
    {
        title: "MongoDB Revision",
        description: "Revise Mongoose schemas, models and CRUD operations."
    },
    {
        title: "DSA Practice",
        description: "Solve 3 array problems and 2 linked list questions today."
    },
    {
        title: "Build NoteNest UI",
        description: "Improve homepage design and add hover effects to cards."
    },
    {
        title: "GitHub Upload",
        description: "Push latest NoteNest changes and update README."
    },
    {
        title: "Authentication Idea",
        description: "Research login and signup using passport.js."
    },
    {
        title: "Edit Route Testing",
        description: "Check if note editing updates correctly in MongoDB."
    },
    {
        title: "Delete Feature",
        description: "Add confirmation popup before deleting notes."
    },
    {
        title: "Daily Goals",
        description: "Complete Node.js learning session for 2 hours."
    },
    {
        title: "Portfolio Project",
        description: "Think about adding dark mode to NoteNest."
    }
];
Note.insertMany(AllNotes);