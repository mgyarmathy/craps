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
	var winnings = Math.ceil(bet * (1+fractional));
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
	betResultsString = '';
	diceValue = dice1 + dice2;
	/* Pass Line, Don't Pass Line, Pass Odds, & Don't Pass Bet Logic */
	if (isComeOutRoll) {
		switch(diceValue) {
		case 2:
		case 3:
		case 12:
			if (passLineActive) {
				betResultsString += 'Pass Line Bet: Lost $'+passLineBetAmt+'<br>';
				passLineBetAmt = 0;
			}
			if (dontPassLineActive) {
				betResultsString += 'Dont Pass Line Bet: Won $'+dontPassLineBetAmt*2+'<br>';
				payout(dontPassLineBetAmt, (1/1));
				dontPassLineBetAmt = 0;
			}
			isComeOutRoll = true;
			if (!rollIsSimulated) {
				socket.emit('passDice', {tableNumber: tableNumber});
			}
			passLineActive = false;
			$('#passLineVert').css('opacity', '0.0');
			$('#passLineHori').css('opacity', '0.0');
			$('#passLineHori').html('');
			dontPassLineActive = false;
			$('#dontPassBarVert').css('opacity', '0.0');
			$('#dontPassBarHori').css('opacity', '0.0');
			$('#dontPassBarHori').html('');
			break;
		case 7:
		case 11:
			if (passLineActive) {
				betResultsString += 'Pass Line Bet: Won $'+passLineBetAmt*2+'<br>';
				payout(passLineBetAmt, (1/1));
				passLineBetAmt = 0;
			}
			if (dontPassLineActive) {
				betResultsString += 'Dont Pass Line Bet: Lost $'+dontPassLineBetAmt+'<br>';
				dontPassLineBetAmt = 0;
			}
			isComeOutRoll = true;
			if (!rollIsSimulated) {
				socket.emit('passDice', {tableNumber: tableNumber});
			}
			passLineActive = false;
			$('#passLineVert').css('opacity', '0.0');
			$('#passLineHori').css('opacity', '0.0');
			$('#passLineHori').html('');
			dontPassLineActive = false;
			$('#dontPassBarVert').css('opacity', '0.0');
			$('#dontPassBarHori').css('opacity', '0.0');
			$('#dontPassBarHori').html('');
			break;
		default:
			pointValue = diceValue;
			$('#pointChipImg').attr('src', '/images/chipon.png');
			switch(diceValue) {
			case 4:
				$('#pointChipImg').css('margin-left', '119px');
				break;
			case 5:
				$('#pointChipImg').css('margin-left', '167px');
				break;
			case 6:
				$('#pointChipImg').css('margin-left', '215px');
				break;
			case 8:
				$('#pointChipImg').css('margin-left', '262px');
				break;
			case 9:
				$('#pointChipImg').css('margin-left', '309px');
				break;
			case 10:
				$('#pointChipImg').css('margin-left', '357px');
				break;
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
				betResultsString += 'Pass Line Bet: Lost $'+passLineBetAmt+'<br>';
				passLineBetAmt = 0;
			}
			if (dontPassLineActive) {
				betResultsString += 'Dont Pass Line Bet: Won $'+dontPassLineBetAmt*2+'<br>';;
				payout(dontPassLineBetAmt, (1/1));
				dontPassLineBetAmt = 0;
			}
			if (passOddsActive) {
				betResultsString += 'Pass Odds: Lost $'+passOddsBetAmt+'<br>';
				passOddsBetAmt = 0;
			}
			// Pass Odds Paid on Don't Pass Odds Paid depend on what the point was
			if (dontPassOddsActive) {
				switch(pointValue) {
					case 4:
					case 10:
						betResultsString += 'Dont Pass Odds: Won $'+Math.ceil(dontPassOddsBetAmt*(1+(1/2)))+'<br>';
						payout(dontPassOddsBetAmt, (1/2));
						dontPassOddsBetAmt = 0;
						break;
					case 5:
					case 9:
						betResultsString += 'Dont Pass Odds: Won $'+Math.ceil(dontPassOddsBetAmt*(1+(2/3)))+'<br>';
						payout(dontPassOddsBetAmt, (2/3));
						dontPassOddsBetAmt = 0;
						break;
					case 6:
					case 8:
						betResultsString += 'Dont Pass Odds: Won $'+Math.ceil(dontPassOddsBetAmt*(1+(5/6)))+'<br>';
						payout(dontPassOddsBetAmt, (5/6));
						dontPassOddsBetAmt = 0;
						break;
				}
			}
			isComeOutRoll = true;
			if (!rollIsSimulated) {
				socket.emit('passDice', {tableNumber: tableNumber});
			}
			$('#pointChipImg').attr('src', '/images/chipoff.png');
			$('#pointChipImg').css('margin-left', '10px');
			// can no longer bet on Pass/Don't Pass Odds
			passOddsLocked = true;
			dontPassOddsLocked = true;
			passOddsActive = false;
			$('#passOdds').css('opacity', '0.0');
			$('#passOdds').html('');
			dontPassOddsActive = false;
			$('#dontPassOdds').css('opacity', '0.0');
			$('#dontPassOdds').html('');
			// Can again bet on Pass/Don't Pass Bets
			passLineActive = false;
			$('#passLineVert').css('opacity', '0.0');
			$('#passLineHori').css('opacity', '0.0');
			$('#passLineHori').html('');
			dontPassLineActive = false;
			$('#dontPassBarVert').css('opacity', '0.0');
			$('#dontPassBarHori').css('opacity', '0.0');
			$('#dontPassBarHori').html('');
			passLineLocked = false;
			dontPassLineLocked = false;
			pointValue = 0;
			break;
		case pointValue:
			if (passLineActive) {
				betResultsString += 'Pass Line Bet: Won $'+passLineBetAmt*2+'<br>';
				payout(passLineBetAmt, (1/1));
				passLineBetAmt = 0;
			}
			if (dontPassLineActive) {
				betResultsString += 'Dont Pass Line Bet: Lost $'+dontPassLineBetAmt+'<br>';
				dontPassLineBetAmt = 0;
			}
			if (dontPassOddsActive) {
				betResultsString += 'Dont Pass Odds: Lost $'+dontPassOddsBetAmt+'<br>';
				dontPassOddsBetAmt = 0;
			}
			// Pass Odds Paid on Don't Pass Odds Paid depend on what the point was
			if (passOddsActive) {
				switch(pointValue) {
					case 4:
					case 10:
						betResultsString += 'Pass Odds: Won $'+Math.ceil(passOddsBetAmt*(1+(2/1)))+'<br>';
						payout(passOddsBetAmt, (2/1));
						passOddsBetAmt = 0;
						break;
					case 5:
					case 9:
						betResultsString += 'Pass Odds: Won $'+Math.ceil(passOddsBetAmt*(1+(3/2)))+'<br>';
						payout(passOddsBetAmt, (3/2));
						passOddsBetAmt = 0;
						break;
					case 6:
					case 8:
						betResultsString += 'Pass Odds: Won $'+Math.ceil(passOddsBetAmt*(1+(6/5)))+'<br>';
						payout(passOddsBetAmt, (6/5));
						passOddsBetAmt = 0;
						break;
				}
			}
			isComeOutRoll = true;
			if (!rollIsSimulated) {
				socket.emit('passDice', {tableNumber: tableNumber});
			}
			$('#pointChipImg').attr('src', '/images/chipoff.png');
			$('#pointChipImg').css('margin-left', '10px');
			// can no longer bet on Pass/Don't Pass Odds
			passOddsLocked = true;
			dontPassOddsLocked = true;
			passOddsActive = false;
			$('#passOdds').css('opacity', '0.0');
			$('#passOdds').html('');
			dontPassOddsActive = false;
			$('#dontPassOdds').css('opacity', '0.0');
			$('#dontPassOdds').html('');
			// Can again bet on Pass/Don't Pass Bets
			passLineActive = false;
			$('#passLineVert').css('opacity', '0.0');
			$('#passLineHori').css('opacity', '0.0');
			$('#passLineHori').html('');
			dontPassLineActive = false;
			$('#dontPassBarVert').css('opacity', '0.0');
			$('#dontPassBarHori').css('opacity', '0.0');
			$('#dontPassBarHori').html('');
			passLineLocked = false;
			dontPassLineLocked = false;
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
				betResultsString += 'New Come Bet: Lost $'+newComeBetAmt+'<br>';
				newComeBetAmt = 0;
				newComeBet = false;
				$('#come').css('opacity', '0.0');
				$('#come').html('');
			}
			if (newDontComeBet) {
				betResultsString += 'New Don\'t Come Bet: Won $'+newDontComeBetAmt*2+'<br>';
				payout(newDontComeBetAmt, (1/1));
				newDontComeBetAmt = 0;
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
				$('#dontComeBar').html('');
			}
			break;
		case 4:
			if (comeActiveArray[diceValue]) {
				betResultsString += 'Come Bet on ' + diceValue + ': Won $'+comeBetAmtArray[diceValue]*2+'<br>';
				payout(comeBetAmtArray[diceValue], (1/1));
				comeBetAmtArray[diceValue] = 0;
				comeActiveArray[diceValue] = false;
				$('#pointFour').css('opacity', '0.0');
				$('#pointFour').html('');
			}
			if (dontComeActiveArray[diceValue]) {
				betResultsString += 'Don\'t Come Bet on ' + diceValue + ': Lost $'+dontComeBetAmtArray[diceValue]+'<br>';
				dontComeBetAmtArray[diceValue] = 0;
				dontComeActiveArray[diceValue] = false;
				$('#pointFour').css('opacity', '0.0');
				$('#pointFour').html('');
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				comeBetAmtArray[diceValue] += newComeBetAmt;
				newComeBetAmt = 0;
				newComeBet = false;
				$('#come').css('opacity', '0.0');
				$('#come').html('');
				if (comeBetAmtArray[diceValue] >= blackChipAmt) {
					$('#pointFour').html('<img src="/images/black_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= greenChipAmt) {
					$('#pointFour').html('<img src="/images/green_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= blueChipAmt) {
					$('#pointFour').html('<img src="/images/blue_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= redChipAmt) {
					$('#pointFour').html('<img src="/images/red_chip_small.png"/>');
				}
				$('#pointFour').css('opacity', '0.95');
				$('#pointFour').css('background-color', 'transparent');
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				dontComeBetAmtArray[diceValue] += newDontComeBetAmt;
				newDontComeBetAmt = 0;
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
				$('#dontComeBar').html('');
				if (dontComeBetAmtArray[diceValue] >= blackChipAmt) {
					$('#pointFour').html('<img src="/images/black_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= greenChipAmt) {
					$('#pointFour').html('<img src="/images/green_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= blueChipAmt) {
					$('#pointFour').html('<img src="/images/blue_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= redChipAmt) {
					$('#pointFour').html('<img src="/images/red_chip_small.png"/>');
				}
				$('#pointFour').css('opacity', '0.95');
				$('#pointFour').css('background-color', 'transparent');
			}
			break;
		case 5:
			if (comeActiveArray[diceValue]) {
				betResultsString += 'Come Bet on ' + diceValue + ': Won $'+comeBetAmtArray[diceValue]*2+'<br>';
				payout(comeBetAmtArray[diceValue], (1/1));
				comeBetAmtArray[diceValue] = 0;
				comeActiveArray[diceValue] = false;
				$('#pointFive').css('opacity', '0.0');
				$('#pointFive').html('');
			}
			if (dontComeActiveArray[diceValue]) {
				betResultsString += 'Don\'t Come Bet on ' + diceValue + ': Lost $'+dontComeBetAmtArray[diceValue]+'<br>';
				dontComeBetAmtArray[diceValue] = 0;
				dontComeActiveArray[diceValue] = false;
				$('#pointFive').css('opacity', '0.0');
				$('#pointFive').html('');
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				comeBetAmtArray[diceValue] += newComeBetAmt;
				newComeBetAmt = 0;
				newComeBet = false;
				$('#come').css('opacity', '0.0');
				$('#come').html('');
				if (comeBetAmtArray[diceValue] >= blackChipAmt) {
					$('#pointFive').html('<img src="/images/black_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= greenChipAmt) {
					$('#pointFive').html('<img src="/images/green_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= blueChipAmt) {
					$('#pointFive').html('<img src="/images/blue_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= redChipAmt) {
					$('#pointFive').html('<img src="/images/red_chip_small.png"/>');
				}
				$('#pointFive').css('opacity', '0.95');
				$('#pointFive').css('background-color', 'transparent');
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				dontComeBetAmtArray[diceValue] += newDontComeBetAmt;
				newDontComeBetAmt = 0;
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
				$('#dontComeBar').html('');
				if (dontComeBetAmtArray[diceValue] >= blackChipAmt) {
					$('#pointFive').html('<img src="/images/black_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= greenChipAmt) {
					$('#pointFive').html('<img src="/images/green_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= blueChipAmt) {
					$('#pointFive').html('<img src="/images/blue_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= redChipAmt) {
					$('#pointFive').html('<img src="/images/red_chip_small.png"/>');
				}
				$('#pointFive').css('opacity', '0.95');
				$('#pointFive').css('background-color', 'transparent');
			}
			break;
		case 6:
			if (comeActiveArray[diceValue]) {
				betResultsString += 'Come Bet on ' + diceValue + ': Won $'+comeBetAmtArray[diceValue]*2+'<br>';
				payout(comeBetAmtArray[diceValue], (1/1));
				comeBetAmtArray[diceValue] = 0;
				comeActiveArray[diceValue] = false;
				$('#pointSix').css('opacity', '0.0');
				$('#pointSix').html('');
			}
			if (dontComeActiveArray[diceValue]) {
				betResultsString += 'Don\'t Come Bet on ' + diceValue + ': Lost $'+dontComeBetAmtArray[diceValue]+'<br>';
				dontComeBetAmtArray[diceValue] = 0;
				dontComeActiveArray[diceValue] = false;
				$('#pointSix').css('opacity', '0.0');
				$('#pointSix').html('');
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				comeBetAmtArray[diceValue] += newComeBetAmt;
				newComeBetAmt = 0;
				newComeBet = false;
				$('#come').css('opacity', '0.0');
				$('#come').html('');
				if (comeBetAmtArray[diceValue] >= blackChipAmt) {
					$('#pointSix').html('<img src="/images/black_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= greenChipAmt) {
					$('#pointSix').html('<img src="/images/green_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= blueChipAmt) {
					$('#pointSix').html('<img src="/images/blue_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= redChipAmt) {
					$('#pointSix').html('<img src="/images/red_chip_small.png"/>');
				}
				$('#pointSix').css('opacity', '0.95');
				$('#pointSix').css('background-color', 'transparent');
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				dontComeBetAmtArray[diceValue] += newDontComeBetAmt;
				newDontComeBetAmt = 0;
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
				$('#dontComeBar').html('');
				if (dontComeBetAmtArray[diceValue] >= blackChipAmt) {
					$('#pointSix').html('<img src="/images/black_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= greenChipAmt) {
					$('#pointSix').html('<img src="/images/green_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= blueChipAmt) {
					$('#pointSix').html('<img src="/images/blue_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= redChipAmt) {
					$('#pointSix').html('<img src="/images/red_chip_small.png"/>');
				}
				$('#pointSix').css('opacity', '0.95');
				$('#pointSix').css('background-color', 'transparent');
			}
			break;
		case 7:
			// all current active come bets lose, all current dont come bets win
			for (var i=0; i<=12; i++) {
				if (comeActiveArray[i]) {
					betResultsString += "Come Bet on " + i + ": Lost $"+comeBetAmtArray[i]+"<br>";
					comeBetAmtArray[i] = 0;
					comeActiveArray[i] = false;
				}
				if (dontComeActiveArray[i]) {
					betResultsString += "Don't Come Bet on " + i + ": Won $"+dontComeBetAmtArray[i]*2+"<br>";
					payout(dontComeBetAmtArray[i], (1/1));
					dontComeBetAmtArray[i] = 0;
					dontComeActiveArray[i] = false;
				}
			}
			$('.point').css('opacity', '0.0');
			$('.point').html('');
			if (newComeBet) {
				betResultsString += 'New Come Bet: Won $'+newComeBetAmt*2+'<br>';
				payout(newComeBetAmt, (1/1));
				newComeBetAmt = 0;
				newComeBet = false;
				$('#come').css('opacity', '0.0');
				$('#come').html('');
			}
			if (newDontComeBet) {
				betResultsString += 'New Don\'t Come Bet: Lost $'+newDontComeBetAmt+'<br>';
				newDontComeBetAmt = 0;
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
				$('#dontComeBar').html('');
			}
			break;
		case 8:
			if (comeActiveArray[diceValue]) {
				betResultsString += 'Come Bet on ' + diceValue + ': Won $'+comeBetAmtArray[diceValue]*2+'<br>';
				payout(comeBetAmtArray[diceValue], (1/1));
				comeBetAmtArray[diceValue] = 0;
				comeActiveArray[diceValue] = false;
				$('#pointEight').css('opacity', '0.0');
				$('#pointEight').html('');
			}
			if (dontComeActiveArray[diceValue]) {
				betResultsString += 'Don\'t Come Bet on ' + diceValue + ': Lost $'+dontComeBetAmtArray[diceValue]+'<br>';
				dontComeBetAmtArray[diceValue] = 0;
				dontComeActiveArray[diceValue] = false;
				$('#pointEight').css('opacity', '0.0');
				$('#pointEight').html('');
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				comeBetAmtArray[diceValue] += newComeBetAmt;
				newComeBetAmt = 0;
				newComeBet = false;
				$('#come').css('opacity', '0.0');
				$('#come').html('');
				if (comeBetAmtArray[diceValue] >= blackChipAmt) {
					$('#pointEight').html('<img src="/images/black_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= greenChipAmt) {
					$('#pointEight').html('<img src="/images/green_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= blueChipAmt) {
					$('#pointEight').html('<img src="/images/blue_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= redChipAmt) {
					$('#pointEight').html('<img src="/images/red_chip_small.png"/>');
				}
				$('#pointEight').css('opacity', '0.95');
				$('#pointEight').css('background-color', 'transparent');
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				dontComeBetAmtArray[diceValue] += newDontComeBetAmt;
				newDontComeBetAmt = 0;
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
				$('#dontComeBar').html('');
				if (dontComeBetAmtArray[diceValue] >= blackChipAmt) {
					$('#pointEight').html('<img src="/images/black_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= greenChipAmt) {
					$('#pointEight').html('<img src="/images/green_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= blueChipAmt) {
					$('#pointEight').html('<img src="/images/blue_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= redChipAmt) {
					$('#pointEight').html('<img src="/images/red_chip_small.png"/>');
				}
				$('#pointEight').css('opacity', '0.95');
				$('#pointEight').css('background-color', 'transparent');
			}
			break;
		case 9:
			if (comeActiveArray[diceValue]) {
				'Come Bet on ' + diceValue + ': Won $'+comeBetAmtArray[diceValue]*2+'<br>';
				payout(comeBetAmtArray[diceValue], (1/1));
				comeBetAmtArray[diceValue] = 0;
				comeActiveArray[diceValue] = false;
				$('#pointNine').css('opacity', '0.0');
				$('#pointNine').html('');
			}
			if (dontComeActiveArray[diceValue]) {
				betResultsString += 'Don\'t Come Bet on ' + diceValue + ': Lost $'+dontComeBetAmtArray[diceValue]+'<br>';
				dontComeBetAmtArray[diceValue] = 0;
				dontComeActiveArray[diceValue] = false;
				$('#pointNine').css('opacity', '0.0');
				$('#pointNine').html('');
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				comeBetAmtArray[diceValue] += newComeBetAmt;
				newComeBetAmt = 0;
				newComeBet = false;
				$('#come').css('opacity', '0.0');
				$('#come').html('');
				if (comeBetAmtArray[diceValue] >= blackChipAmt) {
					$('#pointNine').html('<img src="/images/black_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= greenChipAmt) {
					$('#pointNine').html('<img src="/images/green_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= blueChipAmt) {
					$('#pointNine').html('<img src="/images/blue_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= redChipAmt) {
					$('#pointNine').html('<img src="/images/red_chip_small.png"/>');
				}
				$('#pointNine').css('opacity', '0.95');
				$('#pointNine').css('background-color', 'transparent');
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				dontComeBetAmtArray[diceValue] += newDontComeBetAmt;
				newDontComeBetAmt = 0;
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
				$('#dontComeBar').html('');
				if (dontComeBetAmtArray[diceValue] >= blackChipAmt) {
					$('#pointNine').html('<img src="/images/black_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= greenChipAmt) {
					$('#pointNine').html('<img src="/images/green_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= blueChipAmt) {
					$('#pointNine').html('<img src="/images/blue_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= redChipAmt) {
					$('#pointNine').html('<img src="/images/red_chip_small.png"/>');
				}
				$('#pointNine').css('opacity', '0.95');
				$('#pointNine').css('background-color', 'transparent');
			}
			break;
		case 10:
			if (comeActiveArray[diceValue]) {
				betResultsString += 'Come Bet on ' + diceValue + ': Won $'+comeBetAmtArray[diceValue]*2+'<br>';
				payout(comeBetAmtArray[diceValue], (1/1));
				comeBetAmtArray[diceValue] = 0;
				comeActiveArray[diceValue] = false;
				$('#pointTen').css('opacity', '0.0');
				$('#pointTen').html('');
			}
			if (dontComeActiveArray[diceValue]) {
				betResultsString += 'Don\'t Come Bet on ' + diceValue + ': Lost $'+dontComeBetAmtArray[diceValue]+'<br>';
				dontComeBetAmtArray[diceValue] = 0;
				dontComeActiveArray[diceValue] = false;
				$('#pointTen').css('opacity', '0.0');
				$('#pointTen').html('');
			}
			if (newComeBet) {
				comeActiveArray[diceValue] = true;
				comeBetAmtArray[diceValue] += newComeBetAmt;
				newComeBetAmt = 0;
				newComeBet = false;
				$('#come').css('opacity', '0.0');
				$('#come').html('');
				if (comeBetAmtArray[diceValue] >= blackChipAmt) {
					$('#pointTen').html('<img src="/images/black_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= greenChipAmt) {
					$('#pointTen').html('<img src="/images/green_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= blueChipAmt) {
					$('#pointTen').html('<img src="/images/blue_chip_small.png"/>');
				}
				else if (comeBetAmtArray[diceValue] >= redChipAmt) {
					$('#pointTen').html('<img src="/images/red_chip_small.png"/>');
				}
				$('#pointTen').css('opacity', '0.95');
				$('#pointTen').css('background-color', 'transparent');
			}
			if (newDontComeBet) {
				dontComeActiveArray[diceValue] = true;
				dontComeBetAmtArray[diceValue] += newDontComeBetAmt;
				newDontComeBetAmt = 0;
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
				$('#dontComeBar').html('');
				if (dontComeBetAmtArray[diceValue] >= blackChipAmt) {
					$('#pointTen').html('<img src="/images/black_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= greenChipAmt) {
					$('#pointTen').html('<img src="/images/green_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= blueChipAmt) {
					$('#pointTen').html('<img src="/images/blue_chip_small.png"/>');
				}
				else if (dontComeBetAmtArray[diceValue] >= redChipAmt) {
					$('#pointTen').html('<img src="/images/red_chip_small.png"/>');
				}
				$('#pointTen').css('opacity', '0.95');
				$('#pointTen').css('background-color', 'transparent');
			}
			break;
		case 11:
			if (newComeBet) {
				betResultsString += 'New Come Bet: Won $'+newComeBetAmt*2+'<br>';
				payout(newComeBetAmt, (1/1));
				newComeBetAmt = 0;
				newComeBet = false;
				$('#come').css('opacity', '0.0');
				$('#come').html('');
			}
			if (newDontComeBet) {
				betResultsString += 'New Don\'t Come Bet: Lost $'+newDontComeBetAmt+'<br>';
				newDontComeBetAmt = 0;
				newDontComeBet = false;
				$('#dontComeBar').css('opacity', '0.0');
				$('#dontComeBar').html('');
			}
			break;
	}
	
	/* Single Roll Betting Logic */
	// see if each bet is active and then if it is winner or not
	if (snakeEyesActive) {
		if (diceValue == 2) {
			betResultsString += 'Snake Eyes Bet: Won $'+Math.ceil(snakeEyesBetAmt*31)+'<br>';
			payout(snakeEyesBetAmt, (30/1));
		} else {
			betResultsString += 'Snake Eyes Bet: Lost $'+snakeEyesBetAmt+'<br>';
		}
		snakeEyesActive = false;
		snakeEyesBetAmt = 0;
		$('#snakeEyes').html('');
		$('#snakeEyes').css('opacity', '0.0');
	}
	if (aceDeuceActive) {
		if (diceValue == 3) {
			betResultsString += 'Ace Deuce Bet: Won $'+Math.ceil(aceDeuceBetAmt*16)+'<br>';
			payout(aceDeuceBetAmt, (15/1));
		} else {
			betResultsString += 'Ace Deuce Bet: Lost $'+aceDeuceBetAmt+'<br>';
		}
		aceDeuceActive = false;
		aceDeuceBetAmt = 0;
		$('#aceDeuce').css('opacity', '0.0');
		$('#aceDeuce').html('');
	}
	if (yoLeftActive) {
		if (diceValue == 11) {
			betResultsString += 'Yo Bet: Won $'+Math.ceil(yoLeftBetAmt*16)+'<br>';
			payout(yoLeftBetAmt, (15/1));
		} else {
			betResultsString += 'Yo Bet: Lost $'+yoLeftBetAmt+'<br>';
		}
		yoLeftActive = false;
		yoLeftBetAmt = 0;
		$('#yoLeft').css('opacity', '0.0');
		$('#yoLeft').html('');
	}
	if (yoRightActive) {
		if (diceValue == 11) {
			betResultsString += 'Yo Bet: Won $'+Math.ceil(yoRightBetAmt*16)+'<br>';
			payout(yoRightBetAmt, (15/1));
		} else {
			betResultsString += 'Yo Bet: Lost $'+yoRightBetAmt+'<br>';
		}
		yoRightActive = false;
		yoRightBetAmt = 0;
		$('#yoRight').css('opacity', '0.0');
		$('#yoRight').html('');
	}
	if (boxcarsActive) {
		if (diceValue == 12) {
			betResultsString += 'Boxcars Bet: Won $'+Math.ceil(boxcarsBetAmt*31)+'<br>';
			payout(boxcarsBetAmt, (30/1));
		} else {
			betResultsString += 'Boxcars Bet: Lost $'+boxcarsBetAmt+'<br>';
		}
		boxcarsActive = false;
		boxcarsBetAmt = 0;
		$('#boxcars').css('opacity', '0.0');
		$('#boxcars').html('');
	}
	if (anyCrapsActive) {
		if (diceValue == 2 || diceValue == 3 || diceValue == 12) {
			betResultsString += 'Any Craps Bet: Won $'+Math.ceil(anyCrapsBetAmt*8)+'<br>';
			payout(anyCrapsBetAmt, (7/1));
		} else {
			betResultsString += 'Any Craps Bet: Lost $'+anyCrapsBetAmt+'<br>';
		}
		anyCrapsActive = false;
		anyCrapsBetAmt = 0;
		$('#anyCraps').css('opacity', '0.0');
		$('#anyCraps').html('');
	}
	if (anySevenActive) {
		if (diceValue == 7) {
			betResultsString += 'Any Seven Bet: Won $'+Math.ceil(anySevenBetAmt*5)+'<br>';
			payout(anySevenBetAmt, (4/1));
		} else {
			betResultsString += 'Any Seven Bet: Lost $'+anySevenBetAmt+'<br>';
		}
		anySevenActive = false;
		anySevenBetAmt = 0;
		$('#anySeven').css('opacity', '0.0');
		$('#anySeven').html('');
	}
	if (fieldActive) {
		// different dice values have different pay outs
		if (diceValue == 2) {
			betResultsString += 'Field Bet: Won $'+Math.ceil(fieldBetAmt*3)+'<br>';
			payout(fieldBetAmt, (2/1));
		} else if (diceValue == 12) {
			betResultsString += 'Field Bet: Won $'+Math.ceil(fieldBetAmt*4)+'<br>';
			payout(fieldBetAmt, (3/1));
		} else if (diceValue == 3 || diceValue == 4 || diceValue == 9 || diceValue == 10 || diceValue == 11) {
			betResultsString += 'Field Bet: Won $'+fieldBetAmt*2+'<br>';
			payout(fieldBetAmt, (1/1));
		} else {
			betResultsString += 'Field Bet: Lost $'+fieldBetAmt+'<br>';
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
					betResultsString += 'Hard Way 4 Bet: Won $'+Math.ceil(hardWayFourBetAmt*8)+'<br>';
					payout(hardWayFourBetAmt, (7/1));
				} else {
					betResultsString += 'Hard Way 4 Bet: Lost $'+hardWayFourBetAmt+'<br>';
				}
				hardWayFourActive = false;
				hardWayFourBetAmt = 0;
				hardWayFourLocked = false;
				$('#hardWayFour').css('opacity', '0.0');
				$('#hardWayFour').html('');
			}
			break;
		case 6:
			if (hardWaySixActive) {
				if (dice1 == dice2) {
					betResultsString += 'Hard Way 6 Bet: Won $'+Math.ceil(hardWaySixBetAmt*10)+'<br>';
					payout(hardWaySixBetAmt, (9/1));
				} else {
					betResultsString += 'Hard Way 6 Bet: Lost $'+hardWaySixBetAmt+'<br>';
				}
				hardWaySixActive = false;
				hardWaySixBetAmt = 0;
				hardWaySixLocked = false;
				$('#hardWaySix').css('opacity', '0.0');
				$('#hardWaySix').html('');
			}
			break;
		case 7:
			if (hardWayFourActive) {
				betResultsString += 'Hard Way 4 Bet: Lost $'+hardWayFourBetAmt+'<br>';
				hardWayFourActive = false;
				hardWayFourBetAmt = 0;
				hardWayFourLocked = false;
				$('#hardWayFour').css('opacity', '0.0');
				$('#hardWayFour').html('');
			}
			if (hardWaySixActive) {
				betResultsString += 'Hard Way 6 Bet: Lost $'+hardWaySixBetAmt+'<br>';
				hardWaySixActive = false;
				hardWaySixBetAmt = 0;
				hardWaySixLocked = false;
				$('#hardWaySix').css('opacity', '0.0');
				$('#hardWaySix').html('');
			}
			if (hardWayEightActive) {
				betResultsString += 'Hard Way 8 Bet: Lost $'+hardWayEightBetAmt+'<br>';
				hardWayEightActive = false;
				hardWayEightBetAmt = 0;
				hardWayEightLocked = false;
				$('#hardWayEight').css('opacity', '0.0');
				$('#hardWayEight').html('');
			}
			if (hardWayTenActive) {
				betResultsString += 'Hard Way 10 Bet: Lost $'+hardWayTenBetAmt+'<br>';
				hardWayTenActive = false;
				hardWayTenBetAmt = 0;
				hardWayTenLocked = false;
				$('#hardWayTen').css('opacity', '0.0');
				$('#hardWayTen').html('');
			}
			break;
		case 8:
			if (hardWayEightActive) {
				if (dice1 == dice2) {
					betResultsString += 'Hard Way 8 Bet: Won $'+Math.ceil(hardWayEightBetAmt*10)+'<br>';
					payout(hardWayEightBetAmt, (9/1));
				} else {
					betResultsString += 'Hard Way 8 Bet: Lost $'+hardWayEightBetAmt+'<br>';
				}
				hardWayEightActive = false;
				hardWayEightBetAmt = 0;
				hardWayEightLocked = false;
				$('#hardWayEight').css('opacity', '0.0');
				$('#hardWayEight').html('');
			}
			break;
		case 10:
			if (hardWayTenActive) {
				if (dice1 == dice2) {
					betResultsString += 'Hard Way 10 Bet: Won $'+Math.ceil(hardWayTenBetAmt*8)+'<br>';
					payout(hardWayTenBetAmt, (7/1));
				} else {
					betResultsString += 'Hard Way 10 Bet: Lost $'+hardWayTenBetAmt+'<br>';
				}
				hardWayTenActive = false;
				hardWayTenBetAmt = 0;
				hardWayTenLocked = false;
				$('#hardWayTen').css('opacity', '0.0');
				$('#hardWayTen').html('');
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
				betResultsString += 'Place 4 Bet: Won $'+Math.ceil(placeFourBetAmt*(1+(9/5)))+'<br>';
				payout(placeFourBetAmt, (9/5));
				placeFourBetAmt = 0;
				placeFourActive = false;
				placeFourLocked = false;
				$('#placeFour').css('opacity', '0.0');
				$('#placeFour').html('');
			}
			break;
		case 5:
			if (placeFiveActive) {
				betResultsString += 'Place 5 Bet: Won $'+Math.ceil(placeFiveBetAmt*(1+(7/5)))+'<br>';
				payout(placeFiveBetAmt, (7/5));
				placeFiveBetAmt = 0;
				placeFiveActive = false;
				placeFiveLocked = false;
				$('#placeFive').css('opacity', '0.0');
				$('#placeFive').html('');
			}
			break;
		case 6:
			if (placeSixActive) {
				betResultsString += 'Place 6 Bet: Won $'+Math.ceil(placeSixBetAmt*(1+(7/6)))+'<br>';
				payout(placeSixBetAmt, (7/6));
				placeSixBetAmt = 0;
				placeSixActive = false;
				placeSixLocked = false;
				$('#placeSix').css('opacity', '0.0');
				$('#placeSix').html('');
			}
			break;
		case 7:
			if (placeFourActive) {
				betResultsString += 'Place 4 Bet: Lost $'+placeFourBetAmt+'<br>';
				placeFourBetAmt = 0;
				placeFourActive = false;
				placeFourLocked = false;
				$('#placeFour').css('opacity', '0.0');
				$('#placeFour').html('');
			}
			if (placeFiveActive) {
				betResultsString += 'Place 5 Bet: Lost $'+placeFiveBetAmt+'<br>';
				placeFiveBetAmt = 0;
				placeFiveActive = false;
				placeFiveLocked = false;
				$('#placeFive').css('opacity', '0.0');
				$('#placeFive').html('');
			}
			if (placeSixActive) {
				betResultsString += 'Place 6 Bet: Lost $'+placeSixBetAmt+'<br>';
				placeSixBetAmt = 0;
				placeSixActive = false;
				placeSixLocked = false;
				$('#placeSix').css('opacity', '0.0');
				$('#placeSix').html('');
			}
			if (placeEightActive) {
				betResultsString += 'Place 8 Bet: Lost $'+placeEightBetAmt+'<br>';
				placeEightBetAmt = 0;
				placeEightActive = false;
				placeEightLocked = false;
				$('#placeEight').css('opacity', '0.0');
				$('#placeEight').html('');
			}
			if (placeNineActive) {
				betResultsString += 'Place 9 Bet: Lost $'+placeNineBetAmt+'<br>';
				placeNineBetAmt = 0;
				placeNineActive = false;
				placeNineLocked = false;
				$('#placeNine').css('opacity', '0.0');
				$('#placeNine').html('');
			}
			if (placeTenActive) {
				betResultsString += 'Place 10 Bet: Lost $'+placeTenBetAmt+'<br>';
				placeTenBetAmt = 0;
				placeTenActive = false;
				placeTenLocked = false;
				$('#placeTen').css('opacity', '0.0');
				$('#placeTen').html('');
			}
			break;
		case 8:
			if (placeEightActive) {
				betResultsString += 'Place 8 Bet: Won $'+Math.ceil(placeEightBetAmt*(1+(7/6)))+'<br>';
				payout(placeEightBetAmt, (7/6));
				placeEightBetAmt = 0;
				placeEightActive = false;
				placeEightLocked = false;
				$('#placeEight').css('opacity', '0.0');
				$('#placeEight').html('');
			}
			break;
		case 9:
			if (placeNineActive) {
				betResultsString += 'Place 9 Bet: Won $'+Math.ceil(placeNineBetAmt*(1+(7/5)))+'<br>';
				payout(placeNineBetAmt, (7/5));
				placeNineBetAmt = 0;
				placeNineActive = false;
				placeNineLocked = false;
				$('#placeNine').css('opacity', '0.0');
				$('#placeNine').html('');
			}
			break;
		case 10:
			if (placeTenActive) {
				betResultsString += 'Place 10 Bet: Won $'+Math.ceil(placeTenBetAmt*(1+(9/5)))+'<br>';
				payout(placeTenBetAmt, (9/5));
				placeTenBetAmt = 0;
				placeTenActive = false;
				placeTenLocked = false;
				$('#placeTen').css('opacity', '0.0');
				$('#placeTen').html('');
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
	
	if (betResultsString != '') {
		betResultsString = '<strong>Your Earnings For That Roll:</strong><br><br>' + betResultsString;
	}
	document.getElementById('currGameState').innerHTML = betResultsString;
	document.getElementById('currGameState').style.display = 'block';
}
