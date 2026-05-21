const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const User = require("./models/user");
const Note = require("./models/note");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
mongoose.connect("mongodb://127.0.0.1:27017/NoteNest")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });
//Signup Page Route
app.get("/", (req, res) => {
    res.render("signup.ejs",{
        error: null
    });
});

app.post("/signup", async (req, res) => {
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;
    const confirmpassword = req.body.confirmpassword;
    console.log("Email:"+email);
    console.log("Password:"+password);
    console.log("Name:"+name);
    console.log("confirm Password:"+confirmpassword);
    if(password !== confirmpassword){
        return res.render("signup.ejs", {
            error: "Passwords do not match"
        });
    }
    const newUser=new User({
        name: name,
        email: email,
        password: password,
    });
    try {
        await newUser.save();
        console.log("User saved");
        res.render("login.ejs",{
            error: null
        });
    } catch (err) {
        console.log(err);
        res.send("Error saving user");
    }
});
//Login Page Route
app.get("/login", (req, res) => {
    res.render("login.ejs",{
        error: null
    });
});

app.post("/login", async (req, res) => {
    const email=req.body.email;
    const password=req.body.password;
    try{
        const foundUser= await User.findOne({email:email});
        if(!foundUser){
            console.log(foundUser);
            console.log("User not found");
            return res.render("login.ejs",{
                error:"User not found"
            });
        }
        if(foundUser.password !== password){
            return res.render("login.ejs",{
                error:"Password Didnt Match"
            });
        }
        res.redirect("/notenest");
    }catch(err){
        console.log(err);
        res.render("login.ejs",{
            error:"SomeThing Went Wrong"
        });
    }
});
//Accessing HomePage Route
app.get("/notenest", async (req, res) => {
    let notes=await Note.find();
    res.render("notenest.ejs",{
        notes,
        error: null
    });
});
//Creating New Note Route
app.get("/notenest/new",(req, res) => {
    res.render("newnote.ejs");
});

app.post("/notenest/new", async (req, res) => {
    let { title, description } = req.body;
    console.log("Title:"+title);
    console.log("Description:"+description);
    let newNote=new Note({
        title:title,
        description:description,
    });
    try{
        await newNote.save();
        res.redirect("/notenest");
    }catch(err){
        console.log("Data Was Not saved",err);
    }
});
//Deleting Note Route
app.delete("/notenest/:id",async (req, res) => {
    let{id}=req.params;
    await Note.findByIdAndDelete(id);
    res.redirect("/notenest");
});
//Edit Page Route
app.get("/notenest/:id/edit", async (req, res) => {
    let {id}=req.params;
    let note=await Note.findById(id);
    res.render("edit.ejs",{note});
});
//Update Route
app.put("/notenest/:id", async (req, res) => {
     let{id}=req.params;

     let {title, description} = req.body;
     console.log("Title:"+title);
     console.log("Description:"+description);
     let updatednote= await Note.findByIdAndUpdate(
         id,{
             title,
             description,
         },
         {
             runValidators:true,
             new:true
         });
     console.log(updatednote);
    res.redirect("/notenest");
});
//Search Quary
app.get("/notenest/search", async ( req , res )=> {
    let{q}=req.query;
    console.log("Search:"+q);
    let notes= await Note.find({
        title:{$regex:q,$options:"i"},
    });
    res.render("notenest.ejs",{notes});
});

//Listen Route
app.listen(8080, () => {
    console.log("http://localhost:8080/notenest");
});