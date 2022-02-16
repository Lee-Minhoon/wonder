INSERT INTO user (email, password, nickname, role, exp, created_at) VALUES ('localtest', '$2a$10$6yVMypv00RigKDrWe4TTXukPKiZXektyAr161pA5isZe2.p351t6m', 'admin', 'ROLE_ADMIN', 0, CURRENT_TIMESTAMP());
INSERT INTO user (email, password, nickname, role, exp, created_at) VALUES ('localtest2', '$2a$10$6yVMypv00RigKDrWe4TTXukPKiZXektyAr161pA5isZe2.p351t6m', 'admin2', 'ROLE_ADMIN', 0, CURRENT_TIMESTAMP());
INSERT INTO user (email, password, nickname, role, exp, created_at) VALUES ('localtest3', '$2a$10$6yVMypv00RigKDrWe4TTXukPKiZXektyAr161pA5isZe2.p351t6m', 'admin3', 'ROLE_ADMIN', 0, CURRENT_TIMESTAMP());

INSERT INTO category (id, parent_id, name) VALUES (1, null, 'Q&A');
INSERT INTO category (id, parent_id, name) VALUES (2, null, '강의');
INSERT INTO category (id, parent_id, name) VALUES (3, null, '커뮤니티');
INSERT INTO category (id, parent_id, name) VALUES (4, null, '구인/구직');
INSERT INTO category (id, parent_id, name) VALUES (11, 1, '언어');
INSERT INTO category (id, parent_id, name) VALUES (12, 1, '프론트엔드');
INSERT INTO category (id, parent_id, name) VALUES (13, 1, '백엔드');
INSERT INTO category (id, parent_id, name) VALUES (14, 1, '모바일/어플리케이션');
INSERT INTO category (id, parent_id, name) VALUES (15, 1, '데이터베이스');
INSERT INTO category (id, parent_id, name) VALUES (16, 1, '알고리즘/자료구조');
INSERT INTO category (id, parent_id, name) VALUES (17, 1, '네트워크/보안');
INSERT INTO category (id, parent_id, name) VALUES (18, 1, '서버/클라우드');
INSERT INTO category (id, parent_id, name) VALUES (19, 1, '프로젝트관리');
INSERT INTO category (id, parent_id, name) VALUES (21, 2, '언어');
INSERT INTO category (id, parent_id, name) VALUES (22, 2, '프론트엔드');
INSERT INTO category (id, parent_id, name) VALUES (23, 2, '백엔드');
INSERT INTO category (id, parent_id, name) VALUES (24, 2, '모바일/어플리케이션');
INSERT INTO category (id, parent_id, name) VALUES (25, 2, '데이터베이스');
INSERT INTO category (id, parent_id, name) VALUES (26, 2, '알고리즘/자료구조');
INSERT INTO category (id, parent_id, name) VALUES (27, 2, '네트워크/보안');
INSERT INTO category (id, parent_id, name) VALUES (28, 2, '서버/클라우드');
INSERT INTO category (id, parent_id, name) VALUES (29, 2, '프로젝트관리');
INSERT INTO category (id, parent_id, name) VALUES (31, 3, '자유게시판');
INSERT INTO category (id, parent_id, name) VALUES (32, 3, '고민/상담');
INSERT INTO category (id, parent_id, name) VALUES (33, 3, 'IT행사');
INSERT INTO category (id, parent_id, name) VALUES (41, 4, '구인');
INSERT INTO category (id, parent_id, name) VALUES (42, 4, '구직');
INSERT INTO category (id, parent_id, name) VALUES (43, 4, '외주/의뢰');
INSERT INTO category (id, parent_id, name) VALUES (44, 4, '홍보');

INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 1, 12);

INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 2, 12);

INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 11);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 12);
INSERT INTO post (title, content, views, updated_at, created_at, user_id, category_id) VALUES ('안녕하세요', '<p>123<p>', 0, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 12);

INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 1, 3, 0, 0);

INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);
INSERT INTO message (title, content, sent_at, sender_id, recipient_id, sender_delete_status, recipient_delete_status) VALUES ('안녕하세요', '안녕', CURRENT_TIMESTAMP(), 3, 1, 0, 0);