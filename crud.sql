-- INSERT INTO books SET title = '별주부전', writer = '거북이', content = '용왕이 나를...';
-- UPDATE books SET title='별주부전', writer='거북이', content='죽다 살았네...' WHERE id=3;
-- DELETE FROM books WHERE id=4;
-- SELECT title, writer FROM books;
-- SELECT * FROM books;
-- SELECT * FROM books ORDER BY id ASC;
-- SELECT * FROM books ORDER BY id DESC;
-- SELECT * FROM books WHERE id=3;
-- SELECT * FROM books ORDER BY id DESC LIMIT 1, 3;
-- SELECT count(id) FROM books;

-- Pager 쿼리
-- SELECT * FROM books ORDER BY id DESC;
-- 1page 쿼리
SELECT * FROM books ORDER BY id DESC LIMIT 3, 3;





