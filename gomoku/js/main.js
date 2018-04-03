$(function(){
	var index;
	var word;
	wordShow();
})

var mogokuBoard = []; //每个格子的值
var black; //黑棋，表示玩家
var gameOver;
//赢法数组
var wins = [];

//赢法的统计数组
var myWin = [];
var computerWin = [];

for(var i = 0; i < 15; i++) {
	wins[i] = [];
	for(var j = 0; j < 15; j++) {
		wins[i][j] = [];
	}
}

//所有赢法
var count = 0;
//横线
for(var i = 0; i < 15; i++) {
	for(var j = 0; j < 11; j++) {
		for(var k = 0; k < 5; k++) {
			wins[i][j + k][count] = true;
		}
		count++;
	}
}
//纵线
for(var i = 0; i < 15; i++) {
	for(var j = 0; j < 11; j++) {
		for(var k = 0; k < 5; k++) {
			wins[j + k][i][count] = true;
		}
		count++;
	}
}
//正斜线
for(var i = 0; i < 11; i++) {
	for(var j = 0; j < 11; j++) {
		for(var k = 0; k < 5; k++) {
			wins[i + k][j + k][count] = true;
		}
		count++;
	}
}
//反斜线
for(var i = 0; i < 11; i++) {
	for(var j = 14; j > 3; j--) {
		for(var k = 0; k < 5; k++) {
			wins[i + k][j - k][count] = true;
		}
		count++;
	}
}

//console.log(count)
function init() { //初始化
	clear();
	gameOver = false;
	black = true;
	for(var i = 0; i < count; i++) {
		myWin[i] = 0;
		computerWin[i] = 0;
	}
	for(var i = 0; i < 15; i++) {
		mogokuBoard[i] = [];
		for(var j = 0; j < 15; j++) {
			mogokuBoard[i][j] = 0;
		}
	}
	var logo = new Image();
	logo.onload = function() {
		ctx.drawImage(logo, 0, 0, 450, 450);
		try{
			setTransparent()
		} catch( e ){
			console.error(e);
			// throw new Error("need add a server environment")
		};
		drawMogokuBoard();
	}
	logo.src = "img/logo_bg.jpg";
}

$(".begin").click(function() {
	startGame();
})

$(".quit").click(function() {
	quitGame();
})

function startGame() {
	$(".gameStart").hide();
	init();
}

function quitGame() {
	if(window.confirm("点击“确定”留在此页，“取消”刷新页面重新答题！")) {

	} else {
		window.location = window.location.href;
	}
}

var gomoku = document.getElementById("gomoku");
var ctx = gomoku.getContext("2d");

ctx.strokeStyle = "#BFBFBF";

function setTransparent() {
	// 运行在非服务器端会报跨域问题
	var imageDatas = ctx.getImageData(0, 0, 450, 450);
	var dataArray = imageDatas.data;
	for(var i = 0; i < dataArray.length; i += 4) {
		var r = dataArray[i];
		var g = dataArray[i + 1];
		var b = dataArray[i + 2];
		var a = dataArray[i + 3]; //此处代表图片的透明度
		dataArray[i] = r;
		dataArray[i + 1] = g;
		dataArray[i + 2] = b;
		dataArray[i + 3] = a * 0.2; //透明度也是从 0-255,可以选择每个像素的透明度都是随机的一个数,这样会做出磨砂的效果
	}
	ctx.putImageData(imageDatas, 0, 0);
}

//画棋盘格
function drawMogokuBoard() {
	ctx.beginPath();
	for(var i = 0; i < 15; i++) {		
		ctx.moveTo(15 + i * 30, 15);
		ctx.lineTo(15 + i * 30, 435);
		ctx.stroke();
		ctx.moveTo(15, 15 + i * 30);
		ctx.lineTo(435, 15 + i * 30);
		ctx.stroke();
	}
	ctx.closePath();
}

