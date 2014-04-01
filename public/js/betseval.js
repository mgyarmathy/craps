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

function payout(id, bet, fractional) {
	var sid = id;
	//If we take out money at each bet, we need to add it back to winnings
	var winnings = bet * (1+fractional);
	//var socket = io.connect('http://localhost:3000');
	socket.emit('payouts',{sid: sid, amount: winnings, tableNumber: tableNumber});
	
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
	
	/* Single Roll Betting Logic */
	// see if each bet is active and then if it is winner or not
	if (snakeEyesActive) {
		if (diceValue == 2) {
			betResultsString += 'Snake Eyes Bet: Winner, Odds Paid 30:1<br>';
		} else {
			betResultsString += 'Snake Eyes Bet: Loser<br>';
		}
		snakeEyesActive = false;
		$('#snakeEyes').css('opacity', '0.0');
	}
	if (aceDeuceActive) {
		if (diceValue == 3) {
			betResultsString += 'Ace Deuce Bet: Winner, Odds Paid 15:1<br>';
		} else {
			betResultsString += 'Ace Deuce Bet: Loser<br>';
		}
		aceDeuceActive = false;
		$('#aceDeuce').css('opacity', '0.0');
	}
	if (yoLeftActive) {
		if (diceValue == 11) {
			betResultsString += 'Yo Bet: Winner, Odds Paid 15:1<br>';
		} else {
			betResultsString += 'Yo Bet: Loser<br>';
		}
		yoLeftActive = false;
		$('#yoLeft').css('opacity', '0.0');
	}
	if (yoRightActive) {
		if (diceValue == 11) {
			betResultsString += 'Yo Bet: Winner, Odds Paid 15:1<br>';
		} else {
			betResultsString += 'Yo Bet: Loser<br>';
		}
		yoRightActive = false;
		$('#yoRight').css('opacity', '0.0');
	}
	if (boxcarsActive) {
		if (diceValue == 12) {
			betResultsString += 'Boxcars Bet: Winner, Odds Paid 30:1<br>';
		} else {
			betResultsString += 'Boxcars Bet: Loser<br>';
		}
		boxcarsActive = false;
		$('#boxcars').css('opacity', '0.0');
	}
	if (anyCrapsActive) {
		if (diceValue == 2 || diceValue == 3 || diceValue == 12) {
			betResultsString += 'Any Craps Bet: Winner, Odds Paid 7:1<br>';
		} else {
			betResultsString += 'Any Craps Bet: Loser<br>';
		}
		anyCrapsActive = false;
		$('#anyCraps').css('opacity', '0.0');
	}
	if (anySevenActive) {
		if (diceValue == 7) {
			betResultsString += 'Any Seven Bet: Winner, Odds Paid 4:1<br>';
		} else {
			betResultsString += 'Ace Deuce Bet: Loser<br>';
		}
		anySevenActive = false;
		$('#anySeven').css('opacity', '0.0');
	}
	if (fieldActive) {
		// different dice values have different pay outs
		if (diceValue == 2) {
			betResultsString += 'Field Bet: Winner, Odds Paid 2:1<br>';
		} else if (diceValue == 12) {
			betResultsString += 'Field Bet: Winner, Odds Paid 3:1<br>';
		} else if (diceValue == 3 || diceValue == 4 || diceValue == 9 || diceValue == 10 || diceValue == 11) {
			betResultsString += 'Field Bet: Winner, Odds Paid 1:1<br>';
		} else {
			betResultsString += 'Field Bet: Loser<br>';
		}
		fieldActive = false;
		$('#field').css('opacity', '0.0');
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

/* onClick functions for game board*/
function passLineClick() {
	if (isComeOutRoll && !passLineLocked) {
		if (passLineActive) {
			passLineActive = false;
			$('#passLineVert').css('opacity', '0.0');
			$('#passLineHori').css('opacity', '0.0');
		} else {
			passLineActive = true;
			$('#passLineVert').css('background-color', 'blue');
			$('#passLineHori').css('background-color', 'blue');
			$('#passLineVert').css('opacity', '0.5');
			$('#passLineHori').css('opacity', '0.5');
		}
	}
}

function dontPassBarClick() {
	if (isComeOutRoll && !dontPassLineLocked) {
		if (dontPassLineActive) {
			dontPassLineActive = false;
			$('#dontPassBarVert').css('opacity', '0.0');
			$('#dontPassBarHori').css('opacity', '0.0');
		} else {
			dontPassLineActive = true;
			$('#dontPassBarVert').css('background-color', 'blue');
			$('#dontPassBarHori').css('background-color', 'blue');
			$('#dontPassBarVert').css('opacity', '0.5');
			$('#dontPassBarHori').css('opacity', '0.5');
		}
	}
}

function passOddsClick() {
	if (!isComeOutRoll && !passOddsLocked && passLineActive) {
		if (passOddsActive) {
			passOddsActive = false;
			$('#passOdds').css('opacity', '0.0');
		} else {
			passOddsActive = true;
			$('#passOdds').css('background-color', 'blue');
			$('#passOdds').css('opacity', '0.5');
		}
	}
}

function dontPassOddsClick() {
	if (!isComeOutRoll && !dontPassOddsLocked && dontPassLineActive) {
		if (dontPassOddsActive) {
			dontPassOddsActive = false;
			$('#dontPassOdds').css('opacity', '0.0');
		} else {
			dontPassOddsActive = true;
			$('#dontPassOdds').css('background-color', 'blue');
			$('#dontPassOdds').css('opacity', '0.5');
		}
	}
}

function placeFourClick() {
	if (!placeFourLocked) {
		if (placeFourActive) {
			placeFourActive = false;
			$('#placeFour').css('opacity', '0.0');
		} else {
			placeFourActive = true;
			$('#placeFour').css('background-color', 'blue');
			$('#placeFour').css('opacity', '0.5');
		}
	}
}

function placeFiveClick() {
	if (!placeFiveLocked) {
		if (placeFiveActive) {
			placeFiveActive = false;
			$('#placeFive').css('opacity', '0.0');
		} else {
			placeFiveActive = true;
			$('#placeFive').css('background-color', 'blue');
			$('#placeFive').css('opacity', '0.5');
		}
	}
}

function placeSixClick() {
	if (!placeSixLocked) {
		if (placeSixActive) {
			placeSixActive = false;
			$('#placeSix').css('opacity', '0.0');
		} else {
			placeSixActive = true;
			$('#placeSix').css('background-color', 'blue');
			$('#placeSix').css('opacity', '0.5');
		}
	}
}

function placeEightClick() {
	if (!placeEightLocked) {
		if (placeEightActive) {
			placeEightActive = false;
			$('#placeEight').css('opacity', '0.0');
		} else {
			placeEightActive = true;
			$('#placeEight').css('background-color', 'blue');
			$('#placeEight').css('opacity', '0.5');
		}
	}
}

function placeNineClick() {
	if (!placeNineLocked) {
		if (placeNineActive) {
			placeNineActive = false;
			$('#placeNine').css('opacity', '0.0');
		} else {
			placeNineActive = true;
			$('#placeNine').css('background-color', 'blue');
			$('#placeNine').css('opacity', '0.5');
		}
	}
}

function placeTenClick() {
	if (!placeTenLocked) {
		if (placeTenActive) {
			placeTenActive = false;
			$('#placeTen').css('opacity', '0.0');
		} else {
			placeTenActive = true;
			$('#placeTen').css('background-color', 'blue');
			$('#placeTen').css('opacity', '0.5');
		}
	}
}

function fieldClick() {
	if (fieldActive) {
		fieldActive = false;
		$('#field').css('opacity', '0.0');
	} else {
		fieldActive = true;
		$('#field').css('background-color', 'blue');
		$('#field').css('opacity', '0.5');
	}
}

function anySevenClick() {
	if (anySevenActive) {
		anySevenActive = false;
		$('#anySeven').css('opacity', '0.0');
	} else {
		anySevenActive = true;
		$('#anySeven').css('background-color', 'blue');
		$('#anySeven').css('opacity', '0.5');
	}
}

function aceDeuceClick() {
	if (aceDeuceActive) {
		aceDeuceActive = false;
		$('#aceDeuce').css('opacity', '0.0');
	} else {
		aceDeuceActive = true;
		$('#aceDeuce').css('background-color', 'blue');
		$('#aceDeuce').css('opacity', '0.5');
	}
}

function snakeEyesClick() {
	if (snakeEyesActive) {
		snakeEyesActive = false;
		$('#snakeEyes').css('opacity', '0.0');
	} else {
		snakeEyesActive = true;
		$('#snakeEyes').css('background-color', 'blue');
		$('#snakeEyes').css('opacity', '0.5');
	}
}

function boxcarsClick() {
	if (boxcarsActive) {
		boxcarsActive = false;
		$('#boxcars').css('opacity', '0.0');
	} else {
		boxcarsActive = true;
		$('#boxcars').css('background-color', 'blue');
		$('#boxcars').css('opacity', '0.5');
	}
}

function yoLeftClick() {
	if (yoLeftActive) {
		yoLeftActive = false;
		$('#yoLeft').css('opacity', '0.0');
	} else {
		yoLeftActive = true;
		$('#yoLeft').css('background-color', 'blue');
		$('#yoLeft').css('opacity', '0.5');
	}
}
function yoRightClick() {
	if (yoRightActive) {
		yoRightActive = false;
		$('#yoRight').css('opacity', '0.0');
	} else {
		yoRightActive = true;
		$('#yoRight').css('background-color', 'blue');
		$('#yoRight').css('opacity', '0.5');
	}
}
function anyCrapsClick() {
	if (anyCrapsActive) {
		anyCrapsActive = false;
		$('#anyCraps').css('opacity', '0.0');
	} else {
		anyCrapsActive = true;
		$('#anyCraps').css('background-color', 'blue');
		$('#anyCraps').css('opacity', '0.5');
	}
}

function hardWayFourClick() {
	if (!hardWayFourLocked) {
		if (hardWayFourActive) {
			hardWayFourActive = false;
			$('#hardWayFour').css('opacity', '0.0');
		} else {
			hardWayFourActive = true;
			$('#hardWayFour').css('background-color', 'blue');
			$('#hardWayFour').css('opacity', '0.5');
		}
	}
}

function hardWaySixClick() {
	if (!hardWaySixLocked) {
		if (hardWaySixActive) {
			hardWaySixActive = false;
			$('#hardWaySix').css('opacity', '0.0');
		} else {
			hardWaySixActive = true;
			$('#hardWaySix').css('background-color', 'blue');
			$('#hardWaySix').css('opacity', '0.5');
		}
	}
}

function hardWayEightClick() {
	if (!hardWayEightLocked) {
		if (hardWayEightActive) {
			hardWayEightActive = false;
			$('#hardWayEight').css('opacity', '0.0');
		} else {
			hardWayEightActive = true;
			$('#hardWayEight').css('background-color', 'blue');
			$('#hardWayEight').css('opacity', '0.5');
		}
	}
}

function hardWayTenClick() {
	if (!hardWayTenLocked) {
		if (hardWayTenActive) {
			hardWayTenActive = false;
			$('#hardWayTen').css('opacity', '0.0');
		} else {
			hardWayTenActive = true;
			$('#hardWayTen').css('background-color', 'blue');
			$('#hardWayTen').css('opacity', '0.5');
		}
	}
}

/* Hover Functions for game board*/
$(document).ready(function() {


$('#passLineVert').hover(function() {
	$('#message').html('Pass Line');
	if (passLineLocked && !passLineActive) {
		$(this).css('background-color', 'red');
		$('#passLineHori').css('background-color', 'red');
		$(this).css('opacity', '0.5');
		$('#passLineHori').css('opacity', '0.5');
	}
	else if (!passLineLocked && !passLineActive) {
		$(this).css('background-color', 'lawngreen');
		$('#passLineHori').css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
		$('#passLineHori').css('opacity', '0.5');
	}
}, function() {
	$('#message').html('');
	if (!passLineActive) {
		$(this).css('opacity', '0.0');
		$('#passLineHori').css('opacity', '0.0');
	}
});

$('#passLineHori').hover(function() {
	$('#message').html('Pass Line');
	if (passLineLocked && !passLineActive) {
		$(this).css('background-color', 'red');
		$('#passLineVert').css('background-color', 'red');
		$(this).css('opacity', '0.5');
		$('#passLineVert').css('opacity', '0.5');
	}
	else if (!passLineLocked && !passLineActive) {
		$(this).css('background-color', 'lawngreen');
		$('#passLineVert').css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
		$('#passLineVert').css('opacity', '0.5');
	}
}, function() {
	$('#message').html('');
	if (!passLineActive) {
		$(this).css('opacity', '0.0');
		$('#passLineVert').css('opacity', '0.0');
	}
});

$('#dontPassBarVert').hover(function() {
	$('#message').html('Don\'t Pass Bar');
	if (dontPassLineLocked && !dontPassLineActive) {
		$(this).css('background-color', 'red');
		$('#dontPassBarHori').css('background-color', 'red');
		$(this).css('opacity', '0.5');
		$('#dontPassBarHori').css('opacity', '0.5');
	}
	else if (!dontPassLineLocked && !dontPassLineActive) {
		$(this).css('background-color', 'lawngreen');
		$('#dontPassBarHori').css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
		$('#dontPassBarHori').css('opacity', '0.5');
	}
}, function() {
	$('#message').html('');
	if (!dontPassLineActive) {
		$(this).css('opacity', '0.0');
		$('#dontPassBarHori').css('opacity', '0.0');
	}
});

$('#dontPassBarHori').hover(function() {
	$('#message').html('Don\'t Pass Bar');
	if (dontPassLineLocked && !dontPassLineActive) {
		$(this).css('background-color', 'red');
		$('#dontPassBarVert').css('background-color', 'red');
		$(this).css('opacity', '0.5');
		$('#dontPassBarVert').css('opacity', '0.5');
	}
	else if (!dontPassLineLocked && !dontPassLineActive) {
		$(this).css('background-color', 'lawngreen');
		$('#dontPassBarVert').css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
		$('#dontPassBarVert').css('opacity', '0.5');
	}
}, function() {
	$('#message').html('');
	if (!dontPassLineActive) {
		$(this).css('opacity', '0.0');
		$('#dontPassBarVert').css('opacity', '0.0');
	}
});

$('#dontComeBar').hover(function() {
	$(this).css('background-color', 'red');
	$(this).css('opacity', '0.5');
}, function() {
	$(this).css('opacity', '0.0');
});

$('#placeFour').hover(function() {
	$('#message').html('Place Four');
	if (placeFourLocked && !placeFourActive) {
		$(this).css('background-color', 'red');
		$(this).css('opacity', '0.5');
	}
	else if (!placeFourLocked && !placeFourActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	if (!placeFourActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});

$('#placeFive').hover(function() {
	$('#message').html('Place Five');
	if (placeFiveLocked && !placeFiveActive) {
		$(this).css('background-color', 'red');
		$(this).css('opacity', '0.5');
	}
	else if (!placeFiveLocked && !placeFiveActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	if (!placeFiveActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});

$('#placeSix').hover(function() {
	$('#message').html('Place Six');
	if (placeSixLocked && !placeSixActive) {
		$(this).css('background-color', 'red');
		$(this).css('opacity', '0.5');
	}
	else if (!placeSixLocked && !placeSixActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	if (!placeSixActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});

$('#placeEight').hover(function() {
	$('#message').html('Place Eight');
	if (placeEightLocked && !placeEightActive) {
		$(this).css('background-color', 'red');
		$(this).css('opacity', '0.5');
	}
	else if (!placeEightLocked && !placeEightActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	if (!placeEightActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});

$('#placeNine').hover(function() {
	$('#message').html('Place Nine');
	if (placeNineLocked && !placeNineActive) {
		$(this).css('background-color', 'red');
		$(this).css('opacity', '0.5');
	}
	else if (!placeNineLocked && !placeNineActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	if (!placeNineActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});

$('#placeTen').hover(function() {
	$('#message').html('Place Ten');
	if (placeTenLocked && !placeTenActive) {
		$(this).css('background-color', 'red');
		$(this).css('opacity', '0.5');
	}
	else if (!placeTenLocked && !placeTenActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	if (!placeTenActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});

$('#pointFour').hover(function() {
	$(this).css('background-color', 'red');
	$(this).css('opacity', '0.5');
}, function() {
	$(this).css('opacity', '0.0');
});

$('#pointFive').hover(function() {
	$(this).css('background-color', 'red');
	$(this).css('opacity', '0.5');
}, function() {
	$(this).css('opacity', '0.0');
});

$('#pointSix').hover(function() {
	$(this).css('background-color', 'red');
	$(this).css('opacity', '0.5');
}, function() {
	$(this).css('opacity', '0.0');
});

$('#pointEight').hover(function() {
	$(this).css('background-color', 'red');
	$(this).css('opacity', '0.5');
}, function() {
	$(this).css('opacity', '0.0');
});

$('#pointNine').hover(function() {
	$(this).css('background-color', 'red');
	$(this).css('opacity', '0.5');
}, function() {
	$(this).css('opacity', '0.0');
});

$('#pointTen').hover(function() {
	$(this).css('background-color', 'red');
	$(this).css('opacity', '0.5');
}, function() {
	$(this).css('opacity', '0.0');
});

$('#come').hover(function() {
	$(this).css('background-color', 'red');
	$(this).css('opacity', '0.5');
}, function() {
	$(this).css('opacity', '0.0');
});

$('#field').hover(function() {
	if (!fieldActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	if (!fieldActive) {
		$(this).css('opacity', '0.0');
	}
});

$('#passOdds').hover(function() {
	$('#message').html('Pass Odds');
	if ((passOddsLocked && !passOddsActive) || !passLineActive) {
		$(this).css('background-color', 'red');
		$(this).css('opacity', '0.5');
	}
	else if (!passOddsLocked && !passOddsActive && passLineActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	$('#message').html('');
	if (!passOddsActive) {
		$(this).css('opacity', '0.0');
	}
});

$('#anySeven').hover(function() {
	if (!anySevenActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
		$('#message').html('Seven');
	}
}, function() {
	if (!anySevenActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});

$('#hardWaySix').hover(function() {
	$('#message').html('Hard Way Six');
	if (hardWaySixLocked && !hardWaySixActive) {
		$(this).css('background-color', 'red');
		$(this).css('opacity', '0.5');
	}
	if (!hardWaySixLocked && !hardWaySixActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	if (!hardWaySixActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});

$('#hardWayTen').hover(function() {
	$('#message').html('Hard Way Ten');
	if (hardWayTenLocked && !hardWayTenActive) {
		$(this).css('background-color', 'red');
		$(this).css('opacity', '0.5');
	}
	if (!hardWayTenLocked && !hardWayTenActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	if (!hardWayTenActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});

$('#hardWayEight').hover(function() {
	$('#message').html('Hard Way Eight');
	if (hardWayEightLocked && !hardWayEightActive) {
		$(this).css('background-color', 'red');
		$(this).css('opacity', '0.5');
	}
	if (!hardWayEightLocked && !hardWayEightActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	if (!hardWayEightActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});

$('#hardWayFour').hover(function() {
	$('#message').html('Hard Way Four');
	if (hardWayFourLocked && !hardWayFourActive) {
		$(this).css('background-color', 'red');
		$(this).css('opacity', '0.5');
	}
	if (!hardWayFourLocked && !hardWayFourActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	if (!hardWayFourActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});

$('#dontPassOdds').hover(function() {
	$('#message').html('Don\'t Pass Odds');
	if ((dontPassOddsLocked && !dontPassOddsActive) || !dontPassLineActive) {
		$(this).css('background-color', 'red');
		$(this).css('opacity', '0.5');
	}
	else if (!dontPassOddsLocked && !dontPassOddsActive && dontPassLineActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	$('#message').html('');
	if (!dontPassOddsActive) {
		$(this).css('opacity', '0.0');
	}
});

$('#aceDeuce').hover(function() {
	if (!aceDeuceActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
		$('#message').html('Three');
	}
}, function() {
	if (!aceDeuceActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});

$('#snakeEyes').hover(function() {
	if (!snakeEyesActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
		$('#message').html('Two');
	}
}, function() {
	if (!snakeEyesActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});

$('#boxcars').hover(function() {
	if (!boxcarsActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
		$('#message').html('Twelve');
	}
}, function() {
	if (!boxcarsActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});


$('#yoLeft').hover(function() {
	if (!yoLeftActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
		$('#message').html('Eleven');
	}
}, function() {
	if (!yoLeftActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});

$('#yoRight').hover(function() {
	if (!yoRightActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
		$('#message').html('Eleven');
	}
}, function() {
	if (!yoRightActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});

$('#anyCraps').hover(function() {
	if (!anyCrapsActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
		$('#message').html('Any Craps [2, 3, or 12]');
	}
}, function() {
	if (!anyCrapsActive) {
		$(this).css('opacity', '0.0');
		$('#message').html('');
	}
});


});