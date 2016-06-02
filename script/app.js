(function() {
	var boardSize = 5,
		animationSpeed = 500,
		board = new Board(),
		boardData, timerId, steps;

	document.forms[0].onsubmit = function() {
		document.getElementById('interface-container').style.display = 'none';
		boardData = board.create(this.isRandom.checked, this.boardSize.value);
		boardSize = board.getSize();
		return false;
	};

	document.getElementById('board').onclick = function(e) {
		var cell = boardData[e.target.getAttribute('row') * 1][e.target.getAttribute('col') * 1];
		cell.getView().classList.toggle('alive');
		cell.getView().classList.toggle('dead');
		cell.setState(!cell.isAlive(), null, true);
		updateSurroundingCells(cell, true);
	};

	document.getElementById('play-stop').onclick = function(e) {
		if (timerId) {
			stop();
			e.target.value = 'Start';
		} else {
			start(Math.abs(document.getElementById('speed').value));
			e.target.value = 'Stop';
		}
	}.bind(this);

	document.getElementById('speed').onmouseup = function(e) {
		if (timerId) {
			stop();
			start(Math.abs(document.getElementById('speed').value));
		}
	};

	document.getElementById('speed').oninput = function(e) {
		document.getElementById('speed-label').innerHTML = e.target.value * -1;
	};

	document.getElementById('speed').value = animationSpeed * -1;
	document.getElementById('speed-label').innerHTML = animationSpeed;

	document.getElementById('step').onclick = function(e) {
		tick();
	};

	document.getElementById('back').onclick = function(e) {
		stop();
		showInterface('<h3>', 'Welcome to the Game of Life', '</h3>');
	};

	function updateSurroundingCells(cell, render) {
		var cellWillBorn = render ? cell.isAlive() : cell.getNextGen().isAlive;
		for (var r = -1; r < 2; r++) {
			var row = cell.getRow() + r;
			if (row < 0 || row == boardSize) continue;
			for (var c = -1; c < 2; c++) {
				var col = cell.getCol() + c;
				if (col < 0 || col == boardSize || boardData[row][col] === cell) continue;
				if (cellWillBorn) {
					boardData[row][col].addNeighbour(render || false);
				} else {
					boardData[row][col].decreaseNeighbours(render || false);
				}
			}
		}
	};

	function tick(x, y) {
		var variations = 0;

		document.getElementById('generation-counter').value = board.nextGeneration();
		for (var r = 0; r < boardSize; r++) {
			for (var c = 0; c < boardSize; c++) {
				var cell = boardData[r][c];
				if (cell.isAlive()) {
					if (cell.shouldDie()) {
						cell.die();
						variations++;
						updateSurroundingCells(cell);
					}
				} else {
					if (cell.shouldBorn()) {
						cell.born();
						variations++;
						updateSurroundingCells(cell);
					}
				}
			}
		}
		for (var r = 0; r < boardSize; r++) {
			for (var c = 0; c < boardSize; c++) {
				boardData[r][c].step();
			}
		}
		return variations;
	};

	function showInterface() {
		var msg =
			Array.prototype.join.call(arguments, ' ');
		document.getElementById('console').innerHTML = msg;
		document.getElementById('interface-container').style.display = 'block';
	};

	function start(timer) {
		stop();
		steps = 0;
		timerId = setInterval(function() {
			if (!tick()) {
				stop();
				showInterface('Game ended after', board.whichGeneration(), 'steps');
			}
		}, timer);
	};

	function stop() {
		clearInterval(timerId);
		timerId = null;
	};
}());