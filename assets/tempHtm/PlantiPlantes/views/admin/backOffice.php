<?php ob_start(); //Commence l'enregistrement 

?>
<div class="container">
    <!-- User Part | Connection Graph | User List Card | User List Tab -->
    <div class="container ">
        <!-- User Tab-->
        <section class="sectionBo2">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Téléphone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $users = getAllUsers();
                        foreach ($users as $user): ?>
                                <tr>
                                    <td><?= $user['id'] ?></td>
                                    <td><?= $user['email'] ?></td>
                                    <td><?= $user['nom'] ?></td>
                                    <td><?= $user['prenom'] ?></td>
                                    <td><?= $user['tel'] ?></td>
                                    <td>
                                        <a href="<?= URL; ?>?p=updateUserView&id=<?= $user['id'] ?>" class="btn-action btn-mod"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                        <a href="<?= URL; ?>controllers/userCrud/deleteUser.php?id=<?= $user['id'] ?>" class="btn-action btn-supp"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                                    </td>
                                </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Product Tab -->
        <section class="sectionBo4">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Prix</th>
                            <th>Stock</th>
                            <th>Category_id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $product = getAllProducts();
                        $productId = [
                            '1' => 'fleur', 
                            '2' => 'table', 
                            '3' => 'velo'
                        ];
                        foreach ($product as $product): 
                            $productCategory = $productId[$product['category_id']] ?? null;
                        ?>
                                <tr>
                                    <td><?= $product['product_id'] ?></td>
                                    <td><?= $product['name'] ?></td>
                                    <td class="col-description"><?= $product['description'] ?></td>
                                    <td><?= $product['price'] ?></td>
                                    <td><?= $product['stock'] ?></td>
                                    <td><?= $productCategory ?></td>
                                    <td>
                                        <a href="<?= URL; ?>controllers/userCrud/updateUser.php?id=<?= $user['id'] ?>" class="btn-action btn-mod"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                        <a href="<?= URL; ?>controllers/userCrud/deleteUser.php?id=<?= $user['id'] ?>" class="btn-action btn-supp"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                                    </td>
                                </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </section>
        <!-- Form d'ajout -->
        <section class="sectionBo5">
            <!-- Ajout Produit -->
            <div class="form-container">
                <div class="form-wrapper">
                    <h3 class="center"> Ajout product en base de donnée </h3>
                    <form action="index.php?p=addProduct" class="" method="post">
                        <div class="user-box">
                            <input type="text" id="productName" name="productName" required="">
                            <label for="productName">Nom produit</label>
                        </div>
                        <div class="user-box">
                            <input type="text" id="productImage" name="productImage" required="">
                            <label for="productImage">Nom fichier image produit</label>
                        </div>
                        <div class="user-box">             
                            <input type="text" id="productDescription" name="productDescription" required="">
                            <label for="productDescription">description produit</label>  
                        </div>
                        <div class="user-box">               
                            <input type="text" id="productPrice" name="productPrice" required="">
                            <label for="productPrice">Prix produit</label> 
                        </div>

                        <div class="product-box">
                            <div class="radio-group">
                                <div class="radio-item">
                                    <label for="fleur">Fleur</label>
                                    <input type="radio" id="fleur" name="productCat" value="1" required>
                                </div>

                                <div class="radio-item">
                                    <label for="table">Table</label>
                                    <input type="radio" id="table" name="productCat" value="2">
                                </div>

                                <div class="radio-item">
                                    <label for="velo">Velo</label>
                                    <input type="radio" id="velo" name="productCat" value="3">
                                </div>
                            </div>
                        </div>

                        <div class="item-center">
                            <input type="submit" name="bouton" value="push" class="form-btn">
                        </div> 
                    </form>
                </div>    
            </div>
            <!-- Ajout User -->

        </section>
    </div>

</div>

<?php
    $content = ob_get_clean(); //copie l'enregistrement dans la variable content
    $title = "Back Office";
    require('./views/layout/template-fontpage.php');
?>