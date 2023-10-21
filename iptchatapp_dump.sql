CREATE DATABASE iptchatapp;

use iptchatapp;


CREATE TABLE `user_table` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
);

CREATE TABLE `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `message_text` text NOT NULL,
  `sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`sender_id`) REFERENCES `user_table` (`user_id`),
  FOREIGN KEY (`receiver_id`) REFERENCES `user_table` (`user_id`)
);


CREATE TABLE `refresh_token` (
  `refresh_token_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`refresh_token_id`),
  UNIQUE KEY `refresh_token` (`refresh_token`)
) ;

CREATE TABLE `user_friends` (
  `friendship_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `friend_id` int NOT NULL,
  `status` enum('Pending','Accepted','Rejected','Blocked') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`friend_id`) REFERENCES `user_table` (`user_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`)
);

CREATE TABLE `images` (
	`image_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `message_images` (
  `msg_img_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `message_id` int NOT NULL,
  `image_id` int NOT NULL,
  FOREIGN KEY (`message_id`) REFERENCES `messages` (`message_id`),
  FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`)
) ;
