var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed The Dog");
  feed.position(600,95)
  feed.mousePressed(feedDog)



}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
    fedTime=database.ref('feedTime')
    fedTime.on("value",function(data){
      lastFed=data.val()
    })
    fill("white")
 textSize(20);

  //write code to display text lastFed time here
if(lastFed>=12){
  text("last feed:"+lastFed%12+"PM",350,30)
}else if(lastFed==0){
  text("last feed: 12 AM",350,30)
}else{
  text("last feed:"+lastFed+"AM",200,30)
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

}
//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
var food_stock_val = foodObj.getFoodStock();
if(food_stock_val<=0){
  foodObj.updateFoodStock(food_stock_val*0)
}else{
  foodObj.updateFoodStock(food_stock_val-1)
}

database.ref('/').update({
  food:foodObj.getFoodStock(),
  fedTime:hour()
})