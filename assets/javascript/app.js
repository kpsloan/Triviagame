var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Who was the first US billionaire?", "What animal is on the cover of the Beach Boys album Pet Sounds?", "Which is a small flightless bird and the national symbol of New Zealand?", "How many points is the red inner circle on a dartboard worth?", "What percentage of air is comprised of Nitrogen?", "What Beatles song repeats the title in the lyrics 41 times?", "Barry Allen was the alter ego of which comic book superhero?", "The US Republican party was originally established to fight for what cause?", "What was the name of the political police in Nazi Germany?", "What is the largest rodent in the US?", "'Panther Cap' 'Stinkhorn' and 'Penny Bun' are all types of what?", "How many players are in the water for each team in a water polo game?", "What pastime does Jeff 'The Dude' Lebowski enjoy?", "Proteus orbits what planet of the solar system?", "What is the Shaddock a variety of?", "What is the third largest National Park in the lower 48 of the US?", "What sense is most closely linked to memory?", "In The Simpsons, which character has a pacemaker?", "What animal head appears on the handle of Mary Poppins umbrella?", "What superhero has enemies that include the Joker, the Penguin and the Riddler?"];
var answerArray = [["John D. Rockerfeller", "Bill Gates", "Henry Ford", "Andrew Carnegie"], ["A cow", "A goat", "A dog", "A cat"], ["Penguin", "Kiwi", "Cassowary", "Moa"], ["100", "75", "50", "25"], ["88%", "78%", "68%", "58%"], ["Hey Jude", "I Want to Hold Your Hand", "I Am the Walrus", "Let It Be"], ["Superman", "Deadpool", "The Flash", "Aquaman"], ["Ending slavery", "Prohibition", "Separation of Church and State", "Westward expansion"], ["Gestapo", "Polizei", "Totenkopf", "Schutzstaffel"], ["The weasel", "The rabbit", "The rat", "The beaver"], ["Tea", "Shoe", "Fungi", "Horse"], ["8", "7", "6", "5"], ["Bowling", "Golf", "Ultimate Frisbee", "Badminton"], ["Neptune", "Saturn", "Uranus", "Jupiter"], ["Potato", "Citrus", "Mushroom", "Sausage"], ["Everglades National Park", "Glacier National Park", "Death Valley National Park", "Yellowstone National Park"], ["Sight", "Smell", "Sound", "Taste"], ["Homer Simpson", "Apu Nahasapeemapetilon", "Krusty the Clown", "Moe Szyslak"], ["A racoon", "A penguin", "A bear", "A parrot"], ["Batman", "Superman", "Spiderman", "Ironman"]];
var correctAnswer = ["A. John D. Rockerfeller", "B. A goat", "B. Kiwi", "C. 50", "B. 78%", "D. Let It Be", "C. The Flash", "A. Ending slavery", "A. Gestapo", "D. The beaver", "C. Fungi", "B. 7", "A. Bowling", "A. Neptune", "B. Citrus", "A. Everglades National Park", "B. Smell", "C. Krusty the Clown", "D. A parrot", "A. Batman"];
var questionCounter = 0;
var selectedAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

$(document).ready(function() {
    
    
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-dark btn-lg start-button' href='#' id='button' role='button'>Start Quiz</a></p>";
        $(".container").html(startScreen);
    }
    
    initialScreen();
    
    
    
    function playAudio() {
        var audio = new Audio("assets/media/sample.mp3");
        audio.play();
    }

    $("body").on("click", ".start-button", function(event){
        event.preventDefault();  
        generateHTML();
    
        timerWrapper();
        playAudio();
    
    });
    
    
    
    $("body").on("click", ".answer", function(event){
        
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswer[questionCounter]) {
            
    
            clearInterval(theClock);
            generateWin();
        }
        else {
            
            clearInterval(theClock);
            generateLoss();
        }
    }); 
    
    $("body").on("click", ".reset-button", function(event){
        resetGame();
    }); 
    
    });  
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>TIME REMAINING: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center' id='response'>OUT OF TIME! THE CORRECT ANSWER IS: " + correctAnswer[questionCounter] + "</p>" + "<img class='center-block img-wrong' id='x' src='assets/images/x2.png'>";
        $(".container").html(gameHTML);
        setTimeout(wait, 1500);  
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>TIME REMAINING: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center' id='response'>CORRECT! " + correctAnswer[questionCounter] + "</p>" + "<img class='center-block img-right' id='check' src='assets/images/check2.png'>";
        $(".container").html(gameHTML);
        setTimeout(wait, 1500);  
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>TIME REMAINING: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center' id='response'>WRONG! THE CORRECT ANSWER IS: "+ correctAnswer[questionCounter] + "</p>" + "<img class='center-block img-wrong' id='x' src='assets/images/x2.png'>";
        $(".container").html(gameHTML);
        setTimeout(wait, 1500); 
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>TIME REMAINING: <span class='timer'>30</span></p><p class='text-center' id='question'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".container").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 19) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>TIME LEFT: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>RESULTS!" + "</p>" + "<p class='summary-correct'>NUMBER CORRECT: " + correctTally + "</p>" + "<p>NUMBER WRONG: " + incorrectTally + "</p>" + "<p>UNANSWERED: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-dark btn-lg reset-button' href='#' role='button'>PLAY AGAIN?</a></p>";
        $(".container").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateHTML();
        timerWrapper();
    }


