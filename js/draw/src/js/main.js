
var draw = (function() {

  //Get the height and width of the main we will use this set canvas to the full
  //size of the main element.
  var mWidth = document.querySelector('main').offsetWidth,
    mHeight = document.querySelector('main').offsetHeight,

    //Create the canvas
    canvas = document.createElement("canvas"),

    //Create the context
    ctx = canvas.getContext("2d"),

    //Create the initial bounding rectangle
    rect = canvas.getBoundingClientRect(),

    //current x,y position
    x=0,
    y=0,

    //starting x,y
    x1=0,
    y1=0,

    //ending x,y
    x2=0,
    y2=0,

    lx = 0,
    ly = 0,


    // what shape are we drawing
    shape='';


    // have we started drawing yet
    isDrawing=false;

  return {

      setIsDrawing: function(bool){
        isDrawing = bool;
      },

      getIsDrawing: function(){
        return isDrawing;
      },

      getShape: function(){
        return shape;
      },

      // returns random color
      randColor: function(){
        return '#'+Math.floor(Math.random()*16777215).toString(16);
      },
      strokeColor: function(){
        return document.getElementById('strokeColor').value;

      },
      fillColor: function(){
        return document.getElementById('fillColor').value;

      },
    // sets shape to be drawn
    setShape(shp){
      shape = shp;

    },


    //Set the x,y coords based on current event data
    setXY: function(evt) {
        //Set previous coords
        lx = x;;
        ly = y;

      x = (evt.clientX - rect.left) - canvas.offsetLeft;
      y = (evt.clientY - rect.top) - canvas.offsetTop;

    //  console.log({'x': x, 'y': y, 'lx': lx, 'ly': ly});
    },

    //Write the x,y coods to the target div
    writeXY: function() {
      document.getElementById('trackX').innerHTML = 'X: ' + x;
      document.getElementById('trackY').innerHTML = 'Y: ' + y;
    },

    //Set the x1,y1
    setStart: function() {
      x1=x;
      y1=y;
    },

    //Set the x2,y2
    setEnd: function() {
      x2=x;
      y2=y;
    },

    //Draw a rectangle
    drawRect: function() {
      //Start by using random fill colors.
      ctx.fillStyle = this.fillColor();
      ctx.strokeStyle = this.strokeColor();


      ctx.fillRect (x1,y1,(x2-x1),(y2-y1));
      ctx.strokeRect (x1,y1,(x2-x1),(y2-y1));
    },

    drawLine: function () {

      ctx.strokeStyle = this.strokeColor();
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    },

    drawCircle: function() {

      ctx.fillStyle = this.fillColor();
      ctx.strokeStyle = this.strokeColor();

     //calculate the radius using
      let a = (x1-x2)
      let b = (y1-y2)
      let radius = Math.sqrt( a*a + b*b);

      ctx.beginPath();
      ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    },

    drawPath: function(){
    //ctx.strokeStyle = this.randColor();
    ctx.strokeStyle = this.strokeColor();
     ctx.beginPath();
     ctx.moveTo(lx,ly);
     ctx.lineTo(x,y);
     ctx.stroke();

   },

   drawTriangle: function(){
         ctx.strokeStyle = this.strokeColor();
         ctx.fillStyle = this.fillColor();
         ctx.beginPath();
         ctx.moveTo(x1, y1);
         ctx.lineTo(x2, y2);
         ctx.lineTo(y1, y2);
         ctx.fill();
         ctx.stroke();


   },

   //draws slected shape
    draw: function() {

    ctx.restore();
    if(shape ==='rectangle')
    {
    this.drawRect();
    } else if(shape ==='line')
    {
      this.drawLine();
    } else if(shape ==='circle')
    {
        this.drawCircle();
    } else if (shape ==='path')
    {
      this.drawPath();
    } else if (shape ==='triangle')
      {
        this.drawTriangle();
      } else {
    alert('Please choose a shape');
  }
  ctx.save();
},
    getCanvas: function(){
      return canvas;
    },

    //Initialize the object, this must be called before anything else
    init: function() {
      canvas.width = mWidth;
      canvas.height = mHeight;
      document.querySelector('main').appendChild(canvas);

    }
  };

})();

//Initialize draw
draw.init();

// choose to draw a Rectangle
document.getElementById('btnRect').addEventListener('click', function(){
  draw.setShape('rectangle');
});


 // choose to draw a line
 document.getElementById('btnLine').addEventListener('click', function(){
   draw.setShape('line');
 });

 // choose to draw a circle
 document.getElementById('btnCircle').addEventListener('click', function(){
   draw.setShape('circle');
 });
 // choose to draw a Path
 document.getElementById('btnPath').addEventListener('click', function(){
    draw.setShape('path');
});

// choose to draw a Triangle
document.getElementById('btnTriangle').addEventListener('click', function(){
   draw.setShape('triangle');
});
//Add a mousemove listener to the canvas
//When the mouse reports a change of position use the event data to
//set and report the x,y position on the mouse.
draw.getCanvas().addEventListener('mousemove', function(evt) {
  draw.setXY(evt);
  draw.writeXY();
  if(draw.getShape()=='path' && draw.getIsDrawing()===true){
    draw.draw();
  }
}, false);

//Add a mousedown listener to the canvas
//Set the starting position
draw.getCanvas().addEventListener('mousedown', function() {
  draw.setStart();
  draw.setIsDrawing(true);
}, false);

//Add a mouseup listener to the canvas
//Set the end position and draw the rectangle
//
draw.getCanvas().addEventListener('mouseup', function() {
  draw.setEnd();
  draw.draw();
  draw.setIsDrawing(false);
}, false);


document.getElementById('btnRect').addEventListener('click',function(){
    draw.setShape('rectangle');
}, false);
