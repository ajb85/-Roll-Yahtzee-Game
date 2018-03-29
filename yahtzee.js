const rollButton = document.getElementById("buton");
const dieReroll = document.getElementById("diceGroup");
const scoreTable = document.getElementById("scoreTable");
const submitButon = document.getElementById("submit");
const grandTotal = document.getElementById("grandTotal");
const url = "high_score.json";

var lockStatus = [0, 0, 0, 0, 0];
var diceRoll = [0, 0, 0, 0, 0];
var turn = 0;
var selection = [];
var highScore = -1;
var round = 0;

rollButton.addEventListener("click", playGame);
dieReroll.addEventListener("click", lockDie);
scoreTable.addEventListener("click", selectScore);
submitButon.addEventListener("click", nextRound);
updateHighScores();

function updateHighScores() {
  fetch(url)
    .then(res => res.json())
    .then(function(data) {
      if (data.hasOwnProperty("ones")) {
        for (var scoreType in data) {
          var highscoreCell = document.querySelectorAll(
            `[data-highScore="${scoreType}"]`
          )[0];
          if (highscoreCell !== undefined) {
            highscoreCell.innerHTML = data[`${scoreType}`];
          }
        }
        document.getElementById("champ").innerHTML = data.name;
        highScore = data.grandTotal;
      }
    });
}

function playGame() {
  if (turn < 3) {
    if (selection.length > 0) {
      selection[0].innerHTML = "";
      selection = [];
    }
    diceRoll.forEach(function(val, i) {
      !lockStatus[i] ? (diceRoll[i] = dieRoll()) : false;
    });
    updateDice(diceRoll);
    turn += 1;
    rollButton.src = `images/roll${3 - turn}.png`;
  }
}

function dieRoll() {
  const min = 1;
  const max = 7;
  return Math.floor(Math.random() * (max - min)) + min;
}

function updateDice(arr) {
  arr.forEach(function(val, i) {
    var numID = document.getElementById(`d${i + 1}`);
    var picID = document.getElementById(`die${i + 1}`);
    if (lockStatus[i] === 0) {
      numID.innerHTML = val;
      picID.src = `images/${val}.png`;
    }
  });
}

function lockDie(event) {
  if (turn > 0) {
    var i = Number(event.target.id[3]) - 1;
    var dieValue = document.getElementById(`d${i + 1}`).innerHTML;
    var picID = document.getElementById(`die${i + 1}`);

    if (lockStatus[i] === 0) {
      lockStatus[i] = 1;
      picID.src = `images/${dieValue}l.png`;
    } else {
      lockStatus[i] = 0;
      picID.src = `images/${dieValue}.png`;
    }
  }
}

function selectScore(event) {
  scoreCalc = {
    ones: additive(1),
    twos: additive(2),
    threes: additive(3),
    fours: additive(4),
    fives: additive(5),
    sixes: additive(6),
    threeKind: multiplicative(3),
    fourKind: multiplicative(4),
    fiveKind: roll(),
    fullHouse: fullHouse(),
    smStr: sequence(4),
    lgStr: sequence(5),
    totalSum: sumAll()
  };
  if (turn > 0) {
    var currentSelection = event.target.getAttribute("data-roll");
    if (currentSelection !== null && event.target.innerHTML == "") {
      calculateScore(currentSelection, event);
    }
  }
}

function calculateScore(currentSelection, event) {
  console.log("diceRoll: ", diceRoll);
  if (selection.length > 0) {
    selection[0].innerHTML = "";
    selection = [];
  }
  selection.push(event.target);
  isNaN(scoreCalc[currentSelection]) ||
  scoreCalc[currentSelection] === undefined
    ? (selection[0].innerHTML = 0)
    : (selection[0].innerHTML = scoreCalc[currentSelection]);
}

function additive(num) {
  return (
    diceRoll.filter(function(x) {
      return x == num;
    }).length * num
  );
}

function multiplicative(num) {
  var duplicateCount = findDuplicateCounts();
  if (duplicateCount[duplicateCount.length - 1] >= num) {
    return sumAll();
  } else return 0;
}

function fullHouse() {
  var duplicateCount = findDuplicateCounts();
  if (duplicateCount[0] === 2 && duplicateCount[1] === 3) {
    return 25;
  } else return 0;
}

function findDuplicateCounts() {
  var counts = {};
  diceRoll.forEach(function(x) {
    counts[x] = (counts[x] || 0) + 1;
  });
  return Object.values(counts).sort();
}

function sequence(num) {
  var counter = 1;
  var score = 0;
  const dice = new Set(diceRoll.slice().sort());
  dice.forEach(function(x, y, dice) {
    dice.has(x + 1) ? (counter += 1) : (counter = 1);
    if (counter === num) {
      score = num * 10 - 10;
    }
  });
  return score;
}

