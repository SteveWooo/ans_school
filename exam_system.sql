/*
 Navicat Premium Data Transfer

 Source Server         : 115.28.241.66
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : 115.28.241.66
 Source Database       : exam_system

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : utf-8

 Date: 03/05/2019 11:05:49 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `admins`
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `account` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `create_by` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `update_by` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `create_at` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `update_at` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `admins`
-- ----------------------------
BEGIN;
INSERT INTO `admins` VALUES ('1', '3aeec0ea3a0d980eb762aed78342e2f6', 'admin', '2bf00614ec8482542dbf21129a4b038d', 'admin_root', 'root', 'root', '1551603403546', '1551603403546');
COMMIT;

-- ----------------------------
--  Table structure for `informations`
-- ----------------------------
DROP TABLE IF EXISTS `informations`;
CREATE TABLE `informations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `information_id` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `title` text COLLATE utf8_bin,
  `content` text COLLATE utf8_bin,
  `cover_url` text COLLATE utf8_bin,
  `status` int(11) DEFAULT NULL,
  `set_top` int(11) DEFAULT NULL,
  `create_by` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `update_by` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `create_at` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `update_at` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Table structure for `subjects`
-- ----------------------------
DROP TABLE IF EXISTS `subjects`;
CREATE TABLE `subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `name` text COLLATE utf8_bin,
  `description` text COLLATE utf8_bin,
  `status` int(11) DEFAULT NULL,
  `create_by` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `update_by` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `create_at` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `update_at` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Table structure for `topic_groups`
-- ----------------------------
DROP TABLE IF EXISTS `topic_groups`;
CREATE TABLE `topic_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_group_id` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `subject_id` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `title` text COLLATE utf8_bin,
  `description` text COLLATE utf8_bin,
  `icon_url` text COLLATE utf8_bin,
  `status` int(11) DEFAULT NULL,
  `create_by` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `update_by` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `create_at` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `update_at` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Table structure for `topics`
-- ----------------------------
DROP TABLE IF EXISTS `topics`;
CREATE TABLE `topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_id` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `topic_group_id` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `title` text COLLATE utf8_bin,
  `number` int(11) DEFAULT NULL,
  `explain` text COLLATE utf8_bin,
  `content` text COLLATE utf8_bin,
  `answer` text COLLATE utf8_bin,
  `status` int(11) DEFAULT NULL,
  `create_by` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `update_by` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `create_at` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `update_at` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Table structure for `user_records`
-- ----------------------------
DROP TABLE IF EXISTS `user_records`;
CREATE TABLE `user_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_record_id` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `topic_group_id` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `answers` text COLLATE utf8_bin,
  `score` text COLLATE utf8_bin,
  `create_by` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `update_by` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `create_at` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `update_at` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `user_id` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `avatar_url` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `mobile` text COLLATE utf8_bin,
  `name` text COLLATE utf8_bin,
  `position_field` text COLLATE utf8_bin,
  `position_building` text COLLATE utf8_bin,
  `position_room` text COLLATE utf8_bin,
  `create_by` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `update_by` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `create_at` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `update_at` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `users`
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES ('1', 'o4Eua5U3jOFo8GhA_53fa0m7GdSE', '2bba624fdfaa2dd701d5779bde704aef', '', '', '', '', '', '', '', 'wechat', 'wechat', '1551755101428', '1551755101428');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
