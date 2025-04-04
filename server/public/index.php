<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php
    $dev = true;
    if (!$dev) {
        $manifest = json_decode(file_get_contents('./assets/.vite/manifest.json'), true);
    ?>
        <script src="/assets/<?= $manifest['resources/main.js']['file'] ?>" type="module"></script>
        <link rel="stylesheet" href="/assets/<?= $manifest['resources/main.css']['file'] ?>">
    <?php
    } else {
    ?>
        <script src="http://localhost:5173/assets/@vite/client" type="module"></script>
        <script src="http://localhost:5173/assets/resources/main.js" type="module"></script>
    <?php
    }
    ?>



</head>

<body>
    <p>Ceci est mon site php <?= date('d/m/y') ?></p>
</body>

</html>