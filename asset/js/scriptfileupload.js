var filename = "";

$(':file').on('change', function() {
    var file = this.files[0];
    if (file.size > 1024*2000) {
        alert('Fichier trop grand, taille maximum autorisée est 2Mo');
		$("#fileform")[0].reset();
    }
	filename = file.name;
	$("progress").attr("hidden",false);
	$("#upload").attr("hidden",false);
});
var uploadhit=false;
$('#upload').on('click', function() {	
	if(!uploadhit){
		var intervalID;
		ajax(new FormData(document.getElementById("fileform")),'fileupload',true);
		intervalID=setInterval(function(){
			if(document.querySelector("progress").value==100){
				clearInterval(intervalID);
			}else{
				document.querySelector("progress").value +=25 ;
			}
		},1000);
		//document.querySelector("progress").value =100 ;
		$("progress").attr("hidden",true);
		$("#preview").attr("src","actionpics/"+filename);
		$("#preview").attr("hidden",false);
		$("#upload").attr("hidden",true);
		document.querySelector("progress").value = 0;
		uploadhit=true;
	}
});
var savehit=false;
$("button[name='sauvegarder']").on("click",function() {
	if(!savehit){
		var data={};
		jQuery.each( $("#descriptionaction").serializeArray(), function( i, field ) {
			data[field.name]= field.value;
		});
		data["filename"]=filename;
		$.post("addaction",data,function(answer){
			alert("Projet déposé avec succés, un modérateur vérifiera les informations avant de les publier");
		});
		savehit=true;
	}
});




function ajax(data,url,async){
	var xhr = new XMLHttpRequest();
	xhr.upload.onprogress = function(e) {
		/*var percent = parseInt((e.position/ e.totalSize)*100);
		document.querySelector("progress").value = 10;*/
	};
	xhr.onreadystatechange = function(e) {
		if(this.readyState === 4) {
			// Handle file upload complete
			console.log("Envoyé !");
		}
	};
	xhr.open('POST', url, async);
	xhr.onload = function(oEvent) {
		//document.querySelector("progress").value =25 ;
		console.log(xhr.status);
		if (xhr.status == 200) {
			console.log("reçu avec succés");
    	} else {
      		console.log("Erreur " + xhr.status + " lors de la tentative d’envoi du fichier.<br \/>");
    	}
  	};
	xhr.send(data);
}

$("#reset").on("click",function(){
	reset();
});
function reset(){
	$("#fileform")[0].reset();
	$("#descriptionaction")[0].reset();
	$("#preview").attr("hidden","true");
	uploadhit=true;
	savehit=true;
}
