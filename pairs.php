<?php include_once 'navbar.php' ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        <?php include 'pairsCSS.css' ?>
    </style>
    <title>Pairs Game</title>
</head>
<body>
<?php include_once 'navbar.php';
?>
<div id="main">
    <div class="gameSpace" id="gameSpace">
        <div id="stats">
            <div id="round"></div>
            <div id="moves-count"></div>
            <div id="time"></div>
            <div id="score"></div>
        </div>
        <div id="game"></div>
    </div>
    <div class = "startScreen" id="startScreen">
        <button id="start">START</button>
    </div>
    <div class = "endScreen" id="endScreen" style="display: none">
        <p id = "gameOver">You are out of moves!</p>
        <p id = "finalScore"></p>
        <button id="playAgain">PLAY AGAIN</button>
        <?php if (isset($_SESSION["username"])) { ?>
        <button id="submitScore">SUBMIT SCORE?</button>
        <?php }?>
    </div>
</div>
<script src="pairsJS.js"></script>
</body>
</html>