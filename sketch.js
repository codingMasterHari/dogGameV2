var dog, sadDog, happyDog, database, walkingDogImg;
var foodS, foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed, walkDog;

const bgSound = new Audio("bgSound.wav");
bgSound.volume = 0.5;
const happySound = new Audio("happySound.wav");
const waitingSound = new Audio("waitingSound.wav");
const walkingSound = new Audio("walkingSound.wav");

function preload(){
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  walkingDogImg = loadImage("walkingdog.png");
  bgImg = loadImage("backgroundImg.jpg");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton("Feed the dog");
  feed.position(680,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  walkDog = createButton("Walk The Dog");
  walkDog.position(630,120);
  walkDog.mousePressed(walkingDog);

}

function draw() {
  // background(46, 139, 87);
  background(bgImg);
  foodObj.display();

  bgSound.play();
  bgSound.loop = true;

  //write code to read fedtime value from the database 
  lastFed = hour();
  //write code to display text lastFed time here
  if(lastFed >= 12) { 
    //show time in PM format when lastFed is greater than 12 
    fill("black");
    textSize(20)
    text("Last Fed: " +lastFed+"PM", 400, 80);

  } else if(lastFed == 0) { 
    fill("black");
    textSize(20)
    text("Last Feed : 12 AM", 400, 80);

  } else if(lastFed <= 12) { 
    //show time in AM format when lastFed is less than 12 
    fill("black");
    textSize(20);
    text("Last Fed: " +lastFed+"AM", 400, 80);
  }

  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog() {
  dog.addImage(happyDog);
  // happySound.play();
  //write code here to update food stock and last fed time
  if(foodS >= 1) {
    happySound.play();
    text("I Love You!", 400, 200);
    foodS-=1;
    database.ref('/').update({
      Food:foodS
    })
  }
}

//function to add food in stock
function addFoods() {
  waitingSound.play();
  dog.addImage(sadDog);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function walkingDog() {
  walkingSound.play();
  dog.addImage(walkingDogImg);
  
}
