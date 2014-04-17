// a stripped down bets eval function used in the web app
// betsEval is all the betting logic of the game so its all we need
// to make sure all bets are paying out correctly
var pointValue = 0;
var playerBalance = 0;

/* All Betting Active Variables */
var isComeOutRoll = false;
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
var newComeBetAmt = 0;
var comeBetAmtArray = new Array();
for (var i=0; i<=12; i++) {
	comeBetAmtArray[i] = 0;
}
var newDontComeBetAmt = 0;
var dontComeBetAmtArray = new Array();
for (var i=0; i<=12; i++) {
	dontComeBetAmtArray[i] = 0;
}

function payout(bet, fractional) {
	var winnings = Math.ceil(bet * (1+fractional));
	playerBalance += winnings;
}

/* Check each bet with dice and see if winner or loser */
function betsEval(dice1, dice2)
{
	diceValue = dice1 + dice2;
	/* Pass Line, Don't Pass Line, Pass Odds, & Don't Pass Bet Logic */
	if (isComeOutRoll) {
		switch(diceValue) {
		case 2:
		case 3:
		case 12:
			if (passLineActive) {
				passLineBetAmt = 0;
			}
			if (dontPassLineActive) {
				payout(dontPassLineBetAmt, (1/1));
				dontPassLineBetAmt = 0;
			}
			isComeOutRoll = true;
			passLineActive = false;
			dontPassLineActive = false;
			break;
		case 7:
		case 11:
			if (passLineActive) {
				payout(passLineBetAmt, (1/1));
				passLineBetAmt = 0;
			}
			if (dontPassLineActive) {
				dontPassLineBetAmt = 0;
			}
			isComeOutRoll = true;
			passLineActive = false;
			dontPassLineActive = false;
			break;
		default:
			pointValue = diceValue;
			isComeOutRoll = false;
			break;
		}
	} else {
		switch(diceValue) {
		case 7:
			if (passLineActive) {
				passLineBetAmt = 0;
			}
			if (dontPassLineActive) {
				payout(dontPassLineBetAmt, (1/1));
				dontPassLineBetAmt = 0;
			}
			if (passOddsActive) {
				passOddsBetAmt = 0;
			}
			// Pass Odds Paid on Don't Pass Odds Paid depend on what the point was
			if (dontPassOddsActive) {
				switch(pointValue) {
					case 4:
					case 10:
						payout(dontPassOddsBetAmt, (1/2));
						dontPassOddsBetAmt = 0;
						break;
					case 5:
					case 9:
						payout(dontPassOddsBetAmt, (2/3));
						dontPassOddsBetAmt = 0;
						break;
					case 6:
					case 8:
						payout(dontPassOddsBetAmt, (5/6));
						dontPassOddsBetAmt = 0;
						break;
				}
			}
			isComeOutRoll = true;
			passOddsActive = false;
			dontPassOddsActive = false;
			passLineActive = false;
			dontPassLineActive = false;
			pointValue = 0;
			break;
		case pointValue:
			if (passLineActive) {
				payout(passLineBetAmt, (1/1));
				passLineBetAmt = 0;
			}
			if (dontPassLineActive) {
				dontPassLineBetAmt = 0;
			}
			if (dontPassOddsActive) {
				dontPassOddsBetAmt = 0;
			}
			// Pass Odds Paid on Don't Pass Odds Paid depend on what the point was
			if (passOddsActive) {
				switch(pointValue) {
					case 4:
					case 10:
						payout(passOddsBetAmt, (2/1));
						passOddsBetAmt = 0;
						break;
					case 5:
					case 9:
						payout(passOddsBetAmt, (3/2));
						passOddsBetAmt = 0;
						break;
					case 6:
					case 8:
						payout(passOddsBetAmt, (6/5));
						passOddsBetAmt = 0;
						break;
				}
			}
			isComeOutRoll = true;
			passOddsActive = false;
			dontPassOddsActive = false;
			passLineActive = false;
			dontPassLineActive = false;
			pointValue = 0;
			break;
		default:
			break;
		}
	}
	
	/* Come and Don't Come Bets */
	switch (diceValue) {
		case 2:
		case 3:
		case 12:
			if (newComeBet) {
				newComeBetAmt = 0;
				newComeBet = false;
			}
			if (newDontComeBet) {
				payout(newDontComeBetAmt, (1/1));
				newDontComeBetAmt = 0;
				newDontComeBet = false;
			}
			break;
		case 4:
			if (comeActiveArray[diceValue]) {
				payout(comeBetAmtArray[diceValue], (1/1));
				comeBetAmtArray[diceValue] = 0;
				comeActiveArray[diceValue] = false;
			}
			if (dontComeActiveArray[diceValue]) {
				dontComeBetAmtArray[diceValue] = 0;
				dontComeActiveArray[diceValue] = false;
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				comeBetAmtArray[diceValue] += newComeBetAmt;
				newComeBetAmt = 0;
				newComeBet = false;
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				dontComeBetAmtArray[diceValue] += newDontComeBetAmt;
				newDontComeBetAmt = 0;
				newDontComeBet = false;
			}
			break;
		case 5:
			if (comeActiveArray[diceValue]) {
				payout(comeBetAmtArray[diceValue], (1/1));
				comeBetAmtArray[diceValue] = 0;
				comeActiveArray[diceValue] = false;
			}
			if (dontComeActiveArray[diceValue]) {
				dontComeBetAmtArray[diceValue] = 0;
				dontComeActiveArray[diceValue] = false;
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				comeBetAmtArray[diceValue] += newComeBetAmt;
				newComeBetAmt = 0;
				newComeBet = false;
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				dontComeBetAmtArray[diceValue] += newDontComeBetAmt;
				newDontComeBetAmt = 0;
				newDontComeBet = false;
			}
			break;
		case 6:
			if (comeActiveArray[diceValue]) {
				payout(comeBetAmtArray[diceValue], (1/1));
				comeBetAmtArray[diceValue] = 0;
				comeActiveArray[diceValue] = false;
			}
			if (dontComeActiveArray[diceValue]) {
				dontComeBetAmtArray[diceValue] = 0;
				dontComeActiveArray[diceValue] = false;
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				comeBetAmtArray[diceValue] += newComeBetAmt;
				newComeBetAmt = 0;
				newComeBet = false;
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				dontComeBetAmtArray[diceValue] += newDontComeBetAmt;
				newDontComeBetAmt = 0;
				newDontComeBet = false;
			}
			break;
		case 7:
			// all current active come bets lose, all current dont come bets win
			for (var i=0; i<=12; i++) {
				if (comeActiveArray[i]) {
					comeBetAmtArray[i] = 0;
					comeActiveArray[i] = false;
				}
				if (dontComeActiveArray[i]) {
					payout(dontComeBetAmtArray[i], (1/1));
					dontComeBetAmtArray[i] = 0;
					dontComeActiveArray[i] = false;
				}
			}
			if (newComeBet) {
				payout(newComeBetAmt, (1/1));
				newComeBetAmt = 0;
				newComeBet = false;
			}
			if (newDontComeBet) {
				newDontComeBetAmt = 0;
				newDontComeBet = false;
			}
			break;
		case 8:
			if (comeActiveArray[diceValue]) {
				payout(comeBetAmtArray[diceValue], (1/1));
				comeBetAmtArray[diceValue] = 0;
				comeActiveArray[diceValue] = false;
			}
			if (dontComeActiveArray[diceValue]) {
				dontComeBetAmtArray[diceValue] = 0;
				dontComeActiveArray[diceValue] = false;
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				comeBetAmtArray[diceValue] += newComeBetAmt;
				newComeBetAmt = 0;
				newComeBet = false;
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				dontComeBetAmtArray[diceValue] += newDontComeBetAmt;
				newDontComeBetAmt = 0;
				newDontComeBet = false;
			}
			break;
		case 9:
			if (comeActiveArray[diceValue]) {
				payout(comeBetAmtArray[diceValue], (1/1));
				comeBetAmtArray[diceValue] = 0;
				comeActiveArray[diceValue] = false;
			}
			if (dontComeActiveArray[diceValue]) {
				dontComeBetAmtArray[diceValue] = 0;
				dontComeActiveArray[diceValue] = false;
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				comeBetAmtArray[diceValue] += newComeBetAmt;
				newComeBetAmt = 0;
				newComeBet = false;
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				dontComeBetAmtArray[diceValue] += newDontComeBetAmt;
				newDontComeBetAmt = 0;
				newDontComeBet = false;
			}
			break;
		case 10:
			if (comeActiveArray[diceValue]) {
				payout(comeBetAmtArray[diceValue], (1/1));
				comeBetAmtArray[diceValue] = 0;
				comeActiveArray[diceValue] = false;
			}
			if (dontComeActiveArray[diceValue]) {
				dontComeBetAmtArray[diceValue] = 0;
				dontComeActiveArray[diceValue] = false;
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				comeBetAmtArray[diceValue] += newComeBetAmt;
				newComeBetAmt = 0;
				newComeBet = false;
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				dontComeBetAmtArray[diceValue] += newDontComeBetAmt;
				newDontComeBetAmt = 0;
				newDontComeBet = false;
			}
			break;
		case 11:
			if (newComeBet) {
				payout(newComeBetAmt, (1/1));
				newComeBetAmt = 0;
				newComeBet = false;
			}
			if (newDontComeBet) {
				newDontComeBetAmt = 0;
				newDontComeBet = false;
			}
			break;
	}
	
	/* Single Roll Betting Logic */
	// see if each bet is active and then if it is winner or not
	if (snakeEyesActive) {
		if (diceValue == 2) {
			payout(snakeEyesBetAmt, (30/1));
		} else {
		}
		snakeEyesActive = false;
		snakeEyesBetAmt = 0;
	}
	if (aceDeuceActive) {
		if (diceValue == 3) {
			payout(aceDeuceBetAmt, (15/1));
		} else {
		}
		aceDeuceActive = false;
		aceDeuceBetAmt = 0;
	}
	if (yoLeftActive) {
		if (diceValue == 11) {
			payout(yoLeftBetAmt, (15/1));
		} else {
		}
		yoLeftActive = false;
		yoLeftBetAmt = 0;
	}
	if (yoRightActive) {
		if (diceValue == 11) {
			payout(yoRightBetAmt, (15/1));
		} else {
		}
		yoRightActive = false;
		yoRightBetAmt = 0;
	}
	if (boxcarsActive) {
		if (diceValue == 12) {
			payout(boxcarsBetAmt, (30/1));
		} else {
		}
		boxcarsActive = false;
		boxcarsBetAmt = 0;
	}
	if (anyCrapsActive) {
		if (diceValue == 2 || diceValue == 3 || diceValue == 12) {
			payout(anyCrapsBetAmt, (7/1));
		} else {
		}
		anyCrapsActive = false;
		anyCrapsBetAmt = 0;
	}
	if (anySevenActive) {
		if (diceValue == 7) {
			payout(anySevenBetAmt, (4/1));
		} else {
		}
		anySevenActive = false;
		anySevenBetAmt = 0;
	}
	if (fieldActive) {
		// different dice values have different pay outs
		if (diceValue == 2) {
			payout(fieldBetAmt, (2/1));
		} else if (diceValue == 12) {
			payout(fieldBetAmt, (3/1));
		} else if (diceValue == 3 || diceValue == 4 || diceValue == 9 || diceValue == 10 || diceValue == 11) {
			payout(fieldBetAmt, (1/1));
		} else {
		}
		fieldActive = false;
		fieldBetAmt = 0;
	}
	
	/* Hard Way Betting Logic */
	// if we roll 4, 6, 8, or 10 see if it's "Hard Way"
	// if a seven is rolled, all bets are lost
	switch(diceValue) {
		case 4:
			if (hardWayFourActive) {
				if (dice1 == dice2) {
					payout(hardWayFourBetAmt, (7/1));
				} else {
				}
				hardWayFourActive = false;
				hardWayFourBetAmt = 0;
			}
			break;
		case 6:
			if (hardWaySixActive) {
				if (dice1 == dice2) {
					payout(hardWaySixBetAmt, (9/1));
				} else {
				}
				hardWaySixActive = false;
				hardWaySixBetAmt = 0;
			}
			break;
		case 7:
			if (hardWayFourActive) {
				hardWayFourActive = false;
				hardWayFourBetAmt = 0;
			}
			if (hardWaySixActive) {
				hardWaySixActive = false;
				hardWaySixBetAmt = 0;
			}
			if (hardWayEightActive) {
				hardWayEightActive = false;
				hardWayEightBetAmt = 0;
			}
			if (hardWayTenActive) {
				hardWayTenActive = false;
				hardWayTenBetAmt = 0;
			}
			break;
		case 8:
			if (hardWayEightActive) {
				if (dice1 == dice2) {
					payout(hardWayEightBetAmt, (9/1));
				} else {
				}
				hardWayEightActive = false;
				hardWayEightBetAmt = 0;
			}
			break;
		case 10:
			if (hardWayTenActive) {
				if (dice1 == dice2) {
					payout(hardWayTenBetAmt, (7/1));
				} else {
				}
				hardWayTenActive = false;
				hardWayTenBetAmt = 0;
			}
			break;
	}
	
	/* Place Bets Logic (very similar to Hard Way) */
	// if we roll 4, 5, 6, 8, 9, or 10 see if its currently active
	// if a seven is rolled, all bets are lost
	switch(diceValue) {
		case 4:
			if (placeFourActive) {
				payout(placeFourBetAmt, (9/5));
				placeFourBetAmt = 0;
				placeFourActive = false;
			}
			break;
		case 5:
			if (placeFiveActive) {
				payout(placeFiveBetAmt, (7/5));
				placeFiveBetAmt = 0;
				placeFiveActive = false;
			}
			break;
		case 6:
			if (placeSixActive) {
				payout(placeSixBetAmt, (7/6));
				placeSixBetAmt = 0;
				placeSixActive = false;
			}
			break;
		case 7:
			if (placeFourActive) {
				placeFourBetAmt = 0;
				placeFourActive = false;
			}
			if (placeFiveActive) {
				placeFiveBetAmt = 0;
				placeFiveActive = false;
			}
			if (placeSixActive) {
				placeSixBetAmt = 0;
				placeSixActive = false;
			}
			if (placeEightActive) {
				placeEightBetAmt = 0;
				placeEightActive = false;
			}
			if (placeNineActive) {
				placeNineBetAmt = 0;
				placeNineActive = false;
			}
			if (placeTenActive) {
				placeTenBetAmt = 0;
				placeTenActive = false;
			}
			break;
		case 8:
			if (placeEightActive) {
				payout(placeEightBetAmt, (7/6));
				placeNineBetAmt = 0;
				placeEightActive = false;
			}
			break;
		case 9:
			if (placeNineActive) {
				payout(placeNineBetAmt, (7/5));
				placeNineBetAmt = 0;
				placeNineActive = false;
			}
			break;
		case 10:
			if (placeTenActive) {
				payout(placeTenBetAmt, (9/5));
				placeTenBetAmt = 0;
				placeTenActive = false;
			}
			break;
	}
} // end bets eval

