$window = $('window')
$body = $('body')
canvas = null
$canvas = null
canvas_context = null
context = []
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

get_canvas_context = () ->
  document.getElementsByTagName('canvas')[0].getContext('2d')

image_data = (x, y, length_of_side) ->
  canvas_context ||= get_canvas_context()
  canvas_context.getImageData(x, y, length_of_side, length_of_side)

divide_into_pieces = (length_of_side) ->
  temp_canvas = []

  itelator = `function(callback) {
    var id = 0;
    for (var y = 0, max_y = $canvas.height(); y < max_y; y = y + length_of_side) {
      for (var x = 0, max_x = $canvas.width(); x < max_x; x = x + length_of_side) {
        callback(id, x, y);
        id = id + 1;
      }
    }
  };`

  itelator((id) ->
    temp_canvas.push("<canvas id=\"tmp_#{id}\" width=\"#{length_of_side}\" height=\"#{length_of_side}\" />")
  )
  $body.append(temp_canvas.join(""))

  itelator((id, x, y) ->
    piece = document.getElementById("tmp_#{id}")
    context = piece.getContext('2d')
    context.putImageData(image_data(x, y, length_of_side), 0, 0)
    $(piece)
      .css({
        position: "absolute",
        left: x,
        top:  y
      })
    context.delete
  )


class Piece
  constructor: (@image_data, x, y) ->
    this.x = x
    this.y = y
    this.rotating_angle = 0
    this.shooted = false

    $("<canvas id=\"tmp_#{id}\">")
      .appendTo(document.body)
    context = document.getElementsById("tmp_#{id}")[0].getContext('2d')

  render: () ->
    canvas_context ||= canvas_context()
    canvas_context.putImageData(x, y, length_of_side, length_of_side)

