<?php
session_start()
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        <?php include 'navbarCSS.css' ?>
    </style>
</head>
<body>
<div class="topNav">
    <a name="home" href="index.php" id="home">Home</a>
    <div class="rightSided">
        <a name="memory" href="pairs.php">Play Pairs</a>
        <?php if (!isset($_SESSION["username"])) { ?>
            <a name="register" href="registration.php">Register</a>
        <?php }
        else { ?>
            <a name="leaderboard" href="leaderboard.php">Leaderboard</a>
            <a name="logout" href="logout.php">Log Out</a>
            <a name="uname" style="font-weight: bold"><?php echo $_COOKIE['username'] ?></a>
            <div id="emoji">
                <img src='Resources/emoji assets/skin/<?php echo $_COOKIE['skin']?>.png' alt="Image 1" class="image image1">
                <img src='Resources/emoji assets/mouth/<?php echo $_COOKIE['mouth']?>.png' alt="Image 2" class="image image2">
                <img src='Resources/emoji assets/eyes/<?php echo $_COOKIE['eyes']?>.png' alt="Image 3" class="image image3">
            </div>
        <?php } ?>
    </div>
</div>
</body>
</html>