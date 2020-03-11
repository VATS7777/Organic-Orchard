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
function renderTable(){
	var order=firebase.database().ref("order/");
	order.on("child_added",function(data){
		var orderValue=data.val();
		document.getElementById("table").innerHTML+=`
		<tr>
			<td> ${orderValue.id}</td>
			<td> ${orderValue.order}</td>
			<td> ${orderValue.total}</td>
		</tr>
		`;
	});
};