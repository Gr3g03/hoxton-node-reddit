import Database from "better-sqlite3";
import cors from 'cors';
import express from 'express';


const app = express()
app.use(cors())
app.use(express.json())


const db = new Database('./data.db', {
    verbose: console.log
})




app.listen(4000, () => {
    console.log(`server up : http://localhost:4000`)
})