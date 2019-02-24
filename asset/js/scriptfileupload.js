var filename = "";

$(':file').on('change', function() {
    var file = this.files[0];
    if (file.size > 1024*500) {
        alert('max upload size is 500ko');
		$("#fileform")[0].reset();
    }
	filename = file.name;
	$("progress").attr("hidden",false);
	$("#upload").attr("hidden",false);
});

$('#upload').on('click', function() {
	document.querySelector("progress").value =50 ;
	ajax(new FormData(document.getElementById("fileform")),'fileupload',true);
	/*$.post('fileupload',new FormData(document.getElementById("fileform")),function(answer){
		document.querySelector("progress").value =100 ;
		$("progress").attr("hidden",true);
		$("#preview").attr("src","actionpics/"+filename);
		$("#preview").attr("hidden",false);
		$("#upload").attr("hidden",true);
	});*/
	document.querySelector("progress").value = 0;
});
$('#sauvegarder').click(function() {
	var data={};
	jQuery.each( $("#descriptionaction").serializeArray(), function( i, field ) {
		data[field.name]= field.value;
	});
	console.log(data);
	/*data["filename"]=filename;
	//ajax(data,'addaction',true);
	$.post("addaction",data,function(answer){
		alert("Projet déposé avec succés, un modérateur vérifiera les informations avant de les publier");
	});
	/*$("#fileform")[0].reset();
	$("#descriptionaction")[0].reset();
	$("#preview").attr("hidden","true");*/
	
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
			console.log("Envoyé avec succés");
    	} else {
      		console.log("Erreur " + xhr.status + " lors de la tentative d’envoi du fichier.<br \/>");
    	}
  	};
	xhr.send(data);
}

$("#reset").on("click",function(){
	$("#fileform")[0].reset();
	$("#descriptionaction")[0].reset();
	$("#preview").attr("hidden","true");
});