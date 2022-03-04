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

const joinUserandsubbredits = db.prepare(`
SELECT userSubreddits.*, subbreditId, userId, subreddit_name FROM userSubreddits
JOIN users ON userSubreddits.userId = users.id
WHERE users.id = 1;
`)

const createUsers = db.prepare(`
INSERT INTO users(user_name, user_lastname, user_email, user_age ,user_password)
VALUES (?,?,?,?,?);
`)

const createPosts = db.prepare(`
INSERT INTO posts(post_title, post_img, post_content, post_upvotes, post_downvotes, postId)
VALUES(?,?,?,?,?,?);
`)

const createComents = db.prepare(`
INSERT INTO comments(  content, upvotes, downvotes, userId, postId)
VALUES(?,?,?,?,?);
`)

const updateComents = db.prepare(`
UPDATE comments SET content=?, upvotes=?, downvotes=?, userId=?, postId=?;
`)

const updateUser = db.prepare(`
UPDATE users  SET user_name =?, user_lastname=?, user_email=?, user_age=?, user_password=? WHERE id =?;
`)

const updatePosts = db.prepare(`
UPDATE  posts SET post_title =?, post_img=?, post_content=?, post_upvotes=?, post_downvotes=?, postId=?;
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


app.post('/users', (req, res) => {
    //get the data from body
    const { user_name, user_lastname, user_email, user_age, user_password } = req.body

    //create the data
    const info = createUsers.run(user_name, user_lastname, user_email, user_age, user_password)

    //update DB
    const newUser = getuserByID.get(info.lastInsertRowid)

    res.send(newUser)
})
app.post('/posts', (req, res) => {
    //get data to change from body
    const { post_title, post_img, post_content, post_upvotes, post_downvotes, postId } = req.body

    //create the data
    const info = createPosts.run(post_title, post_img, post_content, post_upvotes, post_downvotes, postId)

    const newPost = getpostByID.get(info.lastInsertRowid)

    res.send(newPost)

})

app.post(`/comments`, (req, res) => {
    const { content, upvotes, downvotes, userId, postId } = req.body

    const createcoment = createComents.run(content, upvotes, downvotes, userId, postId)

    if (createcoment) {
        const comment = getcommentById.get(createcoment.lastInsertRowid)
        res.send(comment)
    } else {
        res.status(404).send({ error: 'comment not found' })
    }
})

app.patch('/users/:id', (req, res) => {
    //get ID from params
    const id = req.params.id
    //data to be change
    const { user_name, user_lastname, user_email, user_age, user_password } = req.body


    const user = getuserByID.get(id)

    if (user) {
        updateUser.run(user_name ?? user.user_name, user_lastname ?? user_lastname, user_email ?? user_email, user_age ?? user_age, user_password ?? user_password, id)

        const updatedUser = getuserByID.get(id)
        res.send(updatedUser)
    } else {
        res.status(404).send({ error: 'not found' })
    }


})

app.patch('/comments/:id', (req, res) => {
    const id = req.params.id

    const { content, upvotes, downvotes, userId, postId } = req.body

    const comment = getcommentById.get(id)

    if (comment) {

        updateComents.run(content ?? comment.content, upvotes ?? comment.upvotes, downvotes ?? comment.downvotes, userId ?? comment.userId, postId ?? comment.postId)

        const result = getcommentById.get(id)

        res.send(result)
    } else {
        res.status(404).send({ error: 'comment not fund' })
    }
})

app.patch('/posts/:id', (req, res) => {
    const id = req.params.id
    const { post_title, post_img, post_content, post_upvotes, post_downvotes, postId } = req.body

    const post = getpostByID.get(id)

    if (post) {

        updatePosts.run(post_title ?? post.post_title, post_img ?? post.post_img,
            post_content ?? post_content, post_upvotes ?? post.post_upvotes, post_downvotes ?? post.post_downvotes, postId ?? post.postId)

        const result = getpostByID.get(id)

        res.send(result)
    } else {
        res.status(404).send({ error: 'post not found' })
    }

})


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


    if (comment.changes !== 0) {
        res.send({ comment: 'Comment deleted succefully' })
    } else {
        res.status(404).send({ comment: 'Comment not found' })
    }
})


app.listen(4000, () => {
    console.log(`server up : http://localhost:4000`)
})