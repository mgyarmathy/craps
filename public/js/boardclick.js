/* onClick functions for game board*/
function passLineClick() {
	if (isComeOutRoll && !passLineLocked) {
		passLineActive = true;
		if (redChipActive) {
			passLineBetAmt += redChipAmt;
			userBet(redChipAmt);
		}
		else if (blueChipActive) {
			passLineBetAmt += blueChipAmt;
			userBet(blueChipAmt);
		}
		else if (greenChipActive) {
			passLineBetAmt += greenChipAmt;
			userBet(greenChipAmt);
		}
		else if (blackChipActive) {
			passLineBetAmt += blackChipAmt;
			userBet(blackChipAmt);
		}
		if (passLineBetAmt >= blackChipAmt) {
			$('#passLineHori').html('');
			$('#passLineHori').html('<img src="/images/black_chip_small.png"/>');
		}
		else if (passLineBetAmt >= greenChipAmt) {
			$('#passLineHori').html('');
			$('#passLineHori').html('<img src="/images/green_chip_small.png"/>');
		}
		else if (passLineBetAmt >= blueChipAmt) {
			$('#passLineHori').html('');
			$('#passLineHori').html('<img src="/images/blue_chip_small.png"/>');
		}
		else if (passLineBetAmt >= redChipAmt) {
			$('#passLineHori').html('');
			$('#passLineHori').html('<img src="/images/red_chip_small.png"/>');
		}
		$('#passLineHori').css('background-color', 'transparent');
		$('#passLineHori').css('opacity', '.95');
		$('#passLineVert').css('background-color', 'transparent');
		$('#passLineVert').css('opacity', '.95');
	}
}

function dontPassBarClick() {
	if (isComeOutRoll && !dontPassLineLocked) {
		dontPassLineActive = true;
		if (redChipActive) {
			dontPassLineBetAmt += redChipAmt;
			userBet(redChipAmt);
		}
		else if (blueChipActive) {
			dontPassLineBetAmt += blueChipAmt;
			userBet(blueChipAmt);
		}
		else if (greenChipActive) {
			dontPassLineBetAmt += greenChipAmt;
			userBet(greenChipAmt);
		}
		else if (blackChipActive) {
			dontPassLineBetAmt += blackChipAmt;
			userBet(blackChipAmt);
		}
		if (dontPassLineBetAmt >= blackChipAmt) {
			$('#dontPassBarHori').html('');
			$('#dontPassBarHori').html('<img src="/images/black_chip_small.png"/>');
		}
		else if (dontPassLineBetAmt >= greenChipAmt) {
			$('#dontPassBarHori').html('');
			$('#dontPassBarHori').html('<img src="/images/green_chip_small.png"/>');
		}
		else if (dontPassLineBetAmt >= blueChipAmt) {
			$('#dontPassBarHori').html('');
			$('#dontPassBarHori').html('<img src="/images/blue_chip_small.png"/>');
		}
		else if (dontPassLineBetAmt >= redChipAmt) {
			$('#dontPassBarHori').html('');
			$('#dontPassBarHori').html('<img src="/images/red_chip_small.png"/>');
		}
		$('#dontPassBarHori').css('background-color', 'transparent');
		$('#dontPassBarHori').css('opacity', '.95');
		$('#dontPassBarVert').css('background-color', 'transparent');
		$('#dontPassBarVert').css('opacity', '.95');
	}
}

function passOddsClick() {
	if (!isComeOutRoll && !passOddsLocked && passLineActive) {
		passOddsActive = true;
		if (redChipActive) {
			passOddsBetAmt += redChipAmt;
			userBet(redChipAmt);
		}
		else if (blueChipActive) {
			passOddsBetAmt += blueChipAmt;
			userBet(blueChipAmt);
		}
		else if (greenChipActive) {
			passOddsBetAmt += greenChipAmt;
			userBet(greenChipAmt);
		}
		else if (blackChipActive) {
			passOddsBetAmt += blackChipAmt;
			userBet(blackChipAmt);
		}
		if (passOddsBetAmt >= blackChipAmt) {
			$('#passOdds').html('');
			$('#passOdds').html('<img src="/images/black_chip_small.png"/>');
		}
		else if (passOddsBetAmt >= greenChipAmt) {
			$('#passOdds').html('');
			$('#passOdds').html('<img src="/images/green_chip_small.png"/>');
		}
		else if (passOddsBetAmt >= blueChipAmt) {
			$('#passOdds').html('');
			$('#passOdds').html('<img src="/images/blue_chip_small.png"/>');
		}
		else if (passOddsBetAmt >= redChipAmt) {
			$('#passOdds').html('');
			$('#passOdds').html('<img src="/images/red_chip_small.png"/>');
		}
		$('#passOdds').css('background-color', 'transparent');
		$('#passOdds').css('opacity', '.95');
	}
}

