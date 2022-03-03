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

const getsubbreditById = db.prepare(`
SELECT * FROM subbredits WHERE id=?;
`)


const getAlllogins = db.prepare(`
SELECT * FROM logins;
`)


const getloginById = db.prepare(`
SELECT * FROM logins WHERE id=?; 
`)

const deleteUserNotification = db.prepare(`
DELETE FROM notifications WHERE userId =?;
`)

const delteUserSubbreddit = db.prepare(`
DELETE FROM userSubreddits WHERE userId =?;
`)

const deleteUserComent = db.prepare(`
DELETE FROM comments WHERE userId =?;
`)

const dleteUserPost = db.prepare(`
DELETE FROM posts WHERE postId =?;
`)

const delteUserLogin = db.prepare(`
DELETE FROM logins WHERE userId =?`)

const delteUser = db.prepare(`
 DELETE FROM users WHERE id=?;
`)

const delteComment = db.prepare(`
 DELETE FROM comments WHERE id=?;
`)


app.get('/users', (req, res) => {
    const info = getAllusers.all()

    if (info) {
        res.send(info)
    } else {
        res.status(404).send({ error: 'Users not found' })
    }
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    const info = getuserByID.get(id)


    if (info) {
        res.send(info)
    } else {
        res.status(404).send({ error: 'Users not found' })
    }
})

app.get('/comments', (req, res) => {
    const info = getAllcomments.all()
    if (info) {
        res.send(info)
    } else {
        res.status(404).send({ error: 'Comments not found' })
    }
})

app.get('/comments/:id', (req, res) => {
    const id = req.params.id
    const info = getcommentById.get(id)

    if (info) {
        res.send(info)
    } else {
        res.status(404).send({ error: 'Users not found' })
    }
})

app.get('/posts', (req, res) => {
    const info = getAllIposts.all()
    if (info) {
        res.send(info)
    } else {
        res.status(404).send({ error: 'Posts not found' })
    }
})

app.get('/posts/:id', (req, res) => {
    const id = req.params.id
    const info = getpostByID.get(id)

    if (info) {
        res.send(info)
    } else {
        res.status(404).send({ error: 'Users not found' })
    }
})

app.get('/subbredits', (req, res) => {
    const info = getAllsubbredits.all()
    if (info) {
        res.send(info)
    } else {
        res.status(404).send({ error: 'Subbredits not found' })
    }
})

app.get('/subbredits/:id', (req, res) => {
    const id = req.params.id
    const info = getsubbreditById.get(id)

    if (info) {
        res.send(info)
    } else {
        res.status(404).send({ error: 'Users not found' })
    }
})

app.get('/logins', (req, res) => {
    const info = getAlllogins.all()
    if (info) {
        res.send(info)
    } else {
        res.status(404).send({ error: 'Logins not found' })
    }
})



app.post('/users', (req, res) => { })
app.post('/comments', (req, res) => { })

app.patch('/users/:id', (req, res) => { })
app.patch('/comments/:id', (req, res) => { })



app.delete('/users/:id', (req, res) => {
    const id = req.params.id

    deleteUserNotification.run(id)
    delteUserSubbreddit.run(id)
    deleteUserComent.run(id)
    dleteUserPost.run(id)
    delteUserLogin.run(id)

    const info = delteUser.run(id)

    if (info.changes !== 0) {
        res.send({ message: 'User deleted succesfully' })
    } else {
        res.status(404).send({ error: 'User not found' })
    }

})

app.delete('/comments/:id', (req, res) => {
    const id = req.params.id
    const comment = delteComment.run(id)


    console.log({ comment: 'comment' })

    if (comment.changes !== 0) {
        res.send({ comment: 'Comment deleted succefully' })
    } else {
        res.status(404).send({ comment: 'Comment not found' })
    }
})


app.listen(4000, () => {
    console.log(`server up : http://localhost:4000`)
})