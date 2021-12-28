INSERT INTO USER (id, email, password, nickname) VALUES (1, 'localtest', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'localtest');

INSERT INTO CATEGORY (id, parent_id, name) VALUES (1, null, 'Q&A');
INSERT INTO CATEGORY (id, parent_id, name) VALUES (2, null, '강의');
INSERT INTO CATEGORY (id, parent_id, name) VALUES (3, null, '커뮤니티');
INSERT INTO CATEGORY (id, parent_id, name) VALUES (4, null, '구인/구직');
INSERT INTO CATEGORY (id, parent_id, name) VALUES (5, null, '외주/과외');
INSERT INTO CATEGORY (id, parent_id, name) VALUES (11, 1, '웹 개발');
INSERT INTO CATEGORY (id, parent_id, name) VALUES (12, 1, '앱 개발');
INSERT INTO CATEGORY (id, parent_id, name) VALUES (21, 2, 'test1');
INSERT INTO CATEGORY (id, parent_id, name) VALUES (31, 3, 'test1');
INSERT INTO CATEGORY (id, parent_id, name) VALUES (41, 4, 'test1');
INSERT INTO CATEGORY (id, parent_id, name) VALUES (51, 5, 'test1');