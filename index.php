<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    $_SESSION['username'] = "SET";
    header('Location: index.php');
    exit; // Exit to prevent further execution of the script
}
include_once 'navbar.php' ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Index</title>
    <style>
        <?php include 'indexCSS.css' ?>
    </style>
</head>
<body>
<div id="main">
    <div id = "welcome">
        <?php if (!isset($_SESSION["username"])) { ?>
                <p>You are not using a registered session?</p>
                <a href='registration.php'>
                    <p>Register now</p>
                </a>
        <?php }
        else { ?>
                <p>Welcome to Pairs</p>
                <a href='pairs.php'>
                    <button>Click here to play</button>
                </a>
        <?php } ?>
    </div>
</div>
</body>
</html>