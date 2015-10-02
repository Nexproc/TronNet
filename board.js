;(function () {

  var Board = Tron.Board = function () {
    this.bike = new Tron.Bike();
    this.grid = this.newGrid();
    this.lost = false;
    this.addApple();
  };

  Board.prototype.newGrid = function () {
    var grid = [];
    for (var i = 0; i < 20; i++) {
      grid.push((function () {
        var newRow = [];
        for (var j = 0; j < 20; j++) { newRow.push("e"); }
        return newRow;
      })());
    }
    return grid;
  };

  Board.prototype.render = function () {
    var headPos = this.bike.segments[0].pos;
    this.renderBikeBody();
    this.checkLosingConditions(headPos);
    if (!this.lost) {
      this.grid[headPos[0]][headPos[1]] = "H";
    }
    var art = this.drawGrid();
    !this.lost && this.renderEmptySpaces();
    return art;
  };

  Board.prototype.drawGrid = function () {
    var art = "";
    this.grid.forEach(function (row) {
      row.forEach(function (cell) {
        art += cell;
      });
      art += "\n";
    });
    return art;
  };

  Board.prototype.renderBikeBody = function () {
    var that = this;
    this.bike.segments.slice(1).forEach(function (segment) {
      that.grid[segment.pos[0]][segment.pos[1]] = "S";
    });
  };

  Board.prototype.renderEmptySpaces = function () {
    var that = this;
    this.bike.segments.forEach(function (segment) {
      if(that.outOfBounds(segment.pos)) return;
      that.grid[segment.pos[0]][segment.pos[1]] = "e";
    });
  };

  Board.prototype.checkLosingConditions = function (headPos) {
    if (this.outOfBounds(headPos)) {this.lost = true;}
    else if (this.grid[headPos[0]][headPos[1]] === "S") {this.lost = true;}
  };

  Board.prototype.outOfBounds = function (pos) {
    if (pos[0] >= 20 || pos[1] >= 20) return true;
    if (pos[0] < 0 || pos[1] < 0) return true;
    return false;
  };

})();
