const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
const PORT = process.env.port || 5000;

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mern-todolist');
        console.log('Connect to database successfully');
    } catch (error) {
        console.log('Connect to database fail(at index.js)', error.message);
        process.exit(1);
    }
}

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

app.listen(PORT, () => {
    console.log(`Listen at ${PORT} port!`);
});
