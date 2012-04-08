(function() {
  var $body, $canvas, $window, Piece, canvas, canvas_context, divide_into_pieces, image_data, initialize, piece, render;

  $window = $('window');

  $body = $('body');

  canvas = null;

  $canvas = null;

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
    divide_into_pieces(10);
    return console.log(piece);
  };

  render = function() {
    $canvas.css({
      position: 'absolute',
      left: 0,
      top: 0
    }).appendTo(document.body).siblings().toggle();
    return $body.append(canvas);
  };

  canvas_context = function() {
    return document.getElementsByTagName('canvas')[0].getContext('2d');
  };

  image_data = function(x, y, length_of_side) {
    return canvas_context().getImageData(x, y, length_of_side, length_of_side).data;
  };

  divide_into_pieces = function(length_of_side) {
  var id = 0;

  for (var y = 0, max_y = $canvas.height(); y < max_y; y = y + length_of_side) {
    for (var x = 0, max_x = $canvas.width(); x < max_x; x = x + length_of_side) {
      piece[id] = new Piece(image_data(x, y, length_of_side));
      id = id + 1;
    }
  }
};

  Piece = (function() {

    function Piece(image_data) {
      this.image_data = image_data;
    }

    return Piece;

  })();

}).call(this);
