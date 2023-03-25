Create table usersList (
    user_id int(11) not null auto_increment primary key,
    firstname varchar(255) not null,
    lastname varchar(255) not null,
     email varchar(255) not null,
    register_date datetime not null,
    last_activity datetime not null,
    is_blocked tinyint(1) not null default 0,
    password varchar(100) not null
);

-- insert row
insert into users (firstname, lastname, email,register_date, password) values ('John', 'Doe', 'email@gmail.com','2018-01-01', '12345')


-- user_id
-- firstname
-- lastname
-- register_date
-- last_activity
-- email
-- is_blocked