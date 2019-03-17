let btnRollX = document.getElementById('btn-dice-roll-x');
let btnSaveX = document.getElementById('btn-save-x');
let btnRollY = document.getElementById('btn-dice-roll-y');
let btnSaveY = document.getElementById('btn-save-y');
let btnNewGame = document.getElementById('btn-new-game');

let divNumberX = document.getElementById('div-number-x');
let divMovePointsX = document.getElementById('div-move-points-x');
let divAllPointsX = document.getElementById('div-all-points-x');

let divNumberY = document.getElementById('div-number-y');
let divMovePointsY = document.getElementById('div-move-points-y');
let divAllPointsY = document.getElementById('div-all-points-y');

let currentUserId = 0;
let currentUserScores = 0;

let users = {
    0 : {
        userScores : 0,
        divNumber : divNumberX,
        divMovePoints : divMovePointsX,
        divAllPoints : divAllPointsX,
        btnRoll : btnRollX,
        btnSave : btnSaveX,
        playerName: 'player-1'
    },
    1 : {
        userScores : 0,
        divNumber : divNumberY,
        divMovePoints : divMovePointsY,
        divAllPoints : divAllPointsY,
        btnRoll : btnRollY,
        btnSave : btnSaveY,
        playerName: 'player-2'
    }
};

let bones = document.querySelectorAll('.my-flex-container .my-flex-block .bones img');
let arr = [...bones]; // convert nodelist to array

function removeShowedClass() {
    arr.forEach( item => item.classList.remove('showed') );
}

function enableCurrentUserButttons() {
    users[currentUserId].btnRoll.disabled = false;
    users[currentUserId].btnSave.disabled = false;
}

function disableCurrentUserButttons() {
    users[currentUserId].btnRoll.disabled = true;
    users[currentUserId].btnSave.disabled = true;
}

function changeActiveUser() {
    disableCurrentUserButttons();
    currentUserId = currentUserId === 0 ? 1 : 0;
    enableCurrentUserButttons();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function roll(userId) {
    btnNewGame.disabled = false;
    removeShowedClass();
    let currUser = users[userId];
    let currentNumber = getRandomInt(1, 6);
    currUser.divNumber.innerHTML = `This roll points =  ${currentNumber}`;
    
    if (currentNumber === 1) {
        currentUserScores = 0;
        currUser.divNumber.innerHTML = `This roll points = 0`;
        currUser.divMovePoints.innerHTML = 'This move points = 0';
        toast('Oops, it\'s 1.', 'Next player turn.', 'one', 3000);
        toast(`${currUser.playerName}`, 'Oops, it\'s 1.', currUser.playerName, 20000);
        changeActiveUser();
    } else {
        currentUserScores += currentNumber;
        currUser.divMovePoints.innerHTML = `This move points = ${currentUserScores}`;
        toast(`${currUser.playerName}`, `You have -  ${currentNumber}`, currUser.playerName, 20000);
    }
    arr[currentNumber].classList.add('showed');
}

function save(userId) {
    let currUser = users[userId];
    currUser.userScores += currentUserScores;
    currUser.divAllPoints.innerHTML = `All points = ${currUser.userScores}`;

    if (currUser.userScores >= 100) {
        toast('You win!', `Your score = ${currUser.userScores}`, 'win', 10000);
        modal.open();
        disableCurrentUserButttons();
    } else {
        toast('Next player turn.', 'You save points.', 'save', 3000);
        toast(`${currUser.playerName} score - ${currUser.userScores}`, 
              `This move points = ${currentUserScores}`, currUser.playerName, 20000);
        changeActiveUser();
    }
    currentUserScores = 0;
    currUser.divNumber.innerHTML = 'This roll points = 0';
    currUser.divMovePoints.innerHTML = 'This move points = 0';
}

function btnRestart() {
    for (i = 0; i < Object.keys(users).length; i++) { 
        users[i].divNumber.innerHTML = 'This roll points = 0';
        users[i].divMovePoints.innerHTML = 'This move points = 0';
        users[i].userScores = 0;
        users[i].divAllPoints.innerHTML = 'All points = 0';
    }
    changeActiveUser();
    btnNewGame.disabled = true;
}

function btnRoll() {
    roll(currentUserId);
}

function btnSave() {
    save(currentUserId);
}

function toast(title, text, type, timeout) {
    VanillaToasts.create({
        title,
        text,
        type,
        timeout
    });
}

btnRollX.addEventListener('click', btnRoll);
btnRollY.addEventListener('click', btnRoll);

btnSaveX.addEventListener('click', btnSave);
btnSaveY.addEventListener('click', btnSave);

btnNewGame.addEventListener('click', btnRestart);

let modal = new tingle.modal({  // instanciate new modal
    footer : true,
    closeMethods : ['overlay', 'button', 'escape'],
    cssClass : ['custom-class-1', 'custom-class-2']
});

modal.setContent('<h1>You win bro !!!</h1>');  // set content
modal.addFooterBtn('Close', 'tingle-btn tingle-btn--primary', () => modal.close() ); // add btn
