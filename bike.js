;(function () {
  var Tron = window.Tron = window.Tron || {};

  var Coord = Tron.Coord;

  var DIRECTIONS = {"N": [-1, 0], "E":[0, 1], "S": [1, 0], "W":[0, -1]};

  var Bike = Tron.Bike = function () {
    this.dir = "E";
    this.segments = [new Coord([0,0]), new Coord([1,0]), new Coord([2,0]), new Coord([3,0])];
  };

  Bike.prototype.move = function () {
    var head = this.segments[0];
    var newEl = head.plus(DIRECTIONS[this.dir]);
    this.segments.unshift(newEl);
  };

  Bike.prototype.turn = function (dir) {
    this.dir = dir;
  };
})();
