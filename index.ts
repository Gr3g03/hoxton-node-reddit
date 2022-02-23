import Database from "better-sqlite3";
import cors from 'cors';
import express from 'express';


const app = express()
app.use(cors())
app.use(express.json())


const db = new Database('./data.db', {
    verbose: console.log
})

const getAllusers = db.prepare(`
SELECT * FROM users;
`)
const getuserByID = db.prepare(`
SELECT * FROM users WHERE id=?;
`)

const getAllcomments = db.prepare(`
SELECT * FROM comments;
`)
const getcommentById = db.prepare(`
SELECT * FROM comments WHERE id=?;
`)


const getAllIposts = db.prepare(`
SELECT * FROM posts;
`)

const getpostByID = db.prepare(`
SELECT * FROM posts WHERE id=?;
`)


const getAllsubbredits = db.prepare(`
SELECT * FROM subbredits;
`)

const getsubbteditById = db.prepare(`
SELECT * FROM subbredits WHERE id=?;
`)


const getAlllogins = db.prepare(`
SELECT * FROM logins;
`)


const getloginById = db.prepare(`
SELECT * FROM logins WHERE id=?; 
`)


app.get('/users', (req, res) => {
    const info = getAllusers.all()
    res.send(info)
})
app.get('/comments', (req, res) => {
    const info = getAllcomments.all()
    res.send(info)
})
app.get('/posts', (req, res) => {
    const info = getAllIposts.all()
    res.send(info)
})
app.get('/subbredits', (req, res) => {
    const info = getAllsubbredits.all()
    res.send(info)
})
app.get('/logins', (req, res) => {
    const info = getAlllogins.all()
    res.send(info)
})


app.post('./users', (req, res) => { })
app.post('./comments', (req, res) => { })

app.patch('./users/:id', (req, res) => { })
app.patch('./comments/:id', (req, res) => { })

app.delete('./users/:id', (req, res) => { })
app.delete('./comments/:id', (req, res) => { })


app.listen(4000, () => {
    console.log(`server up : http://localhost:4000`)
})