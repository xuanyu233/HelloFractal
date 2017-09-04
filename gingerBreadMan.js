var gl;
var points;
var canvas;
var program;
var numberPoints = 5000;

// use this function to calculate points of the gingerbreadman
function calculatePoint(){
    var M = 40;
    var L = 3;
    var startPoint = vec2(115, 121);

    var currPoint_x = startPoint[0];
    var currPoint_y = startPoint[1];
    var nextPoint_x = startPoint[0];
    var nextPoint_y = startPoint[1];

    points = [];
    for( var i = 0; points.length < numberPoints; i++){
        nextPoint_x = M * (1 + 2*L) - currPoint_y + Math.abs(currPoint_x - L * M);
        nextPoint_y = currPoint_x;

        points.push(vec2(nextPoint_x / canvas.width, nextPoint_y / canvas.height));
        // points.push(vec2(nextPoint_x, nextPoint_y));
        currPoint_x = nextPoint_x;
        currPoint_y = nextPoint_y;
        // console.log(points[i]);
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
    // load shader and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // load the data into GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    // associate out shader variable with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
}

function draw(){

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINE, 0, points.length);
}

function start(){
    //alert("start");
    console.log("start");
    canvasInit();
    calculatePoint();
    mySetup();
    draw();
    //alert("end");
}
