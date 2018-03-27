//  Initialize Firebase
    $(document).ready(function(){
    var config = {
    apiKey: "AIzaSyCNGBmF7XeKf99cVzvqImJOZEPSQgL8Jnk",
    authDomain: "train-scheduler-a58f2.firebaseapp.com",
    databaseURL: "https://train-scheduler-a58f2.firebaseio.com",
    projectId: "train-scheduler-a58f2",
    storageBucket: "train-scheduler-a58f2.appspot.com",
    messagingSenderId: "608349306411"
  };
  firebase.initializeApp(config);
var database = firebase.database();

//  Button for adding Trains
$("#add-train-btn").on("click", function(event) {

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = $("#time-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName ,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

   // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);
  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

//  Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency  = childSnapshot.val().frequency;
   // Prettify the train start
  var trainStartTime = moment(trainStart,"HH:mm");
  var arrivalTime = trainStartTime.add(parseInt(trainFrequency),'m');

   // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination  + "</td><td>" +
 trainStart + "</td><td>" + trainFrequency  + "</td> <td> "+ arrivalTime.format('HH:mm')+"</td></tr>");
});
});
