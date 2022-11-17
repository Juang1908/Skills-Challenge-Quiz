var question = document.querySelector("#question");
var choices = Array.from(document.querySelectorAll(".choice-text"));
var progressText = document.querySelector("#progressText");
var scoreText = document.querySelector("#score");
var progressBarFull = document.querySelector("#progressBarFull");

var timerEL = document.getElementById("timer");

var currentQuestion = {}
var acceptingAnswers = true
var score = 0
var questionCounter = 0
var availableQuestions = []
// beginning of questions and answers
var questions= [
    {
        question: "How many months do we have in a year?",
        choice1: "1",
        choice2: "5",
        choice3: "10",
        choice4: "12",
        answer: 4,
    },

    {
        question: "How many days do we have in a week?",
        choice1: "7",
        choice2: "5",
        choice3: "10",
        choice4: "1",
        answer: 1,
    },

    {
        question: "How many days are in a year?",
        choice1: "1",
        choice2: "365",
        choice3: "366",
        choice4: "12",
        answer: 2,
    },

    {
        question: "What comes after 6?",
        choice1: "1",
        choice2: "5",
        choice3: "7",
        choice4: "12",
        answer: 3,
    }
]
// how to score right and wrong answers
var SCORE_POINTS = 25
var MAX_QUESTIONS = 4
// beginning of game counter
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score)
    return window.location.assign("./gameover.html")
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    
    choices.forEach(choice => {
        var number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e =>{
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset["number"]

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" :
        "incorrect"

        if(classToApply === "correct") {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)


    })
})
// timer
function countDown(){
var timeLeft = 25;
var timeInterval = setInterval (function(){
    if(timeLeft > 0){
timerEL.textContent = timeLeft + " seconds remaining";
    timeLeft--;
} else {
    timerEL.textContent = "TIME'S UP!!!";
    clearInterval(timeInterval);
}
}, 1000)
}
countDown();


incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()