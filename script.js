const RULES = document.querySelector('.rules')
const BODY = document.querySelector('body')
const CIRCLE = document.querySelectorAll('.circle ')
const BOARD = document.querySelector('.board')
const SCORE = document.querySelector('.score h2')
let itemArray = ['paper', 'rock', 'scissors']
let result = 0

let randomItem = () => {
    let randomNumber = Math.floor(Math.random() * 3)
    return itemArray[randomNumber]
}

const openRules = () => {
    const div = document.createElement('div')
    div.classList.add('rules-div')
    div.innerHTML = `<div class="rules-header">RULES<button onclick="closeRules()"><img src="./images/icon-close.svg" alt=""></button></div>`
    BODY.appendChild(div)
    RULES.removeEventListener('click', openRules)
}

const closeRules = () => {
    const div = document.querySelector('.rules-div')
    BODY.removeChild(div)
    RULES.addEventListener('click', openRules)
}

const activBoard = (e) => {
    BOARD.innerHTML = ''
    BOARD.style.paddingTop = 0;
    BOARD.style.width = '100%';
    const div = document.createElement('div')
    div.classList.add('activ-div')
    div.innerHTML = `
<div class="left-header">
<h4>you picked</h4>
<div class="circle" style="position:static"  id="${e.target.id}"></div>
</div>
<div class="central">
<div class="central-header" ></div>
<div class="buttonPlay" onclick="endGame()"></div>
</div>
<div class="right-header">
<h4>the hause picked</h4>
<div class="circle" style="position:static"  id="${randomItem()}"></div>
</div>
`
    BOARD.appendChild(div)
    setTimeout(() => {
        document.querySelector('.central-header').innerHTML = compare()
    }, 1200);
    setTimeout(() => {
        document.querySelector('.buttonPlay').innerHTML = 'PLAY AGAIN';
        document.querySelector('.buttonPlay').style.padding = '0.5rem 1rem'
    }, 1200);
}

const compare = () => {

    let playerChoice = document.querySelector('.left-header .circle ').id
    let computerChoice = document.querySelector('.right-header .circle ').id
    if (playerChoice === computerChoice) {
        return 'DRAW'
    }
    if (playerChoice === 'paper') {
        if (computerChoice === 'rock') {
            result++
            SCORE.innerHTML = result
            return 'YOU WIN'
        } else {
            result--
            SCORE.innerHTML = result
            return 'YOU LOSE'
        }
    }
    if (playerChoice === 'rock') {
        if (computerChoice === 'scissors') {
            result++
            SCORE.innerHTML = result
            return 'YOU WIN'
        } else {
            result--
            SCORE.innerHTML = result
            return 'YOU LOSE'
        }
    }
    if (playerChoice === 'scissors') {
        if (computerChoice === 'paper') {
            result++
            SCORE.innerHTML = result
            return 'YOU WIN'
        } else {
            result--
            SCORE.innerHTML = result
            return 'YOU LOSE'
        }
    }
}

const endGame = () => {
    BOARD.removeChild(document.querySelector('.activ-div'))
    BOARD.style.width = '25rem'
    BOARD.style.paddingTop = '10%';
    BOARD.innerHTML = ` <div class="triangle"></div>
    <div class="circle" id="paper" onclick="activBoard(event)"></div>
    <div class="circle" id="scissors" onclick="activBoard(event)"></div>
    <div class="circle" id="rock" onclick="activBoard(event)"></div>`
}

RULES.addEventListener('click', openRules)

CIRCLE.forEach(circle => {
    circle.addEventListener('click', activBoard)
})