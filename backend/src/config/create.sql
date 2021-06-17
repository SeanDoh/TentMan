CREATE DATABASE climate COLLATE = 'utf8_general_ci';

CREATE TABLE climate_sensor(
  id INT NOT NULL AUTO_INCREMENT,
  sensor_name VARCHAR(255) DEFAULT NULL,
  temperature VARCHAR(255) DEFAULT NULL,
  humidity VARCHAR(255) DEFAULT NULL,
  date_read datetime DEFAULT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE sensor_check(
  id INT NOT NULL AUTO_INCREMENT,
  last_date_read datetime NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE camera(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) DEFAULT NULL,
  url VARCHAR(255) DEFAULT NULL,
  hours_to_keep INT DEFAULT NULL,
  created datetime DEFAULT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE events(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) DEFAULT NULL,
  details TEXT DEFAULT NULL,
  event_date datetime DEFAULT NULL,
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_modified DATETIME ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);