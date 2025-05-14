-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 09 mai 2025 à 18:52
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `plantiplantes`
--

-- --------------------------------------------------------

--
-- Structure de la table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `uk_user_product` (`user_id`,`product_id`),
  KEY `product_id` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`, `product_id`, `quantity`, `added_at`) VALUES
(1, 0, 2, 1, '2025-05-09 16:20:52');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`) VALUES
(1, 'fleur', NULL),
(2, 'table', NULL),
(3, 'velo', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `price` decimal(10,2) NOT NULL,
  `stock` int DEFAULT '0',
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`product_id`, `name`, `image`, `description`, `price`, `stock`, `category_id`) VALUES
(2, 'Crocus', 'crocusB', 'Jolie Crocus Bleu des iles', 59.99, 0, 1),
(3, 'Fleur 1', 'fleur1', 'Merveilleuse Fleur premier du nom', 4.99, 0, 1),
(4, 'Fleur Rose', 'fleurRose', 'Petite fleur rose qui fleurit en rose', 4.99, 0, 1),
(5, 'Hermosas', 'hermosasR', 'Sublime hermosas des Galapagos ', 59.99, 0, 1),
(6, 'Lotus', 'lotusR', 'Lotus rose tout droit importé d\'Asie ', 79.99, 0, 1),
(7, 'Lys', 'lysR', 'Fleur de Lys royalement royal ', 29.99, 0, 1),
(8, 'Marguerite Saumon', 'margueriteSaumon', 'Splendite Marguerite couleur saumon de saumure', 29.99, 0, 1),
(9, 'Nymphaea Odorata', 'nymphaeaOdorata', 'Merveilleuse Nympheae Odorata du sud du Bresil Atlantique', 79.99, 0, 1),
(10, 'Pensé', 'penseV', 'Petite pensé violette mais avec un peu de jaune au milieu pour etre un peu plus floresque', 4.99, 0, 1),
(11, 'Rose', 'rose', 'C\'est une rose rose', 4.99, 0, 1),
(12, 'Tulipe', 'tulipeR', 'Tulipe Rouge toute belle toute pimpante', 4.99, 0, 1),
(13, 'Table Basse ', 'tableBasse', 'Super table basse, elle est basse et peut servir de table', 119.99, 0, 2),
(14, 'Table Basse Industrielle', 'tableBasseS', 'Une table basse dans un ton sombre et industrielle, c\'est dans le nom', 149.99, 0, 2),
(15, 'Table en bois massif', 'tableBM', 'Grand table de salle a manger en bois massif bien galbé et congestionné', 749.99, 0, 2),
(16, 'Table de Conférence', 'tableConf', 'Table de salle de conference et de reunion professionnelle', 229.99, 0, 2),
(17, 'Table Moderne', 'tableM', 'Une table dans toute la modernité et la tablité attendu par une table', 249.99, 0, 2),
(18, 'Grande Table Moderne', 'tableMRN', 'Table de salle a manger noir moderne, tres spacieuse et tableuse', 679.99, 0, 2),
(19, 'Table Rectangulaire', 'tableRect', 'Table de taille moyenne, fonctionne super pour poser des objets et décorer un espace', 189.99, 0, 2),
(20, 'Table Ronde et Petit', 'tableRP', 'Petite table ronde, parfait pour meubler des petits espaces dans le besoin d\'une table', 119.99, 0, 2),
(21, 'Velo Classique (Vintage)', 'veloC', 'Bicyclette tout ce qu\'il y a de plus Classique, deux roues, un guidon, et roulez jeunesse ! ', 3700.00, 0, 3),
(22, 'Velo de Course Vintage', 'veloCC', 'Bicyclette de course d\'antan, ca roule vite et fort ', 3500.00, 0, 3),
(23, 'Velo de Course Vintage Bleu', 'veloCCB', 'Velo de course vintage mais en bleu, il roule comme les velo pas bleus, mais celui ci est bleu', 3600.00, 0, 3),
(24, 'Velo Electrique Blanc', 'veloEB', 'Velo motorisé electriquement, une sorte de mobilette des temps mordernes ', 5499.99, 0, 3),
(25, 'Velo Electrique Tout Terrain', 'veloET', 'Une sorte de mobilette electrique cross pour les petits foufou de la montagne et des sensations fortes !', 4799.99, 0, 3),
(26, 'Velo Noir un peu Sport', 'veloNoir', 'Velo classique noir avec un guidon de course, version lowcost des autres modèles ', 159.99, 0, 3),
(27, 'Velo Orange', 'veloO', 'Une bicyclette orange tout ce qu\'il y a de plus classique', 349.99, 0, 3),
(29, 'Fleur Mystère 1', 'fleurCartoon', 'Une fleur unique au monde', 5.99, 10, 1),
(30, 'Fleur Mystère 2', 'fleurCartoon', 'Une autre fleur mystérieuse', 6.99, 12, 1),
(31, 'Fleur Mystère 3', 'fleurCartoon', 'Petite fleur qui apaise l\'esprit', 7.49, 9, 1),
(32, 'Fleur Mystère 4', 'fleurCartoon', 'Belle et rare fleur de Galápagos', 5.49, 11, 1),
(33, 'Fleur Mystère 5', 'fleurCartoon', 'Petite beauté des îles', 4.49, 8, 1),
(46, 'Table Élégante 1', 'tableCartoon', 'Table élégante pour salon moderne', 149.99, 5, 2),
(47, 'Table Élégante 2', 'tableCartoon', 'Table massive pour les grands espaces', 799.99, 3, 2),
(48, 'Table Élégante 3', 'tableCartoon', 'Table de réunion haut de gamme', 249.99, 2, 2),
(49, 'Table Élégante 4', 'tableCartoon', 'Grande table moderne rectangulaire', 689.99, 1, 2),
(50, 'Table Élégante 5', 'tableCartoon', 'Petite table ronde en bois clair', 129.99, 4, 2),
(63, 'Vélo Rapide 1', 'veloCartoon', 'Vélo de course ultra léger', 2999.99, 4, 3),
(64, 'Vélo Rapide 2', 'veloCartoon', 'Vélo de course rétro bleu', 2899.99, 3, 3),
(65, 'Vélo Rapide 3', 'veloCartoon', 'Vélo électrique performant', 4999.99, 2, 3),
(66, 'Vélo Rapide 4', 'veloCartoon', 'Vélo tout terrain électrique', 4799.99, 1, 3),
(67, 'Vélo Rapide 5', 'veloCartoon', 'Vélo pour entraînement sportif', 159.99, 5, 3);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `nom`) VALUES
(1, 'Administrateur\r\n'),
(2, 'Moderateur'),
(3, 'Utilisateur');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nom` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tel` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_role` int NOT NULL DEFAULT '3',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `id_role` (`id_role`)
) ENGINE=MyISAM AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `pass`, `nom`, `prenom`, `tel`, `id_role`) VALUES
(9, 'mimiche@email.com', '$2y$10$LpmnNSF1OW8BM92CT8yz.eNQ9Y9fgozTWpiQr8Wyo72qVV463enmu', 'Michon', 'Michel', '0708090405', 3),
(8, 'jean@email.com', '$2y$10$/mBReSU3SQtIOpWU5ZkET.aw6Y1zs/H7FnIvmJ5vUSIlWDmLJMis6', 'Bonnet', 'Jean', '0624255875', 3),
(7, 'F/admin@email.com', '$2y$10$Zbvu0qtRyEv1HoRrR/Ijze3k9HfcBwe2ZG6UCxwwHnZQZ/cFF565m', 'Admin', 'Admin', '0000000000', 1),
(10, 'juju@email.com', '$2y$10$DbcciIaGRok8eOu/i.gZeugvydXXaE9sFwh3n7BhyBQ8T5S6EbVc2', 'Richon', 'Juliette', '0102030405', 3),
(86, 'user1@email.com', '$2y$10$DbcciIaGRok8eOu/i.gZeugvydXXaE9sFwh3n7BhyBQ8T5S6EbVc2', 'Nom1', 'Prenom1', '0123456789', 2),
(87, 'user2@email.com', '$2y$10$DbcciIaGRok8eOu/i.gZeugvydXXaE9sFwh3n7BhyBQ8T5S6EbVc2', 'Nom2', 'Prenom2', '0123456790', 3),
(88, 'user3@email.com', '$2y$10$DbcciIaGRok8eOu/i.gZeugvydXXaE9sFwh3n7BhyBQ8T5S6EbVc2', 'Nom3', 'Prenom3', '0123456791', 3),
(89, 'user4@email.com', '$2y$10$DbcciIaGRok8eOu/i.gZeugvydXXaE9sFwh3n7BhyBQ8T5S6EbVc2', 'Nom4', 'Prenom4', '0123456792', 3),
(90, 'user5@email.com', '$2y$10$DbcciIaGRok8eOu/i.gZeugvydXXaE9sFwh3n7BhyBQ8T5S6EbVc2', 'Nom5', 'Prenom5', '0123456793', 3),
(91, 'user6@email.com', '$2y$10$DbcciIaGRok8eOu/i.gZeugvydXXaE9sFwh3n7BhyBQ8T5S6EbVc2', 'Nom6', 'Prenom6', '0123456794', 3),
(92, 'user7@email.com', '$2y$10$DbcciIaGRok8eOu/i.gZeugvydXXaE9sFwh3n7BhyBQ8T5S6EbVc2', 'Nom7', 'Prenom7', '0123456795', 3),
(93, 'user8@email.com', '$2y$10$DbcciIaGRok8eOu/i.gZeugvydXXaE9sFwh3n7BhyBQ8T5S6EbVc2', 'Nom8', 'Prenom8', '0123456796', 3),
(94, 'user9@email.com', '$2y$10$DbcciIaGRok8eOu/i.gZeugvydXXaE9sFwh3n7BhyBQ8T5S6EbVc2', 'Nom9', 'Prenom9', '0123456797', 3),
(95, 'user10@email.com', '$2y$10$DbcciIaGRok8eOu/i.gZeugvydXXaE9sFwh3n7BhyBQ8T5S6EbVc2', 'Nom10', 'Prenom10', '0123456798', 3),
(97, 'charliedavis1@example.com', 'password', 'Davis', 'Charlie', '0782697308', 2),
(98, 'alicejones2@example.com', 'password', 'Jones', 'Alice', '0782258752', 2),
(99, 'jacksmith3@example.com', 'password', 'Smith', 'Jack', '0718737016', 2),
(100, 'alicesmith4@example.com', 'password', 'Smith', 'Alice', '0789219531', 2),
(101, 'dianawilson5@example.com', 'password', 'Wilson', 'Diana', '0754711137', 2),
(102, 'ivybrown6@example.com', 'password', 'Brown', 'Ivy', '0733074307', 3),
(103, 'bobdavis7@example.com', 'password', 'Davis', 'Bob', '0782944791', 3),
(104, 'hankdavis8@example.com', 'password', 'Davis', 'Hank', '0750935078', 3),
(105, 'dianawilliams9@example.com', 'password', 'Williams', 'Diana', '0796297323', 3),
(106, 'evelopez10@example.com', 'password', 'Lopez', 'Eve', '0786498138', 3),
(107, 'frankdavis11@example.com', 'password', 'Davis', 'Frank', '0762303692', 3),
(108, 'bobjones12@example.com', 'password', 'Jones', 'Bob', '0737004449', 3),
(109, 'jackwilson13@example.com', 'password', 'Wilson', 'Jack', '0742791138', 3),
(110, 'charliejones14@example.com', 'password', 'Jones', 'Charlie', '0743663554', 3),
(111, 'franksmith15@example.com', 'password', 'Smith', 'Frank', '0762070319', 3),
(112, 'jackwilson16@example.com', 'password', 'Wilson', 'Jack', '0794991135', 3),
(113, 'jackgarcia17@example.com', 'password', 'Garcia', 'Jack', '0762308850', 3),
(114, 'gracemartinez18@example.com', 'password', 'Martinez', 'Grace', '0768082591', 3),
(115, 'charliegarcia19@example.com', 'password', 'Garcia', 'Charlie', '0730069264', 3),
(116, 'evebrown20@example.com', 'password', 'Brown', 'Eve', '0771415017', 3),
(117, 'hankwilliams21@example.com', 'password', 'Williams', 'Hank', '0766352812', 3),
(118, 'alicelopez22@example.com', 'password', 'Lopez', 'Alice', '0744828294', 3),
(119, 'evejones23@example.com', 'password', 'Jones', 'Eve', '0791395764', 3),
(120, 'frankjones24@example.com', 'password', 'Jones', 'Frank', '0794218003', 3),
(121, 'franksmith25@example.com', 'password', 'Smith', 'Frank', '0752261340', 3),
(122, 'dianajones26@example.com', 'password', 'Jones', 'Diana', '0780316633', 3),
(123, 'bobgarcia27@example.com', 'password', 'Garcia', 'Bob', '0732520301', 3),
(124, 'bobmartinez28@example.com', 'password', 'Martinez', 'Bob', '0744371108', 3),
(125, 'gracedavis29@example.com', 'password', 'Davis', 'Grace', '0750606268', 3),
(126, 'charlielopez30@example.com', 'password', 'Lopez', 'Charlie', '0755851165', 3),
(127, 'dianajohnson31@example.com', 'password', 'Johnson', 'Diana', '0767738026', 3),
(128, 'charliebrown32@example.com', 'password', 'Brown', 'Charlie', '0755427123', 3),
(129, 'alicewilliams33@example.com', 'password', 'Williams', 'Alice', '0729753929', 3),
(130, 'charliewilson34@example.com', 'password', 'Wilson', 'Charlie', '0793419726', 3),
(131, 'frankmartinez35@example.com', 'password', 'Martinez', 'Frank', '0765912086', 3),
(132, 'hankjones36@example.com', 'password', 'Jones', 'Hank', '0712971339', 3),
(133, 'charliemartinez37@example.com', 'password', 'Martinez', 'Charlie', '0712313441', 3),
(134, 'charlielopez38@example.com', 'password', 'Lopez', 'Charlie', '0714821437', 3),
(135, 'gracesmith39@example.com', 'password', 'Smith', 'Grace', '0740139036', 3),
(136, 'alicewilson40@example.com', 'password', 'Wilson', 'Alice', '0717658550', 3),
(137, 'bobgarcia41@example.com', 'password', 'Garcia', 'Bob', '0796097000', 3),
(138, 'jackgarcia42@example.com', 'password', 'Garcia', 'Jack', '0715961630', 3),
(139, 'charlielopez43@example.com', 'password', 'Lopez', 'Charlie', '0716255215', 3),
(140, 'gracemartinez44@example.com', 'password', 'Martinez', 'Grace', '0718478076', 3),
(141, 'ivysmith45@example.com', 'password', 'Smith', 'Ivy', '0744357764', 3),
(142, 'dianajones46@example.com', 'password', 'Jones', 'Diana', '0782351858', 3),
(143, 'evejones47@example.com', 'password', 'Jones', 'Eve', '0760140065', 3),
(144, 'evelopez48@example.com', 'password', 'Lopez', 'Eve', '0756857402', 3),
(145, 'alicesmith49@example.com', 'password', 'Smith', 'Alice', '0730299421', 3),
(146, 'hanklopez50@example.com', 'password', 'Lopez', 'Hank', '0748880930', 3),
(147, 'xdress@mail.com', '$2y$10$byOZ4h2VrI46z/0DUQWZeesftnMtN.hFJVkYfLWeaI2iy.FdvB7Eu', 'x', 'x', '0908070405', 3);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
