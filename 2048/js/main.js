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

var board = new Array();
var score = 0;
var hasCrash = new Array(); //移动碰撞
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function() {
	prepareForMobile();
	newGame()
})

function prepareForMobile(){
	if(documentWidth > 500){
		gridContainer = 500;
		cellSideWidth = 100;
		cellSpace = 20;

	}
	$("#grid-container").css({
		width : gridContainer - 2 * cellSpace,
		height : gridContainer - 2 * cellSpace,
		padding : cellSpace,
		borderRadius : 0.02 * cellSideWidth
	});
	$(".grid-cell").css({
		width : cellSideWidth,
		height : cellSideWidth,
		borderRadius : 0.02 * cellSideWidth
	});
}

function newGame() {
	//初始化棋盘格
	init();
	//在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}

function init() {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			var gridCell = $("#grid-cell-" + i + "-" + j);
			gridCell.css({
				top: getPosTop(i, j),
				left: getPosLeft(i, j)
			})
		}
	}
	for(var i = 0; i < 4; i++) {
		board[i] = new Array();
		hasCrash[i] = new Array();
		for(var j = 0; j < 4; j++) {
			board[i][j] = 0;
			hasCrash[i][j] = false;
		}
	}
	updataBoardView();
	score = 0;
}

function updataBoardView() {
	$(".number-cell").remove();
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			$("#grid-container").append('<div class="number-cell" id="number-cell-' + i + "-" + j + '"></div>');
			var theNumberCell = $("#number-cell-" + i + "-" + j);
			if(board[i][j] == 0) {
				theNumberCell.css({
					width: 0,
					height: 0,
					left: getPosLeft(i, j) + cellSideWidth / 2,
					top: getPosTop(i, j) + cellSideWidth / 2,
				})
			} else {
				theNumberCell.css({
					width: cellSideWidth,
					height: cellSideWidth,
					left: getPosLeft(i, j),
					top: getPosTop(i, j),
					backgroundColor: getNumberBackgroundColor(board[i][j]),
					color: getNumberColor(board[i][j])
				});
				theNumberCell.text(board[i][j]);
				
			}
			hasCrash[i][j] = false;
		}		
	}
	$(".number-cell").css({
		lineHeight : cellSideWidth + "px",
		fontSize : 0.6 * cellSideWidth + "px"
	})
}

function generateOneNumber() {
	if(nospace(board)) {
		return false;
	} else {
		//随机生成一个位置
		var randx = parseInt(Math.floor(Math.random() * 4));
		var randy = parseInt(Math.floor(Math.random() * 4));
		var times = 0;
		while(times < 50) {
			if(board[randx][randy] == 0) {
				break;
			}
			var randx = parseInt(Math.floor(Math.random() * 4));
			var randy = parseInt(Math.floor(Math.random() * 4));
			
			times++;
		}
		if(times == 50){
			for(var i = 0; i < 4; i++){
				for(var j = 0; j < 4; j++){
					if(board[i][j] == 0){
						randx = i;
						randy = j;
					}
				}
			}
		}

		//随机生成一个数字
		var randNumber = Math.random() < 0.5 ? 2 : 4;

		//在随机位置显示随机数字
		board[randx][randy] = randNumber;
		showNumberWithAnimation(randx, randy, randNumber)
		return true;
	}
}

