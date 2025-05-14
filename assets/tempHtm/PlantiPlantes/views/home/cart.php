<?php ob_start(); //Commence l'enregistrement  ?>

<div class="cart-container">
    <h1>Mon Panier</h1>

    <?php if (empty($items)): ?>
    <p>Votre panier est vide.</p>
    <?php else: ?>
    <table class="cart-table">
        <thead>
            <tr>
                <th>Produit</th>
                <th>Qté</th>
                <th>Prix Unitaire</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php $grandTotal = 0; ?>
            <?php foreach ($items as $item): ?>
            <tr>
                <td>
                    <?= htmlspecialchars($item['name']) ?>
                </td>
                <td>
                    <?= $item['quantity'] ?>
                </td>
                <td>
                    <?= number_format($item['price'], 2, ',', ' ') ?> €
                </td>
                <td>
                    <?= number_format($item['total'], 2, ',', ' ') ?> €
                </td>
                <td>
                    <a href="?p=removeFromCart&product_id=<?= $item['product_id'] ?>">Supprimer</a>
                </td>
            </tr>
            <?php $grandTotal += $item['total']; ?>
            <?php endforeach; ?>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3"><strong>Total général</strong></td>
                <td colspan="2"><strong>
                        <?= number_format($grandTotal, 2, ',', ' ') ?> €
                    </strong></td>
            </tr>
        </tfoot>
    </table>
    <?php endif; ?>
</div>

<?php
    $content = ob_get_clean(); //copie l'enregistrement dans la variable content
    $title = "Panier";
    require('./views/layout/template-fontpage.php');
?>