function dontPassOddsClick() {
	if (!isComeOutRoll && !dontPassOddsLocked && dontPassLineActive) {
		dontPassOddsActive = true;
		if (redChipActive) {
			dontPassOddsBetAmt += redChipAmt;
			userBet(redChipAmt);
		}
		else if (blueChipActive) {
			dontPassOddsBetAmt += blueChipAmt;
			userBet(blueChipAmt);
		}
		else if (greenChipActive) {
			dontPassOddsBetAmt += greenChipAmt;
			userBet(greenChipAmt);
		}
		else if (blackChipActive) {
			dontPassOddsBetAmt += blackChipAmt;
			userBet(blackChipAmt);
		}
		if (dontPassOddsBetAmt >= blackChipAmt) {
			$('#dontPassOdds').html('');
			$('#dontPassOdds').html('<img src="/images/black_chip_small.png"/>');
		}
		else if (dontPassOddsBetAmt >= greenChipAmt) {
			$('#dontPassOdds').html('');
			$('#dontPassOdds').html('<img src="/images/green_chip_small.png"/>');
		}
		else if (dontPassOddsBetAmt >= blueChipAmt) {
			$('#dontPassOdds').html('');
			$('#dontPassOdds').html('<img src="/images/blue_chip_small.png"/>');
		}
		else if (dontPassOddsBetAmt >= redChipAmt) {
			$('#dontPassOdds').html('');
			$('#dontPassOdds').html('<img src="/images/red_chip_small.png"/>');
		}
		$('#dontPassOdds').css('background-color', 'transparent');
		$('#dontPassOdds').css('opacity', '.95');
	}
}

function comeClick() {
	if (newComeBet) {
		newComeBet = false;
		$('#come').css('opacity', '0.0');
	}
	else if (!isComeOutRoll) {
		newComeBet = true;
		$('#come').css('background-color', 'blue');
		$('#come').css('opacity', '0.5');
	}
}

function dontComeClick() {
	if (newDontComeBet) {
		newDontComeBet = false;
		$('#dontComeBar').css('opacity', '0.0');
	}
	else if (!isComeOutRoll) {
		newDontComeBet = true;
		$('#dontComeBar').css('background-color', 'blue');
		$('#dontComeBar').css('opacity', '0.5');
	}
}

function placeFourClick() {
	if (!placeFourLocked) {
		placeFourActive = true;
		if (redChipActive) {
			placeFourBetAmt += redChipAmt;
			userBet(redChipAmt);
		}
		else if (blueChipActive) {
			placeFourBetAmt += blueChipAmt;
			userBet(blueChipAmt);
		}
		else if (greenChipActive) {
			placeFourBetAmt += greenChipAmt;
			userBet(greenChipAmt);
		}
		else if (blackChipActive) {
			placeFourBetAmt += blackChipAmt;
			userBet(blackChipAmt);
		}
		if (placeFourBetAmt >= blackChipAmt) {
			$('#placeFour').html('');
			$('#placeFour').html('<img src="/images/black_chip_small.png"/>');
		}
		else if (placeFourBetAmt >= greenChipAmt) {
			$('#placeFour').html('');
			$('#placeFour').html('<img src="/images/green_chip_small.png"/>');
		}
		else if (placeFourBetAmt >= blueChipAmt) {
			$('#placeFour').html('');
			$('#placeFour').html('<img src="/images/blue_chip_small.png"/>');
		}
		else if (placeFourBetAmt >= redChipAmt) {
			$('#placeFour').html('');
			$('#placeFour').html('<img src="/images/red_chip_small.png"/>');
		}
		$('#placeFour').css('background-color', 'transparent');
		$('#placeFour').css('opacity', '.95');
	}
}

