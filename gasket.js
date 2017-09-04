var gl;
var points;
var canvas;
var program;
var numberPoints = 5000;

function calculatePoint(){
    var startPoint = [
        vec2(-1, -1),
        vec2( 0,  1),
        vec2( 1, -1)
    ];

    var u = add(startPoint[0], startPoint[1]);
    var v = add(startPoint[0], startPoint[2]);
    var p = scale(0.3, add(u,v));

    points = [];
    points.push(p);

    for ( var i = 0; points.length < numberPoints; ++i ) {
        var j = Math.floor(Math.random() * 3);
        p = add( points[i], startPoint[j] );
        p = scale( 0.5, p );
        points.push( p );
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