//------------------------------------------------------------------------
//------------------------------------------------------------------------

// now we can start testing!
var assert = require('assert');

// first start with single roll bets

function assertSingleRollTest(betActive, betAmtVar, playerBalEnd) {
	assert.equal(betActive, false); // reset bet
	assert.equal(betAmtVar, 0); // reset bet amt
	assert.equal(playerBalance, playerBalEnd); // end payout
}

describe('Single Roll Bets', function() {

describe('Any Seven Bet [7]', function() {
	it('should win, giving the player a payout of 4:1 (rolled 7)', function() {
		playerBalance = 1000;
		anySevenActive = true;
		anySevenBetAmt = 100;
		playerBalance -= anySevenBetAmt; // this is taken care of outside betsEval in actualy implementation
		betsEval(3, 4);
		assertSingleRollTest(anySevenActive, anySevenBetAmt, 1400);
	})
	it('should lose, keeping the players bet (rolled 4)', function() {
		playerBalance = 1000;
		anySevenActive = true;
		anySevenBetAmt = 100;
		playerBalance -= anySevenBetAmt;
		betsEval(2, 2);
		assertSingleRollTest(anySevenActive, anySevenBetAmt, 900);
	})
})

describe('Field Bet [2,3,4,9,11,12]', function() {
	it('should win, giving player payout of 2:1 (rolled 2)', function() {
		playerBalance = 5000;
		fieldActive = true;
		fieldBetAmt = 500;
		playerBalance -= fieldBetAmt;
		betsEval(1, 1);
		assertSingleRollTest(fieldActive, fieldBetAmt, 6000);
	})
	it('should win, giving player payout of 1:1 (rolled 3)', function() {
		playerBalance = 5000;
		fieldActive = true;
		fieldBetAmt = 500;
		playerBalance -= fieldBetAmt;
		betsEval(2, 1);
		assertSingleRollTest(fieldActive, fieldBetAmt, 5500);
	})
	it('should win, giving player payout of 1:1 (rolled 4)', function() {
		playerBalance = 5000;
		fieldActive = true;
		fieldBetAmt = 500;
		playerBalance -= fieldBetAmt;
		betsEval(1, 3);
		assertSingleRollTest(fieldActive, fieldBetAmt, 5500);
	})
	it('should lose, taking players money (rolled 5)', function() {
		playerBalance = 5000;
		fieldActive = true;
		fieldBetAmt = 500;
		playerBalance -= fieldBetAmt;
		betsEval(2, 3);
		assertSingleRollTest(fieldActive, fieldBetAmt, 4500);
	})
	it('should lose, taking players money (rolled 6)', function() {
		playerBalance = 5000;
		fieldActive = true;
		fieldBetAmt = 500;
		playerBalance -= fieldBetAmt;
		betsEval(3, 3);
		assertSingleRollTest(fieldActive, fieldBetAmt, 4500);
	})
	it('should win, giving player payout of 1:1 (rolled 11)', function() {
		playerBalance = 5000;
		fieldActive = true;
		fieldBetAmt = 500;
		playerBalance -= fieldBetAmt;
		betsEval(5, 6);
		assertSingleRollTest(fieldActive, fieldBetAmt, 5500);
	})
	it('should win, giving player payout of 3:1 (rolled 12)', function() {
		playerBalance = 5000;
		fieldActive = true;
		fieldBetAmt = 500;
		playerBalance -= fieldBetAmt;
		betsEval(6, 6);
		assertSingleRollTest(fieldActive, fieldBetAmt, 6500);
	})
}) // end of field

describe('Ace-Deuce [3]', function() {
	it('should win, paying out odds 15:1 (rolled 3)', function() {
		playerBalance = 100;
		aceDeuceActive = true;
		aceDeuceBetAmt = 100;
		playerBalance -= aceDeuceBetAmt;
		betsEval(2, 1);
		assertSingleRollTest(aceDeuceActive, aceDeuceBetAmt, 1600);
	})
	it('should lose, taking players money (rolled 9)', function() {
		playerBalance = 100;
		aceDeuceActive = true;
		aceDeuceBetAmt = 100;
		playerBalance -= aceDeuceBetAmt;
		betsEval(5, 4);
		assertSingleRollTest(aceDeuceActive, aceDeuceBetAmt, 0);
	})
})

describe('Snake Eyes [2]', function() {
	it('should win, paying out odds 30:1 (rolled 2)', function() {
		playerBalance = 3000;
		snakeEyesActive = true;
		snakeEyesBetAmt = 3000;
		playerBalance -= snakeEyesBetAmt;
		betsEval(1, 1);
		assertSingleRollTest(snakeEyesActive, snakeEyesBetAmt, 93000); // jackpot
	})
	it('should lose, taking players money (rolled 8)', function() {
		playerBalance = 100;
		snakeEyesActive = true;
		snakeEyesBetAmt = 100;
		playerBalance -= snakeEyesBetAmt;
		betsEval(4, 4);
		assertSingleRollTest(snakeEyesActive, snakeEyesBetAmt, 0);
	})
})

describe('Boxcars [12]', function() {
	it('should win, paying out odds 30:1 (rolled 12)', function() {
		playerBalance = 3000;
		boxcarsActive = true;
		boxcarsBetAmt = 100;
		playerBalance -= boxcarsBetAmt;
		betsEval(6, 6);
		assertSingleRollTest(boxcarsActive, boxcarsBetAmt, 6000);
	})
	it('should lose, taking players money (rolled 5)', function() {
		playerBalance = 100;
		boxcarsActive = true;
		boxcarsBetAmt = 100;
		playerBalance -= boxcarsBetAmt;
		betsEval(1, 4);
		assertSingleRollTest(boxcarsActive, boxcarsBetAmt, 0);
	})
})

describe('Boxcars [12]', function() {
	it('should win, paying out odds 30:1 (rolled 12)', function() {
		playerBalance = 3000;
		boxcarsActive = true;
		boxcarsBetAmt = 100;
		playerBalance -= boxcarsBetAmt;
		betsEval(6, 6);
		assertSingleRollTest(boxcarsActive, boxcarsBetAmt, 6000);
	})
	it('should lose, taking players money (rolled 5)', function() {
		playerBalance = 100;
		boxcarsActive = true;
		boxcarsBetAmt = 100;
		playerBalance -= boxcarsBetAmt;
		betsEval(1, 4);
		assertSingleRollTest(boxcarsActive, boxcarsBetAmt, 0);
	})
})

describe('Yo (Left) [11]', function() {
	it('should win, paying out odds 15:1 (rolled 11)', function() {
		playerBalance = 1000;
		yoLeftActive = true;
		yoLeftBetAmt = 100;
		playerBalance -= yoLeftBetAmt;
		betsEval(5, 6);
		assertSingleRollTest(yoLeftActive, yoLeftBetAmt, 2500);
	})
	it('should lose, taking players money (rolled 2)', function() {
		playerBalance = 1000;
		yoLeftActive = true;
		yoLeftBetAmt = 100;
		playerBalance -= yoLeftBetAmt;
		betsEval(1, 1);
		assertSingleRollTest(yoLeftActive, yoLeftBetAmt, 900);
	})
})

describe('Yo (Right) [11]', function() {
	it('should win, paying out odds 15:1 (rolled 11)', function() {
		playerBalance = 1000;
		yoRightActive = true;
		yoRightBetAmt = 100;
		playerBalance -= yoRightBetAmt;
		betsEval(5, 6);
		assertSingleRollTest(yoRightActive, yoRightBetAmt, 2500);
	})
	it('should lose, taking players money (rolled 7)', function() {
		playerBalance = 1000;
		yoRightActive = true;
		yoRightBetAmt = 100;
		playerBalance -= yoRightBetAmt;
		betsEval(4, 3);
		assertSingleRollTest(yoRightActive, yoRightBetAmt, 900);
	})
})

describe('Any Craps [2, 3, or 11]', function() {
	it('should win, paying out odds 7:1 (rolled 2)', function() {
		playerBalance = 500;
		anyCrapsActive = true;
		anyCrapsBetAmt = 100;
		playerBalance -= anyCrapsBetAmt;
		betsEval(1, 1);
		assertSingleRollTest(anyCrapsActive, anyCrapsBetAmt, 1200);
	})
	it('should win, paying out odds 7:1 (rolled 3)', function() {
		playerBalance = 500;
		anyCrapsActive = true;
		anyCrapsBetAmt = 100;
		playerBalance -= anyCrapsBetAmt;
		betsEval(1, 2);
		assertSingleRollTest(anyCrapsActive, anyCrapsBetAmt, 1200);
	})
	it('should win, paying out odds 7:1 (rolled 12)', function() {
		playerBalance = 500;
		anyCrapsActive = true;
		anyCrapsBetAmt = 100;
		playerBalance -= anyCrapsBetAmt;
		betsEval(6, 6);
		assertSingleRollTest(anyCrapsActive, anyCrapsBetAmt, 1200);
	})
	it('should lose, taking players money (rolled 6)', function() {
		playerBalance = 500;
		anyCrapsActive = true;
		anyCrapsBetAmt = 100;
		playerBalance -= anyCrapsBetAmt;
		betsEval(3, 3);
		assertSingleRollTest(anyCrapsActive, anyCrapsBetAmt, 400);
	})
})

}) // end of single roll testing


