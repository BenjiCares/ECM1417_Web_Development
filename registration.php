<?php
include_once 'navbar.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Register</title>
    <style>
        <?php include 'registrationCSS.css' ?>
    </style>
</head>
<body>
<?php $name = "hi" ?>
<div id="main">
    <div id="register">
        <div id="form">
            <p class="text" style="margin-bottom: 10px; margin-top: 0px; font-weight: bold">Register here!</p>
                <div id="form">
                    <div id="input">
                        <label>
                            <input type="text" maxlength="20" placeholder="Enter username here" id="username">
                        </label>
                    </div>
                    <p id="error" class="smallText" style="display: none">Username invalid, try a different one</p>
                    <p class="text">Select your emoji profile picture!</p>
                    <div class = "carousel">
                        <p class="smallText heading">Select your Eye Style</p>
                        <div class="selectSection" id="eyes">
                            <button class = "move-left" id="eml">&#60;</button>
                            <p id="eyesText" class="selected">Normal</p>
                            <button class = "move-right" id="emr">&#62;</button>
                        </div>
                        <p class="smallText heading">Select your Skin Colour</p>
                        <div id="skin" class="selectSection">
                            <button class = "move-left" id="sml">&#60;</button>
                            <p id="skinText" class="selected">Green</p>
                            <button class = "move-right" id="smr">&#62;</button>
                        </div>
                        <p class="smallText heading">Select your Mouth Style</p>
                        <div id="mouth" class="selectSection">
                            <button class = "move-left" id="mml">&#60;</button>
                            <p id="mouthText" class="selected">Smiling</p>
                            <button class = "move-right" id="mmr">&#62;</button>
                        </div>
                    </div>
                    <div id="emoji">
                        <img src='Resources/emoji assets/skin/green.png' id="Image-1" class="image image1">
                        <img src='Resources/emoji assets/mouth/smiling.png' id="Image-2" class="image image2">
                        <img src='Resources/emoji assets/eyes/normal.png' id="Image-3" class="image image3">
                    </div>
            <button id="submit">Register</button>
        </div>
        </div>
    </div>
</div>
<script src="registrationJS.js"></script>
</body>
</html>