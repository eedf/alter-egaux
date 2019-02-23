var filename = "";
$(':file').on('change', function() {
    var file = this.files[0];
    if (file.size > 1024*500) {
        alert('max upload size is 500ko');
	$("#fileform")[0].reset();
    }
	filename = file.name;
	
});

$('#upload').on('click', function() {
	sendfile();
});
function sendfile(){
	var xhr = new XMLHttpRequest();
	xhr.upload.onprogress = function(e) {
		var percent = parseInt((e.position/ e.totalSize)*100);
		document.querySelector("progress").value = 50;
	};
	xhr.onreadystatechange = function(e) {
		if(this.readyState === 4) {
			// Handle file upload complete
		}
	};
	xhr.open('POST', 'fileupload', true);
	xhr.onload = function(oEvent) {
    	if (xhr.status == 200) {
      		console.log("Envoyé !");
			document.querySelector("progress").value =100 ;
			$("progress").hide();
			$("#preview").attr("src","actionpics/"+filename);
			$("#preview").show();
    	} else {
      		console.log("Erreur " + xhr.status + " lors de la tentative d’envoi du fichier.<br \/>");
    	}
  	};
	xhr.send(new FormData(document.querySelector("form")));
}