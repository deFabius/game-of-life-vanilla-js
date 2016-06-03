var Board = (function() {
	var Board = function() {
		var boardSize = 10,
			generation = 0,
			view = document.getElementById('board'),
			board;

		this.getView = function() {
			return view;
		};

		this.resetGeneration = function() {
			generation = 0;
		};

		this.nextGeneration = function() {
			return ++generation;
		};

		this.whichGeneration = function() {
			return generation;
		};

		this.getSize = function() {
			return boardSize;
		};

		this.setSize = function(size) {
			var parsed = parseInt(size, 10);
			boardSize = isNaN(parsed) || parsed > 100 ? 100 : parsed;
		}
	};

	Board.prototype.create = function(randomize, size) {
		var boardView = this.getView(),
			CELL_SIZE = 40,
			board = [],
			boardSize;

		this.setSize(size);
		boardSize = this.getSize();

		boardView.innerHTML = '';

		for (var r = 0; r < boardSize; r++) {
			var row = new Row(r);
			row.setWidth(boardSize * CELL_SIZE);
			boardView.appendChild(row.getView());
			board.push([]);
			for (var c = 0; c < boardSize; c++) {
				var cell = new Cell(r, c, randomize);
				cell.render();
				row.addCell(cell);
				board[r].push(cell);

				if (randomize) {
					var pr = r - 1,
						pc = c - 1;

					if (pc >= 0) {
						if (board[r][pc].isAlive()) cell.addNeighbour(true);
						if (cell.isAlive()) board[r][pc].addNeighbour(true);
					}

					if (pr >= 0) {
						for (pc = c - 1; pc < c + 2; pc++) {
							if (pc >= 0 && pc < boardSize) {
								if (board[pr][pc].isAlive()) {
									cell.addNeighbour(true);
								}
								if (cell.isAlive()) {
									board[pr][pc].addNeighbour(true);
								}
							}
						}
					}
				}
			}
		}
		return board;
	};

	return Board;
}());