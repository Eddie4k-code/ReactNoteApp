import Notes from "../db/models/Notes";
import User from "../db/models/User";
import mongoose from 'mongoose';


//Add a Note


export const addNote = async (req, res, next) => {
    const { title, content, user } = req.body;


    let existingUser;


    try {
         existingUser = await User.findById(user)
    } catch (error) {
        return console.log(error);
    }


    if (existingUser === true) {
        return res.status(400).json({ message: "Unable to find user by this id " });
        
    }


    const note = new Notes({
        title,
        content,
        user,
    })

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await note.save({ session });
        existingUser.notes.push(note);
        await existingUser.save({ session });
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
    return res.status(200).json({ note })



}


export const userFindNotes = async (req, res, next) => {
    const userId = req.params.id;

    let userNotes;

    try {
        userNotes = await User.findById(userId).populate('notes');
    } catch (err) {
        return console.log(err);
    }

    if (!userNotes) {
        return res.status(404).json({ message: "Cannot find user at this time." });
    }


    return res.status(200).json({ notes: userNotes });

}


//Add delete
export const deleteNote = async (req, res, next) => {
    const id = req.params.id;


    try {
        const note = await Notes.findByIdAndRemove(id).populate('user');
        await note.user.notes.pull(note);
    } catch (err) {
        console.log(err);
    }

    

    return res.status(200).json({ message: 'Deleted' });

}
