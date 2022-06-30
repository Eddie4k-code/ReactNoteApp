import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv';


import router from './routes/auth-routes.js';
import noteRouter from './routes/note-routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config()



app.use("/api/auth", router);
app.use("/api/notes", noteRouter);








// DB Connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB Connected!');
    })
    .catch((err) => {
        console.log(err);
    });


const PORT = process.env.PORT || 5000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
