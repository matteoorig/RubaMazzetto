/*function impostaImg(){

    console.log("ciao");
    let src = document.getElementById("select_image").value;
    src.replaceAll('\',"/");
    console.log(src);
    let newText = '<img src="'+src+'">';
    console.log(newText);
    document.getElementById("target").innerHTML=newText;
}*/





/*DRAG & DROP*/
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    if(data=="drag1"){
      document.getElementById('drag1').setAttribute('draggable', false);
      document.getElementById('drag1').setAttribute("class","cartaPosizionata");
    }else if(data=="drag2"){
        document.getElementById('drag2').setAttribute('draggable', false);
        document.getElementById('drag2').setAttribute("class","cartaPosizionata");
    }else if(data=="drag3"){
        document.getElementById('drag3').setAttribute('draggable', false);
        document.getElementById('drag3').setAttribute("class","cartaPosizionata");
    }
    
}
/*FINE DRAG & DROP*/
