// // variables with query selectors

// create a button variable
var startBtn = document.getElementById("start");

// create timer variables
var timerEl = document.getElementById("timer");
var questionsEl = document.getElementById("questions");
var optionsEl = document.getElementById("options");
var submitEl = document.getElementById("button");
var initialsEl = document.getElementById("initials");

var questionIndex = 0;
var timeLeft = 100;

function countdown() {
    // setInterval can call to start a new question after 1000 milliseconds

    var timeInterval = setInterval(function() {
    if (timeLeft > 1) {
        timerEl.textContent = timeLeft + ' seconds remaining ';
        timeLeft--;
    } else if (timeLeft === 1) {
        timeLeft--;
    } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
    }
}, 1000);
}

// Make question array

var questions = [
   { title: "The condition in an if/else statement is enclosed with_________",
    options: [ 
        'Quotes',
        'Curly brackets',
        'Parenthesis',
        'Square brackets'
    ],
    correctAnswer: "Curly brackets"
    },

    { title: "Commonly used data types DO not include:",
    options: [
        'Strings',
        'Booleans',
        'Alerts',
        'Numbers'
    ],
    correctAnswer: "Booleans"
},

{ title: "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
        
        'JavaScript',
        'terminal/bash',
        'for loops',
        'console.log'
    ],
    correctAnswer: "for loops"
},

{ title: "String values must be enclosed within _______ when being assigned to variables.",
    options: [
        'Commas',
        'Quotes',
        'Parenthesis',
        'Curly brackets'
    ],
    correctAnswer: "Parenthesis"
},

{ title: "Arrays in JavaScript can be used to store _________",
    options: [
        'Numbers and Strings',
        'Other arrays',
        'Booleans',
        'All of the above'
    ],
    correctAnswer: "All of the above"
},

]

function quizStart() {
    var startScreen = document.getElementById("startScreen");
    startScreen.setAttribute("class", "hidden");
    // questionsEl.removeAttribute("class");

    countdown();
    askQuestions();
}

function askQuestions () {
    
    var currentQuestion = questions [questionIndex];
    var questionTitle = document.getElementById("title");
    questionTitle.textContent = currentQuestion.title

    optionsEl.innerHTML = "";

    currentQuestion.options.forEach(function(option) {
        var button = document.createElement("button");
        button.setAttribute("class", "option")
        button.setAttribute("value", option)
        button.textContent = option

        // remember to put onClick here
        button.onclick = checkAnswer;

        optionsEl.appendChild(button);
    })
}

function checkAnswer() {
    if (this.value !== questions[questionIndex].correctAnswer) {
        timeLeft -= 15
        if (timeLeft < 0) {
            timeLeft = 0
        }
       timerEl.textContent = timeLeft 
    }
    else {
        console.log("correct");
    }
    questionIndex++

    if (questionIndex === questions.length) {
        endQuiz();
    } else {
        askQuestions();
    }
}

function endQuiz () {
    var endscreenEl = document.getElementById("endscreen");
    endscreenEl.removeAttribute("class");

    var finalScore = document.getElementById("finalScore");
    finalScore.textContent = timeLeft 
    questionsEl.setAttribute("class", "hidden");
}

function highScore () {
    var initials = initialsEl.value.trim();
    if (initials !== "") {
        var localHighScores = JSON.parse(localStorage.getItem("highscores")) || [];

        var newScore = {
            score: timeLeft,
            initials: initials
        }

        localHighScores.push(newScore)
        localStorage.setItem("highscores", JSON.stringify(localHighScores))
    }
}

startBtn.onclick=quizStart

submitEl.onclick=highScore



