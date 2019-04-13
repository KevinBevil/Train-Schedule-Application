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


// -----------------------------------------------------------------------------
// Our click listener for the submit button
// We will capture the values in our variables and save them to firebase
$('#submit').on('click', function (event) {
   // To prohibit the page from refreshing
   event.preventDefault();

   // Assign the user's submitted values into our variables
   var trainName = $('#train-name-input').val().trim();
   var trainDestination = $('#destination-input').val().trim();
   var firstTrainTime = $('#train-time-input').val().trim();
   var frequency = $('#frequency-input').val().trim();

   // On 'submit' the form is reset
   $('form')[0].reset('');

   // A temporary object is created to house the new train values
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

// The listener for each child and new child in our database
database.ref().on("child_added", function (childSnapshot) {

   // Log the value of the various properties
   var trainName = childSnapshot.val().trainName;
   var trainDestination = childSnapshot.val().trainDestination;
   var firstTrainTime = childSnapshot.val().firstTrainTime;
   var frequency = parseInt(childSnapshot.val().frequency);

   // Doing some time conversions using moment.js in order
   // to display 'Next Arrival' and 'Minutes Away'
   var currentTime = moment();

   var firsTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
   var distanceFromOrigTime = moment().diff(moment(firsTrainTimeConverted), "minutes");
   var timeRemainder = distanceFromOrigTime % frequency;
   var timeTillNextTrain = frequency - timeRemainder;
   console.log('***: timeTillNextTrain', timeTillNextTrain);
   var nextArrival = currentTime.add(timeTillNextTrain, "minutes").format("HH:mm");
   console.log('***: nextArrival', nextArrival);

   $('tbody').append(`
      <tr>
         <td>${trainName}</td>
         <td>${trainDestination}</td>
         <td>${frequency}</td>
         <td>${nextArrival}</td>
         <td>${timeTillNextTrain}</td>
      </tr>
   `)

   // If any errors are experienced, log them to console.
}, function (errorObject) {
   console.log("The read failed: " + errorObject.code);
});


