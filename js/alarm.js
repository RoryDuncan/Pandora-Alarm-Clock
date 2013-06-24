Data = {};
Data.url = "www.pandora.com";
Data.setAlarm = function() {

  //retrieve value from the input form
    var inputValue = $('input#time').val();

  //set in the Data object
    Data.alarm = inputValue;
    Data.alarmSet = true;
    console.log("Alarm set for", inputValue);
    if (inputValue.length === 0) {
      $('.saved')[0].innerHTML = "Don't forget to set a time.";
    }
    else {
      $('.saved')[0].innerHTML = "Alarm set for " + inputValue + ".";
      $('.saved').fadeIn();
      hideArrows();
    }


};

Data.getURL = function() {

  var inputValue = $('input#url').val();
  
  //set in the Data object
  if (inputValue.length <= 7) {
    Data.url = "www.pandora.com";
  }
  else Data.url = inputValue;
  console.log("url:", Data.url);
};

Data.checkTimes = function() {

  // Data.currentTime is kept updated via Clock.updateClock

  if (Data.currentTime === Data.alarm) {

    $('div.clock')[0].innerHTML = "BEEP BEEP BEEP"
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
    var timeOfDay = ( currentHours < 12 ) ? "am" : "pm";

    // Convert the hours component to 12-hour format if needed
    currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

    // Convert an hours component of "0" to "12"
    currentHours = ( currentHours == 0 ) ? 12 : currentHours;

    // Compose the string for display
    var currentTimeString = currentHours + ":" + currentMinutes + "" + timeOfDay;

    // Update the time display
    $('div.clock')[0].innerHTML = currentTimeString;
    $('.clock').fadeIn("slow");

  };