function placeFiveClick() {
	if (!placeFiveLocked) {
		placeFiveActive = true;
		if (redChipActive) {
			placeFiveBetAmt += redChipAmt;
			userBet(redChipAmt);
		}
		else if (blueChipActive) {
			placeFiveBetAmt += blueChipAmt;
			userBet(blueChipAmt);
		}
		else if (greenChipActive) {
			placeFiveBetAmt += greenChipAmt;
			userBet(greenChipAmt);
		}
		else if (blackChipActive) {
			placeFiveBetAmt += blackChipAmt;
			userBet(blackChipAmt);
		}
		if (placeFiveBetAmt >= blackChipAmt) {
			$('#placeFive').html('');
			$('#placeFive').html('<img src="/images/black_chip_small.png"/>');
		}
		else if (placeFiveBetAmt >= greenChipAmt) {
			$('#placeFive').html('');
			$('#placeFive').html('<img src="/images/green_chip_small.png"/>');
		}
		else if (placeFiveBetAmt >= blueChipAmt) {
			$('#placeFive').html('');
			$('#placeFive').html('<img src="/images/blue_chip_small.png"/>');
		}
		else if (placeFiveBetAmt >= redChipAmt) {
			$('#placeFive').html('');
			$('#placeFive').html('<img src="/images/red_chip_small.png"/>');
		}
		$('#placeFive').css('background-color', 'transparent');
		$('#placeFive').css('opacity', '.95');
	}
}

function placeSixClick() {
	if (!placeSixLocked) {
		placeSixActive = true;
		if (redChipActive) {
			placeSixBetAmt += redChipAmt;
			userBet(redChipAmt);
		}
		else if (blueChipActive) {
			placeSixBetAmt += blueChipAmt;
			userBet(blueChipAmt);
		}
		else if (greenChipActive) {
			placeSixBetAmt += greenChipAmt;
			userBet(greenChipAmt);
		}
		else if (blackChipActive) {
			placeSixBetAmt += blackChipAmt;
			userBet(blackChipAmt);
		}
		if (placeSixBetAmt >= blackChipAmt) {
			$('#placeSix').html('');
			$('#placeSix').html('<img src="/images/black_chip_small.png"/>');
		}
		else if (placeSixBetAmt >= greenChipAmt) {
			$('#placeSix').html('');
			$('#placeSix').html('<img src="/images/green_chip_small.png"/>');
		}
		else if (placeSixBetAmt >= blueChipAmt) {
			$('#placeSix').html('');
			$('#placeSix').html('<img src="/images/blue_chip_small.png"/>');
		}
		else if (placeSixBetAmt >= redChipAmt) {
			$('#placeSix').html('');
			$('#placeSix').html('<img src="/images/red_chip_small.png"/>');
		}
		$('#placeSix').css('background-color', 'transparent');
		$('#placeSix').css('opacity', '.95');
	}
}

function placeEightClick() {
	if (!placeEightLocked) {
		placeEightActive = true;
		if (redChipActive) {
			placeEightBetAmt += redChipAmt;
			userBet(redChipAmt);
		}
		else if (blueChipActive) {
			placeEightBetAmt += blueChipAmt;
			userBet(blueChipAmt);
		}
		else if (greenChipActive) {
			placeEightBetAmt += greenChipAmt;
			userBet(greenChipAmt);
		}
		else if (blackChipActive) {
			placeEightBetAmt += blackChipAmt;
			userBet(blackChipAmt);
		}
		if (placeEightBetAmt >= blackChipAmt) {
			$('#placeEight').html('');
			$('#placeEight').html('<img src="/images/black_chip_small.png"/>');
		}
		else if (placeEightBetAmt >= greenChipAmt) {
			$('#placeEight').html('');
			$('#placeEight').html('<img src="/images/green_chip_small.png"/>');
		}
		else if (placeEightBetAmt >= blueChipAmt) {
			$('#placeEight').html('');
			$('#placeEight').html('<img src="/images/blue_chip_small.png"/>');
		}
		else if (placeEightBetAmt >= redChipAmt) {
			$('#placeEight').html('');
			$('#placeEight').html('<img src="/images/red_chip_small.png"/>');
		}
		$('#placeEight').css('background-color', 'transparent');
		$('#placeEight').css('opacity', '.95');
	}
}

