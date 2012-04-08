$window = $('window')
$body = $('body')
canvas = null
$canvas = null
piece = []

$window.ready(()->
  $body.html2canvas({
    onrendered: (_canvas) ->
      $canvas = $(_canvas)
      initialize()
  })
)

initialize = () ->
  $window.unbind()
  render()
  divide_into_pieces(10)
  console.log(piece)

render = () ->
  $canvas
    .css({
      position: 'absolute', 
      left: 0, 
      top: 0 })
    .appendTo(document.body)
    .siblings()
    .toggle()
  $body.append(canvas)

canvas_context = () ->
  document.getElementsByTagName('canvas')[0].getContext('2d')

image_data = (x, y, length_of_side) ->
  canvas_context().getImageData(x, y, length_of_side, length_of_side).data

divide_into_pieces = `function(length_of_side) {
  var id = 0;

  for (var y = 0, max_y = $canvas.height(); y < max_y; y = y + length_of_side) {
    for (var x = 0, max_x = $canvas.width(); x < max_x; x = x + length_of_side) {
      piece[id] = new Piece(image_data(x, y, length_of_side));
      id = id + 1;
    }
  }
}`


class Piece
  constructor: (@image_data) ->
