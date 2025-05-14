
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>PlantiPlantes - <?php echo $title ?></title>

    <link rel="icon" href="<?= URL_ASSETS; ?>images/leaf.png" type="image/png">
    <link rel="stylesheet" href="<?= URL_ASSETS; ?>css/reset.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <link rel="stylesheet" href="<?= URL_ASSETS; ?>css/style.css">

    <script src="<?= URL_ASSETS;?>js/main.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" defer></script>
    <script src="https://kit.fontawesome.com/81e489c8c5.js" crossorigin="anonymous"></script>
    <script src="<?= URL_ASSETS;?>js/charts.js" defer></script>

</head>
<body>
    <div class="wrapper">
        <header id="header" class="header">
            <div class="navbar-container">
                <div class="logo">
                    <a href="index.php">
                        <svg width="50px" height="50px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" 
                                d="M389.053,126.3A302.909,302.909,0,0,0,280.012,18.15L272,13.516l-8.012,4.634A301.084,301.084,0,0,0,113.4,279.042c0,3.445.06,6.944.177,10.4,1.592,46.856,19.511,86.283,51.82,114.018,24.724,21.225,56.438,34.182,90.607,37.273V496h32V240H256V408.528c-54.064-6.263-107.873-44.455-110.444-120.174-.106-3.095-.16-6.228-.16-9.312A270.286,270.286,0,0,1,272,50.673,270.286,270.286,0,0,1,398.6,279.042c0,3.084-.054,6.217-.16,9.313-2.056,60.573-36.907,97.127-78.444,112.536v33.867a156.188,156.188,0,0,0,58.607-31.3c32.309-27.735,50.228-67.162,51.82-114.017.117-3.456.177-6.955.177-10.4A300.948,300.948,0,0,0,389.053,126.3Z" class="ci-primary"/>
                        </svg>
                    </a>
                </div>
                <nav class="nav-links">
                    <ul>
                        <li><a href="<?= URL; ?>?p=homeFleurs">Fleurs</a></li>
                        <li><a href="<?= URL; ?>?p=homeTables">Tables</a></li>
                        <li><a href="<?= URL; ?>?p=homeVelos">Velos</a></li>
                        <?php if (isConnect()): ?>
                            <li><a href="<?= URL; ?>?p=cart">Panier</a></li>
                        <?php endif; ?>
                        <?php if (isConnect()): ?>
                            <li><a href="<?= URL; ?>?p=compte">Mon espace</a></li>
                        <?php endif; ?>
                        <?php if (isAdmin()): ?>
                            <li><a href="<?= URL; ?>?p=backOffice">Back Office</a></li>
                        <?php endif; ?>
                    </ul>
                </nav>
                <div class="login">
                <?php if (isConnect()): ?>
                    <a href="<?= URL; ?>?p=deconnexion" onclick="return confirm('Etes vous sûr de vouloir vous deconnecter ?')">
                        <svg width="50px" height="50px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" 
                                d="M2 6.5C2 4.01472 4.01472 2 6.5 2H12C14.2091 2 16 3.79086 16 6V7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7V6C14 4.89543 13.1046 4 12 4H6.5C5.11929 4 4 5.11929 4 6.5V17.5C4 18.8807 5.11929 20 6.5 20H12C13.1046 20 14 19.1046 14 18V17C14 16.4477 14.4477 16 15 16C15.5523 16 16 16.4477 16 17V18C16 20.2091 14.2091 22 12 22H6.5C4.01472 22 2 19.9853 2 17.5V6.5ZM18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071L19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071C17.9024 15.3166 17.9024 14.6834 18.2929 14.2929L19.5858 13L11 13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11L19.5858 11L18.2929 9.70711C17.9024 9.31658 17.9024 8.68342 18.2929 8.29289Z" 
                            fill="currentColor" />
                        </svg>
                    </a>
                <?php else: ?>
                    <a href="<?= URL; ?>?p=connexion">
                        <svg fill="currentColor" width="50px" height="50px" viewBox="0 0 128 128" id="Layer_1" version="1.1" xml:space="preserve"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g>
                                <path d="M30,49c0,18.7,15.3,34,34,34s34-15.3,34-34S82.7,15,64,15S30,30.3,30,49z M90,49c0,14.3-11.7,26-26,26S38,63.3,38,49   s11.7-26,26-26S90,34.7,90,49z" />
                                <path d="M24.4,119.4C35,108.8,49,103,64,103s29,5.8,39.6,16.4l5.7-5.7C97.2,101.7,81.1,95,64,95s-33.2,6.7-45.3,18.7L24.4,119.4z" />
                            </g>
                        </svg>
                    </a>
                <?php endif; ?>
                </div>
            </div>
        </header>

        <main id="main" class="">
            
            <?php require("views\user\messageNotif.php"); ?>
            <?php echo $content; ?>

        </main>

        <footer id="footer" class="footer">
            <div class="footer-bar-container">
                <div class="footer-link-wrapper">
                    <div class="footer-el">
                        <div class="title">
                            <i class="fa fa-caret-down fa-2x" aria-hidden="true"></i>
                            <h1>Reseaux</h1>
                        </div>
                        
                        <nav>
                            <ul>
                                <li><a href=""><i class="fa fa-instagram fa-2x" aria-hidden="true"></i></a></li>
                                <li><a href=""><i class="fa fa-github fa-2x" aria-hidden="true"></i></a></li>
                                <li><a href=""><i class="fa fa-twitter fa-2x" aria-hidden="true"></i></a></li>
                                <li><a href=""><i class="fa fa-youtube-play fa-2x" aria-hidden="true"></i></a></li>
                    
                            </ul>
                        </nav>
                    </div>
                    <div class="footer-el">
                    <div class="title">
                            <i class="fa fa-caret-down fa-2x" aria-hidden="true"></i>
                            <h1>Magasin</h1>
                        </div>
                        <nav>
                            <ul>
                                <li><a href="">Fleurs</a></li>
                                <li><a href="">Tables</a></li>
                                <li><a href="">Velos</a></li>
                                <li><a href="">Boutiques</a></li>
                                <li><a href="">A propos</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div class="footer-el">
                    <div class="title">
                            <i class="fa fa-caret-down fa-2x" aria-hidden="true"></i>
                            <h1>Utilisateur</h1>
                        </div>
                        <nav>
                            <ul>
                                <li><a href="">S'enregistrer</a></li>
                                <li><a href="">S'inscrire</a></li>
                                <li><a href="">Liste de voeux</a></li>
                                <li><a href="">Panier</a></li>
                                <li><a href="">Nos produits</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div class="footer-el">
                    <h1>NewLetter</h1>
                    <p>Decouvrez notre newletter.</p>
                    <form action="" method="post">
                        <input type="email" name="" id="">
                        <button type="submit" name="bouton">
                            <i class="fa fa-paper-plane" aria-hidden="true"></i>
                        </button>
                    </form>
                </div>
            </div>
        </footer>
    </div>

    
    
    <script></script>
</body>

</html>