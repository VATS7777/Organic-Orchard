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

//global 
var products=JSON.parse(localStorage.getItem('cart'));
var cartitems=[];
var cart_n=document.getElementById('cart_n');
var table=document.getElementById("table");
var total=0;
var pre = 0;
var qt = 1;
var str = "qty";
var strp = "nPrice";
function addQ(i){
	if(i !== pre){
		qt = 1;
	}
	qt+=1;
	var nstr = str.concat(i);
	var nstrp = strp.concat(i);
	document.getElementById(nstr).innerHTML = qt; 
	document.getElementById(nstrp).innerHTML = ((products[i].price)*qt);
	total += parseInt(products[i].price);
	console.log(total, products[i].price);
	document.getElementById("totalVar").innerHTML = total;
	pre = i;
}
function minuQ(i){
	// if(i !== pre){
	// 	qt = 1;
	// }
	if(qt != 1)
	{
		qt-=1;
	}
	else{
		qt = 1;
	}
	var nstr = str.concat(i);
	var nstrp = strp.concat(i);
	document.getElementById(nstr).innerHTML = qt; 
	document.getElementById(nstrp).innerHTML = ((products[i].price)*qt);
	total -= parseInt(products[i].price);
	console.log(total, products[i].price);
	document.getElementById("totalVar").innerHTML = total;
	// pre = i;
}
//html
function tableHTML(i){
	var qt = 1;
	return`
				<tr>
				<th scope="row">${i+1}</th>
				<td><img style="width:90px;" src="${products[i].url}"></td>
				<td>${products[i].name}</td>
				<td style="display:flex;">
					<input style="outline:none;padding:2px;margin-right:3%;width:0.9em;font-weight:bolder;font-size:1.5em;background:grey;border-top-left-radius:0.3em;border-bottom-left-radius:0.3em;border:none;color:white;text-align:center;justify-content:center;" type="button" id="minuQ" name="minuQ" value="-" onclick="minuQ(${i});"/>
					<p style="padding:2px;margin-right:3%;width:0.9em;font-weight:bolder;font-size:1.2em;text-align:center;justify-content:center;"id="qty${i}">1</p>
					<input style="outline:none;padding:2px;margin-right:3%;width:0.9em;font-weight:bolder;font-size:1.5em;background:grey;border-top-right-radius:0.3em;border-bottom-right-radius:0.3em;border:none;color:white;text-align:center;justify-content:center;" type="button" id="addQ" name="addQ" value="+" onclick="addQ(${i});"/>
				</td>
				<td id="nPrice${i}">${products[i].price}</td>
				</tr>
	`;
}
//buy
function buy(){

	var d=new Date();
	var t=d.getTime();
	var counter=t;
	counter+=1;
	let db=firebase.database().ref("order/"+counter);
	let itemdb={
		id:counter,
		order:counter-895,
		total:total
	}
	db.set(itemdb);
	swal.fire({
		position:'center',
		type:'success',
		title:'Purchas made successfully',
		text:`Your Purchas order is: ${itemdb.order}`,
		showConfirmButton:true,
		timer:50000
	});	
	clean();
}
//clean
function clean(){
	localStorage.clear();
	for (let index = 0; index < products.length; index++) {
		document.getElementById("table").innerHTML+=tableHTML(index);
		total=total+parseInt(products[index].price);
	}
	total=0;
	document.getElementById("table").innerHTML=`
	<tr>
	<th></th>
	<th></th>
	<th></th>
	<th></th>
	<th></th>
	</tr>
	`;
	document.getElementById('cart_n').innerHTML='';
	document.getElementById("btnBuy").style.display="none";
	document.getElementById("btnclean").style.display="none";
}

//render function
function render(){
	for (let index = 0; index < products.length; index++) {
		if(document.getElementById("table")!=null){
		document.getElementById("table").innerHTML+=tableHTML(index);
		total=total+parseInt(products[index].price);
		}
	}	
	document.getElementById("table").innerHTML+=`
	<tr>
	<th scope="col"></th>
	<th scope="col"></th>
	<th scope="col"></th>
	<th scope="col"></th>
	<th scope="col" id="totalVar">TOTAL:Rs.${total}.00</th>
	</tr>
	<tr>
	<th scope="col"></th>
	<th scope="col"></th>
	<th scope="col"></th>
	<th scope="col">
	<button id="btnClean" onclick="clean()" class="btn text-white btn-warning">
	Clean Shopping Cart</button>
	</th>
	<th scope="col"><button id="btnBuy" onclick="buy()" class="btn btn-success">
	Buy</button></th>
	</tr>
	`;
}