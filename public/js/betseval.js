var pointValue = 0;
var isComeOutRoll=new Boolean();
isComeOutRoll = true;

function betsEval(dice1, dice2)
{
	betResultsString = '<strong>Current Game State:</strong><br><br>';
	diceValue = dice1 + dice2;
	/* Pass Line, Don't Pass Line, Pass Odds, & Don't Pass Bet Logic */
	if (isComeOutRoll) {
		switch(diceValue) {
		case 2:
		case 3:
		case 12:
			if (document.getElementById('passLineCb').checked) {
				betResultsString += 'Pass Line Bet: Loser (Rolled Craps)<br>';
			}
			if (document.getElementById('dontPassLineCb').checked) {
				betResultsString += 'Dont Pass Line Bet: Winner, Odds Paid 1:1<br>';
			}
			isComeOutRoll = true;
			break;
		case 7:
		case 11:
			if (document.getElementById('passLineCb').checked) {
				betResultsString += 'Pass Line Bet: Winner, Odds Paid 1:1<br>';
			}
			if (document.getElementById('dontPassLineCb').checked) {
				betResultsString += 'Dont Pass Line Bet: Loser (Rolled 7 or 11)<br>';
			}
			isComeOutRoll = true;
			break;
		default:
			pointValue = diceValue;
			if (document.getElementById('passLineCb').checked) {
				betResultsString += 'Pass Line Bet: The Point is ' + pointValue + '<br>';
			}
			if (document.getElementById('dontPassLineCb').checked) {
				betResultsString += 'Dont Pass Line Bet: The Point is ' + pointValue + '<br>';
			}
			isComeOutRoll = false;
			// can now bet on Pass/Don't Pass Odds
			document.getElementById('passOddsCb').disabled = false;
			document.getElementById('dontPassOddsCb').disabled = false;
			// lock in pass/don't pass bet
			document.getElementById('passLineCb').disabled = true;
			document.getElementById('dontPassLineCb').disabled = true;
			break;
		}
	} else {
		// if user made a pass/don't pass odds bet, lock it in
		if (document.getElementById('passOddsCb').checked || document.getElementById('dontPassOddsCb').checked) {
			document.getElementById('passOddsCb').disabled = true;
			document.getElementById('dontPassOddsCb').disabled = true;
		}
		switch(diceValue) {
		case 7:
			if (document.getElementById('passLineCb').checked) {
				betResultsString += 'Pass Line Bet: Loser (Rolled 7)<br>';
			}
			if (document.getElementById('dontPassLineCb').checked) {
				betResultsString += 'Dont Pass Line Bet: Winner, Odds Paid 1:1<br>';
			}
			if (document.getElementById('passOddsCb').checked) {
				betResultsString += 'Pass Odds: Loser<br>';
			}
			// Pass Odds Paid on Don't Pass Odds Paid depend on what the point was
			if (document.getElementById('dontPassOddsCb').checked) {
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
			// can now bet on Pass/Don't Pass Bets
			document.getElementById('passOddsCb').disabled = true;
			document.getElementById('dontPassOddsCb').disabled = true;
			// disable/uncheck pass & don't pass odds
			document.getElementById('passLineCb').checked = false;
			document.getElementById('dontPassLineCb').checked = false;
			document.getElementById('passLineCb').disabled = false;
			document.getElementById('dontPassLineCb').disabled = false;
			pointValue = 0;
			break;
		case pointValue:
			if (document.getElementById('passLineCb').checked) {
				betResultsString += 'Pass Line Bet: Winner, Odds Paid 1:1<br>';
			}
			if (document.getElementById('dontPassLineCb').checked) {
				betResultsString += 'Dont Pass Line Bet: Loser (Rolled Point)<br>';
			}
			if (document.getElementById('dontPassOddsCb').checked) {
				betResultsString += 'Dont Pass Odds: Loser';
			}
			// Pass Odds Paid on Don't Pass Odds Paid depend on what the point was
			if (document.getElementById('passOddsCb').checked) {
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
			// can now bet on Pass/Don't Pass Bets
			document.getElementById('passOddsCb').disabled = true;
			document.getElementById('dontPassOddsCb').disabled = true;
			// disable/uncheck pass & don't pass odds
			document.getElementById('passLineCb').checked = false;
			document.getElementById('dontPassLineCb').checked = false;
			document.getElementById('passLineCb').disabled = false;
			document.getElementById('dontPassLineCb').disabled = false;
			pointValue = 0;
			break;
		default:
			if (document.getElementById('passLineCb').checked) {
				betResultsString += 'Pass Line Bet: The Point is still ' + pointValue + '<br>';
			}
			if (document.getElementById('dontPassLineCb').checked) {
				betResultsString += 'Dont Pass Line Bet: The Point is still ' + pointValue + '<br>';
			}
			if (document.getElementById('passOddsCb').checked) {
				betResultsString += 'Pass Odds Bet: The Point is still ' + pointValue + '<br>';
			}
			if (document.getElementById('dontPassOddsCb').checked) {
				betResultsString += 'Dont Pass Odds Bet: The Point is still ' + pointValue + '<br>';
			}
			break;
		}
	}
	
	/* Single Roll Betting Logic */
	// see if each bet is active and then if it is winner or not
	if (document.getElementById('snakeEyesCb').checked) {
		if (diceValue == 2) {
			betResultsString += 'Snake Eyes Bet: Winner, Odds Paid 30:1<br>';
		} else {
			betResultsString += 'Snake Eyes Bet: Loser<br>';
		}
		document.getElementById('snakeEyesCb').checked = false;
	}
	if (document.getElementById('aceDeuceCb').checked) {
		if (diceValue == 3) {
			betResultsString += 'Ace Deuce Bet: Winner, Odds Paid 15:1<br>';
		} else {
			betResultsString += 'Ace Deuce Bet: Loser<br>';
		}
		document.getElementById('aceDeuceCb').checked = false;
	}
	if (document.getElementById('yoCb').checked) {
		if (diceValue == 11) {
			betResultsString += 'Yo Bet: Winner, Odds Paid 15:1<br>';
		} else {
			betResultsString += 'Yo Bet: Loser<br>';
		}
		document.getElementById('yoCb').checked = false;
	}
	if (document.getElementById('boxcarsCb').checked) {
		if (diceValue == 12) {
			betResultsString += 'Boxcars Bet: Winner, Odds Paid 30:1<br>';
		} else {
			betResultsString += 'Boxcars Bet: Loser<br>';
		}
		document.getElementById('boxcarsCb').checked = false;
	}
	if (document.getElementById('anyCrapsCb').checked) {
		if (diceValue == 2 || diceValue == 3 || diceValue == 12) {
			betResultsString += 'Any Craps Bet: Winner, Odds Paid 7:1<br>';
		} else {
			betResultsString += 'Any Craps Bet: Loser<br>';
		}
		document.getElementById('anyCrapsCb').checked = false;
	}
	if (document.getElementById('anySevenCb').checked) {
		if (diceValue == 7) {
			betResultsString += 'Any Seven Bet: Winner, Odds Paid 4:1<br>';
		} else {
			betResultsString += 'Ace Deuce Bet: Loser<br>';
		}
		document.getElementById('anySevenCb').checked = false;
	}
	if (document.getElementById('fieldCb').checked) {
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
		document.getElementById('fieldCb').checked = false;
	}
	
	/* Hard Way Betting Logic */
	// if user checks a hard way, lock in their bet
	if (document.getElementById('hard4Cb').checked) {
		document.getElementById('hard4Cb').disabled = true;
	}
	if (document.getElementById('hard6Cb').checked) {
		document.getElementById('hard6Cb').disabled = true;
	}
	if (document.getElementById('hard8Cb').checked) {
		document.getElementById('hard8Cb').disabled = true;
	}
	if (document.getElementById('hard10Cb').checked) {
		document.getElementById('hard10Cb').disabled = true;
	}
	// if we roll 4, 6, 8, or 10 see if it's "Hard Way"
	// if a seven is rolled, all bets are lost
	switch(diceValue) {
		case 4:
			if (document.getElementById('hard4Cb').checked) {
				if (dice1 == dice2) {
					betResultsString += 'Hard Way 4 Bet: Winner, Odds Paid 7:1<br>';
				} else {
					betResultsString += 'Hard Way 4 Bet: Loser<br>';
				}
				document.getElementById('hard4Cb').checked = false;
				document.getElementById('hard4Cb').disabled = false;
			}
			break;
		case 6:
			if (document.getElementById('hard6Cb').checked) {
				if (dice1 == dice2) {
					betResultsString += 'Hard Way 6 Bet: Winner, Odds Paid 9:1<br>';
				} else {
					betResultsString += 'Hard Way 6 Bet: Loser<br>';
				}
				document.getElementById('hard6Cb').checked = false;
				document.getElementById('hard6Cb').disabled = false;
			}
			break;
		case 7:
			if (document.getElementById('hard4Cb').checked) {
				betResultsString += 'Hard Way 4 Bet: Loser<br>';
				document.getElementById('hard4Cb').checked = false;
				document.getElementById('hard4Cb').disabled = false;
			}
			if (document.getElementById('hard6Cb').checked) {
				betResultsString += 'Hard Way 6 Bet: Loser<br>';
				document.getElementById('hard6Cb').checked = false;
				document.getElementById('hard6Cb').disabled = false;
			}
			if (document.getElementById('hard8Cb').checked) {
				betResultsString += 'Hard Way 8 Bet: Loser<br>';
				document.getElementById('hard8Cb').checked = false;
				document.getElementById('hard8Cb').disabled = false;
			}
			if (document.getElementById('hard10Cb').checked) {
				betResultsString += 'Hard Way 10 Bet: Loser<br>';
				document.getElementById('hard10Cb').checked = false;
				document.getElementById('hard10Cb').disabled = false;
			}
			break;
		case 8:
			if (document.getElementById('hard8Cb').checked) {
				if (dice1 == dice2) {
					betResultsString += 'Hard Way 8 Bet: Winner, Odds Paid 9:1<br>';
				} else {
					betResultsString += 'Hard Way 8 Bet: Loser<br>';
				}
				document.getElementById('hard8Cb').checked = false;
				document.getElementById('hard8Cb').disabled = false;
			}
			break;
		case 10:
			if (document.getElementById('hard10Cb').checked) {
				if (dice1 == dice2) {
					betResultsString += 'Hard Way 10 Bet: Winner, Odds Paid 7:1<br>';
				} else {
					betResultsString += 'Hard Way 10 Bet: Loser<br>';
				}
				document.getElementById('hard10Cb').checked = false;
				document.getElementById('hard10Cb').disabled = false;
			}
			break;
	}
	document.getElementById('currGameState').innerHTML = betResultsString;
	document.getElementById('currGameState').style.display = 'block';
}