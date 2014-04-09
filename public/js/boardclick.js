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