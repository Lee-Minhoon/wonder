INSERT INTO user (email, password, nickname) VALUES ('localtest', '$2a$10$6yVMypv00RigKDrWe4TTXukPKiZXektyAr161pA5isZe2.p351t6m', 'admin');

INSERT INTO category (id, parent_id, name) VALUES (1, null, 'Q&A');
INSERT INTO category (id, parent_id, name) VALUES (2, null, '강의');
INSERT INTO category (id, parent_id, name) VALUES (3, null, '커뮤니티');
INSERT INTO category (id, parent_id, name) VALUES (4, null, '구인/구직');
INSERT INTO category (id, parent_id, name) VALUES (5, null, '외주/과외');
INSERT INTO category (id, parent_id, name) VALUES (11, 1, '웹 개발');
INSERT INTO category (id, parent_id, name) VALUES (12, 1, '앱 개발');
INSERT INTO category (id, parent_id, name) VALUES (13, 1, '서버 개발');
INSERT INTO category (id, parent_id, name) VALUES (21, 2, 'test1');
INSERT INTO category (id, parent_id, name) VALUES (31, 3, 'test1');
INSERT INTO category (id, parent_id, name) VALUES (41, 4, 'test1');
INSERT INTO category (id, parent_id, name) VALUES (51, 5, 'test1');

INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('123', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('123', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('123', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('123', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('123', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('123', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('123', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('123', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('123', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('123', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('123', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
