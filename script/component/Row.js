var Row = (function() {
	var Row = function(index) {
		var view = document.createElement('div');
		view.setAttribute('index', index);
		view.className = 'row';

		this.getView = function() {
			return view;
		};
	};

	Row.prototype.setWidth = function(width) {
		this.getView().style.width = width + 'px';
	};

	Row.prototype.addCell = function(cell) {
		this.getView().appendChild(cell.getView());
	};

	return Row;
}());