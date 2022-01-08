

const carta = document.querySelector(".handCards");
const playTable = document.getElementById("pt");

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
  if (data == "dragc1") {
    document.getElementById("dragc1").setAttribute("draggable", false);
    document.getElementById("dragc1").setAttribute("ondrop", false);
    document.getElementById("dragc1").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragc2") {
    document.getElementById("dragc2").setAttribute("draggable", false);
    document.getElementById("dragc2").setAttribute("ondrop", false);
    document.getElementById("dragc2").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragc3") {
    document.getElementById("dragc3").setAttribute("draggable", false);
    document.getElementById("dragc3").setAttribute("ondrop", false);
    document.getElementById("dragc3").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragc4") {
    document.getElementById("dragc4").setAttribute("draggable", false);
    document.getElementById("dragc4").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragc5") {
    document.getElementById("dragc5").setAttribute("draggable", false);
    document.getElementById("dragc5").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragc6") {
    document.getElementById("dragc6").setAttribute("draggable", false);
    document.getElementById("dragc6").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragc7") {
    document.getElementById("dragc7").setAttribute("draggable", false);
    document.getElementById("dragc7").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragcJ") {
    document.getElementById("dragcJ").setAttribute("draggable", false);
    document.getElementById("dragcJ").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragcQ") {
    document.getElementById("dragcQ").setAttribute("draggable", false);
    document.getElementById("dragcQ").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragcK") {
    document.getElementById("dragcK").setAttribute("draggable", false);
    document.getElementById("dragcK").setAttribute("class", "cartaPosizionata");
  } // FINE CUORI
  else if (data == "dragq1") {
    document.getElementById("dragq1").setAttribute("draggable", false);
    document.getElementById("dragq1").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragq2") {
    document.getElementById("dragq2").setAttribute("draggable", false);
    document.getElementById("dragq2").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragq3") {
    document.getElementById("dragq3").setAttribute("draggable", false);
    document.getElementById("dragq3").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragq4") {
    document.getElementById("dragq4").setAttribute("draggable", false);
    document.getElementById("dragq4").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragq5") {
    document.getElementById("dragq5").setAttribute("draggable", false);
    document.getElementById("dragq5").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragq6") {
    document.getElementById("dragq6").setAttribute("draggable", false);
    document.getElementById("dragq6").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragq7") {
    document.getElementById("dragq7").setAttribute("draggable", false);
    document.getElementById("dragq7").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragqJ") {
    document.getElementById("dragqJ").setAttribute("draggable", false);
    document.getElementById("dragqJ").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragqQ") {
    document.getElementById("dragqQ").setAttribute("draggable", false);
    document.getElementById("dragqQ").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragqK") {
    document.getElementById("dragqK").setAttribute("draggable", false);
    document.getElementById("dragqK").setAttribute("class", "cartaPosizionata");
  } // FINE QUADRI
  if (data == "dragf1") {
    document.getElementById("dragf1").setAttribute("draggable", false);
    document.getElementById("dragf1").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragf2") {
    document.getElementById("dragf2").setAttribute("draggable", false);
    document.getElementById("dragf2").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragf3") {
    document.getElementById("dragf3").setAttribute("draggable", false);
    document.getElementById("dragf3").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragf4") {
    document.getElementById("dragf4").setAttribute("draggable", false);
    document.getElementById("dragf4").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragf5") {
    document.getElementById("dragf5").setAttribute("draggable", false);
    document.getElementById("dragf5").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragf6") {
    document.getElementById("dragf6").setAttribute("draggable", false);
    document.getElementById("dragf6").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragf7") {
    document.getElementById("dragf7").setAttribute("draggable", false);
    document.getElementById("dragf7").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragfJ") {
    document.getElementById("dragfJ").setAttribute("draggable", false);
    document.getElementById("dragfJ").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragfQ") {
    document.getElementById("dragfQ").setAttribute("draggable", false);
    document.getElementById("dragfQ").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragfK") {
    document.getElementById("dragfK").setAttribute("draggable", false);
    document.getElementById("dragfK").setAttribute("class", "cartaPosizionata");
  } // FINE FIORI
  else if (data == "dragp1") {
    document.getElementById("dragp1").setAttribute("draggable", false);
    document.getElementById("dragp1").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragp2") {
    document.getElementById("dragp2").setAttribute("draggable", false);
    document.getElementById("dragp2").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragp3") {
    document.getElementById("dragp3").setAttribute("draggable", false);
    document.getElementById("dragp3").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragp4") {
    document.getElementById("dragp4").setAttribute("draggable", false);
    document.getElementById("dragp4").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragp5") {
    document.getElementById("dragp5").setAttribute("draggable", false);
    document.getElementById("dragp5").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragp6") {
    document.getElementById("dragp6").setAttribute("draggable", false);
    document.getElementById("dragp6").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragp7") {
    document.getElementById("dragp7").setAttribute("draggable", false);
    document.getElementById("dragp7").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragpJ") {
    document.getElementById("dragpJ").setAttribute("draggable", false);
    document.getElementById("dragpJ").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragpQ") {
    document.getElementById("dragpQ").setAttribute("draggable", false);
    document.getElementById("dragpQ").setAttribute("class", "cartaPosizionata");
  } else if (data == "dragpK") {
    document.getElementById("dragpK").setAttribute("draggable", false);
    document.getElementById("dragpK").setAttribute("class", "cartaPosizionata");
  } // FINE PICCHE
}
/*FINE DRAG & DROP*/