function placeNineClick() {
	if (!placeNineLocked) {
		placeNineActive = true;
		if (redChipActive) {
			placeNineBetAmt += redChipAmt;
			userBet(redChipAmt);
		}
		else if (blueChipActive) {
			placeNineBetAmt += blueChipAmt;
			userBet(blueChipAmt);
		}
		else if (greenChipActive) {
			placeNineBetAmt += greenChipAmt;
			userBet(greenChipAmt);
		}
		else if (blackChipActive) {
			placeNineBetAmt += blackChipAmt;
			userBet(blackChipAmt);
		}
		if (placeNineBetAmt >= blackChipAmt) {
			$('#placeNine').html('');
			$('#placeNine').html('<img src="/images/black_chip_small.png"/>');
		}
		else if (placeNineBetAmt >= greenChipAmt) {
			$('#placeNine').html('');
			$('#placeNine').html('<img src="/images/green_chip_small.png"/>');
		}
		else if (placeNineBetAmt >= blueChipAmt) {
			$('#placeNine').html('');
			$('#placeNine').html('<img src="/images/blue_chip_small.png"/>');
		}
		else if (placeNineBetAmt >= redChipAmt) {
			$('#placeNine').html('');
			$('#placeNine').html('<img src="/images/red_chip_small.png"/>');
		}
		$('#placeNine').css('background-color', 'transparent');
		$('#placeNine').css('opacity', '.95');
	}
}

function placeTenClick() {
	if (!placeTenLocked) {
		placeTenActive = true;
		if (redChipActive) {
			placeTenBetAmt += redChipAmt;
			userBet(redChipAmt);
		}
		else if (blueChipActive) {
			placeTenBetAmt += blueChipAmt;
			userBet(blueChipAmt);
		}
		else if (greenChipActive) {
			placeTenBetAmt += greenChipAmt;
			userBet(greenChipAmt);
		}
		else if (blackChipActive) {
			placeTenBetAmt += blackChipAmt;
			userBet(blackChipAmt);
		}
		if (placeTenBetAmt >= blackChipAmt) {
			$('#placeTen').html('');
			$('#placeTen').html('<img src="/images/black_chip_small.png"/>');
		}
		else if (placeTenBetAmt >= greenChipAmt) {
			$('#placeTen').html('');
			$('#placeTen').html('<img src="/images/green_chip_small.png"/>');
		}
		else if (placeTenBetAmt >= blueChipAmt) {
			$('#placeTen').html('');
			$('#placeTen').html('<img src="/images/blue_chip_small.png"/>');
		}
		else if (placeTenBetAmt >= redChipAmt) {
			$('#placeTen').html('');
			$('#placeTen').html('<img src="/images/red_chip_small.png"/>');
		}
		$('#placeTen').css('background-color', 'transparent');
		$('#placeTen').css('opacity', '.95');
	}
}

function fieldClick() {
	fieldActive = true;
	if (redChipActive) {
		fieldBetAmt += redChipAmt;
		userBet(redChipAmt);
	}
	else if (blueChipActive) {
		fieldBetAmt += blueChipAmt;
		userBet(blueChipAmt);
	}
	else if (greenChipActive) {
		fieldBetAmt += greenChipAmt;
		userBet(greenChipAmt);
	}
	else if (blackChipActive) {
		fieldBetAmt += blackChipAmt;
		userBet(blackChipAmt);
	}
	if (fieldBetAmt >= blackChipAmt) {
		$('#field').html('');
		$('#field').html('<img src="/images/black_chip_small.png"/>');
	}
	else if (fieldBetAmt >= greenChipAmt) {
		$('#field').html('');
		$('#field').html('<img src="/images/green_chip_small.png"/>');
	}
	else if (fieldBetAmt >= blueChipAmt) {
		$('#field').html('');
		$('#field').html('<img src="/images/blue_chip_small.png"/>');
	}
	else if (fieldBetAmt >= redChipAmt) {
		$('#field').html('');
		$('#field').html('<img src="/images/red_chip_small.png"/>');
	}
	$('#field').css('background-color', 'transparent');
	$('#field').css('opacity', '.95');
}

