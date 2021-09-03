var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
//create feed and lastFed variable here
var fedtime,lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("FEED");
  feed.position(700,95);
  feed.mousePressed(feeddog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedtime=database.ref("feedtime")
  feedtime.on("value",function(data){
    lastFed=data.val();
  })
 
  //write code to display text lastFed time here
fill ("black");
 textSize(25);
 if (lastFed>=12){
text("LastFed:"+lastFed%12+"p.m.",350,30)
 }
 else if (lastFed===0){
  text("LastFed:12 a.m.",350,30)

 }
 else {
  text("LastFed:"+lastFed+"a.m.",350,30)
 }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var FoodStockValue=foodObj.getFoodStock();
if (FoodStockValue<=0){
foodObj.updateFoodStock(FoodStockValue*0);

}
else {
  foodObj.updateFoodStock(FoodStockValue-1);
}
database.ref("/").update({
  food:foodObj.getFoodStock(),
  feedtime:hour (),
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
