/* constant chip amount variables */
var redChipAmt = 100;
var blueChipAmt = 200;
var greenChipAmt = 500;
var blackChipAmt = 1000;

/* See which chip is currently selected */
var redChipActive = true;
var blueChipActive = false;
var greenChipActive = false;
var blackChipActive = false;

var pointValue = 0;

/* All Betting Active Variables */
var isComeOutRoll = true;
var passLineActive = false;
var dontPassLineActive = false;
var passOddsActive = false;
var dontPassOddsActive = false;
var snakeEyesActive = false;
var aceDeuceActive = false;
var yoLeftActive = false;
var yoRightActive = false;
var boxcarsActive = false;
var anyCrapsActive = false
var anySevenActive = false;
var fieldActive = false;
var hardWayFourActive = false;
var hardWaySixActive = false;
var hardWayEightActive = false;
var hardWayTenActive = false;
var placeFourActive = false;
var placeFiveActive = false;
var placeSixActive = false;
var placeEightActive = false;
var placeNineActive = false;
var placeTenActive = false;
var newComeBet = false;
var comeActiveArray = new Array();
for (var i=0; i<=12; i++) {
	comeActiveArray[i] = false;
}
var newDontComeBet = false;
var dontComeActiveArray = new Array();
for (var i=0; i<=12; i++) {
	dontComeActiveArray[i] = false;
}

/* Variables to keep track of the bet amounts on each space */
var passLineBetAmt = 0;
var dontPassLineBetAmt = 0;
var passOddsBetAmt = 0;
var dontPassOddsBetAmt = 0;
var snakeEyesBetAmt = 0;
var aceDeuceBetAmt = 0;
var yoLeftBetAmt = 0;
var yoRightBetAmt = 0;
var boxcarsBetAmt = 0;
var anyCrapsBetAmt = 0
var anySevenBetAmt = 0;
var fieldBetAmt = 0;
var hardWayFourBetAmt = 0;
var hardWaySixBetAmt = 0;
var hardWayEightBetAmt = 0;
var hardWayTenBetAmt = 0;
var placeFourBetAmt = 0;
var placeFiveBetAmt = 0;
var placeSixBetAmt = 0;
var placeEightBetAmt = 0;
var placeNineBetAmt = 0;
var placeTenBetAmt = 0;

/* Some multi roll bets need to be locked in across multiple rolls */
var passLineLocked = false;
var dontPassLineLocked = false;
var passOddsLocked = true;
var dontPassOddsLocked = true;
var hardWayFourLocked = true;
var hardWaySixLocked = true;
var hardWayEightLocked = true;
var hardWayTenLocked = true;
var placeFourLocked = true;
var placeFiveLocked = true;
var placeSixLocked = true;
var placeEightLocked = true;
var placeNineLocked = true;
var placeTenLocked = true;

function payout(bet, fractional) {
	console.log(sid);
	console.log(tableNumber);
	//If we take out money at each bet, we need to add it back to winnings
	var winnings = bet * (1+fractional);
	//var socket = io.connect('http://localhost:3000');
	socket.emit('payouts',{sid: sid, amount: winnings, tableNumber: tableNumber});
}

function userBet(bet) {
	console.log(sid);
	console.log(tableNumber);
	// take out money
	bet = -bet;
	//var socket = io.connect('http://localhost:3000');
	socket.emit('payouts',{sid: sid, amount: bet, tableNumber: tableNumber});
}

function userRefund(bet) {
	console.log(sid);
	console.log(tableNumber);
	bet = parseInt(bet);
	//var socket = io.connect('http://localhost:3000');
	socket.emit('payouts',{sid: sid, amount: bet, tableNumber: tableNumber});
}

