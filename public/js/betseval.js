var pointValue = 0;
var isComeOutRoll=new Boolean();
isComeOutRoll = true;

function betsEval(dice1, dice2)
{
	diceValue = dice1 + dice2;
	/* Pass Line, Don't Pass Line, Pass Odds, & Don't Pass Bet Logic */
	if (isComeOutRoll) {
		document.getElementById('passOddsBetStatus').textContent = 'inactive';
		document.getElementById('dontPassOddsBetStatus').textContent = 'inactive';
		switch(diceValue) {
		case 2:
		case 3:
		case 12:
			document.getElementById('passLineBetStatus').textContent = 'Loser (Rolled Craps)';
			document.getElementById('dontPassLineBetStatus').textContent = 'Winner, Odds Paid 1:1';
			isComeOutRoll = true;
			break;
		case 7:
		case 11:
			document.getElementById('passLineBetStatus').textContent = 'Winner, Odds Paid 1:1';
			document.getElementById('dontPassLineBetStatus').textContent = 'Loser (Rolled 7 or 11)';
			isComeOutRoll = true;
			break;
		default:
			pointValue = diceValue;
			document.getElementById('passLineBetStatus').textContent = 'The Point is ' + pointValue;
			document.getElementById('dontPassLineBetStatus').textContent = 'The Point is ' + pointValue;
			isComeOutRoll = false;
			break;
		}
	} else {
		switch(diceValue) {
		case 7:
			document.getElementById('passLineBetStatus').textContent = 'Loser (Rolled 7)';
			document.getElementById('dontPassLineBetStatus').textContent = 'Winner, Odds Paid 1:1';
			document.getElementById('passOddsBetStatus').textContent = 'Loser';
			// Odds Paid on Don't Pass Odds depend on what the point was
			switch(pointValue) {
				case 4:
				case 10:
					document.getElementById('dontPassOddsBetStatus').textContent = 'Winner, Odds Paid 1:2';
					break;
				case 5:
				case 9:
					document.getElementById('dontPassOddsBetStatus').textContent = 'Winner, Odds Paid 2:3';
					break;
				case 6:
				case 8:
					document.getElementById('dontPassOddsBetStatus').textContent = 'Winner, Odds Paid 5:6';
					break;
			}
			isComeOutRoll = true;
			pointValue = 0;
			break;
		case pointValue:
			document.getElementById('passLineBetStatus').textContent = 'Winner, Odds Paid 1:1';
			document.getElementById('dontPassLineBetStatus').textContent = 'Loser (Rolled Point)';
			document.getElementById('dontPassOddsBetStatus').textContent = 'Loser';
			// Odds Paid on Pass Odds depend on what the point was
			switch(pointValue) {
				case 4:
				case 10:
					document.getElementById('passOddsBetStatus').textContent = 'Winner, Odds Paid 2:1';
					break;
				case 5:
				case 9:
					document.getElementById('passOddsBetStatus').textContent = 'Winner, Odds Paid 3:2';
					break;
				case 6:
				case 8:
					document.getElementById('passOddsBetStatus').textContent = 'Winner, Odds Paid 6:5';
					break;
			}
			isComeOutRoll = true;
			pointValue = 0;
			break;
		default:
			document.getElementById('passLineBetStatus').textContent = 'The Point is still ' + pointValue;
			document.getElementById('dontPassLineBetStatus').textContent = 'The Point is still ' + pointValue;
			document.getElementById('passOddsBetStatus').textContent = 'The Point is still ' + pointValue;
			document.getElementById('dontPassOddsBetStatus').textContent = 'The Point is still ' + pointValue;
			break;
		}
	}
	
	/* Single Roll Betting Logic */
	// all start out losers
	document.getElementById('snakeEyesBetStatus').textContent = 'Loser';
	document.getElementById('aceDeuceBetStatus').textContent = 'Loser';
	document.getElementById('yoBetStatus').textContent = 'Loser';
	document.getElementById('boxcarsBetStatus').textContent = 'Loser';
	document.getElementById('anyCrapsBetStatus').textContent = 'Loser';
	document.getElementById('anySevenBetStatus').textContent = 'Loser';
	document.getElementById('fieldBetStatus').textContent = 'Loser';
	// see if each is a winner or not
	switch(diceValue) {
		case 2:
			document.getElementById('snakeEyesBetStatus').textContent = 'Winner, Odds Paid 30:1';
			document.getElementById('anyCrapsBetStatus').textContent = 'Winner, Odds Paid 7:1';
			document.getElementById('fieldBetStatus').textContent = 'Winner, Odds Paid 2:1';
			break;
		case 3:
			document.getElementById('aceDeuceBetStatus').textContent = 'Winner, Odds Paid 15:1';
			document.getElementById('anyCrapsBetStatus').textContent = 'Winner, Odds Paid 7:1';
			document.getElementById('fieldBetStatus').textContent = 'Winner, Odds Paid 1:1';
			break;
		case 4:
			document.getElementById('fieldBetStatus').textContent = 'Winner, Odds Paid 1:1';
			break;
		case 7:
			document.getElementById('anySevenBetStatus').textContent = 'Winner, Odds Paid 4:1';
			break;
		case 9:
			document.getElementById('fieldBetStatus').textContent = 'Winner, Odds Paid 1:1';
			break;
		case 10:
			document.getElementById('fieldBetStatus').textContent = 'Winner, Odds Paid 1:1';
			break;
		case 11:
			document.getElementById('yoBetStatus').textContent = 'Winner, Odds Paid 15:1';
			document.getElementById('fieldBetStatus').textContent = 'Winner, Odds Paid 1:1';
			break;
		case 12:
			document.getElementById('boxcarsBetStatus').textContent = 'Winner, Odds Paid 30:1';
			document.getElementById('anyCrapsBetStatus').textContent = 'Winner, Odds Paid 7:1';
			document.getElementById('fieldBetStatus').textContent = 'Winner, Odds Paid 3:1';
			break;
	}
	
	/* Hard Way Betting Logic */
	// for now they are all active all the time
	document.getElementById('hard4BetStatus').textContent = 'active';
	document.getElementById('hard6BetStatus').textContent = 'active';
	document.getElementById('hard8BetStatus').textContent = 'active';
	document.getElementById('hard10BetStatus').textContent = 'active';
	// if we roll 4, 6, 8, or 10 see if it's "Hard Way"
	switch(diceValue) {
		case 4:
			if (dice1 == dice2) {
				document.getElementById('hard4BetStatus').textContent = 'Winner, Odds Paid 7:1';
			} else {
				document.getElementById('hard4BetStatus').textContent = 'Loser';
			}
			break;
		case 6:
			if (dice1 == dice2) {
				document.getElementById('hard6BetStatus').textContent = 'Winner, Odds Paid 9:1';
			} else {
				document.getElementById('hard6BetStatus').textContent = 'Loser';
			}
			break;
		case 8:
			if (dice1 == dice2) {
				document.getElementById('hard8BetStatus').textContent = 'Winner, Odds Paid 9:1';
			} else {
				document.getElementById('hard8BetStatus').textContent = 'Loser';
			}
			break;
		case 10:
			if (dice1 == dice2) {
				document.getElementById('hard10BetStatus').textContent = 'Winner, Odds Paid 7:1';
			} else {
				document.getElementById('hard10BetStatus').textContent = 'Loser';
			}
			break;
	}
	
	document.getElementById('currGameState').style.display = 'block';
}