function assertMultiRollPre(betActiveVar, betAmtVar, betAmtVal, playerBalStart) {
	assert.equal(betActiveVar, true);
	assert.equal(betAmtVar, betAmtVal);
	assert.equal(playerBalance, playerBalStart);
}

function assertMultiRollPost(betActiveVar, betAmtVar, playerBalEnd) {
	assert.equal(betActiveVar, false);
	assert.equal(betAmtVar, 0); 
	assert.equal(playerBalance, playerBalEnd);
}

describe('Pass Line and Don\'t Pass Line Bets', function() {


describe('Pass Line Tests', function() {
	it('should win, payout 1:1 (roll 7 on first roll)', function() {
		playerBalance = 500;
		passLineActive = true;
		passLineBetAmt = 100;
		playerBalance -= passLineBetAmt;
		isComeOutRoll = true;
		betsEval(3,4);
		assertMultiRollPost(passLineActive, passLineBetAmt, 600);
	})
	it('should win, payout 1:1 (roll 11 on first roll)', function() {
		playerBalance = 500;
		passLineActive = true;
		passLineBetAmt = 100;
		playerBalance -= passLineBetAmt;
		isComeOutRoll = true;
		betsEval(6,5);
		assertMultiRollPost(passLineActive, passLineBetAmt, 600);
	})
	it('should lose, keep players bet (roll 2, 3 or 12 on first roll)', function() {
		playerBalance = 500;
		passLineActive = true;
		passLineBetAmt = 100;
		playerBalance -= passLineBetAmt;
		isComeOutRoll = true;
		betsEval(1,1);
		assertMultiRollPost(passLineActive, passLineBetAmt, 400);
		
		passLineActive = true;
		passLineBetAmt = 100;
		playerBalance -= passLineBetAmt;
		isComeOutRoll = true;
		betsEval(1,2);
		assertMultiRollPost(passLineActive, passLineBetAmt, 300);
		
		passLineActive = true;
		passLineBetAmt = 100;
		playerBalance -= passLineBetAmt;
		isComeOutRoll = true;
		betsEval(6,6);
		assertMultiRollPost(passLineActive, passLineBetAmt, 200);
	})
	it('should win, payout 1:1 (roll 4, 6, then 4)', function() {
		playerBalance = 500;
		passLineActive = true;
		passLineBetAmt = 100;
		playerBalance -= passLineBetAmt;
		isComeOutRoll = true;
		betsEval(2,2);
		assertMultiRollPre(passLineActive, passLineBetAmt, 100, 400);
		betsEval(4,2);
		assertMultiRollPre(passLineActive, passLineBetAmt, 100, 400);
		betsEval(2,2);
		assertMultiRollPost(passLineActive, passLineBetAmt, 600);
	})
	it('should win, payout 1:1 (roll 8, 2, 12, 6, then 8)', function() {
		playerBalance = 500;
		passLineActive = true;
		passLineBetAmt = 100;
		playerBalance -= passLineBetAmt;
		isComeOutRoll = true;
		betsEval(6,2);
		assertMultiRollPre(passLineActive, passLineBetAmt, 100, 400);
		betsEval(1,1);
		assertMultiRollPre(passLineActive, passLineBetAmt, 100, 400);
		betsEval(6,6);
		assertMultiRollPre(passLineActive, passLineBetAmt, 100, 400);
		betsEval(3,3);
		assertMultiRollPre(passLineActive, passLineBetAmt, 100, 400);
		betsEval(2,6);
		assertMultiRollPost(passLineActive, passLineBetAmt, 600);
	})
	it('should lose, keep players money (roll 5, 8, then 7)', function() {
		playerBalance = 500;
		passLineActive = true;
		passLineBetAmt = 100;
		playerBalance -= passLineBetAmt;
		isComeOutRoll = true;
		betsEval(3,2);
		assertMultiRollPre(passLineActive, passLineBetAmt, 100, 400);
		betsEval(4,4);
		assertMultiRollPre(passLineActive, passLineBetAmt, 100, 400);
		betsEval(5,2);
		assertMultiRollPost(passLineActive, passLineBetAmt, 400);
	})
	it('should lose, keep players money (roll 5, 3, 8, 10, then 7)', function() {
		playerBalance = 500;
		passLineActive = true;
		passLineBetAmt = 100;
		playerBalance -= passLineBetAmt;
		isComeOutRoll = true;
		betsEval(3,2);
		assertMultiRollPre(passLineActive, passLineBetAmt, 100, 400);
		betsEval(1,2);
		assertMultiRollPre(passLineActive, passLineBetAmt, 100, 400);
		betsEval(4,4);
		assertMultiRollPre(passLineActive, passLineBetAmt, 100, 400);
		betsEval(5,5);
		assertMultiRollPre(passLineActive, passLineBetAmt, 100, 400);
		betsEval(3,4);
		assertMultiRollPost(passLineActive, passLineBetAmt, 400);
	})
})

describe('Don\'t Pass Line', function() {
	it('should lose, keep players money (roll 7 on first roll)', function() {
		playerBalance = 500;
		dontPassLineActive = true;
		dontPassLineBetAmt = 100;
		playerBalance -= dontPassLineBetAmt;
		isComeOutRoll = true;
		betsEval(3,4);
		assertMultiRollPost(dontPassLineActive, dontPassLineBetAmt, 400);
	})
	it('should lose, keep players money (roll 11 on first roll)', function() {
		playerBalance = 500;
		dontPassLineActive = true;
		dontPassLineBetAmt = 100;
		playerBalance -= dontPassLineBetAmt;
		isComeOutRoll = true;
		betsEval(6,5);
		assertMultiRollPost(dontPassLineActive, dontPassLineBetAmt, 400);
	})
	it('should win, paying odds 1:1 (roll 2, 3 or 12 on first roll)', function() {
		playerBalance = 500;
		dontPassLineActive = true;
		dontPassLineBetAmt = 100;
		playerBalance -= dontPassLineBetAmt;
		isComeOutRoll = true;
		betsEval(1,1);
		assertMultiRollPost(dontPassLineActive, dontPassLineBetAmt, 600);
		
		dontPassLineActive = true;
		dontPassLineBetAmt = 100;
		playerBalance -= dontPassLineBetAmt;
		isComeOutRoll = true;
		betsEval(1,2);
		assertMultiRollPost(dontPassLineActive, dontPassLineBetAmt, 700);
		
		dontPassLineActive = true;
		dontPassLineBetAmt = 100;
		playerBalance -= dontPassLineBetAmt;
		isComeOutRoll = true;
		betsEval(6,6);
		assertMultiRollPost(dontPassLineActive, dontPassLineBetAmt, 800);
	})
	it('should lose, keep money (roll 4, 6, then 4)', function() {
		playerBalance = 500;
		dontPassLineActive = true;
		dontPassLineBetAmt = 100;
		playerBalance -= dontPassLineBetAmt;
		isComeOutRoll = true;
		betsEval(2,2);
		assertMultiRollPre(dontPassLineActive, dontPassLineBetAmt, 100, 400);
		betsEval(4,2);
		assertMultiRollPre(dontPassLineActive, dontPassLineBetAmt, 100, 400);
		betsEval(2,2);
		assertMultiRollPost(dontPassLineActive, dontPassLineBetAmt, 400);
	})
	it('should lose, keep money (roll 8, 2, 12, 6, then 8)', function() {
		playerBalance = 500;
		dontPassLineActive = true;
		dontPassLineBetAmt = 100;
		playerBalance -= dontPassLineBetAmt;
		isComeOutRoll = true;
		betsEval(6,2);
		assertMultiRollPre(dontPassLineActive, dontPassLineBetAmt, 100, 400);
		betsEval(1,1);
		assertMultiRollPre(dontPassLineActive, dontPassLineBetAmt, 100, 400);
		betsEval(6,6);
		assertMultiRollPre(dontPassLineActive, dontPassLineBetAmt, 100, 400);
		betsEval(3,3);
		assertMultiRollPre(dontPassLineActive, dontPassLineBetAmt, 100, 400);
		betsEval(2,6);
		assertMultiRollPost(dontPassLineActive, dontPassLineBetAmt, 400);
	})
	it('should win, pay odds 1:1 (roll 5, 8, then 7)', function() {
		playerBalance = 500;
		dontPassLineActive = true;
		dontPassLineBetAmt = 100;
		playerBalance -= dontPassLineBetAmt;
		isComeOutRoll = true;
		betsEval(3,2);
		assertMultiRollPre(dontPassLineActive, dontPassLineBetAmt, 100, 400);
		betsEval(4,4);
		assertMultiRollPre(dontPassLineActive, dontPassLineBetAmt, 100, 400);
		betsEval(5,2);
		assertMultiRollPost(dontPassLineActive, dontPassLineBetAmt, 600);
	})
	it('should win, pay odds 1:1 (roll 5, 3, 8, 10, then 7)', function() {
		playerBalance = 500;
		dontPassLineActive = true;
		dontPassLineBetAmt = 100;
		playerBalance -= dontPassLineBetAmt;
		isComeOutRoll = true;
		betsEval(3,2);
		assertMultiRollPre(dontPassLineActive, dontPassLineBetAmt, 100, 400);
		betsEval(1,2);
		assertMultiRollPre(dontPassLineActive, dontPassLineBetAmt, 100, 400);
		betsEval(4,4);
		assertMultiRollPre(dontPassLineActive, dontPassLineBetAmt, 100, 400);
		betsEval(5,5);
		assertMultiRollPre(dontPassLineActive, dontPassLineBetAmt, 100, 400);
		betsEval(3,4);
		assertMultiRollPost(dontPassLineActive, dontPassLineBetAmt, 600);
	})
})

}) // end of Line Tests

