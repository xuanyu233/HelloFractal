var gl;
var points;
var canvas;
var program;
var numberPoints = 500;

function calculatePoint(){
    var startPoint = vec2(1.0, 2.0);
    var newPoint_x;
    var newPoint_y;
    var currPoint_x = startPoint[0];
    var currPoint_y = startPoint[1];

    points = [];
    for(var j = 0; j < 250; j++){
        for(var i = 0; i < numberPoints; i++){
            var randNum = Math.random() * 100;
            var p1 = (randNum == 1);
            var p2 = (randNum >= 2) && (randNum <= 8);
            var p3 = (randNum >= 9) && (randNum <= 15);
            var p4 = (randNum>= 16);

            if(p1 == true){
                newPoint_x = 0.0 * currPoint_x + 0.0 * currPoint_y + 0.0;
                newPoint_y = 0.0 * currPoint_x + 0.16 * currPoint_y + 0.0;
            }
            if(p2 == true){
                newPoint_x = 0.2 * currPoint_x + (-0.26) * currPoint_y + 0.0;
				newPoint_y = 0.23 * currPoint_x + 0.22 * currPoint_y + 1.6;
            }
            if(p3 == true){
                newPoint_x = (-0.15) * currPoint_x + 0.28 * currPoint_y + 0.0;
				newPoint_y = 0.26 * currPoint_x + 0.24 * currPoint_y + 0.44;
            }
            if(p4 == true){
                newPoint_x = 0.85 * currPoint_x + 0.04 * currPoint_y + 0.0;
				newPoint_y = 0.04 * currPoint_x + 0.85 * currPoint_y + 1.6;
            }
            points.push(vec2(newPoint_x * 100, newPoint_y * 40));
            currPoint_x = newPoint_x;
            currPoint_y = newPoint_y;
            //console.log(currPoint_x, currPoint_y);
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
    gl.viewport(100, 100, canvas.width, canvas.height);
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