/* Check each bet with dice and see if winner or loser */
function betsEval(dice1, dice2)
{
	betResultsString = '<strong>Your Earnings:</strong><br><br>';
	diceValue = dice1 + dice2;
	/* Pass Line, Don't Pass Line, Pass Odds, & Don't Pass Bet Logic */
	if (isComeOutRoll) {
		switch(diceValue) {
		case 2:
		case 3:
		case 12:
			if (passLineActive) {
				betResultsString += 'Pass Line Bet: Loser (Rolled Craps)<br>';
			}
			if (dontPassLineActive) {
				betResultsString += 'Dont Pass Line Bet: Winner, Odds Paid 1:1<br>';
			}
			isComeOutRoll = true;
			if (!rollIsSimulated) {
				socket.emit('passDice', {tableNumber: tableNumber});
			}
			passLineActive = false;
			$('#passLineVert').css('opacity', '0.0');
			$('#passLineHori').css('opacity', '0.0');
			dontPassLineActive = false;
			$('#dontPassBarVert').css('opacity', '0.0');
			$('#dontPassBarHori').css('opacity', '0.0');
			break;
		case 7:
		case 11:
			if (passLineActive) {
				betResultsString += 'Pass Line Bet: Winner, Odds Paid 1:1<br>';
			}
			if (dontPassLineActive) {
				betResultsString += 'Dont Pass Line Bet: Loser (Rolled 7 or 11)<br>';
			}
			isComeOutRoll = true;
			if (!rollIsSimulated) {
				socket.emit('passDice', {tableNumber: tableNumber});
			}
			passLineActive = false;
			$('#passLineVert').css('opacity', '0.0');
			$('#passLineHori').css('opacity', '0.0');
			dontPassLineActive = false;
			$('#dontPassBarVert').css('opacity', '0.0');
			$('#dontPassBarHori').css('opacity', '0.0');
			break;
		default:
			pointValue = diceValue;
			if (passLineActive) {
				betResultsString += 'Pass Line Bet: The Point is ' + pointValue + '<br>';
			}
			if (dontPassLineActive) {
				betResultsString += 'Dont Pass Line Bet: The Point is ' + pointValue + '<br>';
			}
			isComeOutRoll = false;
			// can now bet on Pass/Don't Pass Odds
			passOddsLocked = false;
			dontPassOddsLocked = false;
			// lock in pass/don't pass bet
			passLineLocked = true;
			dontPassLineLocked = true;
			break;
		}
	} else {
		// if user made a pass/don't pass odds bet, lock it in
		if (passOddsActive || dontPassOddsActive) {
			passOddsLocked = true;
			dontPassOddsLocked = true;
		}
		switch(diceValue) {
		case 7:
			if (passLineActive) {
				betResultsString += 'Pass Line Bet: Loser (Rolled 7)<br>';
			}
			if (dontPassLineActive) {
				betResultsString += 'Dont Pass Line Bet: Winner, Odds Paid 1:1<br>';
			}
			if (passOddsActive) {
				betResultsString += 'Pass Odds: Loser<br>';
			}
			// Pass Odds Paid on Don't Pass Odds Paid depend on what the point was
			if (dontPassOddsActive) {
				switch(pointValue) {
					case 4:
					case 10:
						betResultsString += 'Dont Pass Odds: Winner, Odds Paid 1:2<br>';
						break;
					case 5:
					case 9:
						betResultsString += 'Dont Pass Odds: Winner, Odds Paid 2:3<br>';
						break;
					case 6:
					case 8:
						betResultsString += 'Dont Pass Odds: Winner, Odds Paid 5:6<br>';
						break;
				}
			}
			isComeOutRoll = true;
			if (!rollIsSimulated) {
				socket.emit('passDice', {tableNumber: tableNumber});
			}
			// can no longer bet on Pass/Don't Pass Odds
			passOddsLocked = true;
			dontPassOddsLocked = true;
			passOddsActive = false;
			$('#passOdds').css('opacity', '0.0');
			dontPassOddsActive = false;
			$('#dontPassOdds').css('opacity', '0.0');
			// Can again bet on Pass/Don't Pass Bets
			passLineActive = false;
			$('#passLineVert').css('opacity', '0.0');
			$('#passLineHori').css('opacity', '0.0');
			dontPassLineActive = false;
			$('#dontPassBarVert').css('opacity', '0.0');
			$('#dontPassBarHori').css('opacity', '0.0');
			passLineLocked = false;
			dontPassLineLocked = false;
			pointValue = 0;
			break;
		case pointValue:
			if (passLineActive) {
				betResultsString += 'Pass Line Bet: Winner, Odds Paid 1:1<br>';
			}
			if (dontPassLineActive) {
				betResultsString += 'Dont Pass Line Bet: Loser (Rolled Point)<br>';
			}
			if (dontPassOddsActive) {
				betResultsString += 'Dont Pass Odds: Loser';
			}
			// Pass Odds Paid on Don't Pass Odds Paid depend on what the point was
			if (passOddsActive) {
				switch(pointValue) {
					case 4:
					case 10:
						betResultsString += 'Pass Odds: Winner, Odds Paid 2:1<br>';
						break;
					case 5:
					case 9:
						betResultsString += 'Pass Odds: Winner, Odds Paid 3:2<br>';
						break;
					case 6:
					case 8:
						betResultsString += 'Pass Odds: Winner, Odds Paid 6:5<br>';
						break;
				}
			}
			isComeOutRoll = true;
			if (!rollIsSimulated) {
				socket.emit('passDice', {tableNumber: tableNumber});
			}
			// can no longer bet on Pass/Don't Pass Odds
			passOddsLocked = true;
			dontPassOddsLocked = true;
			passOddsActive = false;
			$('#passOdds').css('opacity', '0.0');
			dontPassOddsActive = false;
			$('#dontPassOdds').css('opacity', '0.0');
			// Can again bet on Pass/Don't Pass Bets
			passLineActive = false;
			$('#passLineVert').css('opacity', '0.0');
			$('#passLineHori').css('opacity', '0.0');
			dontPassLineActive = false;
			$('#dontPassBarVert').css('opacity', '0.0');
			$('#dontPassBarHori').css('opacity', '0.0');
			passLineLocked = false;
			dontPassLineLocked = false;
			pointValue = 0;
			break;
		default:
			if (passLineActive) {
				betResultsString += 'Pass Line Bet: The Point is still ' + pointValue + '<br>';
			}
			if (dontPassLineActive) {
				betResultsString += 'Dont Pass Line Bet: The Point is still ' + pointValue + '<br>';
			}
			if (passOddsActive) {
				betResultsString += 'Pass Odds Bet: The Point is still ' + pointValue + '<br>';
			}
			if (dontPassOddsActive) {
				betResultsString += 'Dont Pass Odds Bet: The Point is still ' + pointValue + '<br>';
			}
			break;
		}
	}
	
	/* Come and Don't Come Bets */
	switch (diceValue) {
		case 2:
		case 3:
		case 12:
			if (newComeBet) {
				betResultsString += "New Come Bet Loses<br>";
				newComeBet = false;
				$('#come').css('opacity', '0.0');
			}
			if (newDontComeBet) {
				betResultsString += "New Don't Come Bet Wins Odds 1:1<br>";
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
			}
			break;
		case 4:
			if (comeActiveArray[diceValue]) {
				betResultsString += "Come Bet on " + diceValue + " wins with odds 1:1<br>";
				comeActiveArray[diceValue] = false;
				$('#pointFour').css('opacity', '0.0');
			}
			if (dontComeActiveArray[diceValue]) {
				betResultsString += "Don't Come Bet on " + diceValue + " loses<br>";
				dontComeActiveArray[diceValue] = false;
				$('#pointFour').css('opacity', '0.0');
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				newComeBet = false;
				$('#come').css('opacity', '0.0');
				$('#pointFour').css('background-color', 'blue');
				$('#pointFour').css('opacity', '0.5');
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
				$('#pointFour').css('background-color', 'blue');
				$('#pointFour').css('opacity', '0.5');
			}
			break;
		case 5:
			if (comeActiveArray[diceValue]) {
				betResultsString += "Come Bet on " + diceValue + " wins with odds 1:1<br>";
				comeActiveArray[diceValue] = false;
				$('#pointFive').css('opacity', '0.0');
			}
			if (dontComeActiveArray[diceValue]) {
				betResultsString += "Don't Come Bet on " + diceValue + " loses<br>";
				dontComeActiveArray[diceValue] = false;
				$('#pointFive').css('opacity', '0.0');
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				newComeBet = false;
				$('#come').css('opacity', '0.0');
				$('#pointFive').css('background-color', 'blue');
				$('#pointFive').css('opacity', '0.5');
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
				$('#pointFive').css('background-color', 'blue');
				$('#pointFive').css('opacity', '0.5');
			}
			break;
		case 6:
			if (comeActiveArray[diceValue]) {
				betResultsString += "Come Bet on " + diceValue + " wins with odds 1:1<br>";
				comeActiveArray[diceValue] = false;
				$('#pointSix').css('opacity', '0.0');
			}
			if (dontComeActiveArray[diceValue]) {
				betResultsString += "Don't Come Bet on " + diceValue + " loses<br>";
				dontComeActiveArray[diceValue] = false;
				$('#pointSix').css('opacity', '0.0');
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				newComeBet = false;
				$('#come').css('opacity', '0.0');
				$('#pointSix').css('background-color', 'blue');
				$('#pointSix').css('opacity', '0.5');
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
				$('#pointSix').css('background-color', 'blue');
				$('#pointSix').css('opacity', '0.5');
			}
			break;
		case 7:
			// all current active come bets lose, all current dont come bets win
			for (var i=0; i<=12; i++) {
				if (comeActiveArray[i]) {
					betResultsString += "Come Bet on " + i + " loses<br>";
					comeActiveArray[i] = false;
				}
				if (dontComeActiveArray[i]) {
					betResultsString += "Don't Come Bet on " + i + " wins odds 1:1<br>";
					dontComeActiveArray[i] = false;
				}
			}
			$('.point').css('opacity', '0.0');
			if (newComeBet) {
				betResultsString += "New Come Bet Wins with odds paid 1:1<br>";
				newComeBet = false;
				$('#come').css('opacity', '0.0');
			}
			if (newDontComeBet) {
				betResultsString += "New Don't Come Bet loses<br>";
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
			}
			break;
		case 8:
			if (comeActiveArray[diceValue]) {
				betResultsString += "Come Bet on " + diceValue + " wins with odds 1:1<br>";
				comeActiveArray[diceValue] = false;
				$('#pointEight').css('opacity', '0.0');
			}
			if (dontComeActiveArray[diceValue]) {
				betResultsString += "Don't Come Bet on " + diceValue + " loses<br>";
				dontComeActiveArray[diceValue] = false;
				$('#pointEight').css('opacity', '0.0');
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				newComeBet = false;
				$('#come').css('opacity', '0.0');
				$('#pointEight').css('background-color', 'blue');
				$('#pointEight').css('opacity', '0.5');
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
				$('#pointEight').css('background-color', 'blue');
				$('#pointEight').css('opacity', '0.5');
			}
			break;
		case 9:
			if (comeActiveArray[diceValue]) {
				betResultsString += "Come Bet on " + diceValue + " wins with odds 1:1<br>";
				comeActiveArray[diceValue] = false;
				$('#pointNine').css('opacity', '0.0');
			}
			if (dontComeActiveArray[diceValue]) {
				betResultsString += "Don't Come Bet on " + diceValue + " loses<br>";
				dontComeActiveArray[diceValue] = false;
				$('#pointNine').css('opacity', '0.0');
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				newComeBet = false;
				$('#come').css('opacity', '0.0');
				$('#pointNine').css('background-color', 'blue');
				$('#pointNine').css('opacity', '0.5');
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
				$('#pointNine').css('background-color', 'blue');
				$('#pointNine').css('opacity', '0.5');
			}
			break;
		case 10:
			if (comeActiveArray[diceValue]) {
				betResultsString += "Come Bet on " + diceValue + " wins with odds 1:1<br>";
				comeActiveArray[diceValue] = false;
				$('#pointTen').css('opacity', '0.0');
			}
			if (dontComeActiveArray[diceValue]) {
				betResultsString += "Don't Come Bet on " + diceValue + " loses<br>";
				dontComeActiveArray[diceValue] = false;
				$('#pointTen').css('opacity', '0.0');
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				newComeBet = false;
				$('#come').css('opacity', '0.0');
				$('#pointTen').css('background-color', 'blue');
				$('#pointTen').css('opacity', '0.5');
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
				$('#pointTen').css('background-color', 'blue');
				$('#pointTen').css('opacity', '0.5');
			}
			break;
		case 11:
			if (newComeBet) {
				betResultsString += "New Come Bet Wins with odds paid 1:1<br>";
				newComeBet = false;
				$('#come').css('opacity', '0.0');
			}
			if (newDontComeBet) {
				betResultsString += "New Don't Come Bet loses<br>";
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
			}
			break;
	}
	
	/* Single Roll Betting Logic */
	// see if each bet is active and then if it is winner or not
	if (snakeEyesActive) {
		if (diceValue == 2) {
			betResultsString += 'Snake Eyes Bet: Winner, Odds Paid 31:1<br>';
			payout(aceDeuceBetAmt, (31/1));
		} else {
			betResultsString += 'Snake Eyes Bet: Loser<br>';
		}
		snakeEyesActive = false;
		snakeEyesBetAmt = 0;
		$('#snakeEyes').html('');
		$('#snakeEyes').css('opacity', '0.0');
	}
	if (aceDeuceActive) {
		if (diceValue == 3) {
			betResultsString += 'Ace Deuce Bet: Winner, Odds Paid 16:1<br>';
			payout(aceDeuceBetAmt, (16/1));
		} else {
			betResultsString += 'Ace Deuce Bet: Loser<br>';
		}
		aceDeuceActive = false;
		aceDeuceBetAmt = 0;
		$('#aceDeuce').css('opacity', '0.0');
		$('#aceDeuce').html('');
	}
	if (yoLeftActive) {
		if (diceValue == 11) {
			betResultsString += 'Yo Bet: Winner, Odds Paid 15:1<br>';
			payout(yoLeftBetAmt, (15/1));
		} else {
			betResultsString += 'Yo Bet: Loser<br>';
		}
		yoLeftActive = false;
		yoLeftBetAmt = 0;
		$('#yoLeft').css('opacity', '0.0');
		$('#yoLeft').html('');
	}
	if (yoRightActive) {
		if (diceValue == 11) {
			betResultsString += 'Yo Bet: Winner, Odds Paid 15:1<br>';
			payout(yoRightBetAmt, (15/1));
		} else {
			betResultsString += 'Yo Bet: Loser<br>';
		}
		yoRightActive = false;
		yoRightBetAmt = 0;
		$('#yoRight').css('opacity', '0.0');
		$('#yoRight').html('');
	}
	if (boxcarsActive) {
		if (diceValue == 12) {
			betResultsString += 'Boxcars Bet: Winner, Odds Paid 30:1<br>';
			payout(boxcarsBetAmt, (30/1));
		} else {
			betResultsString += 'Boxcars Bet: Loser<br>';
		}
		boxcarsActive = false;
		boxcarsBetAmt = 0;
		$('#boxcars').css('opacity', '0.0');
		$('#boxcars').html('');
	}
	if (anyCrapsActive) {
		if (diceValue == 2 || diceValue == 3 || diceValue == 12) {
			betResultsString += 'Any Craps Bet: Winner, Odds Paid 7:1<br>';
			payout(anyCrapsBetAmt, (7/1));
		} else {
			betResultsString += 'Any Craps Bet: Loser<br>';
		}
		anyCrapsActive = false;
		anyCrapsBetAmt = 0;
		$('#anyCraps').css('opacity', '0.0');
		$('#anyCraps').html('');
	}
	if (anySevenActive) {
		if (diceValue == 7) {
			betResultsString += 'Any Seven Bet: Winner, Odds Paid 5:1<br>';
			payout(anySevenBetAmt, (5/1));
		} else {
			betResultsString += 'Any Seven Bet: Loser<br>';
		}
		anySevenActive = false;
		anySevenBetAmt = 0;
		$('#anySeven').css('opacity', '0.0');
		$('#anySeven').html('');
	}
	if (fieldActive) {
		// different dice values have different pay outs
		if (diceValue == 2) {
			betResultsString += 'Field Bet: Winner, Odds Paid 2:1<br>';
			payout(fieldBetAmt, (2/1));
		} else if (diceValue == 12) {
			betResultsString += 'Field Bet: Winner, Odds Paid 3:1<br>';
			payout(fieldBetAmt, (3/1));
		} else if (diceValue == 3 || diceValue == 4 || diceValue == 9 || diceValue == 10 || diceValue == 11) {
			betResultsString += 'Field Bet: Winner, Odds Paid 1:1<br>';
			payout(fieldBetAmt, (1/1));
		} else {
			betResultsString += 'Field Bet: Loser<br>';
		}
		fieldActive = false;
		fieldBetAmt = 0;
		$('#field').css('opacity', '0.0');
		$('#field').html('');
	}
	
	/* Hard Way Betting Logic */
	// users can make bets on hard way if not come out roll
	if (!isComeOutRoll) {
		hardWayFourLocked = false;
		hardWaySixLocked = false;
		hardWayEightLocked = false;
		hardWayTenLocked = false;
	}
	
	// However if an bet is currently active, it needs to be locked
	if (hardWayFourActive) {
		hardWayFourLocked = true;
	}
	if (hardWaySixActive) {
		hardWaySixLocked = true;
	}
	if (hardWayEightActive) {
		hardWayEightLocked = true;
	}
	if (hardWayTenActive) {
		hardWayTenLocked = true;
	}
	// if we roll 4, 6, 8, or 10 see if it's "Hard Way"
	// if a seven is rolled, all bets are lost
	switch(diceValue) {
		case 4:
			if (hardWayFourActive) {
				if (dice1 == dice2) {
					betResultsString += 'Hard Way 4 Bet: Winner, Odds Paid 7:1<br>';
				} else {
					betResultsString += 'Hard Way 4 Bet: Loser<br>';
				}
				hardWayFourActive = false;
				hardWayFourLocked = false;
				$('#hardWayFour').css('opacity', '0.0');
			}
			break;
		case 6:
			if (hardWaySixActive) {
				if (dice1 == dice2) {
					betResultsString += 'Hard Way 6 Bet: Winner, Odds Paid 9:1<br>';
				} else {
					betResultsString += 'Hard Way 6 Bet: Loser<br>';
				}
				hardWaySixActive = false;
				hardWaySixLocked = false;
				$('#hardWaySix').css('opacity', '0.0');
			}
			break;
		case 7:
			if (hardWayFourActive) {
				betResultsString += 'Hard Way 4 Bet: Loser<br>';
				hardWayFourActive = false;
				hardWayFourLocked = false;
				$('#hardWayFour').css('opacity', '0.0');
			}
			if (hardWaySixActive) {
				betResultsString += 'Hard Way 6 Bet: Loser<br>';
				hardWaySixActive = false;
				hardWaySixLocked = false;
				$('#hardWaySix').css('opacity', '0.0');
			}
			if (hardWayEightActive) {
				betResultsString += 'Hard Way 8 Bet: Loser<br>';
				hardWayEightActive = false;
				hardWayEightLocked = false;
				$('#hardWayEight').css('opacity', '0.0');
			}
			if (hardWayTenActive) {
				betResultsString += 'Hard Way 10 Bet: Loser<br>';
				hardWayTenActive = false;
				hardWayTenLocked = false;
				$('#hardWayTen').css('opacity', '0.0');
			}
			break;
		case 8:
			if (hardWayEightActive) {
				if (dice1 == dice2) {
					betResultsString += 'Hard Way 8 Bet: Winner, Odds Paid 9:1<br>';
				} else {
					betResultsString += 'Hard Way 8 Bet: Loser<br>';
				}
				hardWayEightActive = false;
				hardWayEightLocked = false;
				$('#hardWayEight').css('opacity', '0.0');
			}
			break;
		case 10:
			if (hardWayTenActive) {
				if (dice1 == dice2) {
					betResultsString += 'Hard Way 10 Bet: Winner, Odds Paid 7:1<br>';
				} else {
					betResultsString += 'Hard Way 10 Bet: Loser<br>';
				}
				hardWayTenActive = false;
				hardWayTenLocked = false;
				$('#hardWayTen').css('opacity', '0.0');
			}
			break;
	}
	
	// users cannot bet on hard way on Come Out Roll
	if (isComeOutRoll) {
		hardWayFourLocked = true;
		hardWaySixLocked = true;
		hardWayEightLocked = true;
		hardWayTenLocked = true;
	}
	
	/* Place Bets Logic (very similar to Hard Way) */
	// users can make place bets if not come out roll
	if (!isComeOutRoll) {
		placeFourLocked = false;
		placeFiveLocked = false;
		placeSixLocked = false;
		placeEightLocked = false;
		placeNineLocked = false;
		placeTenLocked = false;
	}
	
	// However if a place bet is currently active, it needs to be locked
	if (placeFourActive) {
		placeFourLocked = true;
	}
	if (placeFiveActive) {
		placeFiveLocked = true;
	}
	if (placeSixActive) {
		placeSixLocked = true;
	}
	if (placeEightActive) {
		placeEightLocked = true;
	}
	if (placeNineActive) {
		placeNineLocked = true;
	}
	if (placeTenActive) {
		placeTenLocked = true;
	}
	// if we roll 4, 5, 6, 8, 9, or 10 see if its currently active
	// if a seven is rolled, all bets are lost
	switch(diceValue) {
		case 4:
			if (placeFourActive) {
				betResultsString += 'Place 4 Bet: Winner, Odds Paid 9:5<br>';
				placeFourActive = false;
				placeFourLocked = false;
				$('#placeFour').css('opacity', '0.0');
			}
			break;
		case 5:
			if (placeFiveActive) {
				betResultsString += 'Place 5 Bet: Winner, Odds Paid 7:5<br>';
				placeFiveActive = false;
				placeFiveLocked = false;
				$('#placeFive').css('opacity', '0.0');
			}
			break;
		case 6:
			if (placeSixActive) {
				betResultsString += 'Place 6 Bet: Winner, Odds Paid 7:6<br>';
				placeSixActive = false;
				placeSixLocked = false;
				$('#placeSix').css('opacity', '0.0');
			}
			break;
		case 7:
			if (placeFourActive) {
				betResultsString += 'Place 4 Bet: Loser<br>';
				placeFourActive = false;
				placeFourLocked = false;
				$('#placeFour').css('opacity', '0.0');
			}
			if (placeFiveActive) {
				betResultsString += 'Place 5 Bet: Loser<br>';
				placeFiveActive = false;
				placeFiveLocked = false;
				$('#placeFive').css('opacity', '0.0');
			}
			if (placeSixActive) {
				betResultsString += 'Place 6 Bet: Loser<br>';
				placeSixActive = false;
				placeSixLocked = false;
				$('#placeSix').css('opacity', '0.0');
			}
			if (placeEightActive) {
				betResultsString += 'Place 8 Bet: Loser<br>';
				placeEightActive = false;
				placeEightLocked = false;
				$('#placeEight').css('opacity', '0.0');
			}
			if (placeNineActive) {
				betResultsString += 'Place 9 Bet: Loser<br>';
				placeNineActive = false;
				placeNineLocked = false;
				$('#placeNine').css('opacity', '0.0');
			}
			break;
		case 8:
			if (placeEightActive) {
				betResultsString += 'Place 8 Bet: Winner, Odds Paid 7:6<br>';
				placeEightActive = false;
				placeEightLocked = false;
				$('#placeEight').css('opacity', '0.0');
			}
			break;
		case 9:
			if (placeNineActive) {
				betResultsString += 'Place 9 Bet: Winner, Odds Paid 7:5<br>';
				placeNineActive = false;
				placeNineLocked = false;
				$('#placeNine').css('opacity', '0.0');
			}
			break;
		case 10:
			if (placeTenActive) {
				betResultsString += 'Place 10 Bet: Winner, Odds Paid 9:5<br>';
				placeTenActive = false;
				placeTenLocked = false;
				$('#placeTen').css('opacity', '0.0');
			}
			break;
	}
	
	// users cannot bet on hard way on Come Out Roll
	if (isComeOutRoll) {
		placeFourLocked = true;
		placeFiveLocked = true;
		placeSixLocked = true;
		placeEightLocked = true;
		placeNineLocked = true;
		placeTenLocked = true;
	}
	
	document.getElementById('currGameState').innerHTML = betResultsString;
	document.getElementById('currGameState').style.display = 'block';
}
