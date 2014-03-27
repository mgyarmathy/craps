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