function anySevenClick() {
	anySevenActive = true;
	if (redChipActive) {
		anySevenBetAmt += redChipAmt;
		userBet(redChipAmt);
	}
	else if (blueChipActive) {
		anySevenBetAmt += blueChipAmt;
		userBet(blueChipAmt);
	}
	else if (greenChipActive) {
		anySevenBetAmt += greenChipAmt;
		userBet(greenChipAmt);
	}
	else if (blackChipActive) {
		anySevenBetAmt += blackChipAmt;
		userBet(blackChipAmt);
	}
	if (anySevenBetAmt >= blackChipAmt) {
		$('#anySeven').html('');
		$('#anySeven').html('<img src="/images/black_chip_small.png"/>');
	}
	else if (anySevenBetAmt >= greenChipAmt) {
		$('#anySeven').html('');
		$('#anySeven').html('<img src="/images/green_chip_small.png"/>');
	}
	else if (anySevenBetAmt >= blueChipAmt) {
		$('#anySeven').html('');
		$('#anySeven').html('<img src="/images/blue_chip_small.png"/>');
	}
	else if (anySevenBetAmt >= redChipAmt) {
		$('#anySeven').html('');
		$('#anySeven').html('<img src="/images/red_chip_small.png"/>');
	}
	$('#anySeven').css('background-color', 'transparent');
	$('#anySeven').css('opacity', '.95');
}

function aceDeuceClick() {
	aceDeuceActive = true;
	if (redChipActive) {
		aceDeuceBetAmt += redChipAmt;
		userBet(redChipAmt);
	}
	else if (blueChipActive) {
		aceDeuceBetAmt += blueChipAmt;
		userBet(blueChipAmt);
	}
	else if (greenChipActive) {
		aceDeuceBetAmt += greenChipAmt;
		userBet(greenChipAmt);
	}
	else if (blackChipActive) {
		aceDeuceBetAmt += blackChipAmt;
		userBet(blackChipAmt);
	}
	if (aceDeuceBetAmt >= blackChipAmt) {
		$('#aceDeuce').html('');
		$('#aceDeuce').html('<img src="/images/black_chip_small.png"/>');
	}
	else if (aceDeuceBetAmt >= greenChipAmt) {
		$('#aceDeuce').html('');
		$('#aceDeuce').html('<img src="/images/green_chip_small.png"/>');
	}
	else if (aceDeuceBetAmt >= blueChipAmt) {
		$('#aceDeuce').html('');
		$('#aceDeuce').html('<img src="/images/blue_chip_small.png"/>');
	}
	else if (aceDeuceBetAmt >= redChipAmt) {
		$('#aceDeuce').html('');
		$('#aceDeuce').html('<img src="/images/red_chip_small.png"/>');
	}
	$('#aceDeuce').css('background-color', 'transparent');
	$('#aceDeuce').css('opacity', '.95');
}

function snakeEyesClick() {
	snakeEyesActive = true;
	if (redChipActive) {
		snakeEyesBetAmt += redChipAmt;
		userBet(redChipAmt);
	}
	else if (blueChipActive) {
		snakeEyesBetAmt += blueChipAmt;
		userBet(blueChipAmt);
	}
	else if (greenChipActive) {
		snakeEyesBetAmt += greenChipAmt;
		userBet(greenChipAmt);
	}
	else if (blackChipActive) {
		snakeEyesBetAmt += blackChipAmt;
		userBet(blackChipAmt);
	}
	if (snakeEyesBetAmt >= blackChipAmt) {
		$('#snakeEyes').html('');
		$('#snakeEyes').html('<img src="/images/black_chip_small.png"/>');
	}
	else if (snakeEyesBetAmt >= greenChipAmt) {
		$('#snakeEyes').html('');
		$('#snakeEyes').html('<img src="/images/green_chip_small.png"/>');
	}
	else if (snakeEyesBetAmt >= blueChipAmt) {
		$('#snakeEyes').html('');
		$('#snakeEyes').html('<img src="/images/blue_chip_small.png"/>');
	}
	else if (snakeEyesBetAmt >= redChipAmt) {
		$('#snakeEyes').html('');
		$('#snakeEyes').html('<img src="/images/red_chip_small.png"/>');
	}
	$('#snakeEyes').css('background-color', 'transparent');
	$('#snakeEyes').css('opacity', '.95');
}

