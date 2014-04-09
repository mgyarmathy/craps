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

$('#come').hover(function() {
	$('#message').html('Come Bet');
	if (!newComeBet) {
		if (isComeOutRoll) {
			$(this).css('background-color', 'red');
			$(this).css('opacity', '0.5');
		}
		else {
			$(this).css('background-color', 'lawngreen');
			$(this).css('opacity', '0.5');
		}
	}
}, function() {
	$('#message').html('');
	if (!newComeBet) {
		$(this).css('opacity', '0.0');
	}
});

$('#dontComeBar').hover(function() {
	$('#message').html('Don\'t Come Bet');
	if (!newDontComeBet) {
		if (isComeOutRoll) {
			$(this).css('background-color', 'red');
			$(this).css('opacity', '0.5');
		}
		else {
			$(this).css('background-color', 'lawngreen');
			$(this).css('opacity', '0.5');
		}
	}
}, function() {
	$('#message').html('');
	if (!newDontComeBet) {
		$(this).css('opacity', '0.0');
	}
});

$('#field').hover(function() {
	$('#message').html('Field Bet [2, 3, 4, 9, 10, 11, or 12]');
	if (!fieldActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	$('#message').html('');
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
	$('#message').html('Seven');
	if (!anySevenActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	$('#message').html('');
	if (!anySevenActive) {
		$(this).css('opacity', '0.0');
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
	$('#message').html('');
	if (!hardWaySixActive) {
		$(this).css('opacity', '0.0');
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
	$('#message').html('');
	if (!hardWayTenActive) {
		$(this).css('opacity', '0.0');
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
	$('#message').html('');
	if (!hardWayEightActive) {
		$(this).css('opacity', '0.0');
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
	$('#message').html('');
	if (!hardWayFourActive) {
		$(this).css('opacity', '0.0');
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
	$('#message').html('Three');
	if (!aceDeuceActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	$('#message').html('');
	if (!aceDeuceActive) {
		$(this).css('opacity', '0.0');
	}
});

$('#snakeEyes').hover(function() {
	$('#message').html('Two');
	if (!snakeEyesActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	$('#message').html('');
	if (!snakeEyesActive) {
		$(this).css('opacity', '0.0');
	}
});

$('#boxcars').hover(function() {
	$('#message').html('Twelve');
	if (!boxcarsActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	$('#message').html('');
	if (!boxcarsActive) {
		$(this).css('opacity', '0.0');
	}
});


$('#yoLeft').hover(function() {
	$('#message').html('Eleven');
	if (!yoLeftActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	$('#message').html('');
	if (!yoLeftActive) {
		$(this).css('opacity', '0.0');
	}
});

$('#yoRight').hover(function() {
	$('#message').html('Eleven');
	if (!yoRightActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	$('#message').html('');
	if (!yoRightActive) {
		$(this).css('opacity', '0.0');
	}
});

$('#anyCraps').hover(function() {
	$('#message').html('Any Craps [2, 3, or 12]');
	if (!anyCrapsActive) {
		$(this).css('background-color', 'lawngreen');
		$(this).css('opacity', '0.5');
	}
}, function() {
	$('#message').html('');
	if (!anyCrapsActive) {
		$(this).css('opacity', '0.0');
	}
});

$('#redChip').hover(function() {
	$('#message').html('$100');
}, function () {
	$('#message').html('');
});

$('#blueChip').hover(function() {
	$('#message').html('$200');
}, function () {
	$('#message').html('');
});

$('#greenChip').hover(function() {
	$('#message').html('$500');
}, function () {
	$('#message').html('');
});

$('#blackChip').hover(function() {
	$('#message').html('$1,000');
}, function () {
	$('#message').html('');
});


});