function sumAll() {
  leftTotal = 0;
  rightTotal = diceRoll.reduce((x, y) => x + y, 0);
  return rightTotal;
}

function roll() {
  if (sumAll() === diceRoll.slice().sort()[0] * 5) {
    leftTotal = 0;
    rightTotal = 50;
    return 50;
  } else {
    leftTotal = 0;
    rightTotal = 0;
    return 0;
  }
}

function rollBonus() {
  if (document.getElementById("rollBonus").innerHTML === "") {
    document.getElementById("rollBonus").innerHTML = 0;
  } else {
    document.getElementById("rollBonus").innerHTML =
      Number(document.getElementById("rollBonus").innerHTML) + 50;
  }
}

function nextRound() {
  if (
    sumAll() === diceRoll.slice().sort()[0] * 5 &&
    document.querySelectorAll(`[data-highScore="fiveKind"]`)[0].innerHTML > 0
    //document.querySelectorAll(`[data-highScore="rollBonus"]`)[0].innerHTML !==
    //  ""
  ) {
    rollBonus();
  }
  if (selection.length > 0) {
    selection = [];
    turn = 0;
    document.getElementById("die1").src = "images/R.png";
    document.getElementById("die2").src = "images/O.png";
    document.getElementById("die3").src = "images/L.png";
    document.getElementById("die4").src = "images/L.png";
    document.getElementById("die5").src = "images/!.png";
    document.getElementById("buton").src = "images/roll3.png";
    lockStatus = [0, 0, 0, 0, 0];
    var scoreAsObject = updateScores();
    round === 12 ? compareHighScore(scoreAsObject) : (round += 1);
  }
}

function compareHighScore(scoreAsObject) {
  var currentScore = document.getElementById("grandTotal").innerHTML;
  if (currentScore > highScore) {
    var highscoreName = prompt(
      "You beat the high score!  Enter your name below for glory!"
    );
    submitHighScore(Object.assign(scoreAsObject, { name: highscoreName }));
  } else {
    alert("Sorry, the champ's reign continues!");
  }
  endGame();
}

function submitHighScore(scoreAsObject, name) {
  var url = "update_score.php";
  var fetchData = {
    method: "POST",
    body: JSON.stringify(scoreAsObject),
    cache: "no-cache"
  };
  fetch(url, fetchData)
    .then(res => res)
    .then(data => console.log(data));
}

function updateScores() {
  var leftScore = {
    ones: Number(document.querySelectorAll('[data-roll="ones"]')[0].innerHTML),
    twos: Number(document.querySelectorAll('[data-roll="twos"]')[0].innerHTML),
    threes: Number(
      document.querySelectorAll('[data-roll="threes"]')[0].innerHTML
    ),
    fours: Number(
      document.querySelectorAll('[data-roll="fours"]')[0].innerHTML
    ),
    fives: Number(
      document.querySelectorAll('[data-roll="fives"]')[0].innerHTML
    ),
    sixes: Number(document.querySelectorAll('[data-roll="sixes"]')[0].innerHTML)
  };
  var leftTotal = Object.values(leftScore).reduce((x, y) => x + y, 0);
  var rightScore = {
    threeKind: Number(
      document.querySelectorAll('[data-roll="threeKind"]')[0].innerHTML
    ),
    fourKind: Number(
      document.querySelectorAll('[data-roll="fourKind"]')[0].innerHTML
    ),
    fiveKind: Number(
      document.querySelectorAll('[data-roll="fiveKind"]')[0].innerHTML
    ),
    fullHouse: Number(
      document.querySelectorAll('[data-roll="fullHouse"]')[0].innerHTML
    ),
    smStr: Number(
      document.querySelectorAll('[data-roll="smStr"]')[0].innerHTML
    ),
    lgStr: Number(
      document.querySelectorAll('[data-roll="lgStr"]')[0].innerHTML
    ),
    totalSum: Number(
      document.querySelectorAll('[data-roll="totalSum"]')[0].innerHTML
    ),
    rollBonus: Number(document.getElementById("rollBonus").innerHTML)
  };
  var rightTotal = Object.values(rightScore).reduce((x, y) => x + y, 0);
  if (
    Number(leftTotal) > 63 &&
    document.getElementById("leftBonus").innerHTML === ""
  ) {
    document.getElementById("leftBonus").innerHTML = 35;
    leftTotal += 35;
  }
  document.getElementById("leftTotal").innerHTML = leftTotal;
  document.getElementById("rightTotal").innerHTML = rightTotal;
  document.getElementById("grandTotal").innerHTML = leftTotal + rightTotal;
  leftScore.leftTotal = leftTotal;
  rightScore.rightTotal = rightTotal;
  leftScore.grandTotal = leftTotal + rightTotal;
  return Object.assign(leftScore, rightScore);
}

function endGame() {
  location.reload();
}
