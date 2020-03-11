var x=document.getElementById("email")
var p=document.getElementById("password");
document.getElementById("form").addEventListener("submit",(ee)=>{
	ee.preventDefault();
	console.log(x.value);
	console.log(p.value);
	if (x.value== "admin@gmail.com" && p.value=="qwerty"){
			swal.fire({
				title:'Welcome',
				html:'Access Granted',
				type:'success'
			});
			setTimeout(()=>{
				loadpage();
			},3000);

	}else{
		swal.fire({
		title:'Error',
		html:'Access Denied',
		type:'error'
		});
	}

function loadpage(){
	window.location.href="./admin.html";
}
});