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