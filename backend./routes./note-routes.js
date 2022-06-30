import express from 'express';
import { addNote, deleteNote, userFindNotes } from '../controllers/note-controllers';




const router = express.Router();
const noteRouter = express.Router();




noteRouter.post("/add", addNote);
noteRouter.get("/user/:id", userFindNotes)
noteRouter.delete("/:id", deleteNote)



export default noteRouter
