
var firebaseConfig = {
  apiKey: "AIzaSyAsbwGbOPPrlPnXGwzrIJKr_2YRNbRRxsw",
  authDomain: "organicorchard-51986.firebaseapp.com",
  databaseURL: "https://organicorchard-51986.firebaseio.com",
  projectId: "organicorchard-51986",
  storageBucket: "organicorchard-51986.appspot.com",
  messagingSenderId: "387687912333",
  appId: "1:387687912333:web:634ce275b7dc0d391263c4",
  measurementId: "G-R00YR7QMMS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//GLOBAL
var products=[];
var cartitems=[];
var cart_n=document.getElementById('cart_n');

//DIVS
var fruitDIV = document.getElementById("fruitDIV");
var chocolateDIV=document.getElementById("chocolateDIV");
var ChipsDIV=document.getElementById("ChipsDIV");

//information
var FRUIT=[
  {name:'Strawberry',price:50},
  {name:'DragonFruit',price:100},
  {name:'Apple',price:60},
  {name:'Orange',price:50},
  {name:'Kiwi',price:100},
  {name:'Banana',price:50},
];
var CHOCOLATE=[
  {name:'Dairy Milk',price:50},
  {name:'Fuse',price:100},
  {name:'5 Star',price:60},
];
var CHIPS=[
  {name:'Too Yumm',price:50},
  {name:'Parles Wafers ',price:100},
  {name:'Popcorn',price:60},
];

function HTMLfruitProduct(con){
  let URL=`D:/WebsiteUpdate2/fruits/fruit${con}.jpg`;
  let btn=`btnFruit${con}`;
  return `
         <div class="col-md-4">
           <div class="card mb-4 shadow-sm">
              <img class="card-img-top" style="height:16rem;" src="${URL}"
              alt="Card image cap"
              <div class="card-body">
                  <p class="card-text" style="margin-top: 5px;font-weight: bold;padding-left: 5px;">${FRUIT[con-1].name}</p> 
                  <p class="card-text" style="margin-top: 5px;padding-left: 5px;">Price: ${FRUIT[con-1].price}.00</p>
                  <div class="d-flex justify-content-between align-items-center" style="margin: 5px 0;padding-left: 5px;"> 
                    
                    <div class="btn-group">
                      <button type="button" onclick="cart2('${FRUIT[con-1].name}','${FRUIT[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary"><a style="color:inherit; href="cart.html"">Buy</a></button>
                      <button id="${btn}" type="button" onclick="cart('${FRUIT[con-1].name}','${FRUIT[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">Add to Cart</button>
                    </div>
                    <small class="text-muted">Free Shipping </small>        
                  
                  </div>
              </div>
            </div>
          </div>
        `
}
function HTMLchocolateProduct(con){
  let URL=`D:/WebsiteUpdate2/chocolate/c${con}.jpg`;
  let btn=`btnFruit${con}`;
  return `
         <div class="col-md-4">
           <div class="card mb-4 shadow-sm">
              <img class="card-img-top" style="height:16rem;" src="${URL}"
              alt="Card image cap"
              <div class="card-body">
                  <p class="card-text" style="margin-top: 5px;padding-left: 5px;font-weight: bold;">${CHOCOLATE[con-1].name}</p> 
                  <p class="card-text" style="margin-top: 5px;padding-left: 5px;">Price: ${CHOCOLATE[con-1].price}.00</p>
                  <div class="d-flex justify-content-between align-items-center" style="margin: 5px 0;padding-left: 5px;"> 
                    
                    <div class="btn-group">
                      <button type="button" onclick="cart2('${CHOCOLATE[con-1].name}','${CHOCOLATE[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary"><a style="color:inherit; href="cart.html"">Buy</a></button>
                      <button id="${btn}" type="button" onclick="cart('${CHOCOLATE[con-1].name}','${CHOCOLATE[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">Add to Cart</button>
                    </div>
                    <small class="text-muted">Free Shipping </small>        
                  
                  </div>
              </div>
            </div>
          </div>





        `
      }
        function HTMLchipsProduct(con){
  let URL=`D:/WebsiteUpdate2/chips/z${con}.jpg`;
  let btn=`btnchips${con}`;
  return `
         <div class="col-md-4">
           <div class="card mb-4 shadow-sm">
              <img class="card-img-top" style="height:16rem;" src="${URL}"
              alt="Card image cap"
              <div class="card-body">
                  <p class="card-text" style="margin-top: 5px;padding-left: 5px;font-weight: bold;">${CHIPS[con-1].name}</p> 
                  <p class="card-text" style="margin-top: 5px;padding-left: 5px;">Price: ${CHIPS[con-1].price}.00</p>
                  <div class="d-flex justify-content-between align-items-center" style="margin: 5px 0;padding-left: 5px;"> 
                    
                    <div class="btn-group">
                      <button type="button" onclick="cart2('${CHIPS[con-1].name}','${CHIPS[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary"><a style="color:inherit; href="cart.html">Buy</a></button>
                      <button id="${btn}" type="button" onclick="cart('${CHIPS[con-1].name}','${CHIPS[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">Add to Cart</button>
                    </div>
                    <small class="text-muted">Free Shipping </small>        
                  
                  </div>
              </div>
            </div>
          </div>

        `
}

//animation
function animation(){
  const toast=Swal.fire({
    type:'success',
    title: 'Added to shopping cart',
    toast:true,
    position:'top-end',
    timer:2000,
    showConfirmButton:false
  });
}

//cart function
function cart(name,price,url,con,btncart)
{
    var item={
      name:name,
      price:price,
      url:url
    }
    cartitems.push(item);

    let storage=JSON.parse(localStorage.getItem("cart"));
    if(storage==null){
      products.push(item);
      localStorage.setItem("cart",JSON.stringify(products));
    }
    else{
      products=JSON.parse(localStorage.getItem("cart"));
      products.push(item);  
      localStorage.setItem("cart", JSON.stringify(products)); 
    }
    products =JSON.parse(localStorage.getItem("cart"));
    document.getElementById('cart_n').innerHTML=`[${products.length}]`;
    document.getElementById(btncart).style.display="none";
    animation();
}

function cart2(name,price,url,con,btncart){
    var item={
      name:name,
      price:price,
      url:url
    }
    cartitems.push(item);
    let storage=JSON.parse(localStorage.getItem("cart"));
    if(storage==null){
      products.push(item);
      localStorage.setItem("cart",JSON.stringify(products));
    }
    else{
      products=JSON.parse(localStorage.getItem("cart"));
      products.push(item);  
      localStorage.setItem("cart", JSON.stringify(products)); 
    }
    products =JSON.parse(localStorage.getItem("cart"));
    document.getElementById('cart_n').innerHTML=`[${products.length}]`;
    document.getElementById(btncart).style.display="none";
}


//Render

function render(){
  var fruitDIV = document.getElementById("fruitDIV");
  if(fruitDIV!= null){
     for (var index = 1; index <= 6; index++) {
       fruitDIV.innerHTML+=`${HTMLfruitProduct(index)}`;
     }
   }

   var chocolateDIV = document.getElementById("chocolateDIV");
  if(chocolateDIV!= null){
     for (var index = 1; index <= 3; index++) {
       chocolateDIV.innerHTML+=`${HTMLchocolateProduct(index)}`;  
     }
   }

    var chipsDIV = document.getElementById("chipsDIV");
    if(chipsDIV!= null){
       for (var index = 1; index <= 3; index++) {
         chipsDIV.innerHTML+=`${HTMLchipsProduct(index)}`;
       }
     }
     if (localStorage.getItem("cart") == null) {
     }
     else{

       products=JSON.parse(localStorage.getItem("cart"));
      document.getElmentbyId('cart_n').innerHTML=`[${products.length}]`;
     }
   
}

