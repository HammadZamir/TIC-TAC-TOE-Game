const buttonsElements = document.querySelectorAll(".box")
const resetButtonElement = document.querySelector(".reset-button");
const turnButtonElement = document.querySelector(".turn-button");
const ScoreXelement = document.querySelector(".score-x")
const tieScoreElement = document.querySelector(".tie-score")
const ScoreOelement = document.querySelector(".score-o")




const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];





let turnO = Math.random() < 0.5;

if(turnO === true){
    turnButtonElement.innerHTML = ` <h2><i class=" fa-regular fa-circle"></i> Turn</h2> `;

}

else{
    turnButtonElement.innerHTML = ` <h2><i class="fa fa-times" aria-hidden="true"></i> Turn</h2> `;

}

let scoreX = 0;
let scoreO = 0;
let scoreTie = 0;




const turnNumber = ()=>{
 if(turnO === true){
    turnButtonElement.innerHTML = ` <h2><i class=" fa-regular fa-circle"></i> Turn</h2> `
 }
 else{
     turnButtonElement.innerHTML = ` <h2><i class="fa fa-times" aria-hidden="true"></i> Turn</h2> `
 }
}





const resetGame = ()=>{
    
    for(let button of buttonsElements){
        button.disabled = false;
        button.innerHTML = "";
        // ScoreOelement.innerHTML = `<i class=" fa-regular fa-circle"></i> (CPU) <span class="text-base font-bold" id="score-o"> <br> </span>`;
        // ScoreXelement.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i> (YOU) <span class="text-base font-bold" id="score-x"><br> </span>`;
        // tieScoreElement.innerHTML = `<span class="text-base font-bold" id="score-ties"><br>  </span>`;

        turnButtonElement.innerHTML = ` <h2><i class=" fa-regular fa-circle"></i> Turn</h2> `

        turnO = Math.random() < 0.5;
        if(turnO === true){
            turnButtonElement.innerHTML = ` <h2><i class=" fa-regular fa-circle"></i> Turn</h2> `;
        
        }
        
        else{
            turnButtonElement.innerHTML = ` <h2><i class="fa fa-times" aria-hidden="true"></i> Turn</h2> `;
        
        }

    }
}


resetButtonElement.addEventListener("click" , ()=>{
    resetGame();
})



// To check who's turn is?
buttonsElements.forEach((button) => {
    button.addEventListener("click",()=>{
       
        if(turnO){
            button.innerHTML = `<i class=" fa-regular fa-circle"></i>`;
            turnO = false;
        }
        else{
            button.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;
            turnO = true;
        }
        button.disabled = true;

        checkWinner();

        turnNumber();

    });
    
})




// Function to check Winner
function checkWinner() {

    let isTie = true;  

    for (let pattern of winningConditions) {
        let pos1Value = buttonsElements[pattern[0]].innerHTML;
        let pos2Value = buttonsElements[pattern[1]].innerHTML;
        let pos3Value = buttonsElements[pattern[2]].innerHTML;

        if (pos1Value !== "" && pos2Value !== "" && pos3Value !== "") {
            if (pos1Value === pos2Value && pos2Value === pos3Value) {
                
                isTie = false;  // If there's a winner, it's not a tie

                if (pos1Value === `<i class=" fa-regular fa-circle"></i>` ){
                    scoreO++;
                    ScoreOelement.innerHTML = `<i class=" fa-regular fa-circle"></i> (CPU) <span class="text-base font-bold" id="score-o"> <br> (${scoreO}) </span> `;
                    // roundcheck(scoreO);
                    showOverlay("O")
                } 
                else if (pos1Value === `<i class="fa fa-times" aria-hidden="true"></i>` ){
                    scoreX++;
                    ScoreXelement.innerHTML = ` <i class="fa fa-times" aria-hidden="true"></i> (YOU) <span class="text-base font-bold" id="score-x"><br>  (${scoreX}) </span> `;
                    // roundcheck(sco);
                    showOverlay("X");
                }

                // console.log( "score of O : " , scoreO , "score of X : " , scoreX);

                for (let buttonn of buttonsElements) {
                    buttonn.disabled = true;
                }
                break;  
            }
        }
    }

    // Check if all buttons are filled and no winner
    if (isTie) {
        for (let button of buttonsElements) {
            if (button.innerHTML === "") {
                isTie = false;  // If any button is empty, it's not a tie
                break;
            }
        }
    }

    if (isTie) {
        scoreTie++;
        tieScoreElement.innerHTML = `TIE  <span class="text-base font-bold" id="score-ties"><br>(${scoreTie}) </span>`;
        showOverlay("Tied")
    }
}





// Function to show the Overlay
function showOverlay(result) {
  
    const overlay = document.getElementById('overlay');
    const overlayMessage = document.getElementById('overlay-message');

    
    if(result === "X"){
    overlayMessage.innerHTML = `<i class= "fa fa-times" aria-hidden="true"></i> TAKES THE ROUND `;
    const congratesM = document.getElementById("congrates");
    congratesM.innerText = "Congratulations!"
    }

    else if(result === "O"){
    overlayMessage.innerHTML = `<i class= "fa-regular fa-circle"></i> TAKES THE ROUND `;
    const congratesM = document.getElementById("congrates");
    congratesM.innerText = "Congratulations!"
    }

    else if(result === "Tied"){
        overlayMessage.innerHTML = `GAME TIED`;
        const congratesM = document.getElementById("congrates");
        congratesM.innerText = ""
    }
    
    overlay.classList.remove('overlay');
}





// Hide the Overlay after clicking Button
function hideOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('overlay');
}




// Reset all scores and restart the game , For Quit Button
function quitGame() {
    scoreX = 0;
    scoreO = 0;
    scoreTie = 0;
    ScoreXelement.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i> (YOU) <span class="text-base font-bold" id="score-x"><br> (${scoreX}) </span>`;
    ScoreOelement.innerHTML = `<i class=" fa-regular fa-circle"></i> (CPU) <span class="text-base font-bold" id="score-o"> <br> (${scoreO}) </span>`;
    tieScoreElement.innerHTML = `TIE  <span class="text-base font-bold" id="score-ties"><br>(${scoreTie}) </span>`;
    
    resetGame();
    hideOverlay();
}



// Continue the game with the current scores , For Round Button
function nextRound() {
    
    resetGame();
    hideOverlay();
}



// Click Events for Quit Button and Next Round Button of Overlay
document.getElementById('quit-button').addEventListener('click', quitGame);
document.getElementById('next-round-button').addEventListener('click', nextRound);

















