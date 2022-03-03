import Database from "better-sqlite3";


const db = new Database('./data.db', {
    verbose: console.log
})

const users = [
    {
        user_name: 'text',
        user_lastname: 'text',
        user_email: 'text',
        user_age: 5,
        user_password: 12345
    },
    {
        user_name: 'text1',
        user_lastname: 'text1',
        user_email: 'text1',
        user_age: 20,
        user_password: 12345
    },
    {
        user_name: 'text2',
        user_lastname: 'text2',
        user_email: 'text2',
        user_age: 30,
        user_password: 12345
    }
]

const logins = [{
    userId: 1,
    username: 'testtest',
    status: 'online'
}]
const posts = [
    {
        post_title: 'text',
        post_img: 'text',
        post_content: 'text',
        post_upvotes: 123,
        post_downvotes: 123,
        postId: 1
    }
]
const comments = [
    {
        content: 'text',
        upvotes: 5,
        downvotes: 6,
        userId: 1,
        postId: 1
    }
]

const subbredits = [{
    name: 'subbredit name'
}]

const userSubreddits = [
    {
        userId: 1,
        subreddit_name: 'text',
        subbreditId: 1
    }
]

const notifications = [
    {
        not_status: 'yes',
        userId: 1
    }
]

db.exec(`
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS userSubreddits;
DROP TABLE IF EXISTS subbredits;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS logins;
DROP TABLE IF EXISTS users;


CREATE TABLE IF NOT EXISTS users (
    id INTEGER ,
    user_name TEXT NOT NULL,
    user_lastname TEXT NOT NULL,
    user_email TEXT NOT NULL,
    user_age INTEGER NOT NULL,
    user_password INTEGER NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXISTS logins (
    id INTEGER,
    userId INTEGER NOT NULL,
    username TEXT NOT NULL,
    status text NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id)
    );
  
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER,
    post_title TEXT NOT NULL,
    post_img TEXT NOT NULL,
    post_content TEXT NOT NULL,
    post_upvotes INTEGER NOT NULL,
    post_downvotes INTEGER NOT NULL,
    postId INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (postId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER ,
    not_status BOOLEAN NOT NULL,
    userId INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS subbredits (
    id INTEGER,
    name TEXT NOT NULL,
    PRIMARY KEY (id)
  );
  
  
  CREATE TABLE IF NOT EXISTS userSubreddits (
    id INTEGER,
    userId INTEGER NOT NULL,
    subbreditId INTEGER NOT NULL,
    subreddit_name TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (subbreditId) REFERENCES subbredits(id)
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER,
    content TEXT NOT NULL,
    upvotes INTEGER NOT NULL,
    downvotes INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    postId INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (postId) REFERENCES posts(id)
  );
  
`)


const createUsers = db.prepare(`
INSERT INTO users(user_name, user_lastname, user_email, user_age ,user_password)
VALUES (?,?,?,?,?);
`)

const createLogins = db.prepare(`
INSERT INTO logins(userId ,username ,status ) VALUES(?, ?, ?)
`)

const createPosts = db.prepare(`
INSERT INTO posts(post_title, post_img, post_content, post_upvotes, post_downvotes, postId)
VALUES(?,?,?,?,?,?);
`)

const createComents = db.prepare(`
INSERT INTO comments(  content, upvotes, downvotes, userId, postId)
VALUES(?,?,?,?,?);
`)

const createSubbredits = db.prepare(`
INSERT INTO subbredits(name) VALUES(?);`)

const createUserSubbredits = db.prepare(`
INSERT INTO userSubreddits(subreddit_name, userId, subbreditId)
VALUES (?,?,?);
`)

const createNotifications = db.prepare(`
INSERT INTO notifications(not_status , userId)
VALUES(?,?);
`)


for (const user of users) {
    createUsers.run(user.user_name, user.user_lastname, user.user_email, user.user_age, user.user_password)
}

for (const login of logins) {
    createLogins.run(login.userId, login.username, login.username)
}

for (const post of posts) {
    createPosts.run(post.post_title, post.post_img, post.post_content, post.post_upvotes, post.post_downvotes, post.postId)
}

for (const comment of comments) {
    createComents.run(comment.content, comment.upvotes, comment.downvotes, comment.userId, comment.postId)
}
for (const subbredit of subbredits) {
    createSubbredits.run(subbredit.name)
}

for (const userSubbredit of userSubreddits) {
    createUserSubbredits.run(userSubbredit.subreddit_name, userSubbredit.userId, userSubbredit.subbreditId)
}

for (const notification of notifications) {
    createNotifications.run(notification.not_status, notification.userId)
}