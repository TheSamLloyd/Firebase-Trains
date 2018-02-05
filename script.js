
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
firebase.database().ref().on("child_added",function(snapshot){
  console.log(snapshot.val())
  newrow = $("<tr>")
  .append("<td>"+snapshot.val()["name"])
  .append("<td>"+snapshot.val()["destination"])
  .append("<td>"+moment.duration({minutes : snapshot.val()["frequency"]}).humanize())
  .append("<td>"+nextTime(snapshot.val()["frequency"],snapshot.val()["firstTime"]).format("hh:mm a"))
  .append("<td>"+minutesOut(snapshot.val()["frequency"],snapshot.val()["firstTime"]));
  $("#trains-list").append(newrow)
})
function nextTime(frequency,firstTime){
  frequency=parseInt(frequency);
  return moment(firstTime,"HH:mm").add(frequency*Math.ceil((moment().unix()-moment(firstTime, "HH:mm").unix())/(60*frequency)),"minutes")
}
function minutesOut(frequency,firstTime){
  return nextTime(frequency,firstTime).fromNow(false)
}
nextTime("16:30","44")