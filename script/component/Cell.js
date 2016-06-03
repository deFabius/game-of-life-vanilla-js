var Cell = (function() {
	var Cell = function(row, col, random) {
		var isAlive = (random ? (Math.round(Math.random()) === 1) : false),
			row = row,
			col = col,
			nextGen = {
				isAlive: isAlive,
				neighbours: 0
			},
			view = document.createElement('div'),
			neighbours = 0;

		view.setAttribute('col', col);
		view.setAttribute('row', row);

		this.isAlive = function() {
			return isAlive;
		};

		this.getRow = function() {
			return row;
		};

		this.getCol = function() {
			return col;
		};

		this.setState = function(newState, newNeighbours, init) {
			isAlive = newState;
			if (newNeighbours) {
				neighbours = newNeighbours;
			}
			if (init) {
				nextGen.isAlive = isAlive;
				nextGen.neighbours = neighbours;
			}
		};

		this.getView = function() {
			return view;
		};

		this.getNextGen = function() {
			return nextGen;
		};

		this.shouldBorn = function() {
			return neighbours === 3;
		};

		this.born = function() {
			nextGen.isAlive = true;
		};

		this.shouldDie = function() {
			return (neighbours < 2 || neighbours > 3);
		};

		this.die = function() {
			nextGen.isAlive = false;
		};

		this.addNeighbour = function(isInit) {
			nextGen.neighbours += 1;
			if (isInit) {
				neighbours++;
				this.render();
			}
		};

		this.decreaseNeighbours = function(isInit) {
			nextGen.neighbours -= 1;
			if (isInit) {
				neighbours--;
				this.render();
			}
		}

		this.log = function() {
			console.log('current', {
				isAlive: isAlive,
				neighbours: neighbours,
				row: row,
				col: col
			});

			console.log('next', {
				isAlive: nextGen.isAlive,
				neighbours: nextGen.neighbours
			});
		};

		this.render = function() {
			view.innerHTML = neighbours;
			view.className = 'cell ' + (isAlive ? 'alive' : 'dead');
		};
	};

	Cell.prototype.step = function() {
		var nextGen = this.getNextGen(),
			view = this.getView();
		this.setState(nextGen.isAlive, nextGen.neighbours);
		this.render();
	};

	return Cell;
}());