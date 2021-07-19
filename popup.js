$(document).ready(function() {

  var realtime = 0;
  var timer;

  function fun(time) {
    timer = setInterval(function() {
      var hou = Math.floor(time / 3600);
      var min = Math.floor((time - hou * 3600) / 60);
      var sec = time % 60;
      if (hou < 10) {
        hou = "0" + hou;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      $(".time-h1").text(hou + ":" + min + ":" + sec);
      time--;
      realtime = time;
      if (time === 0) {
        clearInterval(timer);
        $('.stop').prop('disabled', false);
        $('.pause').prop('disabled', false);
        $('.resume').prop('disabled', false);
        $(".time-h1").text("Your Time Is Up!");
        // playing alarm_sound
        var audio = new Audio('beep.mp3');
        var alarm = setInterval(function() {
          audio.play();
        }, 100);
        $(".stop").click(function() {
          clearInterval(alarm);
          $('#start').prop('disabled', false);
          $(".time-h1").text("00:00:00");
            $(".timer-input").val(0);
        });
      }
    }, 1000);
  }

  // function starts when user clicks start button
  $("#start").click(function() {
    realtime = 0;
    var hours = $("#hours").val() || 0;
    realtime = realtime + (parseInt(hours, 10) * 3600);
    var minutes = $("#minutes").val() || 0;
    realtime = realtime + (parseInt(minutes, 10) * 60);
    var seconds = $("#seconds").val() || 0;
    realtime = realtime + (parseInt(seconds, 10));

    if (realtime > 0) {
      fun(realtime);
      $('#start').prop('disabled', true);
      $('.stop').prop('disabled', true);

    }
  });

  // when pause clicked
      $(".pause").click(function() {
        if(realtime>0){
        $('.resume').prop('disabled', false);
        $(".pause").prop('disabled',true);
        clearInterval(timer);
      }
      });
      // when resume clicked
      $(".resume").click(function() {
        if(realtime>0){
            fun(realtime);
          $('.resume').prop('disabled', true);
          $(".pause").prop('disabled',false);

        }
      });
// when reset clicked
$(".reset").click(function() {
  if(realtime>0){
    realtime=0;
clearInterval(timer);
  $(".time-h1").text("00:00:00");
  $('.btn').prop('disabled', false);
  $("input").val(0);
  }
});
});
// for alarm
