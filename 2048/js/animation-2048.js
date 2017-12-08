function showNumberWithAnimation(i,j,randNumber){
	var numberCell = $("#number-cell-"+ i +"-"+ j);
	numberCell.css({
					backgroundColor: getNumberBackgroundColor(randNumber),
					color: getNumberColor(randNumber)
				});
	numberCell.text(randNumber);
	numberCell.animate({
		width: cellSideWidth,
		height: cellSideWidth,
		left : getPosLeft(i,j),
		top: getPosTop(i,j)
	},50)
}

function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell = $("#number-cell-"+ fromx +"-"+fromy);
	numberCell.animate({
		left: getPosLeft(tox,toy),
		top: getPosTop(tox,toy)
	},200)
}
