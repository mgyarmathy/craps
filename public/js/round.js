var pointValue = 0;
var isComeOutRoll=new Boolean();
isComeOutRoll = true;

function doRound(diceValue)
{
	if (isComeOutRoll) {
		switch(diceValue) {
		case 2:
		case 3:
		case 12:
			document.getElementById('roundStatus').textContent = 'Crapped Out!';
			isComeOutRoll = true;
			break;
		case 7:
		case 11:
			document.getElementById('roundStatus').textContent = 'You Won!';
			isComeOutRoll = true;
			break;
		default:
			pointValue = diceValue;
			document.getElementById('roundStatus').textContent = 'The Point is ' + pointValue;
			isComeOutRoll = false;
			break;
		}
	} else {
		switch(diceValue) {
		case 7:
			document.getElementById('roundStatus').textContent = 'Sevened Out!';
			isComeOutRoll = true;
			pointValue = 0;
			break;
		case pointValue:
			document.getElementById('roundStatus').textContent = 'You Won!';
			isComeOutRoll = true;
			pointValue = 0;
			break;
		default:
			document.getElementById('roundStatus').textContent = 'The Point is still ' + pointValue;
			break;
		}
	}
	document.getElementById('roundStatus').style.display = 'block';
}