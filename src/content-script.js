(function() {
  var $body, $canvas, $window, Original, Piece, canvas, canvas_context, context, divide_into_pieces, get_all_contents, get_canvas_context, get_original_canvas_context, id_total, image_data, initialize, length_of_side, original_canvas, original_canvas_context, piece;

  $window = $('window');

  $body = $('body');

  canvas = null;

  $canvas = null;

  original_canvas = null;

  original_canvas_context = null;

  canvas_context = [];

  context = [];

  piece = [];

  id_total = 0;

  length_of_side = 10;

  $window.ready(function() {
    return $body.html2canvas({
      onrendered: function(_canvas) {
        $canvas = $(_canvas);
        return initialize();
      }
    });
  });

  initialize = function() {
    $window.unbind();
    original_canvas = new Original();
    original_canvas.divide_into_pieces(length_of_side);
    return get_all_contents();
  };

  get_original_canvas_context = function() {
    return document.getElementsByTagName('canvas')[0].getContext('2d');
  };

  get_canvas_context = function(id) {
    return document.getElementById("tmp_" + id).getContext('2d');
  };

  get_all_contents = function() {
    var id, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = id_total.length; _i < _len; _i++) {
      id = id_total[_i];
      _results.push((function(id) {
        return canvas_context[id] = get_canvas_context(id);
      })(id));
    }
    return _results;
  };

  image_data = function(x, y, length_of_side) {
    original_canvas_context || (original_canvas_context = get_original_canvas_context());
    return original_canvas_context.getImageData(x, y, length_of_side, length_of_side);
  };

  divide_into_pieces = function(length_of_side) {
    var itelator, temp_canvas;
    temp_canvas = [];
    itelator = function(callback) {
    var id = 0;
    for (var y = 0, max_y = $canvas.height(); y < max_y; y = y + length_of_side) {
      for (var x = 0, max_x = $canvas.width(); x < max_x; x = x + length_of_side) {
        callback(id, x, y);
        id = id + 1;
      }
    }
    id_total = id
  };;
    itelator(function(id) {
      return temp_canvas.push("<canvas id=\"tmp_" + id + "\" width=\"" + length_of_side + "\" height=\"" + length_of_side + "\" />");
    });
    $body.append(temp_canvas.join(""));
    return itelator(function(id, x, y) {
      return piece[id] = new Piece(image_data, id, x, y);
    });
  };

  Original = (function() {

    function Original() {
      this.render();
      this.context = document.getElementsByTagName('canvas')[0].getContext('2d');
    }

    Original.prototype.render = function() {
      $canvas.css({
        position: 'absolute',
        left: 0,
        top: 0
      }).appendTo(document.body).siblings().toggle();
      return $body.append(canvas);
    };

    Original.prototype.get_content = function() {
      return document.getElementsByTagName('canvas')[0].getContext('2d');
    };

    Original.prototype.divide_into_pieces = function() {
      var itelator, temp_canvas;
      temp_canvas = [];
      itelator = function(callback) {
      var id = 0;
      for (var y = 0, max_y = $canvas.height(); y < max_y; y = y + length_of_side) {
        for (var x = 0, max_x = $canvas.width(); x < max_x; x = x + length_of_side) {
          callback(id, x, y);
          id = id + 1;
        }
      }
      id_total = id
    };;
      itelator(function(id) {
        return temp_canvas.push("<canvas id=\"tmp_" + id + "\" width=\"" + length_of_side + "\" height=\"" + length_of_side + "\" />");
      });
      $body.append(temp_canvas.join(""));
      return itelator(function(id, x, y) {
        return piece[id] = new Piece(this.image_data, id, x, y);
      });
    };

    Original.prototype.image_data = function(x, y) {
      return this.context.getImageData(x, y, length_of_side, length_of_side);
    };

    return Original;

  })();

  Piece = (function() {

    Piece.prototype.length_of_side = length_of_side;

    function Piece(image_data, id, x, y) {
      this.image_data = image_data;
      this.id = id;
      this.x = x;
      this.y = y;
      this.rotating_angle = 0;
      this.shooted = false;
      this.context = document.getElementById("tmp_" + this.id).getContext('2d');
      this.context.putImageData(original_canvas.image_data(x, y, length_of_side), 0, 0);
      $(piece).css({
        position: "absolute",
        left: x,
        top: y
      });
    }

    Piece.prototype.render = function() {
      canvas_context || (canvas_context = canvas_context());
      return canvas_context.putImageData(x, y, length_of_side, length_of_side);
    };

    return Piece;

  })();

}).call(this);
