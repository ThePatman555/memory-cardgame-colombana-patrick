let errors = 0;
let codesFlipped = 0;
const codeNames = [
    'binary',
    'c',
    'css',
    'github',
    'html',
    'java',
    'javascript',
    'node',
    'python',
    'sql'
]
let codeSet;
let code1Selected;
let code2Selected;
let gameStart = document.querySelector('#start');
let gameOver = false;

gameStart.addEventListener('click', gameBegins);

//loads the back of cards
window.onload = function () {
    for (let i = 0; i < 20; i++) {
        let newImg = document.createElement('img')
        board.appendChild(newImg)
        newImg.outerHTML = "<img src=/cards/matrix-code.gif>"
    }
};

//clears the board, event listener on button to create the set and display them
function gameBegins() {
    errors = 0;
    document.querySelector('#errors').innerText = errors
    codesFlipped = 0;
    document.querySelector('#board').outerHTML = "<div id='board'></div>";
    shuffleSet();
    displaySet();
    gameStart.style.display = 'none';
};

//concats the array of codes with itself so there are pairs - then randomizes the set upon page load
function shuffleSet() {
    codeSet = codeNames.concat(codeNames);
    codeSet = codeSet.sort((a, b) => 0.5 - Math.random());
};
//creates the board with the 20 items from shuffleSet - will display for 1.5 seconds then call hideSet
function displaySet() {
    let board = document.querySelector('#board');
    for (let i = 0; i < codeSet.length; i++) {
        let newImg = document.createElement('img');
        board.appendChild(newImg);
        newImg.outerHTML = `<img class='${codeSet[i]}' src=/cards/${codeSet[i]}.jpeg>`;
    };
    let images = document.querySelectorAll('img');

    addListener(images, 'click', codeSelect);

    setTimeout(hideSet, 1500);
    setTimeout(timer, 1500);
}
//using timeout will display the cards for 1.5 seconds
function hideSet() {
    let images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
        images[i].src = "/cards/matrix-code.gif"
    };
}

//function used to select two options and make sure they are viable  - calls comparison function after
function codeSelect(e) {
    if (e.target.src.includes('matrix')) {
        if (!code1Selected) {
            code1Selected = e.target;
            code1Selected.src = `/cards/${e.target.className}.jpeg`
        }
        else if (!code2Selected && e.target != code1Selected) {
            code2Selected = e.target;
            code2Selected.src = `/cards/${e.target.className}.jpeg`
            setTimeout(updateList, 750)
        }
    }
}

//compares the two selected options - if same leaves overturned / wrong flips back to cardback -resets code selections to null
function updateList() {
    if (code1Selected.src != code2Selected.src) {
        code1Selected.src = '/cards/matrix-code.gif'
        code2Selected.src = '/cards/matrix-code.gif'
        errors += 1
        document.querySelector('#errors').innerText = errors
    } else {
        codesFlipped = codesFlipped + 2;
    }
    code1Selected = null;
    code2Selected = null;
}

//generates a timer that will kill the game if the player does not finish in time or displays win message if player flips all cards

function timer() {
    let count = 45;
    const timer = setInterval(function () {
        count--
        document.getElementById('timer').innerText = count + " Seconds";

        if (!allFlipped()) {
            if (count === 0) {
                clearInterval(timer);
                gameEnd();
                gameStart.style.display = 'inline-block';
                gameStart.innerText = 'Play Again?'
                alert('You gotta be quicker than that!!')
            }
            if (count <= 10) {
                document.getElementById('timer').style.color = 'red';
            } else {
                document.getElementById('timer').style.color = 'black'
            }
        } else {
            clearInterval(timer);
            gameStart.style.display = 'inline-block';
            gameStart.innerText = 'Play Again?'
            gameEnd();
            alert("You Win!!!")
        }
    }, 1000);

}

function addListener(l, e, f) {
    for (let i = 0; i < l.length; i++) {
        l[i].addEventListener(e, f);
    }
}

//compares the length of the codeSet to the amount of cards flipped - returns true if all are flipped
function allFlipped() {
    if (codesFlipped === codeSet.length) {
        return true
    } else {
        return false
    }
}

function gameEnd() {
    let images = document.querySelectorAll('img');
    for (let i = 0; i < codeSet.length; i++) {
        images[i].removeEventListener('click', codeSelect)
    }
}