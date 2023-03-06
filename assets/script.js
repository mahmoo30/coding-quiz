 // QUESTIONS/ANSWERS FOR QUIZ
 let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["a. <js>", "b. <javascript>", "c. <scripting>", "d. <script>"],
        answer: "d. <script>"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["a. numbers and strings", "b. other arrays", "c. booleans", "d. all of the above"],
        answer: "b. other arrays"
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["a. function = myFunction()", "b. function myFunction()", "c. function:myFunction()", "d. createMyFunction()"],
        answer: "b. function myFunction()"
    },
    {
        question: "How to write an IF statement in JavaScript?",
        choices: ["a. if i == 5 then", "b. if i = 5 then", "c. if(i == 5)", "d. if i = 5"],
        answer: "c. if(i == 5)"
    },
    {
        question: "How do you add a comment in a JavaScript?",
        choices: ["a. //This is a comment", "b. <!--This is a comment-->", "c. 'This is a comment", "d. * This is a comment *"],
        answer: "a. //This is a comment"
    },
];

// getElementById FROM THE HTML FILE TO BE USED IN THE JS FILE
// TIMER
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");
// STARTS
var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");
// QUESTION/ANSWER
var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");
// SUMMARY PAGE
var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");
// SCORES
var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");
// HIGHSCORE PAGE
var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

// SETTING INITIAL CONDITIONS BY DEFINING VARIABLES
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

// FUNCTIONS TO RUN CODE
var totalTime = 61;
function newQuiz() { // STARTS QUIZ TIMER
    questionIndex = 0;
    totalTime = 60; // STARTS AT 60 SECONDS AND COUNTS DOWN
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver(); // CALLS gameOver FUNCTION WHEN TIME RUNS OUT
            }
        }
    },1000);

    showQuiz(); // CALLS FUNCTION THAT STARTS THE QUIZ
};

function showQuiz() { // START QUIZ FUNCTION
    nextQuestion(); // CALLS  nextQuestion FUNCTION
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

function checkAnswer(answer) { // FUNCTION WITH IF/ELSE STATEMENTS TO VERIFY THE ANSWER CHOICE FOR EACH QUESTION

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        correctAns++; // SCORE INCREASES BY 1 FOR EACH CORRECT ANSWER
        answerCheck.textContent = "Correct!";
    } else {
        totalTime -= 10; // WRONG ANSWERS DEDUCT 10 SECONDS FROM TOTAL TIME LEFT
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++; // RUNS THE IF/ELSE STATEMENTS ABOVE FOR ALL OF THE QUESTIONS
    
    if (questionIndex < questions.length) {
        nextQuestion(); // RUNS THE nextQuestion FUNCTION FOR REMAINING UNANSWERED QUESTIONS
    } else {
        gameOver(); // IF ALL QUESTIONS ARE ANSWERED, RUNS THE gameOver FUNCTION
    }
}

function optionA() { checkAnswer(0); }
function optionB() { checkAnswer(1); }
function optionC() { checkAnswer(2); }
function optionD() { checkAnswer(3); }


function gameOver() { // FUNCTION RUNS WHEN TIMER RUNS OUT OR ALL QUESTIONS ARE ANSWERED
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    finalScore.textContent = correctAns; // SHOWS FINAL SCORE
}


function storeHighScores(event) {
    event.preventDefault();

    // RETURNS A WINDOW ALERT IF NO INITIAL IS INPUTED
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    // STORES SCORES ON LOCAL STORAGE
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    scoresArray.push(userScore);

    var scoresArrayString = JSON.stringify(scoresArray); // STORES HIGHSCORES AS A STRING IN LOCAL STORAGE
    window.localStorage.setItem("high scores", scoresArrayString);
    
    showHighScores(); // CALLS showHighScores WHICH DISPLAYS THE CURRENT HIGHSCORES
}

var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) { // CHECKS LOCAL STORAGE FOR SAVED HIGHSCORES
        return;
    }

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

// EVENT LISTENERS
startQuizBtn.addEventListener("click", newQuiz); // CALLS THE newQuiz FUNCTION TO RUN WHEN THE startQuizBtn IS CLICKED
choiceA.addEventListener("click", optionA);
choiceB.addEventListener("click", optionB);
choiceC.addEventListener("click", optionC);
choiceD.addEventListener("click", optionD);

submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
    location.reload();
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    localStorage.clear();
});