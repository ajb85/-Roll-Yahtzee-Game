<!DOCTYPE HTML>
<html>
<head>
  <title>Roll! Game</title>
  <link rel="stylesheet" type="text/css" href="../AJMain.css" />
  <link rel="stylesheet" type="text/css" href="yahtzee.css" />
  <script src="iphonesAreTerrible.js"></script>
</head>
<body>
<?php include("../includes/header.html");?>

<table width="550" border="0">
  <tr>
    <td align="center">
      <p id="d1">0</p>
    </td>
    <td align="center">
      <p id="d2">0</p>
    </td>
    <td align="center">
      <p id="d3">0</p>
    </td>
    <td align="center">
      <p id="d4">0</p>
    <td align="center">
      <p id="d5">0</p>
    </td>
  </tr>
</table>

<table border="0">
  <tr><td>
    <div id="diceGroup">
    <img id="die1" src="images/R.png">
    <img id="die2" src="images/O.png">
    <img id="die3" src="images/L.png">
    <img id="die4" src="images/L.png">
    <img id="die5" src="images/!.png">
  </div>
  </td></tr>
  <tr><td align="center">
    <INPUT id="buton" type="image" src="images/roll3.png">
    <INPUT id="submit" type="image" src="images/submit.png"><br/>
  </td></tr>
</table>

<table border="1" id="scoreTable">
  <tr class="rollHeader" align="center">
    <td>Match Type</td>
    <td>Score</td>
    <td>Top Score</td>
    <td>Match Type</td>
    <td>Score</td>
    <td>Top Score</td>
  </tr>
  <tr align="center">
    <td class="tooltip">Ones<span class="tooltiptext">Sum of all "1" dice</span></td>
    <td data-roll="ones"></td>
    <td data-highScore="ones"></td>
    <td class="tooltip">3 of a Kind<span class="tooltiptext">Sum of all dice if three dice are the same</span></td>
    <td data-roll="threeKind"></td>
    <td data-highScore="threeKind"></td>
  </tr>
  <tr align="center">
    <td class="tooltip">Twos<span class="tooltiptext">Sum of all "2" dice</span></td>
    <td data-roll="twos"></td>
    <td data-highScore="twos"></td>
    <td class="tooltip">4 of a Kind<span class="tooltiptext">Sum of all dice if four dice are the same</span></td>
    <td data-roll="fourKind"></td>
    <td data-highScore="fourKind"></td>
  </tr>
  <tr align="center">
    <td class="tooltip">Threes<span class="tooltiptext">Sum of all "3" dice</span></td>
    <td data-roll="threes"></td>
    <td data-highScore="threes"></td>
    <td class="tooltip">Full House<span class="tooltiptext">Three of a kind and a two of a kind</span></td>
    <td data-roll="fullHouse"></td>
    <td  data-highScore="fullHouse"></td>
  </tr>
  <tr align="center">
    <td class="tooltip">Fours<span class="tooltiptext">Sum of all "4" dice</span></td>
    <td data-roll="fours"></td>
    <td data-highScore="fours"></td>
    <td class="tooltip">Sm Straight<span class="tooltiptext">A sequence of four consecutive numbers</span></td>
    <td data-roll="smStr"></td>
    <td data-highScore="smStr"></td>
  </tr>
  <tr align="center">
    <td class="tooltip">Fives<span class="tooltiptext">Sum of all "5" dice</span></td>
    <td data-roll="fives"></td>
    <td data-highScore="fives"></td>
    <td class="tooltip">Lg Straight<span class="tooltiptext">A sequence of five consecutive numbers</span></td>
    <td data-roll="lgStr"></td>
    <td data-highScore="lgStr"></td>
  </tr>
  <tr align="center">
    <td class="tooltip">Sixes<span class="tooltiptext">Sum of all "6" dice</span></td>
    <td data-roll="sixes"></td>
    <td data-highScore="sixes"></td>
    <td class="tooltip">Roll!<span class="tooltiptext">Five of a kind!</span></td>
    <td data-roll="fiveKind"></td>
    <td data-highScore="fiveKind"></td>
  </tr>
  <tr align="center">
    <td class="tooltip">Left Bonus<span class="tooltiptext">If the sum of all the above is greater than 63, +35 points</span></td>
    <td id="leftBonus"></td>
    <td data-highScore="leftBonus"></td>
    <td class="tooltip">Free Score<span class="tooltiptext">Sum of all the dice</span></td>
    <td data-roll="totalSum"></td>
    <td data-highScore="totalSum"></td>
  </tr>
  <tr align="center">
    <td class="tooltip">Above Total</td>
    <td id="leftTotal"></td>
    <td data-highScore="leftTotal"></td>
    <td class="tooltip">Roll! Bonus<span class="tooltiptext">Extra 50 points for every Roll! after the first</span></td>
    <td id="rollBonus"></td>
    <td data-highScore="rollBonus"></td>
  </tr>
  <tr align="center">
    <td>Grand Total</td>
    <td id="grandTotal"></td>
    <td data-highScore="grandTotal"></td>
    <td>Above Total</td>
    <td id="rightTotal"></td>
    <td data-highScore="rightTotal"></td>
  </tr>
</table><br/>
<p align="center">Current High Score Champ:</p><br/>
<p align="center" id="champ"></p>


<script src="yahtzee.js"></script>
<noscript>Sorry, your browser does not support JavaScript!</noscript>
</body>
</html>
