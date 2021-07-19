
var h;
var m ;
var hours;
var minutes;
var string;
var hou;
var min;
var s;
  startTime();
  function startTime() {
    const today = new Date();
     h = today.getHours();
     m = today.getMinutes();
     s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    m=parseInt(m, 10);
       h=parseInt(h, 10);
        s=parseInt(s, 10);
    document.getElementById('alarm-txt').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
  }

  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }


    // $( "#alarm-submit" ).click(function() {
    //   hours = $("#alarm-hours").val();
    //   hours=parseInt(hours, 10);
    //    minutes = $("#alarm-Minutes").val();
    //   minutes = parseInt(minutes, 10);
    //    string=$("alarm-text").val() || "do your task";
    // });



function check(){
  $( ".alarm-submit" ).click(function() {
    hours = $("#alarm-hours").val()|| 0;
     hou=parseInt(hours, 10);
     minutes = $("#alarm-Minutes").val() || 0;
    min = parseInt(minutes, 10);
     string=$("#alarm-text").val() || "do your task";
  });
  if((hou===h)&&(min===m)&&(s===0)){

    $("#alarm-hours").val(0);
    $("#alarm-Minutes").val(0);
    $("#alarm-text").val('');
    alert(string);

  }
}


setInterval(check, 1000);

// if((hours===h)&&(minutes===m)){
//   alert(string);
// }
