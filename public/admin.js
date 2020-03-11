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
var d=new Date();
var t=d.getTime();
var counter=t;

//form

document.getElementById("form").addEventListener("submit",(e)=>{
	var order=document.getElementById("order").value;
	var total=document.getElementById("total").value;
	e.preventDefault();

	createOrder(order,total);
	form.reset();
});
//create new order
function createOrder(order,total){
	console.log(counter);
	counter+=1;
	console.log(counter);
	var newOrder={
		id:counter,
		order:order,
		total:total
	}
	let db=firebase.database().ref("order/"+counter);
	db.set(newOrder);
	document.getElementById("cardSection").innerHTML='';
	//READORDER
	// readOrder();

};

function readOrder(){
	var order=firebase.database().ref("order/");
	order.on("child_added",function(data){
		var orderValue=data.val();
		document.getElementById("cardSection").innerHTML+=`
			<div class="card mb-3">
				<div class="card-body">
				<h5 class="card-title">Order:${orderValue.order}</h5>
				<p class="card-text">Total:${orderValue.total}</p>	
				<button type="submit" style="color:white" class="btn btn-warning" onclick="updateOrder(${orderValue.id},'${orderValue.order}','${orderValue.total}')"><i class="fa fa-edit"></i>Edit Order</button>
				<button type="submit" class="btn btn-danger" onclick="deleteOrder(${orderValue.id})"><i class="fa fa-trash"></i>Delete Order</button>
				</div>
			</div>
		`
	});
}
function reset(){
	document.getElementById("firstSection").innerHTML=`
	<form  id="form" class="border p-4 mb-4">
						<div class="form-group">
							<label>Order</label>
							<input type="text" class
							="form-control" id="order" placeholder="Add Order">
						</div>
								<div class="form-group">
							<label>Total</label>
							<input type="text" class
							="form-control" id="total" placeholder="Add total">
						</div>
						<button type="submit" id="button1" class="btn btn-primary"><i class="fa fa-plus"></i>Add Order</button>
						<button style="display:none" id="button2" class="btn btn-success">Update Order</button>
						<button style="display:none" id="button3" class="btn btn-danger">Cancel</button>
					</form>


	`;
	document.getElementById("form").addEventListener("submit",(e)=>{
	var order=document.getElementById("order").value;
	var total=document.getElementById("total").value;
	e.preventDefault();

	createOrder(order,total);
	form.reset();
});
}
function updateOrder(id,order,total){
	document.getElementById("firstSection").innerHTML=`
					<form  id="form2" class="border p-4 mb-4">
						<div class="form-group">
							<label>Order</label>
							<input type="text" class
							="form-control" id="order" placeholder="Add Order">
						</div>
						<div class="form-group">
							<label>Total</label>
							<input type="text" class
							="form-control" id="total" placeholder="Add total">
						</div>
						<button style="display:none" type="submit" id="button1" class="btn btn-primary"><i class="fa fa-plus"></i>Add Order</button>
						<button id="button2" class="btn btn-success">Update Order</button>
						<button id="button3" class="btn btn-danger">Cancel</button>
					</form>

	`;
	document.getElementById("form2").addEventListener("submit",(e)=>{
		e.preventDefault();
	});
	document.getElementById("button3").addEventListener("click",(e)=>{
		reset();
		
	});
	document.getElementById("button2").addEventListener("click",(e)=>{
		updateOrder2(id,document.getElementById("order").value,document.getElementById("total").value);			
	});

	document.getElementById("order").value=order;
	document.getElementById("total").value=total;

}
function updateOrder2(id,order,total){
	var orderUpdated={
		id:id,
		order:order,
		total:total
	}
	let db=firebase.database().ref("order/"+id);
	db.set(orderUpdated);
	document.getElementById("cardSection").innerHTML="";
	readOrder();
	reset();
}
function deleteOrder(id){
	console.log(id);
	var order=firebase.database().ref("order/"+id);
	order.remove();
	reset();
	document.getElementById("cardSection").innerHTML="";
	readOrder();
}

