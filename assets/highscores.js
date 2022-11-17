var highScoresList = document.querySelector ("highScoreList")
var highScores = JSON.parse(localStorage.getItem("highscores")) || []

//keep track of high-score with max of 3
highScoresList.innerHTML
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")