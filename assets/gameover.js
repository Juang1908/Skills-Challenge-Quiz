var username = document.querySelector("#username")
var saveScoreBtn = document.querySelector("#saveScoreBtn")
var finalResults = document.querySelector("#finalResults")
var mostRecentScore = localStorage.getItem("mostRecentScore")

var highScores = JSON.parse(localStorage.getItem("highScores")) || []

var MAX_HIGH_SCORES = 3

finalResults.innerText = mostRecentScore

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault ()

    var score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)
    
    highScores.sort((a,b) => {
        return navigator.score - a.score
    })

    highScores.splice(3)

    localStorage.setItem("highScores", JSON.stringify(highScores))
    window.location.assign("./index.html")
}
