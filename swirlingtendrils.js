// include('../common/initShaders.js');
// include('../common/MV.js');
// include('../common/webgl-utils.js');

var gl;
var points;
var canvas;
var program;
var numberPoints = 300000;

function calculatePoint(){
    var x = 0.5;
    var y = 0.3;
    var a = -2.244;
    var b = -0.65;
    var c = 0.43;
    var d = -2.43;

    points = [];
    for(var i = 0; points.length < numberPoints; i++){
        var x_new = Math.sin(a * y) - Math.cos(b * x);
        var y_new = Math.sin(c * x) - Math.cos(d * y);

        points.push(vec2(x,y));
        if(x < -1 || x > 1 || y < -1 || y > 1)
            console.log(x,y)
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