function boxcarsClick() {
	boxcarsActive = true;
	if (redChipActive) {
		boxcarsBetAmt += redChipAmt;
		userBet(redChipAmt);
	}
	else if (blueChipActive) {
		boxcarsBetAmt += blueChipAmt;
		userBet(blueChipAmt);
	}
	else if (greenChipActive) {
		boxcarsBetAmt += greenChipAmt;
		userBet(greenChipAmt);
	}
	else if (blackChipActive) {
		boxcarsBetAmt += blackChipAmt;
		userBet(blackChipAmt);
	}
	if (boxcarsBetAmt >= blackChipAmt) {
		$('#boxcars').html('');
		$('#boxcars').html('<img src="/images/black_chip_small.png"/>');
	}
	else if (boxcarsBetAmt >= greenChipAmt) {
		$('#boxcars').html('');
		$('#boxcars').html('<img src="/images/green_chip_small.png"/>');
	}
	else if (boxcarsBetAmt >= blueChipAmt) {
		$('#boxcars').html('');
		$('#boxcars').html('<img src="/images/blue_chip_small.png"/>');
	}
	else if (boxcarsBetAmt >= redChipAmt) {
		$('#boxcars').html('');
		$('#boxcars').html('<img src="/images/red_chip_small.png"/>');
	}
	$('#boxcars').css('background-color', 'transparent');
	$('#boxcars').css('opacity', '.95');
}

function yoLeftClick() {
	yoLeftActive = true;
	if (redChipActive) {
		yoLeftBetAmt += redChipAmt;
		userBet(redChipAmt);
	}
	else if (blueChipActive) {
		yoLeftBetAmt += blueChipAmt;
		userBet(blueChipAmt);
	}
	else if (greenChipActive) {
		yoLeftBetAmt += greenChipAmt;
		userBet(greenChipAmt);
	}
	else if (blackChipActive) {
		yoLeftBetAmt += blackChipAmt;
		userBet(blackChipAmt);
	}
	if (yoLeftBetAmt >= blackChipAmt) {
		$('#yoLeft').html('');
		$('#yoLeft').html('<img src="/images/black_chip_small.png"/>');
	}
	else if (yoLeftBetAmt >= greenChipAmt) {
		$('#yoLeft').html('');
		$('#yoLeft').html('<img src="/images/green_chip_small.png"/>');
	}
	else if (yoLeftBetAmt >= blueChipAmt) {
		$('#yoLeft').html('');
		$('#yoLeft').html('<img src="/images/blue_chip_small.png"/>');
	}
	else if (yoLeftBetAmt >= redChipAmt) {
		$('#yoLeft').html('');
		$('#yoLeft').html('<img src="/images/red_chip_small.png"/>');
	}
	$('#yoLeft').css('background-color', 'transparent');
	$('#yoLeft').css('opacity', '.95');
}
function yoRightClick() {
	yoRightActive = true;
	if (redChipActive) {
		yoRightBetAmt += redChipAmt;
		userBet(redChipAmt);
	}
	else if (blueChipActive) {
		yoRightBetAmt += blueChipAmt;
		userBet(blueChipAmt);
	}
	else if (greenChipActive) {
		yoRightBetAmt += greenChipAmt;
		userBet(greenChipAmt);
	}
	else if (blackChipActive) {
		yoRightBetAmt += blackChipAmt;
		userBet(blackChipAmt);
	}
	if (yoRightBetAmt >= blackChipAmt) {
		$('#yoRight').html('');
		$('#yoRight').html('<img src="/images/black_chip_small.png"/>');
	}
	else if (yoRightBetAmt >= greenChipAmt) {
		$('#yoRight').html('');
		$('#yoRight').html('<img src="/images/green_chip_small.png"/>');
	}
	else if (yoRightBetAmt >= blueChipAmt) {
		$('#yoRight').html('');
		$('#yoRight').html('<img src="/images/blue_chip_small.png"/>');
	}
	else if (yoRightBetAmt >= redChipAmt) {
		$('#yoRight').html('');
		$('#yoRight').html('<img src="/images/red_chip_small.png"/>');
	}
	$('#yoRight').css('background-color', 'transparent');
	$('#yoRight').css('opacity', '.95');
}
function anyCrapsClick() {
	anyCrapsActive = true;
	if (redChipActive) {
		anyCrapsBetAmt += redChipAmt;
		userBet(redChipAmt);
	}
	else if (blueChipActive) {
		anyCrapsBetAmt += blueChipAmt;
		userBet(blueChipAmt);
	}
	else if (greenChipActive) {
		anyCrapsBetAmt += greenChipAmt;
		userBet(greenChipAmt);
	}
	else if (blackChipActive) {
		anyCrapsBetAmt += blackChipAmt;
		userBet(blackChipAmt);
	}
	if (anyCrapsBetAmt >= blackChipAmt) {
		$('#anyCraps').html('');
		$('#anyCraps').html('<img src="/images/black_chip_small.png"/>');
	}
	else if (anyCrapsBetAmt >= greenChipAmt) {
		$('#anyCraps').html('');
		$('#anyCraps').html('<img src="/images/green_chip_small.png"/>');
	}
	else if (anyCrapsBetAmt >= blueChipAmt) {
		$('#anyCraps').html('');
		$('#anyCraps').html('<img src="/images/blue_chip_small.png"/>');
	}
	else if (anyCrapsBetAmt >= redChipAmt) {
		$('#anyCraps').html('');
		$('#anyCraps').html('<img src="/images/red_chip_small.png"/>');
	}
	$('#anyCraps').css('background-color', 'transparent');
	$('#anyCraps').css('opacity', '.95');
}

