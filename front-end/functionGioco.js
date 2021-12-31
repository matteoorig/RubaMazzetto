/*function impostaImg(){

    console.log("ciao");
    let src = document.getElementById("select_image").value;
    src.replaceAll('\',"/");
    console.log(src);
    let newText = '<img src="'+src+'">';
    console.log(newText);
    document.getElementById("target").innerHTML=newText;
}*/

function random(){

    
    var cont=0;
    var i=0;
    const tutteCarte = ["c1","c2","c3","c4","c5","c6","c7","cJ","cQ","cK","q1","q2","q3","q4","q5","q6","q7","qJ","qQ","qK","f1","f2","f3","f4","f5","f6","f7","fJ","fQ","fK","p1","p2","p3","p4","p5","p6","p7","pJ","pQ","pK"];
    const carteGiaUsate = [];
    const random = Math.floor(Math.random() * tutteCarte.length);
    console.log(tutteCarte[random]);
    carteGiaUsate[cont]=tutteCarte[random];
    console.log(carteGiaUsate[cont]);

    searchRandom();
}

var res = tutteCarte.sort(function() {
    return 0.5 - Math.random();
  });
  console.log(res.slice(a,3))


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
    }else if(data=="drag2"){
        document.getElementById('drag2').setAttribute('draggable', false);
    }else if(data=="drag3"){
        document.getElementById('drag3').setAttribute('draggable', false);
    }
    
}
/*FINE DRAG & DROP*/
