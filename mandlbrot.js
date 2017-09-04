// include('../common/initShaders.js');
// include('../common/MV.js');
// include('../common/webgl-utils.js');

var gl;
var points;
var canvas;
var program;
var numberPoints = 600;

function calculatePoint(){
    var width = 4;
    var height = 4;
    points = [];

    for(var row = 0; row < canvas.height; row ++){
        for(var col = 0; col < canvas.height; col ++){
            var c_re = (col - canvas.width / 2.0) * (4.0 / canvas.width);
            var c_im = (row - canvas.height/2.0) * (4.0 / canvas.width);

            var x = 0;
            var y = 0;
            var iteration = 0;
            var points_tmp = [];
            while(x*x + y * y < 4 && iteration < numberPoints){
                var x_new = x*x - y*y + c_re;
                var y_new = 2 * x * y + c_im;
                iteration ++;

                x = x_new;
                y = y_new;

                points_tmp.push(vec2(x, y));
                // console.log(x, y);
            }
            if(iteration >= numberPoints){
                for(var i = 0; i < points_tmp.length; i++){
                    points.push(points_tmp[i]);
                }
            }

        }
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