function hardWayFourClick() {
	if (!hardWayFourLocked) {
		hardWayFourActive = true;
		if (redChipActive) {
			hardWayFourBetAmt += redChipAmt;
			userBet(redChipAmt);
		}
		else if (blueChipActive) {
			hardWayFourBetAmt += blueChipAmt;
			userBet(blueChipAmt);
		}
		else if (greenChipActive) {
			hardWayFourBetAmt += greenChipAmt;
			userBet(greenChipAmt);
		}
		else if (blackChipActive) {
			hardWayFourBetAmt += blackChipAmt;
			userBet(blackChipAmt);
		}
		if (hardWayFourBetAmt >= blackChipAmt) {
			$('#hardWayFour').html('');
			$('#hardWayFour').html('<img src="/images/black_chip_small.png"/>');
		}
		else if (hardWayFourBetAmt >= greenChipAmt) {
			$('#hardWayFour').html('');
			$('#hardWayFour').html('<img src="/images/green_chip_small.png"/>');
		}
		else if (hardWayFourBetAmt >= blueChipAmt) {
			$('#hardWayFour').html('');
			$('#hardWayFour').html('<img src="/images/blue_chip_small.png"/>');
		}
		else if (hardWayFourBetAmt >= redChipAmt) {
			$('#hardWayFour').html('');
			$('#hardWayFour').html('<img src="/images/red_chip_small.png"/>');
		}
		$('#hardWayFour').css('background-color', 'transparent');
		$('#hardWayFour').css('opacity', '.95');
	}
}

function hardWaySixClick() {
	if (!hardWaySixLocked) {
		hardWaySixActive = true;
		if (redChipActive) {
			hardWaySixBetAmt += redChipAmt;
			userBet(redChipAmt);
		}
		else if (blueChipActive) {
			hardWaySixBetAmt += blueChipAmt;
			userBet(blueChipAmt);
		}
		else if (greenChipActive) {
			hardWaySixBetAmt += greenChipAmt;
			userBet(greenChipAmt);
		}
		else if (blackChipActive) {
			hardWaySixBetAmt += blackChipAmt;
			userBet(blackChipAmt);
		}
		if (hardWaySixBetAmt >= blackChipAmt) {
			$('#hardWaySix').html('');
			$('#hardWaySix').html('<img src="/images/black_chip_small.png"/>');
		}
		else if (hardWaySixBetAmt >= greenChipAmt) {
			$('#hardWaySix').html('');
			$('#hardWaySix').html('<img src="/images/green_chip_small.png"/>');
		}
		else if (hardWaySixBetAmt >= blueChipAmt) {
			$('#hardWaySix').html('');
			$('#hardWaySix').html('<img src="/images/blue_chip_small.png"/>');
		}
		else if (hardWaySixBetAmt >= redChipAmt) {
			$('#hardWaySix').html('');
			$('#hardWaySix').html('<img src="/images/red_chip_small.png"/>');
		}
		$('#hardWaySix').css('background-color', 'transparent');
		$('#hardWaySix').css('opacity', '.95');
	}
}

