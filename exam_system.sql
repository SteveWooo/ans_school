/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost
 Source Database       : exam_system

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : utf-8

 Date: 03/04/2019 23:21:37 PM
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `informations`
-- ----------------------------
BEGIN;
INSERT INTO `informations` VALUES ('1', 'e9093ccc944287230bbf969dda1e1fb9', 0x7469746c65313233, 0x3c703e3c7370616e207374796c653d22666f6e742d7765696768743a20626f6c643b223e636f6e74656e743132333c2f7370616e3e3c2f703e, 0x66653934373864363363393239626339666164343665303762663632343963382e6a706567, '1', '1', '3aeec0ea3a0d980eb762aed78342e2f6', '3aeec0ea3a0d980eb762aed78342e2f6', '1551680459568', '1551680459568'), ('2', '84755374775ab9b9a81ad0d429991145', 0x74657374, 0x3c703e7177653c2f703e, 0x33356336396639346563336164383235663762373663333264303833646539622e6a706567, '1', '2', '3aeec0ea3a0d980eb762aed78342e2f6', '3aeec0ea3a0d980eb762aed78342e2f6', '1551693258809', '1551693258809'), ('3', 'af76edfe9ddb5cc1158d9d297fee0df8', 0x777165323165, 0x3c703e61776571773c2f703e, 0x33356336396639346563336164383235663762373663333264303833646539622e6a706567, '1', '2', '3aeec0ea3a0d980eb762aed78342e2f6', '3aeec0ea3a0d980eb762aed78342e2f6', '1551693272245', '1551693272245'), ('4', '533d6961716adc400637231b4fb195a9', 0x717765, 0x3c703e7177653c2f703e, 0x35343132333238666266643762346236343866383664303733376633323436332e6a706567, '1', '2', '3aeec0ea3a0d980eb762aed78342e2f6', '3aeec0ea3a0d980eb762aed78342e2f6', '1551693278597', '1551693278597');
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `subjects`
-- ----------------------------
BEGIN;
INSERT INTO `subjects` VALUES ('1', '341b13a3cec6c98d05eef15c0e62f4e4', 0xe695b0e5ada6, 0xe4bba4e4babae7aa92e681afe79a84e7a791e79bae, '1', '3aeec0ea3a0d980eb762aed78342e2f6', '3aeec0ea3a0d980eb762aed78342e2f6', '1551620339057', '1551620339057'), ('2', 'c7911f6773d2dd3b995bf8673cc0799e', 0xe4bd93e882b2, 0xefbc9fefbc9f, '1', '3aeec0ea3a0d980eb762aed78342e2f6', '3aeec0ea3a0d980eb762aed78342e2f6', '1551695255145', '1551695255145');
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `topic_groups`
-- ----------------------------
BEGIN;
INSERT INTO `topic_groups` VALUES ('1', '64421b1d4e75caf3a8375dece3f2c615', '341b13a3cec6c98d05eef15c0e62f4e4', 0xe9ab98e7ad89e695b0e5ada63132, 0xe9ab98e7ad89e695b0e5ada63120e68f8fe8bfb0313233, '', '1', '3aeec0ea3a0d980eb762aed78342e2f6', '3aeec0ea3a0d980eb762aed78342e2f6', '1551620417571', '1551620417571'), ('2', '49c2cd8a9c831f5c94ce984071757f88', 'c7911f6773d2dd3b995bf8673cc0799e', 0x746520732074, 0x746520732074, '', '1', '3aeec0ea3a0d980eb762aed78342e2f6', '3aeec0ea3a0d980eb762aed78342e2f6', '1551695556890', '1551695556890');
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `topics`
-- ----------------------------
BEGIN;
INSERT INTO `topics` VALUES ('1', '6ce4a49bc5a38c6140489912858e8497', '64421b1d4e75caf3a8375dece3f2c615', 0x313020252033203d203f, '0', 0x3130e999a4e4bba533e4bd99e695b0e4b8ba31, 0x7b226f7074696f6e73223a7b2241223a7b22636f6e74656e74223a2233227d2c2242223a7b22636f6e74656e74223a2231227d7d7d, 0x42, '1', '3aeec0ea3a0d980eb762aed78342e2f6', '3aeec0ea3a0d980eb762aed78342e2f6', '1551620417571', '1551620417571'), ('2', '7a60c8c0f382e553e86d6cffdec82eba', '64421b1d4e75caf3a8375dece3f2c615', 0x2d313020252033203d203f, '1', 0xe8afa6e8a7a3, 0x7b226f7074696f6e73223a7b2241223a7b22636f6e74656e74223a222d31227d2c2242223a7b22636f6e74656e74223a2231227d7d7d, 0x41, '1', '3aeec0ea3a0d980eb762aed78342e2f6', '3aeec0ea3a0d980eb762aed78342e2f6', '1551620417571', '1551620417571'), ('3', 'a9409ca5967546523e3925c7c76ea7b3', '49c2cd8a9c831f5c94ce984071757f88', 0x313020252033203d203f, '0', 0x3130e999a4e4bba533e4bd99e695b0e4b8ba31, 0x7b226f7074696f6e73223a7b2241223a7b22636f6e74656e74223a2233227d2c2242223a7b22636f6e74656e74223a2231227d7d7d, 0x42, '1', '3aeec0ea3a0d980eb762aed78342e2f6', '3aeec0ea3a0d980eb762aed78342e2f6', '1551695556890', '1551695556890'), ('4', 'a552231b6944f2034117074386589209', '49c2cd8a9c831f5c94ce984071757f88', 0x2d313020252033203d203f, '1', 0xe8afa6e8a7a3, 0x7b226f7074696f6e73223a7b2241223a7b22636f6e74656e74223a222d31227d2c2242223a7b22636f6e74656e74223a2231227d7d7d, 0x41, '1', '3aeec0ea3a0d980eb762aed78342e2f6', '3aeec0ea3a0d980eb762aed78342e2f6', '1551695556890', '1551695556890');
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `user_records`
-- ----------------------------
BEGIN;
INSERT INTO `user_records` VALUES ('1', 'd9b3a807ba90f56a84c1e44b7ccae9e2', '49c2cd8a9c831f5c94ce984071757f88', 0x4142, 0x302f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551706396738', '1551706396738'), ('2', '1be0fcca2ba6d9a897ae27ca1aa8273f', '49c2cd8a9c831f5c94ce984071757f88', 0x4241, 0x322f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551706408758', '1551706408758'), ('3', 'ba20e790b284c7c4b73673940f5fef47', '49c2cd8a9c831f5c94ce984071757f88', 0x4241, 0x322f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551706500472', '1551706500472'), ('4', '7736e47c809140d42d7d0ab6352dec8d', '49c2cd8a9c831f5c94ce984071757f88', 0x4142, 0x302f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551706794111', '1551706794111'), ('5', '493667c287333551046015ab70a99a55', '49c2cd8a9c831f5c94ce984071757f88', 0x4242, 0x312f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551708225261', '1551708225261'), ('6', '9b3c0275a8ba8145b25cc71025b12206', '49c2cd8a9c831f5c94ce984071757f88', 0x4241, 0x322f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551708235268', '1551708235268'), ('7', '5adc1da56380dc9f8dd87c1b76e43aed', '49c2cd8a9c831f5c94ce984071757f88', 0x4142, 0x302f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551708335980', '1551708335980'), ('8', '2fca09ed62de132e70ffe2fdb2e0758c', '49c2cd8a9c831f5c94ce984071757f88', 0x4241, 0x322f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551708347850', '1551708347850'), ('9', '8c759b419c19bccc98d35f6cc6b26928', '49c2cd8a9c831f5c94ce984071757f88', 0x4142, 0x302f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551708386907', '1551708386907'), ('10', '077f087a6a176f7a221d61e79b4aae29', '49c2cd8a9c831f5c94ce984071757f88', 0x4141, 0x312f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551708396994', '1551708396994'), ('11', '1654bdd65d727b6516b86456c99cb144', '64421b1d4e75caf3a8375dece3f2c615', 0x4241, 0x322f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551708534751', '1551708534751'), ('12', 'b84be0469fd349460a6116d55d963562', '49c2cd8a9c831f5c94ce984071757f88', 0x4241, 0x322f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551712179224', '1551712179224'), ('13', 'c314d1504a95e502438f2eac03351579', '49c2cd8a9c831f5c94ce984071757f88', 0x3030, 0x302f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551712209223', '1551712209223'), ('14', '49dcf11369c43554dcb521c1da2296d4', '49c2cd8a9c831f5c94ce984071757f88', 0x3030, 0x302f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551712243293', '1551712243293'), ('15', '1bd27dbcf2328d8e9ea84bc0f6d13550', '49c2cd8a9c831f5c94ce984071757f88', 0x4230, 0x312f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551712286037', '1551712286037'), ('16', 'ac130a603cd6e1c9884a3f2913f405f6', '49c2cd8a9c831f5c94ce984071757f88', 0x3030, 0x302f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551712344322', '1551712344322'), ('17', 'd13de1ba5f7fe48082914de6da7d31d9', '49c2cd8a9c831f5c94ce984071757f88', 0x4241, 0x322f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551712378736', '1551712378736'), ('18', '538a24e75e64c6d2b0812efe338747eb', '49c2cd8a9c831f5c94ce984071757f88', 0x4241, 0x322f32, '2bba624fdfaa2dd701d5779bde704aef', '2bba624fdfaa2dd701d5779bde704aef', '1551712687827', '1551712687827');
COMMIT;

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
INSERT INTO `users` VALUES ('1', 'o4Eua5U3jOFo8GhA_53fa0m7GdSE', '2bba624fdfaa2dd701d5779bde704aef', 'DenielFrank?', 'https://wx.qlogo.cn/mmopen/vi_32/JpibDD9hjDKFYzMKQsByxZTkYNEjzqK88r84h6f9tEIGAEriaNxWrZOhhpTo4nibUJIQwfYerZoIETj8vUvoHhn3A/132', '', '', '', '', '', 'wechat', 'wechat', '1551687671150', '1551687671150');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
