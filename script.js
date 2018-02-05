
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBxP9gs40CWkqSsbCkvB-rziKkeC9--uTk",
  authDomain: "fir-trains-d045f.firebaseapp.com",
  databaseURL: "https://fir-trains-d045f.firebaseio.com",
  projectId: "fir-trains-d045f",
  storageBucket: "fir-trains-d045f.appspot.com",
  messagingSenderId: "769902149963"
};
firebase.initializeApp(config);

$("#submit").on("click",function(){
  event.preventDefault();
  var newTrain = {
    name : $("#train-name").val().trim(),
    destination : $("#train-destination").val().trim(),
    firstTime : $("#train-first-time").val().trim(),
    frequency : $("#train-frequency").val().trim()
  };
  firebase.database().ref().push(newTrain)
})
firebase.database().ref().on("value",function(snapshot){
  for (i in snapshot.val()){
    console.log(snapshot.val()[i])
    newrow = $("<tr>")
    .append("<td>"+snapshot.val()[i]["name"])
    .append("<td>"+snapshot.val()[i]["destination"])
    .append("<td>"+snapshot.val()[i]["frequency"])
    .append("<td>"+snapshot.val()[i]["firstTime"]);
    $("#trains-list").append(newrow)
  };
})