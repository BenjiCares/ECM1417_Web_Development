const startButton = document.getElementById("start");
const playAgainButton = document.getElementById("playAgain")
const preGameDiv = document.getElementById("startScreen");
const gameDiv= document.getElementById("gameSpace");
const postGameDiv = document.getElementById("endScreen");
const game = document.getElementById("game");
const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const scoreValue = document.getElementById("score");
const roundValue = document.getElementById("round");
const endOfGameScore = document.getElementById("finalScore")
const gameFailure = document.getElementById("gameOver")
const submit = document.getElementById("submitScore")
const eyesArray = ["normal", "closed", "laughing", "long", "rolling", "winking"]
const skinArray = ["green", "red", "yellow"]
const mouthArray = ["smiling", "open", "sad", "straight", "surprise", "teeth"]
const numOfEyes = 6
const numOfSkin = 3
const numOfMouth = 6
let cards;
let cardsSelected;
let cardValues;
let readyNext ;
let round;
let interval,
    timeCount,
    seconds,
    minutes,
    movesLeft,
    scoreCount;
let round1score =0,
    round2score =0,
    round3score=0,
    round4score=0,
    round5score=0,
    round6score=0,
    round7score=0,
    round8score=0,
    round9score=0,
    round10score=0;
gameDiv.style.display = "none";
preGameDiv.style.display = "flex";
function StartGame(){
    gameDiv.style.display = "block";
    preGameDiv.style.display = "none";
    postGameDiv.style.display = "none";
    cardsSelected = [];
    cardValues = [];
    readyNext = true;
    round = 1;
    timeCount = -1;
    seconds = -1;
    minutes = 0;
    movesLeft = 16;
    scoreCount = 0;
    timeGenerator();
    interval = setInterval(timeGenerator, 1000);
    movesCounter(false);
    roundValue.innerHTML = `<span>Round One</span>`;
    roundSetup(3, 2);
    scoreValue.innerHTML = `<span>Score: </span>${scoreCount}`;
}
const timeGenerator = () => {
    timeCount += 1;
    seconds += 1;
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time: </span>${minutesValue}:${secondsValue}`;
};
const movesCounter = (roundComplete) => {
    movesLeft -= 1;
    moves.innerHTML = `<span>Moves: </span>${movesLeft}`;
    if(movesLeft == 0 && roundComplete==false){
        postGame(true);
    }
};


function roundSetup(sets, noPerSet){
    let width = sets * 130;
    game.style.width = width + "px";
    let usedEmojis1 = [];
    for (let y = sets; y > 0 ; y--){
        let reused = true
        while(reused) {
            console.log("loop")
            let e = (Math.floor(Math.random() * (numOfEyes)));
            let s = (Math.floor(Math.random() * (numOfSkin)));
            let m = (Math.floor(Math.random() * (numOfMouth)));
            if (!usedEmojis1.some(list => JSON.stringify(list) === JSON.stringify([e, s, m]))) {
                console.log([e, s, m]);
                console.log(usedEmojis1[0]);
                console.log(usedEmojis1[1]);
                usedEmojis1.push([e, s, m]);
                reused = false
            }
        }
    }
    let usedEmojis = [];
    for (let n = noPerSet; n > 0; n--){
        usedEmojis = usedEmojis.concat(usedEmojis1);
    }
    console.log(usedEmojis);
    let amountOfEmojis = usedEmojis.length
    for (let x = 0; x < amountOfEmojis; x++) {
        let emojiNum = Math.floor(Math.random() * (amountOfEmojis - x));
        console.log(emojiNum)
        let emoji = usedEmojis[emojiNum];
        let ey = eyesArray[emoji[0]]
        let sk = skinArray[emoji[1]]
        let mo = mouthArray[emoji[2]]
        console.log(ey)
        console.log(sk)
        console.log(mo)
        usedEmojis.splice(emojiNum, 1);
        game.innerHTML += `\
         <div class="card unFlipped unMatched" id="`+x+`" data-card-value="` +emoji+ `">\
            <div class="card-before"></div>\
            <div class="card-after">
                <img src='Resources/emoji assets/skin/`+sk+`.png' class="imagePart imageSkin" alt="">
                <img src='Resources/emoji assets/eyes/`+ey+`.png' class="imagePart imageEyes" alt="">
                <img src='Resources/emoji assets/mouth/`+mo+`.png' class="imagePart imageMouth" alt="">
            </div>\
         </div>`;
        cards = document.querySelectorAll(".card")
        cards.forEach((card) =>{
            card.addEventListener("click", () =>{
                if (readyNext){
                if (!card.classList.contains("flipped")){  //If card isn't already flipped
                    card.classList.remove("unFlipped");
                    card.classList.add("flipped"); //Flips it
                    cardsSelected.push(card);  //Adds it to list of selected cards
                    console.log(cardsSelected);
                    if (cardsSelected.length < noPerSet){ //If the list is not full it means that they have not selected enough cards to know if correct, only if wrong
                        movesCounter(false);
                        cardValues = Array.from(cardsSelected, card => card.dataset.cardValue); //Gets the dataset values from all the cards
                        let matched = cardValues.every(value => value === cardValues[0]); //Checks if the list is matching
                        if (!matched){
                            readyNext = false;
                            setTimeout(function() {
                                cardsSelected.forEach((selectedCard) => {
                                    selectedCard.classList.remove("flipped");
                                    selectedCard.classList.add("unFlipped"); //if not a match unFlips them all after half a second
                                    readyNext = true;
                                })
                                cardsSelected = [];
                            }, 300)
                        }
                    }
                    else{ //If the amount of cards in a set are flipped (e.g. if 2 cards are flipped and its sets of 2)
                        cardValues = Array.from(cardsSelected, card => card.dataset.cardValue); //Gets the dataset values from all the cards
                        let matched = cardValues.every(value => value === cardValues[0]); //checks if all cards match
                        if(matched){
                                cardsSelected.forEach((selectedCard) =>{
                                selectedCard.classList.remove("unMatched");
                                selectedCard.classList.add("Matched"); //if so makes em all matched
                                })
                                let completed = Array.from(cards).every(div => div.classList.contains("Matched")); //checks if all cards are matched
                                movesCounter(completed);
                                if(completed) {
                                    roundComplete(round)
                                }
                            cardsSelected = [];

                        }
                        else{
                            movesCounter(false);
                            readyNext = false;
                            setTimeout(function() {
                                cardsSelected.forEach((selectedCard) => {
                                    selectedCard.classList.remove("flipped");
                                    selectedCard.classList.add("unFlipped"); //if not a match unFlips them all after half a second
                                    readyNext = true;
                                })
                                cardsSelected = [];
                            }, 300)

                    }
                }
            }}

        })
    })

}}

function roundComplete(prevRound){
    setTimeout(function (){
    round = prevRound+=1;
    roundValue.innerHTML = `<span>Round: </span>${round}`;
    cardsSelected = [];
    cards = document.querySelectorAll(".card");
    cards.forEach((card) =>{
        game.removeChild(card);
    })
    switch (round){
        case 2:
            roundValue.innerHTML = `<span>Round Two</span>`;
            if(timeCount <= 10){
                round1score = Math.trunc(movesLeft * 1.25);
            }
            else round1score = movesLeft;
            scoreCount += round1score;
            timeCount = 0;
            movesLeft = 21
            scoreValue.innerHTML = `<span>Score: </span> ${scoreCount}`;
            movesCounter()
            roundSetup(4, 2);
            break;
        case 3:
            roundValue.innerHTML = `<span>Round Three</span>`;
            if(timeCount <= 15){
                round2score = Math.trunc(movesLeft * 1.25)
            }
            else round2score = movesLeft;
            scoreCount += round2score;
            timeCount = 0;
            movesLeft = 31
            scoreValue.innerHTML = `<span>Score: </span> ${scoreCount}`;
            movesCounter()
            roundSetup(5, 2);
            break;
        case 4:
            roundValue.innerHTML = `<span>Round Four</span>`;
            if(timeCount <= 25){
                round3score = Math.trunc(movesLeft * 1.25);
            }
            else round3score = movesLeft
            scoreCount += round3score;
            timeCount = 0;
            movesLeft = 41
            scoreValue.innerHTML = `<span>Score: </span> ${scoreCount}`;
            movesCounter()
            roundSetup(6, 2);
            break;
        case 5:
            roundValue.innerHTML = `<span>Round Five</span>`;
            if(timeCount <= 35){
                round4score = Math.trunc(movesLeft * 1.25);
            }
            else round4score = movesLeft
            scoreCount += round4score;
            timeCount = 0;
            movesLeft = 51
            scoreValue.innerHTML = `<span>Score: </span> ${scoreCount}`;
            movesCounter()
            roundSetup(4, 3);
            break;
        case 6:
            roundValue.innerHTML = `<span>Round Six</span>`;
            if(timeCount <= 45){
                round5score = Math.trunc(movesLeft * 1.25)
            }
            else round5score = movesLeft
            scoreCount += round5score;
            timeCount = 0;
            movesLeft = 76
            scoreValue.innerHTML = `<span>Score: </span> ${scoreCount}`;
            movesCounter()
            roundSetup(5, 3);
            break;
        case 7:
            roundValue.innerHTML = `<span>Round Seven</span>`;
            if(timeCount <= 55){
                round6score = Math.trunc(movesLeft * 1.25)
            }
            else round6score = movesLeft
            scoreCount += round6score;
            timeCount = 0;
            movesLeft = 101
            scoreValue.innerHTML = `<span>Score: </span> ${scoreCount}`;
            movesCounter()
            roundSetup(6, 3);
            break;
        case 8:
            roundValue.innerHTML = `<span>Round Eight</span>`;
            if(timeCount <= 75){
                round7score = Math.trunc(movesLeft * 1.25)
            }
            else round7score = movesLeft
            scoreCount += round7score;
            timeCount = 0;
            movesLeft = 151
            scoreValue.innerHTML = `<span>Score: </span> ${scoreCount}`;
            movesCounter()
            roundSetup(4, 4);
            break;
        case 9:
            roundValue.innerHTML = `<span>Round Nine</span>`;
            if(timeCount <= 100){
                round8score = Math.trunc(movesLeft * 1.25)
            }
            else round8score = movesLeft
            scoreCount += round8score;
            timeCount = 0;
            movesLeft = 201
            scoreValue.innerHTML = `<span>Score: </span> ${scoreCount}`;
            movesCounter()
            roundSetup(5, 4)
            break;
        case 10:
            roundValue.innerHTML = `<span>Round Ten</span>`;
            if(timeCount <= 130){
                round9score = Math.trunc(movesLeft * 1.25)
            }
            else round9score = movesLeft
            scoreCount += round9score;
            timeCount = 0;
            movesLeft = 251
            scoreValue.innerHTML = `<span>Score: </span> ${scoreCount}`;
            movesCounter()
            roundSetup(6, 4);
            break;
        default:
            if(timeCount <= 160){
                round10score = Math.trunc(movesLeft * 1.25)
            }
            else round10score = movesLeft
            scoreCount += round10score;
            postGame(false);
            break;
    }}, 300)
}

function postGame(gameFailed){
    for (let i = 0; i < cards.length; i++) {
        cards[i].remove();
    }
    gameDiv.style.display = "none";
    preGameDiv.style.display = "none";
    postGameDiv.style.display = "flex";
    if(gameFailed){
        gameFailure.style.display = "block"
        endOfGameScore.innerHTML = `<span>Final Score:</span> ${scoreCount}`;
    }
    else{
        gameFailure.style.display = "none"
        endOfGameScore.innerHTML = `<span>Final Score:</span> ${scoreCount}`;
    }

}

function getCookieValue(cookieName){
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
            return cookie.substring(cookieName.length + 1);
        }
    }
}
function submitScores(){
            let xhr2 = new XMLHttpRequest();
            let Scores = "{" + String([scoreCount, round1score, round2score, round3score, round4score, round5score, round6score, round7score, round8score, round9score, round10score, getCookieValue("username")]) + "}, "
            console.log(Scores)
            xhr2.open("POST", "leaderboard.php", true);
            xhr2.setRequestHeader("Content-Type", "text/plain");
            xhr2.onreadystatechange = function() {
                if (xhr2.readyState === 4 && xhr2.status === 200) {
                    console.log("Data sent successfully!")
                    window.location.href = "leaderboard.php"
                }
            };
            xhr2.send(Scores);
}
playAgainButton.addEventListener("click", StartGame);
startButton.addEventListener("click", StartGame);
submit.addEventListener("click", submitScores)
