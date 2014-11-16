// Points that bounce off the edges of the screen.
// Lines are drawn between them when they get close.
// Note: too many points makes this slow. 40 points requires 800+ distance calculations per frame.

(function($){ 
	
	canvasbg.options = {
		points: 40,
		maxDistance: 100
	};

	var points = [],
	lines = [],

	Point = function(){
		this.x = random(0, canvasbg.width);
		this.y = random(0, canvasbg.height);
		this.velX = random(-2,2);
		this.velY = random(-2,2);      
	};

	Point.prototype.update = function() {
		this.x += this.velX;
		this.y += this.velY;
	  // Handle bounces.
	  if (this.x < 0 || this.x > canvasbg.width) {
	  	this.x = this.x < 0 ? -this.x : canvasbg.width - (this.x - canvasbg.width);
	  	this.velX *= -1;
	  }
	  if (this.y < 0 || this.y > canvasbg.height) {
	  	this.y = this.y < 0 ? -this.y : canvasbg.height - (this.y - canvasbg.height);
	  	this.velY *= -1;
	  }
	}

	function getDist(a, b) {
		var c = a.x - b.x,
		d = a.y - b.y;
		return sqrt(c * c + d * d);
	}

	canvasbg.setup = function () {
		canvasbg.fillStyle="rgb(0,0,0)";
		for (var i = 0; i < canvasbg.options.points; i++) {
			points.push(new Point());    
		}
	}

	canvasbg.update = function () {
		lines = [];
		var pointCount = points.length;
		for (var i = 0; i < pointCount; i++) {
			points[i].update();
		}
		for (var i = 0; i < pointCount; i++) {
			for (var a = i + 1; a < pointCount; a++) {
				var dist = getDist(points[i], points[a]);
				if (dist > 0 && dist < canvasbg.options.maxDistance) {
					lines.push([points[i].x, points[i].y, points[a].x, points[a].y, dist]);
				}
			}
		}
	}

	canvasbg.draw = function() {
		var pointCount = points.length,
			lineCount = lines.length;

		for (var i = 0; i < lineCount; i++) {
			canvasbg.strokeStyle = "rgba(0,0,0," + (1 - (lines[i][4] / canvasbg.options.maxDistance)) +")";;
			canvasbg.beginPath();
			canvasbg.moveTo(lines[i][0], lines[i][1]);
			canvasbg.lineTo(lines[i][2], lines[i][3]);
			canvasbg.closePath();
			canvasbg.stroke();
		}
		for (var i = 0; i < pointCount; i++) {
			canvasbg.beginPath();
			canvasbg.arc(points[i].x, points[i].y, 2, 0, TWO_PI);
			canvasbg.fill();
			canvasbg.closePath();
		}
	}

})(jQuery);
