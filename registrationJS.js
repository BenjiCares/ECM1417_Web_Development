const eyesLeft = document.getElementById("eml")
const eyesRight = document.getElementById("emr")
const skinLeft = document.getElementById("sml")
const skinRight = document.getElementById("smr")
const mouthLeft = document.getElementById("mml")
const mouthRight = document.getElementById("mmr")
const eyes = document.getElementById("eyesText")
const skin = document.getElementById("skinText")
const mouth = document.getElementById("mouthText")
const eyesIMG = document.getElementById("Image-3")
const skinIMG = document.getElementById("Image-1")
const mouthIMG = document.getElementById("Image-2")
const usernameBox = document.getElementById("username")
const submitButton = document.getElementById("submit")
const errorMsg = document.getElementById("error")
const eyesArray = ["Normal", "Closed", "Laughing", "Long", "Rolling", "Winking"]
const skinArray = ["Green", "Red", "Yellow"]
const mouthArray = ["Smiling", "Open", "Sad", "Straight", "Surprise", "Teeth"]
const notAllowed= ["”", "!",  "@",  "#", "%", "&", "*", "(", ")", "+", "=", "ˆ", "{", "}", "[", "]", "—", ";", ":", "“", "’", "<", ">", "?", "/", " "]
let eyesPointer = 0
let skinPointer = 0
let mouthPointer = 0
let username = ""

function move(shift, array, pointer, partToChange, IMG, type){
    let endPointer = array.length - 1;
    if(pointer == 0 && shift == -1){
        pointer = endPointer
    }
    else if(pointer == endPointer && shift == 1){
        pointer = 0
    }
    else{
        pointer += shift
    }
    console.log(array[pointer])
    partToChange.innerHTML = array[pointer]
    IMG.src = 'Resources/emoji assets/'+type+'/'+array[pointer].toLowerCase()+'.png'
    return pointer
}

function submitData(){
    let valid = true
    let usernameBox = document.getElementById("username")
    username = usernameBox.value
    for (let i = 0; i < notAllowed.length; i++) {
        if (username.includes(notAllowed[i])) {
            valid = false
        }
    }
    if(username === ""){
        valid = false
    }
    if(valid) {
        document.cookie = `username=${username}`
        document.cookie = `eyes=${eyesArray[eyesPointer].toLowerCase()}`
        document.cookie = `mouth=${mouthArray[mouthPointer].toLowerCase()}`
        document.cookie = `skin=${skinArray[skinPointer].toLowerCase()}`
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'index.php', true);
        xhr.withCredentials = true; // Set to true to send cookies
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                window.location.href = "index.php"
            } else {
                console.error('Error:', xhr.statusText);
            }
        };
        xhr.send();
    }
    else{
        errorMsg.style.display = "block"
    }
}

eyesLeft.addEventListener("click", function(){eyesPointer = move(-1, eyesArray, eyesPointer, eyes, eyesIMG, "eyes")})
eyesRight.addEventListener("click", function(){eyesPointer = move(1, eyesArray, eyesPointer, eyes, eyesIMG, "eyes")})
skinLeft.addEventListener("click", function(){skinPointer = move(-1, skinArray, skinPointer, skin, skinIMG, "skin")})
skinRight.addEventListener("click", function(){skinPointer = move(1, skinArray, skinPointer, skin, skinIMG, "skin")})
mouthLeft.addEventListener("click", function(){mouthPointer = move(-1, mouthArray, mouthPointer, mouth, mouthIMG, "mouth")})
mouthRight.addEventListener("click", function(){mouthPointer = move(1, mouthArray, mouthPointer, mouth, mouthIMG, "mouth")})
submitButton.addEventListener("click", submitData)