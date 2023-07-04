// This variable provides the answers that the test will be marked against
const ANSWERS = ["b", "d", "c", "c", "b", 6, "sphere", "equal", "no", 0, 4, 4, 2, 0, 7]; 

// Defines the global score and sets it to 0 at the beginning of the test
let globalScore = 0;

// This function will hide the current section and show the next when clicked
function nextSection(currentSection, nextSection) { 
    document.querySelector('#' + currentSection).style.display = "none"; // Hides current section
    document.querySelector('#' + nextSection).style.display = "block"; // Shows next section
    window.scrollTo(0,0); // Scrolls to the top of the page
}

// This function will check that they have answered the question in the correct way
function inputCheck(sectionNumber, firstQuestion) {
    let i = firstQuestion;
    let invalidInput = 0; // Defines how many answers are "invalid" i.e. answered in the wrong way or not at all
    let correction;

    while (i < (firstQuestion + 5)) { // Only checks validity of 5 questions
        let input = document.querySelector("#answer" + i).value;
        correction = document.querySelector("#answer" + i +"correction");
        correction.innerHTML = ""; // Resets text to empty 

        document.querySelector("#answer" + i).style = "background-color:#fff;"; // Resets bgc to white

        try {
            if(input == "") throw "Please answer the question"; // If answer is left empty, tell to answer
            if(isNaN(input) && typeof(ANSWERS[(i-1)]) == 'number') throw "Please answer with a number"; // If they answer with words but should have answered with a number, tell to answer with number
            if(isFinite(input) && typeof(ANSWERS[(i-1)]) != 'number') throw "Please answer with a letter/word"; // If they answer with a number but should have answered with a word, tell to answer with a word

        } catch (error) {
            correction.innerHTML = error; // Shows them the the error in their input
            document.querySelector("#answer" + i).style = "background-color:#f8fcb0;"; // Changes bgc to yellow

            invalidInput++; // Increase the number of answers that are invalid
        }
        i++;
    }

    if (invalidInput == 0) { // If no answers are invalid, move on to marking
        markSection(sectionNumber, firstQuestion);

    } else { // If some answers are invalid, scroll to the top of the page
        window.scrollTo(0,0);
    }
}

// This function will check that the answers inputted by the user are correct 
function markSection(sectionNumber, firstQuestion) { 
    let i = firstQuestion
    let sectionScore = 0;
    let input;

    while (i < (firstQuestion + 5)) { // Ensures that it only attempts to mark 5 questions
        input = document.querySelector("#answer" + i).value;

        input = input.toLowerCase(); // This makes sure that if they answer "A" but the answer is "a" they can still get it correct
        input =   input.replace(/^\s+|\s+$/gm,''); // Removes spaces from input
        input = input.replace(/\.+$/gm,''); // Removes "." from input


        if (input == ANSWERS[(i-1)]) { // If the input = the correct answer from the variable defined above i.e. is correct
            document.querySelector("#answer" + i).style = "background-color:#bcfcb0;"; // Changes text input colour to green
            sectionScore++; // Increases score by 1

        } else { // If the answer is incorrect
            document.querySelector("#answer" + i).style = "background-color:#fcb0b0;"; // Changes text input colour to red
        }

        i++;
    }

    allowContinue(sectionNumber, sectionScore);
}

// This function will reveal the continue button if they get more than 3 correct answers, otherwise they will have to repeat some questions
function allowContinue(sectionNumber, sectionScore) {
    let comment = document.querySelector('#section-results' + sectionNumber);
    comment.style.display = "block"; // Show comment section

    if (sectionScore > 3) { // If they score > 3 congratulate them and allow them to continue
        comment.innerHTML = `Well done! You got ${sectionScore}/5`;
        document.querySelector('#next-button' + sectionNumber).style.display = "inline"; // Shows the continue button

        disableRetry(sectionNumber);

        globalScore += sectionScore; // Add section score to the global score

    } else { // If they score =< 3 tell them to try again
        comment.innerHTML = `You got ${sectionScore}/5, you should try again to move onto the next section`;
    }

    return globalScore;
}


// This function will prevent the user from repeating the section
function disableRetry(sectionNumber) {
    document.querySelector('#done-button' + sectionNumber).disabled = true; // Prevents button from being used
    document.querySelector('#done-button' + sectionNumber).style.cursor = "default";
}

// This function will reveal the results for the whole test
function shareResults() {
    let score = document.querySelector('#test-results');
    score.innerHTML = `You got ${globalScore}/15!!`
}

// The following code will allow the enter key to be pressed in the place of clicking the done button
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { // If the keypressed is enter (the keycode for enter is 13)
        if (document.querySelector('#section1').style.display == "block") { // If they're on section one
            document.querySelector("#done-button1").click(); // Trigger the section one done button

        } else if (document.querySelector('#section2').style.display == "block") { // If they're on section two
        document.querySelector("#done-button2").click(); // Trigger the section two done button

        } else if (document.querySelector('#section3').style.display == "block"){ // If they're on section three
            document.querySelector("#done-button3").click(); // Trigger the section three done button
        }
    }
  });