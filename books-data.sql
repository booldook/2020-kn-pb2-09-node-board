-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.22 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 테이블 데이터 booldook.books:~11 rows (대략적) 내보내기
DELETE FROM `books`;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` (`id`, `title`, `writer`, `content`, `wdate`, `savefile`, `realfile`, `filesize`, `uid`) VALUES
	(1, '흥부놀부전', '놀부', '놀부가 흥부의 제비를 보고....', '1520-11-03 00:00:00', '201118-d6ea68fb-5f3c-4ccf-9e11-146e42f336c7.jpg', '흥부전.jpg', 45444, 1),
	(2, '심청전', '심봉사', '내딸 심청이가...임당수에...', '1680-11-02 00:00:00', '201116-956ff136-e561-488a-9f5a-9bb66fa4d701.jpg', '심청전.jpg', 14572, 2),
	(3, '장화홍련전', '홍련', '장화와 홍련이가 귀신이 되어 사또를 찾아가는데....', '1580-05-12 00:00:00', '201116-2643f0f0-619b-4cf8-9425-d5ba143cf582.jpg', '장화홍련.jpg', 43939, 2),
	(4, '별주부전', '토끼', '거북이가 날 속이고 뭍으로 도망가는데...', '1680-02-12 00:00:00', '201116-e0708236-6b31-43ca-be01-be2857767dca.jpg', '변주부전.jpg', 13358, 1),
	(5, '허생전', '허생', '허생이 뭔가를 하는데...', '1520-03-27 00:00:00', '201116-85c58a9e-e911-46c6-b1b9-e7d5fac0c5a4.jpg', '허생전.jpg', 40042, 1),
	(6, '구운몽전', '운몽', '운몽이의 꿈은 한여름 꿈 이야기...', '1770-06-30 00:00:00', '201116-f787adbc-7873-41ef-b8a7-3b7bad57a03a.jpg', '구운몽전.jpg', 12721, 2),
	(7, '난중일기', '이순신', '큰 칼 옆에차고 깊은 시름...', '1592-12-12 00:00:00', '201116-04479e17-3201-44fe-b015-7e60a305fb46.jpg', '난중일기.jpg', 553775, 2),
	(8, '옹고집전', '옹씨', '옹고집 영감이 하루는...', '1798-12-19 00:00:00', '201116-69a7615a-0698-43dc-b4ee-495214b69184.jpg', '옹고집전.jpg', 16627, 2),
	(9, '임꺽정전', '임꺽정', '못살겠다 갈아보자~', '1600-05-05 00:00:00', '201116-37c7345a-5a20-462c-865c-80391ed162cd.jpg', '임꺽정전.jpg', 86419, 1),
	(10, '콩쥐팥쥐전', '팥쥐', '사람들이 나만 미워해~', '1800-01-05 00:00:00', '201116-2446169f-f8ae-4603-8f19-4fb49e69b0b9.png', '콩쥐팥쥐.png', 533336, 1),
	(11, '홍길동전', '길동', '아버지를 아버지라...형을 형이라....', '1625-01-24 00:00:00', '201118-55623bb9-6539-47ce-8266-0550b2c9494e.jpg', '홍길동전.jpg', 31038, 1);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
