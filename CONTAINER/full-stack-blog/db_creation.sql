-- use blogposts;
-- drop table authors;
create table authors (
  id int not null primary key auto_increment,
  name varchar(80) not null,
  email varchar(120) not null,
  password varchar(120) not null,
  role varchar(50) default "guest",
  _created datetime default current_timestamp
);
-- drop table blogs;
create table blogs (
  id int not null primary key auto_increment,
  title varchar(100) not null,
  content text not null,
  authorid int not null,
  _created datetime default current_timestamp,
  constraint fk_blogs_authors foreign key (authorid) references authors(id)
);
-- drop table tags;
create table tags (
  id int not null primary key auto_increment,
  name varchar(50) not null,
  _created datetime default current_timestamp,
  unique key name (name)
);
-- drop table blogs_tags;
create table blogs_tags (
  blogid int not null,
  tagid int not null,
  primary key (blogid, tagid)
);
-- drop table tokens;
create table tokens (
  id int primary key not null auto_increment,
  authorid int not null,
  token text,
  expires datetime,
  _created datetime default current_timestamp,
  constraint fk_tokens_authors foreign key (authorid) references authors(id)
);