$(document).keydown(function(e) {
	switch(e.keyCode) {
		case 37: //左
			if(moveLeft()) {
				e.preventDefault();
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		case 38: //上
			if(moveUp()) {
				e.preventDefault();
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		case 39: //右
			if(moveRight()) {
				e.preventDefault();
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		case 40: //下
			if(moveDown()) {
				e.preventDefault();
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		default:
			break;
	}
})

document.addEventListener("touchstart",function(e){
	startx = e.touches[0].pageX;
	starty = e.touches[0].pageY;
})

document.addEventListener("touchend",function(e){
	endx = e.changedTouches[0].pageX;
	endy = e.changedTouches[0].pageY;
	var disx = endx - startx;
	var disy = endy - starty;
	if(Math.abs(disx) < 0.2 * documentWidth && Math.abs(disy) < 0.2 * documentWidth){
		return;
	}
	if(Math.abs(disx) >= Math.abs(disy)){ //x方向
		if(disx > 0){
			//moveRight
			if(moveRight()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
		}else{
			//moveLeft
			if(moveLeft()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
		}
	}else{ //y方向
		if(disy > 0){
			//moveDown
			if(moveDown()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
		}else{
			//moveUp
			if(moveUp()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
		}
	}
})


function isgameover() {
	if(nospace(board) && nomove(board)){
		gameover();
	}
}

function gameover(){
	alert("游戏结束！");
}

function moveLeft() {
	if(canMoveLeft(board)) {
		//moveLeft	
		for(var i = 0; i < 4; i++) {
			for(var j = 1; j < 4; j++) {
				if(board[i][j] != 0) {
					for(var k = 0; k < j; k++) {
						if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
							//move	
							showMoveAnimation(i, j, i, k);
							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						} else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasCrash[i][k]) {
							//move
							showMoveAnimation(i, j, i, k);
							//add
							board[i][k] *= 2;
							board[i][j] = 0;
							
							//add score
							score += board[i][k];
							updataScore(score);
							hasCrash[i][k] = true;
							continue;
						}
					}
				}
			}
		}
		setTimeout("updataBoardView()", 200);
		return true;
	} else {
		return false;
	}

}

function moveRight() {
	if(!canMoveRight(board)) {
		return false
	}
	for(var i = 0; i < 4; i++) {
		for(var j = 2; j >= 0; j--) {
			if(board[i][j] != 0) {
				for(var k = 3; k > j; k--) {
					if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
						//move	
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasCrash[i][k]) {
						//move
						showMoveAnimation(i, j, i, k);
						//add
						board[i][k] *= 2;
						board[i][j] = 0;
						//add score
						score += board[i][k];
						updataScore(score);
						hasCrash[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updataBoardView()", 200);
	return true;

}

function moveUp() {
	if(!canMoveUp(board)) {
		return false;
	}
	for(var j = 0; j < 4; j++) {
		for(var i = 1; i < 4; i++) {
			if(board[i][j] != 0) {
				for(var k = 0; k < i; k++) {
					if(board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
						//move
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasCrash[k][j]) {
						//move
						showMoveAnimation(i, j, k, j);
						//add

						board[k][j] *= 2;
						board[i][j] = 0;
						//add score
						score += board[k][j];
						updataScore(score);
						hasCrash[k][j] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updataBoardView()", 200);
	return true;
}

function moveDown() {
	if(!canMoveDown(board)) {
		return false;
	}
	for(var j = 0; j < 4; j++){
		for(var i = 2; i >= 0; i--){
			if(board[i][j] != 0){
				for(var k = 3; k > i; k--){
					if(board[k][j] == 0 && noBlockVertical(j, i, k, board)){
						//move
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasCrash[k][j]){
						//move
						showMoveAnimation(i, j, k, j);
						//add
						board[k][j] *= 2;
						board[i][j] = 0;
						//add score
						score += board[k][j];
						updataScore(score);
						hasCrash[k][j] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updataBoardView()", 200);
	return true;
}
documentWidth = window.screen.availWidth;
gridContainer = 0.92 * documentWidth;
cellSideWidth = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i,j){
	return cellSpace + i * (cellSideWidth + cellSpace);
}

function getPosLeft(i,j){
	return cellSpace + j * (cellSideWidth + cellSpace);
}

function getNumberBackgroundColor(number){
	switch(number){
		case 2:
			return "#eee4da";
			break;
		case 4:
			return "#ede0c8";
			break;
		case 8:
			return "#f2b179";
			break;
		case 16:
			return "#f59563";
			break;
		case 32:
			return "#f67c5f";
			break;
		case 64:
			return "#f65e3b";
			break;
		case 128:
			return "#edcf72";
			break;
		case 256:
			return "#edcc61";
			break;
		case 512:
			return "#9c0";
			break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#0099cc";
            break;
        case 4096:
            return "#aa66cc";
            break;
        case 8192:
            return "#9933cc";
            break;
   }
	return "black";
}

function getNumberColor(number){
	if(number <= 4){
		return "#776e65"
	}
	return "white";
}

function nospace(board){
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(board[i][j]==0){
				return false;
			}			
		}
	}
	return true;
}

function canMoveLeft(board){
	for(var i = 0; i < 4; i++){
		for(var j = 1; j < 4; j++){
			if(board[i][j] != 0){
				if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
					return true;
				}	
			}
		}
	}
	return false
}

function canMoveRight(board){
	for(var i = 0; i < 4; i++){
		for(var j = 2; j >= 0; j--){
			if(board[i][j] != 0){
				if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
					return true;
				}	
			}
		}
	}
	return false
}

function canMoveUp(board){ 	
	for(var j = 0; j < 4; j++){
		for(var i = 1; i < 4; i++){
			if(board[i][j] != 0){
				if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown(board){ 	
	for(var j = 0; j < 4; j++){
		for(var i = 2; i >= 0; i--){
			if(board[i][j] != 0){
				if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function noBlockHorizontal(row, col1, col2, board){
	for(var i = col1 + 1; i < col2; i++){
		if(board[row][i] != 0){
			return false;
		}		
	}
	return true;
}

function noBlockVertical(col, row1, row2, board){
	for(var i = row1 + 1; i < row2; i++){
		if(board[i][col] != 0){
			return false;
		}		
	}
	return true;
}

function nomove(board){
	if(canMoveLeft(board) || canMoveRight(board) || canMoveDown(board) || canMoveUp(board)){
		return false;
	}
	return true;
}

function updataScore(score){
	$("#score").text(score);
}
