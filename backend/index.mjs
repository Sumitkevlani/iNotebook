import connectToDatabase from "./db.mjs";
import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.mjs';
import notesRouter from './routes/notes.mjs';

const app = express();
const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/notes',notesRouter);



const PORT = 5000;
connectToDatabase();

app.get('/',(req,res)=>{
    res.send("Hello World");
});


app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
});