let userClickedPattern = []

let gamePattern = []

let buttonColors = ['red', 'green', 'blue', 'yellow']

let started = false

let level = 0

function nextSequence() {
    level++
    userClickedPattern = []
    $('#level-title').text('Level ' + level)
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChoosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChoosenColor)

    $('#' + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChoosenColor)
    animatePress(randomChoosenColor)
}

$('.btn').on('click', function () {
    let userChoosenColor = $(this).attr('id')
    userClickedPattern.push(userChoosenColor)
    playSound(userChoosenColor)
    animatePress(userChoosenColor)
    checkAnswer(userClickedPattern.length - 1)
})


function playSound(name) {
    let audio = new Audio('./sounds/' + name + '.mp3')
    audio.play()
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed')

    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed')
    }, 100)
}

$(document).on('keypress', function () {
    if (!started) {
        $('#level-title').text('Level ' + level)
        nextSequence()
        started = true
    }
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000)
        }
    } else {
        playSound('wrong')
        $('#level-title').text('Game Over, Press any key to restart')
        $('body').addClass('game-over')
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200)
        gameOver()
    }
}

function gameOver(){
    level = 0
    gamePattern = []
    started = !started
}
