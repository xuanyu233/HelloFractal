// include('../common/initShaders.js');
// include('../common/MV.js');
// include('../common/webgl-utils.js');

var gl;
var points;
var canvas;
var program;
var numberPoints = 300000;

function calculatePoint(){
    var x = 0;
    var y = 0;
    var a = 0.4;
    var b = 1;
    var c = 0;

    points = [];
    for(var i = 0; points.length < numberPoints; i++){
        x_new = y - Math.sign(x) * Math.sqrt(Math.abs(b*x-c));
        y_new = a - x;

        points.push(vec2(x, y));
        x = x_new;
        y = y_new;
    }
}

function canvasInit(){
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if(!gl){
        alert("WebGL isn't available");
    }
}

function mySetup(){
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var bufferID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
}

function draw(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, points.length);
}

function start(){
    console.log("start");
    canvasInit();
    calculatePoint();
    mySetup();
    draw();
}

// function include(file)
// {
//
//   var script  = document.createElement('script');
//   script.src  = file;
//   script.type = 'text/javascript';
//   script.defer = true;
//
//   document.getElementsByTagName('head').item(0).appendChild(script);
//
// }
