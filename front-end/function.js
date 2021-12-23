

function btnGioca(){

    const nickname = document.querySelector("#nickname").value;
    const indIp = document.querySelector("#indIP").value;

    if(nickname==""){
        alert("INSERIRE IL NICKNAME");
    }
    else if(indIp==""){
        alert("INSERIRE L'INDIRIZZO IP DEL PROPRIO AVVERSARIO");
    }
    else{
        console.log(nickname);
        console.log(indIp);
    }
}