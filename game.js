window.onload = function(){

	var x = 500;
	var y = 400;
	var dx = 2;
	var dy = 4;
	var _width;
	var _height;
	var ctx;
	var paddlex;
	var paddleh;
	var paddlew;
	var intervalId = 0;
	var rightDown = false;
	var leftDown = false;
	var canvasMinX;
	var canvasMaxX;

	//bricks
	var bricks;
	var NROWS;
	var NCOLS;
	var BRICKWIDTH;
	var BRICKHEIGHT;
	var PADDING;
	var ballr = 10;
	var rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
	var paddlecolor = "#000000";
	var ballcolor = "#000000";
	var backcolor = "#ffffff";
	

	function init(){
		//get a reference to the canvas
		var canvas = document.getElementById('canvas');
		_width = canvas.width = 1000;
		_height = canvas.height = 500;
		ctx = canvas.getContext("2d");
		intervalId = setInterval(draw, 10);
		init_mouse();
		init_paddle();
		init_bricks();
	}

	function init_paddle(){
		paddlex = _width /2;
		paddleh = 10;
		paddlew = 75;
	}

	function init_mouse(){
		canvasMinX = $('#canvas').offset().left;
		canvasMaxX = canvasMinX + _width;
	}

	function init_bricks() {
		NROWS = 15;
		NCOLS = 15;
		BRICKWIDTH = (_width/NCOLS) - 1;
		BRICKHEIGHT = 15;
		PADDING=1;

		bricks = new Array(NROWS);
		for(i=0; i < NROWS; i++) {
			bricks[i] = new Array(NCOLS);
			for (j=0; j < NCOLS; j++){
				bricks[i][j] = 1;
			}
		}
	}

	function drawbricks() {
		for(i=0; i < NROWS; i++) {
			ctx.fillStyle = rowcolors[i];
			for (j=0; j < NCOLS; j++){
				if(bricks[i][j] == 1) {
					rect((j * (BRICKWIDTH + PADDING)) + PADDING,
						(i * (BRICKHEIGHT + PADDING)) + PADDING,
						BRICKWIDTH, BRICKHEIGHT);
				}
			}
		}
	}
	
	function circle(x, y, r){
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
		
	}

	function rect(x, y, w, h) {
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.closePath();
		ctx.fill();
	}

	function onKeyDown(evt) {
		if (evt.keyCode == 39) rightDown = true;
		else if (evt.keyCode == 37) leftDown = true;
		
	}

	function onKeyUp(evt) {
  		if (evt.keyCode == 39) rightDown = false;
  		else if (evt.keyCode == 37) leftDown = false;
  		
	}

	

	function onMouseMove(evt){
		if(evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
			paddlex = evt.pageX - canvasMinX;
		}
	}

	function clear(){
		ctx.clearRect(0, 0, _width, _height);
		
	}


	$(document).mousemove(onMouseMove);
	$(document).keydown(onKeyDown);
	$(document).keyup(onKeyUp);

	function draw() {			
		ctx.fillStyle = backcolor;
		clear();
		ctx.fillStyle = ballcolor;
		circle(x, y, ballr);

		if (rightDown) paddlex +=5;
		else if (leftDown) paddlex -=5;
		ctx.fillStyle = paddlecolor;
		rect(paddlex, _height-paddleh, paddlew, paddleh);

		drawbricks();

		// have we hit a brick?

		rowheight = BRICKHEIGHT + PADDING;
		colwidth = BRICKWIDTH + PADDING;
		row = Math.floor(y/rowheight);
		col = Math.floor(x/colwidth);
		//if so reverse the ball and mark the brick  as broken.

		if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
			dy = -dy;
			bricks[row][col] = 0;
		}
		if (x + dx > _width || x + dx < 0){
			dx = -dx;
		}
		if (y + dy < 0){
			dy = -dy;
		}
		else if (y + dy > _height){
			if (x > paddlex && x < paddlex + paddlew){
				dy= -dy;
			}
			else {
				//game over so stop
				clearInterval(intervalId);
			}
		}
		
		x += dx;
		y += dy;
	}

	init();
	
};