function hardWayEightClick() {
	if (!hardWayEightLocked) {
		hardWayEightActive = true;
		if (redChipActive) {
			hardWayEightBetAmt += redChipAmt;
			userBet(redChipAmt);
		}
		else if (blueChipActive) {
			hardWayEightBetAmt += blueChipAmt;
			userBet(blueChipAmt);
		}
		else if (greenChipActive) {
			hardWayEightBetAmt += greenChipAmt;
			userBet(greenChipAmt);
		}
		else if (blackChipActive) {
			hardWayEightBetAmt += blackChipAmt;
			userBet(blackChipAmt);
		}
		if (hardWayEightBetAmt >= blackChipAmt) {
			$('#hardWayEight').html('');
			$('#hardWayEight').html('<img src="/images/black_chip_small.png"/>');
		}
		else if (hardWayEightBetAmt >= greenChipAmt) {
			$('#hardWayEight').html('');
			$('#hardWayEight').html('<img src="/images/green_chip_small.png"/>');
		}
		else if (hardWayEightBetAmt >= blueChipAmt) {
			$('#hardWayEight').html('');
			$('#hardWayEight').html('<img src="/images/blue_chip_small.png"/>');
		}
		else if (hardWayEightBetAmt >= redChipAmt) {
			$('#hardWayEight').html('');
			$('#hardWayEight').html('<img src="/images/red_chip_small.png"/>');
		}
		$('#hardWayEight').css('background-color', 'transparent');
		$('#hardWayEight').css('opacity', '.95');
	}
}

function hardWayTenClick() {
	if (!hardWayTenLocked) {
		hardWayTenActive = true;
		if (redChipActive) {
			hardWayTenBetAmt += redChipAmt;
			userBet(redChipAmt);
		}
		else if (blueChipActive) {
			hardWayTenBetAmt += blueChipAmt;
			userBet(blueChipAmt);
		}
		else if (greenChipActive) {
			hardWayTenBetAmt += greenChipAmt;
			userBet(greenChipAmt);
		}
		else if (blackChipActive) {
			hardWayTenBetAmt += blackChipAmt;
			userBet(blackChipAmt);
		}
		if (hardWayTenBetAmt >= blackChipAmt) {
			$('#hardWayTen').html('');
			$('#hardWayTen').html('<img src="/images/black_chip_small.png"/>');
		}
		else if (hardWayTenBetAmt >= greenChipAmt) {
			$('#hardWayTen').html('');
			$('#hardWayTen').html('<img src="/images/green_chip_small.png"/>');
		}
		else if (hardWayTenBetAmt >= blueChipAmt) {
			$('#hardWayTen').html('');
			$('#hardWayTen').html('<img src="/images/blue_chip_small.png"/>');
		}
		else if (hardWayTenBetAmt >= redChipAmt) {
			$('#hardWayTen').html('');
			$('#hardWayTen').html('<img src="/images/red_chip_small.png"/>');
		}
		$('#hardWayTen').css('background-color', 'transparent');
		$('#hardWayTen').css('opacity', '.95');
	}
}

function redChipClick() {
	redChipActive = true;
	$('#redChip').css('border', '1px solid white');
	blueChipActive = false;
	$('#blueChip').css('border', 'none');
	greenChipActive = false;
	$('#greenChip').css('border', 'none');
	blackChipActive = false;
	$('#blackChip').css('border', 'none');
}

function blueChipClick() {
	blueChipActive = true;
	$('#blueChip').css('border', '1px solid white');
	redChipActive = false;
	$('#redChip').css('border', 'none');
	greenChipActive = false;
	$('#greenChip').css('border', 'none');
	blackChipActive = false;
	$('#blackChip').css('border', 'none');
}

function greenChipClick() {
	greenChipActive = true;
	$('#greenChip').css('border', '1px solid white');
	blueChipActive = false;
	$('#blueChip').css('border', 'none');
	redChipActive = false;
	$('#redChip').css('border', 'none');
	blackChipActive = false;
	$('#blackChip').css('border', 'none');
}

function blackChipClick() {
	blackChipActive = true;
	$('#blackChip').css('border', '1px solid white');
	blueChipActive = false;
	$('#blueChip').css('border', 'none');
	redChipActive = false;
	$('#redChip').css('border', 'none');
	greenChipActive = false;
	$('#greenChip').css('border', 'none');
}