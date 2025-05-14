<?php ob_start(); //Commence l'enregistrement  ?>


<div class="home-container">

    <div class="card-lil-wrapper1">
        <?php for ($i = 0; $i < 3; $i++): ?>
            <div class="product-card">
                <?php
                    $category_id = $products[$i]['category_id'];
                    $image_path = get_image_path($category_id, $products[$i]['image']);
                ?>
                <img src="<?php echo $image_path; ?>" alt="Produit" class="product-image">
                <div class="product-details">
                    <h2 class="product-title"><?php echo $products[$i]['name']; ?></h2>
                    <p class="product-description"><?php echo $products[$i]['description']; ?></p>
                    <p class="product-price">€<?php echo number_format($products[$i]['price'], 2); ?></p>
                    <div class="product-card-btn-wrapper">
                        <button class="product-button"><i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
                        <button class="product-button"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        <?php endfor; ?>
    </div>

    <div class="card-lil-wrapper2">
        <div class="product-card2">
            <?php
                $category_id = $products[3]['category_id'];
                $image_path = get_image_path($category_id, $products[3]['image']);
            ?>
            <img src="<?php echo $image_path; ?>" alt="Produit" class="product-image">
            <div class="product-details">
                <h2 class="product-title"><?php echo $products[3]['name']; ?></h2>
                <p class="product-description"><?php echo $products[3]['description']; ?></p>
                <p class="product-price">€<?php echo number_format($products[3]['price'], 2); ?></p>
                <div class="product-card-btn-wrapper">
                    <button class="product-button"><i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
                    <button class="product-button"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
        <div class="product-card">
            <?php
                $category_id = $products[4]['category_id'];
                $image_path = get_image_path($category_id, $products[4]['image']);
            ?>
            <img src="<?php echo $image_path; ?>" alt="Produit" class="product-image">
            <div class="product-details">
                <h2 class="product-title"><?php echo $products[4]['name']; ?></h2>
                <p class="product-description"><?php echo $products[4]['description']; ?></p>
                <p class="product-price">€<?php echo number_format($products[4]['price'], 2); ?></p>
                <div class="product-card-btn-wrapper">
                    <button class="product-button"><i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
                    <button class="product-button"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    </div>

    <div class="card-lil-wrapper4">
        <div class="product-card3">
            <?php
                $category_id = $products[5]['category_id'];
                $image_path = get_image_path($category_id, $products[5]['image']);
            ?>
            <img src="<?php echo $image_path; ?>" alt="Produit" class="product-image">
            <div class="product-details">
                <h2 class="product-title"><?php echo $products[5]['name']; ?></h2>
                <p class="product-description"><?php echo $products[5]['description']; ?></p>
                <p class="product-price">€<?php echo number_format($products[5]['price'], 2); ?></p>
                <div class="product-card-btn-wrapper">
                    <button class="product-button"><i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
                    <button class="product-button"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    </div>

    <div class="card-lil-wrapper3">
        <div class="product-card">
            <?php
                $category_id = $products[6]['category_id'];
                $image_path = get_image_path($category_id, $products[6]['image']);
            ?>
            <img src="<?php echo $image_path; ?>" alt="Produit" class="product-image">
            <div class="product-details">
                <h2 class="product-title"><?php echo $products[6]['name']; ?></h2>
                <p class="product-description"><?php echo $products[6]['description']; ?></p>
                <p class="product-price">€<?php echo number_format($products[6]['price'], 2); ?></p>
                <div class="product-card-btn-wrapper">
                    <button class="product-button"><i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
                    <button class="product-button"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
        <div class="product-card2">
            <?php
                $category_id = $products[7]['category_id'];
                $image_path = get_image_path($category_id, $products[7]['image']);
            ?>
            <img src="<?php echo $image_path; ?>" alt="Produit" class="product-image">
            <div class="product-details">
                <h2 class="product-title"><?php echo $products[7]['name']; ?></h2>
                <p class="product-description"><?php echo $products[7]['description']; ?></p>
                <p class="product-price">€<?php echo number_format($products[7]['price'], 2); ?></p>
                <div class="product-card-btn-wrapper">
                    <button class="product-button"><i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
                    <button class="product-button"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    </div>

    <div class="card-lil-wrapper1">
        <?php for ($i = 8; $i < 11; $i++): ?>
            <div class="product-card">
                <?php
                    $category_id = $products[$i]['category_id'];
                    $image_path = get_image_path($category_id, $products[$i]['image']);
                ?>
                <img src="<?php echo $image_path; ?>" alt="Produit" class="product-image">
                <div class="product-details">
                    <h2 class="product-title"><?php echo $products[$i]['name']; ?></h2>
                    <p class="product-description"><?php echo $products[$i]['description']; ?></p>
                    <p class="product-price">€<?php echo number_format($products[$i]['price'], 2); ?></p>
                    <div class="product-card-btn-wrapper">
                        <button class="product-button"><i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
                        <button class="product-button"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        <?php endfor; ?>
    </div>

</div>


<?php
    $content = ob_get_clean(); //copie l'enregistrement dans la variable content
    $title = "home";
    require('./views/layout/template-fontpage.php');
?>