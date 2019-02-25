var population=10;
var childs=2;
var gMoot=30;
var bMoot=10;
var wi=10;
var epChanse=2.5;
var epPower=5;
var time=1;

document.getElementById("block1").innerHTML="start population: "+population;
document.getElementById("block2").innerHTML="max number of childs: "+childs;
document.getElementById("block3").innerHTML="good mutation chanse: "+gMoot;
document.getElementById("block4").innerHTML="bad mutation chanse: "+bMoot;
document.getElementById("block5").innerHTML="chanse of epedemy: "+epChanse;
document.getElementById("block6").innerHTML="epedemy power: "+epPower;
document.getElementById("block7").innerHTML="interval: "+time;

function slider(arg,min,max,value) {
    $(arg).slider({
      orientation: "vertical",
      range: "min",
      min: min,
      max: max,
      value:value,
      stop: function(event,ui){
        if(arg=="#sl1"){
          population=ui.value;
          wi=Math.sqrt(width/3*height/2/population);
          document.getElementById("block1").innerHTML="start population: "+population;
        }
        if(arg=="#sl2"){
          childs=ui.value;
          document.getElementById("block2").innerHTML="max number of childs: "+childs;
        }
        if(arg=="#sl3"){
          gMoot=ui.value;
          document.getElementById("block3").innerHTML="good mutation chanse: "+gMoot;
        }
        if(arg=="#sl4"){
          bMoot=ui.value;
          document.getElementById("block4").innerHTML="bad mutation chanse: "+bMoot;
        }
        if(arg=="#sl5"){
          epChanse=ui.value;
          document.getElementById("block5").innerHTML="chanse of epedemy: "+epChanse;
        }
        if(arg=="#sl6"){
          epPower=ui.value;
          document.getElementById("block6").innerHTML="epedemy power: "+epPower;         
        }
        if(arg=="#sl7"){
          time=ui.value;
          document.getElementById("block7").innerHTML="interval: "+time;
        }
      }
    });
  };

slider("#sl1",0,50,10);
slider("#sl2",0,5,2);
slider("#sl3",0,100,30);
slider("#sl4",0,100,10);
slider("#sl5",0,100,10);
slider("#sl6",0,100,10);
slider("#sl7",0,10,1)

$("#button").click(function(){
  $("#wrapper").toggleClass("inactive");
  $("#button").toggleClass("gosettings");
  $("#button").toggleClass("gomain");
})