//棋子
var oneStep = function(i, j, black) {
	ctx.beginPath();
	ctx.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
	ctx.closePath();
	var gradient = ctx.createRadialGradient(15 + i * 30, 15 + j * 30, 13, 15 + i * 30, 15 + j * 30, 0);
	if(black) {
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1, "#636766");
	} else {
		gradient.addColorStop(0, "#D1D1D1");
		gradient.addColorStop(1, "#F9F9F9");
	}
	ctx.fillStyle = gradient;
	ctx.fill();
}

gomoku.onclick = function(e) {
	player(e);
}

function player(e) {
	if(gameOver) return;
	if(!black) return;
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if(mogokuBoard[i][j] == 0) {
		oneStep(i, j, black);
		mogokuBoard[i][j] = 1;
		for(var k = 0; k < count; k++) {
			if(wins[i][j][k]) {
				myWin[k]++;
				computerWin[k] = 6; //在k时，白子不可能赢，设置一个异常值
				if(myWin[k] == 5) {
					gameEnd("player");
				}
			}
		}
		if(!gameOver) {
			black = !black;
			computerAI();
		}
	}
}

var computerAI = function() {
	var myScore = [];
	var computerScore = [];
	var max = 0;
	var u = 0,
		v = 0;
	for(var i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for(var j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for(var i = 0; i < 15; i++) {
		for(var j = 0; j < 15; j++) {
			if(mogokuBoard[i][j] == 0) {
				for(var k = 0; k < count; k++) {
					if(wins[i][j][k]) {
						if(myWin[k] == 1) {
							myScore[i][j] += 200;
						} else if(myWin[k] == 2) {
							myScore[i][j] += 400;
						} else if(myWin[k] == 3) {
							myScore[i][j] += 2000;
						} else if(myWin[k] == 4) {
							myScore[i][j] += 10000;
						}
						if(computerWin[k] == 1) {
							computerScore[i][j] += 220;
						} else if(computerWin[k] == 2) {
							computerScore[i][j] += 420;
						} else if(computerWin[k] == 3) {
							computerScore[i][j] += 2100;
						} else if(computerWin[k] == 4) {
							computerScore[i][j] += 20000;
						}
					}
				}
				if(myScore[i][j] > max) {
					max = myScore[i][j];
					u = i;
					v = j;
				} else if(myScore[i][j] == max) {
					if(computerScore[i][j] > computerScore[u][v]) {
						u = i;
						v = j;
					}
				}

				if(computerScore[i][j] > max) {
					max = computerScore[i][j];
					u = i;
					v = j;
				} else if(computerScore[i][j] == max) {
					if(myScore[i][j] > myScore[u][v]) {
						u = i;
						v = j;
					}
				}
			}
		}
	}
	oneStep(u, v, false);
	mogokuBoard[u][v] = 2;
	for(var k = 0; k < count; k++) {
		if(wins[u][v][k]) {
			computerWin[k]++;
			myWin[k] = 6; //在k时，白子不可能赢，设置一个异常值
			if(computerWin[k] == 5) {
				gameEnd("computer");
			}
		}
	}
	if(!gameOver) {
		black = !black;
	}
}

//游戏结束
function gameEnd(obj) {
	gameOver = true;
	$(".gameStart").show();
	$("#word").html(obj + "<br/>win");
	wordShow();
	$(".gameStart").css({
		"background": "url(img/end_bg.jpg) no-repeat",
		"background-position": "right",
		"background-size": "100% 100%",
	})
	$("#result").css({
		"line-height": "1.3em"
	})
	$(".begin").text("再来一局！");
}

//文字一个个显示
function wordShow() {
	word = $("#word").html();
	index = 0;
	function type() {
		$("#result").html(word.substring(0, index++));
	}
	setInterval(type, 500);
}

function clear(){
	ctx.clearRect(0, 0, gomoku.width, gomoku.height);
}
