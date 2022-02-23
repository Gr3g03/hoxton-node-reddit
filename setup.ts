import Database from "better-sqlite3";


const db = new Database('./data.db', {
    verbose: console.log
})

const users = [
    {
        user_name: 'text',
        user_lastname: 'text',
        user_email: 'text',
        user_age: 'text',
        user_password: 12345
    },
    {
        user_name: 'text1',
        user_lastname: 'text1',
        user_email: 'text1',
        user_age: 'text1',
        user_password: 12345
    },
    {
        user_name: 'text2',
        user_lastname: 'text2',
        user_email: 'text2',
        user_age: 'text2',
        user_password: 12345
    }
]
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

const userSubreddits = [
    {
        userId: 1,
        subreddit_name: 'text'
    }
]

const notifications = [
    {
        not_status: 'yes',
        userId: 1
    }]

db.exec(`
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS userSubreddits;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;


CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    user_name TEXT,
    user_lastname TEXT,
    user_email TEXT,
    user_age TEXT,
    user_password INTEGER
  );
  
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY,
    post_title TEXT,
    post_img TEXT,
    post_content TEXT,
    post_upvotes INTEGER,
    post_downvotes INTEGER,
    postId INTEGER,
    FOREIGN KEY (postId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY,
    not_status BOOLEAN,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id)
  );
  
  
  CREATE TABLE IF NOT EXISTS userSubreddits (
    id INTEGER PRIMARY KEY,
    userId INTEGER,
    subreddit_name TEXT,
    FOREIGN KEY (userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY,
    content TEXT,
    upvotes INTEGER,
    downvotes INTEGER,
    userId INTEGER,
    postId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (postId) REFERENCES posts(id)
  );
  
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

const createUserSubbredits = db.prepare(`
INSERT INTO userSubreddits(subreddit_name, userId)
VALUES (?,?);
`)


const createNotifications = db.prepare(`
INSERT INTO notifications(not_status , userId)
VALUES(?,?);
`)


for (const user of users) {
    createUsers.run(user.user_name, user.user_lastname, user.user_email, user.user_age, user.user_password)
}

for (const post of posts) {
    createPosts.run(post.post_title, post.post_img, post.post_content, post.post_upvotes, post.post_downvotes, post.postId)
}

for (const comment of comments) {
    createComents.run(comment.content, comment.upvotes, comment.downvotes, comment.userId, comment.postId)
}

for (const subbredit of userSubreddits) {
    createUserSubbredits.run(subbredit.subreddit_name, subbredit.userId)
}

for (const notification of notifications) {
    createNotifications.run(notification.not_status, notification.userId)
}