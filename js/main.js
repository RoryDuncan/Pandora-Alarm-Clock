

var Data = {
  url : "www.pandora.com",
  alarmTime : 0,
  alarmSet : false,
  currentTime : 0
};

Data.debug = function() {

  console.log( "Data:", this.url, this.alarmTime, this.alarmSet);

};

Data.getClockInput = function() {

  //retrieve value from the input form
    var inputValue = $('input[name=alarmTime]').val();

  //set in the Data object
    Data.alarmTime = inputValue;

};

Data.getURL = function() {

  var inputValue = $('input[name=urlTargetInput]').val();

  //set in the Data object
    Data.url = inputValue;

};

Data.checkTimes = function() {

  // Data.currentTime is kept updated via Clock.updateClock

  if (Data.currentTime === Data.alarmTime) {

    console.log("Redirecting...");
    window.location.assign("http://"+Data.url)
  }

};

var Clock = {};

Clock.updateClock = function() {

  /*if alarm is set, it rides-along the interval of this clock */

  if (Data.alarmSet === true) Data.checkTimes();

  //Data.debug();

    var currentTime = new Date ();

    var currentHours = currentTime.getHours ( );
    var currentMinutes = currentTime.getMinutes ( );
    var currentSeconds = currentTime.getSeconds ( );

    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

    //add useful data to be accessable later
    tempHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
    Data.currentTime = tempHours + ":" + currentMinutes;

    // Choose either "AM" or "PM" as appropriate
    var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

    // Convert the hours component to 12-hour format if needed
    currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

    // Convert an hours component of "0" to "12"
    currentHours = ( currentHours == 0 ) ? 12 : currentHours;

    // Compose the string for display
    var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

    // Update the time display
    document.getElementById("clock").firstChild.nodeValue = currentTimeString;

  };

/*  ====================
        Events
    ====================*/



$('input[name=alarmTime]').change(Data.getClockInput);  //event for updating the alarm

$('input[name=urlTargetInput]').change(Data.getURL);    //event for updating the URL target



$('input[name=setAlarmTime]').click( function() {
  //    This is the effect for when you click on the button to set the alarm 
    if (Data.alarmSet === false) {
      Data.alarmSet = true;
      $("input[name=setAlarmTime]").val("alarm: Set");
    }
    else if (Data.alarmSet === true) {
      Data.alarmSet = false;
      $("input[name=setAlarmTime]").val("alarm:Not Set");
    }

 } );



$('input[name=urlTarget]').click( function() {

  //    This is the effect for when you click on the button to change the url
    if ($('input[name=urlTargetInput]').css("width")  === "0px") {
      $('input[name=urlTargetInput]').css("width", "210px");
     }
    else if ($('input[name=urlTargetInput]').css("width")  === "210px") {
      $('input[name=urlTargetInput]').css("width", "0px");
     }

});


//        visual effect so that the buttons are understandable
  $('input[name=urlTarget]').mouseover( function() {

    if ($('input[name=urlTargetInput]').css("width")  === "0px") {
      $("input[name=urlTarget]").val("Change url?")
    }
    else if ( $('input[name=urlTargetInput]').css("width")  === "210px" ) {
      $("input[name=urlTarget]").val("Save");
    }
    
  } );



  $('input[name=urlTarget]').mouseout( function(){ 
  //        visual effect so that the buttons are understandable #2

    if ($('input[name=urlTargetInput]').css("width")  === "0px") {
      // remove the "www."
      var n = Data.url;
      n = n.slice(4, n.length);

      $("input[name=urlTarget]").val("url: "+ n)
    }
    else if ( $('input[name=urlTargetInput]').css("width")  === "210px" ) {

      $("input[name=urlTarget]").val("Save");
    }

  } ); 

window.setInterval(Clock.updateClock, 500);
document.addEventListener('DOMContentLoaded', Clock.setClockForm, false);
