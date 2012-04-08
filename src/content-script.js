(function() {
  var $body, $canvas, $window, Piece, canvas, canvas_context, context, divide_into_pieces, get_canvas_context, image_data, initialize, piece, render;

  $window = $('window');

  $body = $('body');

  canvas = null;

  $canvas = null;

  canvas_context = null;

  context = [];

  piece = [];

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
    render();
    return divide_into_pieces(10);
  };

  render = function() {
    $canvas.css({
      position: 'absolute',
      left: 0,
      top: 0
    }).appendTo(document.body).siblings().toggle();
    return $body.append(canvas);
  };

  get_canvas_context = function() {
    return document.getElementsByTagName('canvas')[0].getContext('2d');
  };

  image_data = function(x, y, length_of_side) {
    canvas_context || (canvas_context = get_canvas_context());
    return canvas_context.getImageData(x, y, length_of_side, length_of_side);
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
  };;
    itelator(function(id) {
      return temp_canvas.push("<canvas id=\"tmp_" + id + "\" width=\"" + length_of_side + "\" height=\"" + length_of_side + "\" />");
    });
    $body.append(temp_canvas.join(""));
    return itelator(function(id, x, y) {
      piece = document.getElementById("tmp_" + id);
      context = piece.getContext('2d');
      context.putImageData(image_data(x, y, length_of_side), 0, 0);
      $(piece).css({
        position: "absolute",
        left: x,
        top: y
      });
      return context["delete"];
    });
  };

  Piece = (function() {

    function Piece(image_data, x, y) {
      this.image_data = image_data;
      this.x = x;
      this.y = y;
      this.rotating_angle = 0;
      this.shooted = false;
      $("<canvas id=\"tmp_" + id + "\">").appendTo(document.body);
      context = document.getElementsById("tmp_" + id)[0].getContext('2d');
    }

    Piece.prototype.render = function() {
      canvas_context || (canvas_context = canvas_context());
      return canvas_context.putImageData(x, y, length_of_side, length_of_side);
    };

    return Piece;

  })();

}).call(this);
