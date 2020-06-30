CREATE TABLE UsersLabook (
	id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE RelationsLabook (
    id_inviter VARCHAR(255) NOT NULL,
    id_invited VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_inviter) REFERENCES UsersLabook(id),
	FOREIGN KEY (id_invited) REFERENCES UsersLabook(id)
);

CREATE TABLE PostsLabook (
    id VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    type VARCHAR(255) NOT NULL,
    id_user VARCHAR(255) NOT NULL,
	FOREIGN KEY (id_user) REFERENCES UsersLabook(id)
);

CREATE TABLE RefreshTokenLabook (
    refresh_token VARCHAR(255) PRIMARY KEY,
    device VARCHAR(255) NOT NULL,
    is_active TINYINT NOT NULL DEFAULT 1,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES UsersLabook(id)
);