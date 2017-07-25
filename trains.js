/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyABq2nxfGxOhncbQAeZ5vxlK7D6X8eesNA",
    authDomain: "trainschedule-10bb2.firebaseapp.com",
    databaseURL: "https://trainschedule-10bb2.firebaseio.com",
    projectId: "trainschedule-10bb2",
    storageBucket: "",
    messagingSenderId: "776302169170"
  };

 



firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var traName = $("#train-input").val().trim();
  var traDes = $("#role-input").val().trim();
  var traStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var traFre = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding Train data
  var newTrain = {
    name: traName,
    destination: traDes,
    start: traStart,
    rate: traFre
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  // Alert
  alert("Train Schedule Updated");

  // Clears all of the text-boxes
  $("#train-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding train input to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

console.log(childSnapshot.val());

  // Store everything into a variable.
  var traName = childSnapshot.val().name;
  var traDes = childSnapshot.val().destination;
  var traStart = childSnapshot.val().start;
  var traFre = childSnapshot.val().rate;

  // Train Info
  console.log(traName);
  console.log(traDes);
  console.log(traStart);
  console.log(traFre);

  // Prettify the employee start
  var empStartPretty = moment.unix(traStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment.unix(traStart, "hh:mm",  "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * traFre;
  console.log(empBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + traName + "</td><td>" + traDes + "</td><td>" +
  empStartPretty + "</td><td>" + empMonths + "</td><td>" + traFre + "</td><td>" + empBilled + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
