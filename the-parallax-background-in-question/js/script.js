//here we make the connection to our HTML file using a canvas to draw everything in
const canvas = document.getElementById('canvas1');
//here we us the getContext method and set it to 2d, because we animate in 2d
const ctx = canvas.getContext('2d');
//this is equal to the canvas width and height declared in style.css
//we set this equal to these variables to access the canvas' dimensions in our code
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
//this sets the speed of all our layers. gameSpeed is also what changes when we use the slider on the website
let gameSpeed = 5;

//sets the background layers images equal to to a variable we can access in our code
const backgroundLayer1 = new Image();
backgroundLayer1.src = './media/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './media/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './media/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './media/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = './media/layer-5.png';

//this is the slider, the slider is always equal to the game speed
//an evven listener makes it possible to change the speed by adjusting the slider in the browser
const slider = document.getElementById('slider');
slider.value = gameSpeed
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener('change', function (e) {
    console.log(`Game Speed set to: ${e.target.value}`);
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value
});

//this class gets used by every background layer.
class Layer {
    //this constructor creates an object for every layer with the values below
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        // this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    //this method updates the background layers at a set speed
    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }
        // if (this.x2 <= -this.width) {
        //     this.x2 = this.width + this.x - this.speed;
        // }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x - this.speed);
    }

    //this method draws the image at a specified location at specified dimensions set by the constructor
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

//this calls the Layer constructor to contruct the Layer object with the "image" and "speed" parameter
const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.3);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

//this array holds all background layers as objects
const gameObjects = [layer1, layer2, layer3, layer4, layer5]

//Here we animate the background, on line 77 we clear all past frames
//then we call forEach on every object of the gameObjects array and use the update and draw methods
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });
    requestAnimationFrame(animate);
};
//calls the animate() function
animate();