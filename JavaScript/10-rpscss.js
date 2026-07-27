let score = JSON.parse(localStorage.getItem('score')) ||    {wins: 0,losses: 0,ties: 0};

/*
if(!score){
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

updateScoreElement();


function playGame(playerMove){
  let computerMove= getComputerMove();

  let result = '';

  if(playerMove === 'scissors'){
    if(computerMove === 'rock'){
    result = 'Lose.';
    }
    else if(computerMove === 'paper'){
      result = 'Win.';
    }
    else if(computerMove === 'scissors'){
      result = 'got a Tie.';
    }
  }
  
  else if(playerMove === 'paper'){
    if(computerMove === 'rock'){
      result = 'Win.';
    }
    else if(computerMove === 'paper'){
      result = 'got a Tie.';
    }
    else if(computerMove === 'scissors'){
      result = 'Lose.';
    }
  }

  else if(playerMove === 'rock'){
    if(computerMove === 'rock'){
      result = 'got a Tie.';
    }
    else if(computerMove === 'paper'){
      result = 'Lose.';
    }
    else if(computerMove === 'scissors'){
      result = 'Win.';
    }
  }

  if(result === 'Win.'){
    score.wins += 1;
  }
  else if(result === 'Lose.'){
    score.losses += 1;
  }
  else if(result === 'got a Tie.'){
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score)); //stringify supports string only

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = 'You ' + result;

  document.querySelector('.js-moves').innerHTML = `You
<img src = "${playerMove}-emoji.png" class = "move-icon">
<img src = "${computerMove}-emoji.png" class = "move-icon">
Computer`;

}

function updateScoreElement(){
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins} , Losses: ${score.losses} , Ties: ${score.ties}`; 
}

function getComputerMove(){
  let randNum = Math.random();
  let computerMove = '';
  if(randNum >= 0 && randNum < 1/3){
    computerMove = 'rock';
  }
  else if(randNum >= 1/3 && randNum < 2/3){
    computerMove = 'paper';
  }
  else if(randNum >= 2/3 && randNum < 1){
    computerMove = 'scissors';
  }

  return computerMove;
  //return (returns undefined)
  // return 5;
  // console.log('After'); //does not print
}