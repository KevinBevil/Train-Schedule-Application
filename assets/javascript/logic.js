// Initializing firebase app
var config = {
   apiKey: "AIzaSyCG5wtG3wpKC_YWWithG7DTs830NkDzB7o",
   authDomain: "gt-lol-97ce5.firebaseapp.com",
   databaseURL: "https://gt-lol-97ce5.firebaseio.com",
   projectId: "gt-lol-97ce5",
   storageBucket: "gt-lol-97ce5.appspot.com",
   messagingSenderId: "616394503544"
};
firebase.initializeApp(config);

//  Assigning reference to our firebase database called 'database'
var database = firebase.database();


//  Assigning variables for our new train information
var trainName = '';
var trainDestination = '';
var firstTrainTime = '';
var frequency;
var trains = [];

// Our click listener for the submit button
// We will capture the values in our variables and save them to firebase
$('#submit').on('click', function (event) {
   // To prohibit the page from refreshing
   event.preventDefault();

   // Assign the user's submitted values into our variables
   trainName = $('#train-name-input').val().trim();
   trainDestination = $('#destination-input').val().trim();
   firstTrainTime = $('#train-time-input').val().trim();
   frequency = $('#frequency-input').val().trim();

   // On 'submit' the form is reset
   $('form')[0].reset('');

   var newTrain = {
      trainName: trainName,
      trainDestination: trainDestination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
   }
   // Database new object pushed into it
   database.ref().push(newTrain);
})



// -------------------------------------------------------------------

// database.ref().on("child_added", function(snapshot) {

//    // Print the initial data to the console.
//    console.log(snapshot.val());

//    // Log the value of the various properties
//    console.log(snapshot.val().trainName);
//    console.log(snapshot.val().trainDestination);
//    console.log(snapshot.val().firstTrainTime);
//    console.log(snapshot.val().frequency);

//    console.log(database.ref())
//    // If any errors are experienced, log them to console.
//  }, function(errorObject) {
//    console.log("The read failed: " + errorObject.code);
//  });


