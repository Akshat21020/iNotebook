const express = require("express");
const router = express.Router();
const fetchUser = require("../Middleware/fetchUser");
const Note = require("../Models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1 - Get all the notes using GET - /api/notes/fetchnotes
router.get("/fetchnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

//ROUTE 2 - Add a note using POST - /api/notes/addnote
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//ROUTE 3 - Update an exisiting note using PUT - /api/notes/updatenote 
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
   const {title ,description,tag} = req.body
   //Create a new note to update the previous note
   const newNote = {};
   if(title){newNote.title = title};
   if(description){newNote.description = description};
   if(tag){newNote.tag = tag};

   //Find the note to be updated and update it
   let note = await Note.findById(req.params.id);
   if(!note){
    return res.status(404).send("Not Found");
   }

   //Check if the user is the owner of the note
   if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
   }

   //Updating the note
   note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new : true});
   res.json({note});

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

//ROUTE 4 - Delete a note using DELETE - /api/notes/deletenote
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
   //Find the note to be deleted
   let note = await Note.findById(req.params.id);
   if(!note){
    return res.status(404).send("Not Found");
   }

   //Check if the user is the owner of the note
   if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
   }

   //Delete the note
   note = await Note.findByIdAndDelete(req.params.id);
   res.json({"Success" : "Note has been deleted", note : note});

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
