<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // read the POST data
    $data = file_get_contents('php://input');
    $handle = fopen('Resources/leaderboard.txt', "a");
    fwrite($handle, $data);
    fclose($handle);


}
include_once 'navbar.php' ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        <?php include 'leaderboardCSS.css' ?>
    </style>
    <title>Leaderboard</title>
</head>
<body>
<div id="main">
    <div id="leaderboard-wrapper">
        <div id="leaderboard">
            <table>
                <thead id="header">
                <tr>
                    <th>TOTAL</th>
                    <th>Round 1</th>
                    <th>Round 2</th>
                    <th>Round 3</th>
                    <th>Round 4</th>
                    <th>Round 5</th>
                    <th>Round 6</th>
                    <th>Round 7</th>
                    <th>Round 8</th>
                    <th>Round 9</th>
                    <th>Round 10</th>
                    <th>USERNAME</th>
                </tr>
                </thead>
                <tbody id="tableBody">
                </tbody>
            </table>
        </div>
    </div>
</div>
<script src="leaderboardJS.js"></script>
</body>
</html>