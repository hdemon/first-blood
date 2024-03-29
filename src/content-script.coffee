$window = $('window')
$body = $('body')
canvas = null
$canvas = null
original_canvas = null
original_canvas_context = null
canvas_context = []
context = []
piece = []
id_total = 0
length_of_side = 10

$window.ready(()->
  $body.html2canvas({
    onrendered: (_canvas) ->
      $canvas = $(_canvas)
      initialize()
  })
)

initialize = () ->
  $window.unbind()
  original_canvas = new Original()
  original_canvas.divide_into_pieces(length_of_side)
  p.rotate(45) for p in piece

class Original
  constructor: () ->
    @render()
    @context = document.getElementsByTagName('canvas')[0].getContext('2d')

  render: () ->
    $canvas
      .css({
        position: 'absolute', 
        left: 0, 
        top: 0 })
      .appendTo(document.body)
      .siblings()
      .toggle()
    $body.append(canvas)

  get_context: () ->
    document.getElementsByTagName('canvas')[0].getContext('2d')

  divide_into_pieces: () ->
    temp_canvas = []

    itelator = `function(callback) {
      var id = 0;
      for (var y = 0, max_y = $canvas.height(); y < max_y; y = y + length_of_side) {
        for (var x = 0, max_x = $canvas.width(); x < max_x; x = x + length_of_side) {
          callback(id, x, y);
          id = id + 1;
        }
      }
      id_total = id
    };`

    itelator((id) ->
      temp_canvas.push("<canvas id=\"tmp_#{id}\" width=\"#{length_of_side}\" height=\"#{length_of_side}\" />")
    )
    $body.append(temp_canvas.join(""))

    itelator((id, x, y) ->
      piece[id] = new Piece(@image_data, id, x, y)
    )

  image_data: (x, y) ->
    @context.getImageData(x, y, length_of_side, length_of_side)


class Piece
  length_of_side: length_of_side
  constructor: (@image_data, @id, @x, @y) ->
    @rotating_angle = 0
    @shooted = false
    @context = document.getElementById("tmp_#{@id}").getContext('2d')

    @context.putImageData(original_canvas.image_data(x, y, length_of_side), 0, 0)
    $(piece)
      .css({
        position: "absolute",
        left: x,
        top:  y
      })

  rotate: (degree) ->
    original_canvas.context.translate(original_canvas.width, @y)
    original_canvas.context.rotate(degree * Math.PI / 180)
    original_canvas.context.drawImage(@context.canvas, @x, @y, length_of_side, length_of_side)
    original_canvas.context.translate(-@x, -@y)

  render: () ->
    canvas_context ||= canvas_context()
    canvas_context.putImageData(x, y, length_of_side, length_of_side)

