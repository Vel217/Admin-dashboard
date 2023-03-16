-- Create the table for the users mysql

Create table users (
    user_id int(11) not null auto_increment,
    firstname varchar(255) not null,
    lastname varchar(255) not null,
    register_date datetime not null,
    last_activity datetime not null,
    email varchar(255) not null,
    is_blocked tinyint(1) not null default 0,
    primary key (user_id)
)

-- insert row
insert into users (firstname, lastname, register_date, last_activity, email, is_blocked) values ('John', 'Doe', '2018-01-01 00:00:00', '2018-01-01 00:00:00', 'email@gmail.com', 0)


-- user_id
-- firstname
-- lastname
-- register_date
-- last_activity
-- email
-- is_blocked

