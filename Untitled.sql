
CREATE TABLE user (
  id integer PRIMARY KEY,
  user_name text,
  user_lastname text,
  user_email text,
  user_age text,
  user_password integer
);

CREATE TABLE notifications (
  id integer PRIMARY KEY,
  not_status boolean,
  userId integer,
  FOREIGN KEY (userId) REFERENCES user (id)
);

CREATE TABLE post (
  id integer PRIMARY KEY,
  post_title text,
  post_img text,
  post_content text,
  post_upvotes integer,
  post_downvotes integer,
  postId integer
  FOREIGN KEY (postId) REFERENCES user (id);
);

CREATE TABLE comments (
  id integer PRIMARY KEY,
  content text,
  upvotes integer,
  downvotes integer,
  userId integer,
  postId integer
  FOREIGN KEY (userId) REFERENCES user (id);
FOREIGN KEY (postId) REFERENCES post (id);
);

CREATE TABLE userSubreddit (
  id integer PRIMARY KEY,
  userId integer,
  subreddit_name text
);



ALTER TABLE comments ADD FOREIGN KEY (userId) REFERENCES user (id);

ALTER TABLE comments ADD FOREIGN KEY (postId) REFERENCES post (id);

ALTER TABLE userSubreddit ADD FOREIGN KEY (userId) REFERENCES user (id);
