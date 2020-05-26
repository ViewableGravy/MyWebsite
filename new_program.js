var xcalibur = 0
var ysicle = 0

function setup() {
createCanvas(800,500);
background(0)


}

function draw() {
background(0)
Mountains();
fill("grey")
arc(600,200,100,200,0,2*PI)
push()
translate(width/2,height/2)
rotate(HALF_PI)
ysicle -= 1
Penis(mouseY -600 ,-mouseX + 200 )
pop()
topHole();

//console.log(frameRate())


}


Penis = function(x,y) { 
    fill("brown")
    stroke("brown")
    strokeWeight(3)
    ellipse(x + 300,y + 300,100)
    ellipse(x+ 400,y + 300,100)
    rect(x+ 300,y + 100,100,200)
    arc(x + 350,y +100,100,100,PI,0)
    stroke("Black")
    line(x+ 350,y + 50,x + 350,y + 100)
    arc(x + 350,y + 120,100,30,0,PI)
}

topHole = function() {
strokeWeight(1)
stroke("black")
beginShape();
vertex(800,300)
for(var i = -90; i < 90; i += PI/180) {
    var x = cos(radians(-i)) * 50;
    var y = sin(radians(-i)) * 100;
    vertex(600 + x, 200 + y);
}
vertex(800,100)
endShape();
}

Mountains = function() {
fill(50,50,50)
beginShape();
vertex(0,height);
vertex(width * 2/5,height/7);
vertex(width * 4/5,height);
endShape();

beginShape();
vertex(width*2/5,height);
vertex(width * 13/20,height/3);
vertex(width *19/20,height);
endShape();

}