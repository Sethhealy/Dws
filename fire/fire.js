/**
 * Created by sethhealy on 1/30/14.
 */
var lastTime = 0;
var lastTime=0;var vendors=["ms","moz","webkit","o"];for(var x=0;x<vendors.length&&!window.requestAnimationFrame;++x){window.requestAnimationFrame=window[vendors[x]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[vendors[x]+"CancelAnimationFrame"]||window[vendors[x]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(e,t){var n=(new Date).getTime();var r=Math.max(0,16-(n-lastTime));var i=window.setTimeout(function(){e(n+r)},r);lastTime=n+r;return i}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(e){clearTimeout(e)}};

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

function random( min, max ) {
    return Math.random() * ( max - min ) + min;
}

function canculateDistance(p1x, p1y, p2x, p2y) {
    var xDistance = p1x - p2x;
    var yDistance = p1y - p2y;

    return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2));
}

var tick = 0,
    fireParticle = [],
    fireParticleIndex = 0,
    maxFireParticles = 800;

var pit = {
    width: 50,
    height: 65,
    x: canvas.width / 2,
    y: canvas.height
};

function Particle() {
    this.x = random(pit.x - pit.width / 2, pit.x - pit.width / 2 - 5 + pit.width);
    this.y = random(pit.y - pit.height - (pit.height / 6), pit.y - pit.height);
    this.speedX = random(1,2);
    this.speedY = random(0.05,0.6);
    this.size = random(5,10);
    this.fade = random(0.985, 0.99);
    this.aceleration = random(0.001, 0.005);
    this.color = "hsl(50, 80%, 100%)";
    this.colorIndex = 50;
    this.saturation = 80;
    this.light = 100;
    this.angle = 0;
    this.orbit = random(-0.5,0.5);
}

Particle.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
};

Particle.prototype.update = function() {

    this.speedY += this.aceleration;
    this.y -= this.speedY;
    this.size *= this.fade;

    if(this.size > 0 && this.y < pit.y + 200){
        this.size -= 0.05;
    }

    if(this.y < pit.y - pit.height - 10){
        this.x += Math.sin(this.angle * 1) * this.orbit;
    }
    this.angle += 0.08;

    this.color = 'hsl('+this.colorIndex+', '+ this.saturation+'%, '+this.light+'%)';

    if(this.colorIndex > 0){
        this.colorIndex--;
    }

    if(this.light > 50 && this.y < pit.y - pit.height - 5){
        this.light -= 5;
    }

    if(this.saturation > 100 < pit.y - pit.height - 5){
        this.saturation += 5;
    }

};

var i;
function update(){

    ctx.fillStyle = 'rgba(0,0,0, 0.04)';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    if((tick++)%20 === 1 ){
        for (i = 150 - 1; i >= 0; i--) {
            fireParticle[(fireParticleIndex++)%maxFireParticles] = new Particle();
        }
    }

    i = fireParticle.length;
    while( i-- ){
        fireParticle[ i ].draw();
        fireParticle[ i ].update();
    }

    ctx.fillStyle = '#181818';
    ctx.fillRect(pit.x - (pit.width / 2) - 5, pit.y - pit.height - (pit.height / 12), pit.width + 10, pit.height / 4);
    ctx.fillRect(pit.x - pit.width / 2, pit.y - pit.height, pit.width, pit.height);

    //debug
    // ctx.clearRect(0, canvas.height - 12, canvas.width, 12);
    // ctx.fillRect(0, canvas.height - 14, canvas.width, 6);
    // ctx.fillStyle = '#ececec';
    // ctx.fillRect(0, canvas.height - 10, canvas.width, 12);
    //ctx.fillStyle = '#000';
    // ctx.fillText('Particles: '+fireParticle.length, 2, canvas.height - 1);
    // ctx.fillText('Particles Thrown: '+fireParticleIndex, 82, canvas.height - 1);
}

(function animloop(){
    requestAnimationFrame(animloop);
    update();
})();