describe('Pass Odds and Don\'t Pass Line Odds', function() {


describe('Pass Odds Tests', function() {
	it('should win, payout 2:1 (roll 4, 6, then 4)', function() {
		playerBalance = 500;
		isComeOutRoll = true;
		betsEval(2,2); // set point to four then make pass odds bet
		passOddsActive = true;
		passOddsBetAmt = 100;
		playerBalance -= passOddsBetAmt;
		betsEval(4,2);
		assertMultiRollPre(passOddsActive, passOddsBetAmt, 100, 400);
		betsEval(2,2);
		assertMultiRollPost(passOddsActive, passOddsBetAmt, 700);
	})
	it('should win, payout 3:2 (roll 9, 2, 12, 6, then 9)', function() {
		playerBalance = 500;
		isComeOutRoll = true;
		betsEval(5,4);
		passOddsActive = true;
		passOddsBetAmt = 100;
		playerBalance -= passOddsBetAmt;
		assertMultiRollPre(passOddsActive, passOddsBetAmt, 100, 400);
		betsEval(1,1);
		assertMultiRollPre(passOddsActive, passOddsBetAmt, 100, 400);
		betsEval(6,6);
		assertMultiRollPre(passOddsActive, passOddsBetAmt, 100, 400);
		betsEval(3,3);
		assertMultiRollPre(passOddsActive, passOddsBetAmt, 100, 400);
		betsEval(6,3);
		assertMultiRollPost(passOddsActive, passOddsBetAmt, 650);
	})
	it('should win, payout 6:5 (roll 6, 5, 10, 5, then 6)', function() {
		playerBalance = 500;
		isComeOutRoll = true;
		betsEval(3,3);
		passOddsActive = true;
		passOddsBetAmt = 100;
		playerBalance -= passOddsBetAmt;
		assertMultiRollPre(passOddsActive, passOddsBetAmt, 100, 400);
		betsEval(2,3);
		assertMultiRollPre(passOddsActive, passOddsBetAmt, 100, 400);
		betsEval(5,5);
		assertMultiRollPre(passOddsActive, passOddsBetAmt, 100, 400);
		betsEval(2,3);
		assertMultiRollPre(passOddsActive, passOddsBetAmt, 100, 400);
		betsEval(3,3);
		assertMultiRollPost(passOddsActive, passOddsBetAmt, 621);
	})
	it('should lose, keep money (roll 5, 6, then 7)', function() {
		playerBalance = 500;
		isComeOutRoll = true;
		betsEval(2,3); // set point to four then make pass odds bet
		passOddsActive = true;
		passOddsBetAmt = 100;
		playerBalance -= passOddsBetAmt;
		betsEval(4,2);
		assertMultiRollPre(passOddsActive, passOddsBetAmt, 100, 400);
		betsEval(4,3);
		assertMultiRollPost(passOddsActive, passOddsBetAmt, 400);
	})
	it('should lose, keep money (roll 10, 3, then 7)', function() {
		playerBalance = 500;
		isComeOutRoll = true;
		betsEval(5,5); // set point to four then make pass odds bet
		passOddsActive = true;
		passOddsBetAmt = 100;
		playerBalance -= passOddsBetAmt;
		betsEval(1,2);
		assertMultiRollPre(passOddsActive, passOddsBetAmt, 100, 400);
		betsEval(6,1);
		assertMultiRollPost(passOddsActive, passOddsBetAmt, 400);
	})
})

describe('Don\'t Pass Line', function() {
	it('should win, payout 1:2 (roll 10, 6, then 7)', function() {
		playerBalance = 500;
		isComeOutRoll = true;
		betsEval(5,5); // set point to four then make pass odds bet
		dontPassOddsActive = true;
		dontPassOddsBetAmt = 100;
		playerBalance -= dontPassOddsBetAmt;
		betsEval(4,2);
		assertMultiRollPre(dontPassOddsActive, dontPassOddsBetAmt, 100, 400);
		betsEval(4,3);
		assertMultiRollPost(dontPassOddsActive, dontPassOddsBetAmt, 550);
	})
	it('should win, payout 2:3 (roll 5, 2, 12, 6, then 7)', function() {
		playerBalance = 500;
		isComeOutRoll = true;
		betsEval(1,4);
		dontPassOddsActive = true;
		dontPassOddsBetAmt = 100;
		playerBalance -= dontPassOddsBetAmt;
		assertMultiRollPre(dontPassOddsActive, dontPassOddsBetAmt, 100, 400);
		betsEval(1,1);
		assertMultiRollPre(dontPassOddsActive, dontPassOddsBetAmt, 100, 400);
		betsEval(6,6);
		assertMultiRollPre(dontPassOddsActive, dontPassOddsBetAmt, 100, 400);
		betsEval(3,3);
		assertMultiRollPre(dontPassOddsActive, dontPassOddsBetAmt, 100, 400);
		betsEval(3,4);
		assertMultiRollPost(dontPassOddsActive, dontPassOddsBetAmt, 567);
	})
	it('should win, payout 5:6 (roll 8, 5, 10, 5, then 7)', function() {
		playerBalance = 500;
		isComeOutRoll = true;
		betsEval(4,4);
		dontPassOddsActive = true;
		dontPassOddsBetAmt = 100;
		playerBalance -= dontPassOddsBetAmt;
		assertMultiRollPre(dontPassOddsActive, dontPassOddsBetAmt, 100, 400);
		betsEval(2,3);
		assertMultiRollPre(dontPassOddsActive, dontPassOddsBetAmt, 100, 400);
		betsEval(5,5);
		assertMultiRollPre(dontPassOddsActive, dontPassOddsBetAmt, 100, 400);
		betsEval(2,3);
		assertMultiRollPre(dontPassOddsActive, dontPassOddsBetAmt, 100, 400);
		betsEval(3,4);
		assertMultiRollPost(dontPassOddsActive, dontPassOddsBetAmt, 584);
	})
	it('should lose, keep money (roll 5, 6, then 5)', function() {
		playerBalance = 500;
		isComeOutRoll = true;
		betsEval(2,3); // set point to four then make pass odds bet
		dontPassOddsActive = true;
		dontPassOddsBetAmt = 100;
		playerBalance -= dontPassOddsBetAmt;
		betsEval(4,2);
		assertMultiRollPre(dontPassOddsActive, dontPassOddsBetAmt, 100, 400);
		betsEval(2,3);
		assertMultiRollPost(dontPassOddsActive, dontPassOddsBetAmt, 400);
	})
	it('should lose, keep money (roll 10, 3, then 10)', function() {
		playerBalance = 500;
		isComeOutRoll = true;
		betsEval(5,5); // set point to four then make pass odds bet
		dontPassOddsActive = true;
		dontPassOddsBetAmt = 100;
		playerBalance -= dontPassOddsBetAmt;
		betsEval(1,2);
		assertMultiRollPre(dontPassOddsActive, dontPassOddsBetAmt, 100, 400);
		betsEval(6,4);
		assertMultiRollPost(dontPassOddsActive, dontPassOddsBetAmt, 400);
	})
})

}) // end of Odds Tests
