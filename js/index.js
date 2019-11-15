var firebaseConfig = {
  apiKey: "AIzaSyDF7Mt6g9LaOHm46an9Zc6RSfS3Za2UEF4",
  authDomain: "invo-627f9.firebaseapp.com",
  databaseURL: "https://invo-627f9.firebaseio.com",
  projectId: "invo-627f9",
  storageBucket: "invo-627f9.appspot.com",
  messagingSenderId: "848481445459",
  appId: "1:848481445459:web:4dcbac42eeea60d5f748a6",
  measurementId: "G-TBZDV0CVWN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth.Auth.Persistence.LOCAL;

$("#btn-signup").click(function() {
  var email = $("#email").val();
  var password = $("#password").val();
  var cPassword = $("#confirmpassword").val();

  if (email != "" && password != "" && cPassword != "") {
    if (password == cPassword) {
      var result = firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      result.catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message : " + errorMessage);
      });
    } else {
      window.alert("Password do not match");
    }
  } else {
    window.alert("fill all fields");
  }
});

$("#btn-login").click(function() {
  var email = $("#email").val();
  var password = $("#password").val();

  if (email != "" && password != "") {
    var result = firebase.auth().signInWithEmailAndPassword(email, password);
    result.catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);

      window.alert("Message : " + errorMessage);
    });
  } else {
    window.alert("fill all fields");
  }
});

$("#btn-resetPassword").click(function() {
  var auth = firebase.auth();
  var email = $("#email").val();

  if (email != "") {
    auth
      .sendPasswordResetEmail(email)
      .then(function() {
        window.alert("Email has been sent please verify");
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message : " + errorMessage);
      });
  } else {
    window.alert("enter email first");
  }
});

$("#btn-logout").click(function() {
  firebase.auth().signOut();
});

$("#btn-update").click(function() {
  var phone = $("#phone").val();
  var address = $("#address").val();
  var bio = $("#bio").val();
  var firstName = $("#firstName").val();
  var secondName = $("#secondName").val();
  var gender = $("#gender").val();
  var country = $("#country").val();

  var rootRef = firebase
    .database()
    .ref()
    .child("Users");
  var userID = firebase.auth().currentUser.uid;
  var usersRef = rootRef.child(userID);

  if (
    firstName != "" &&
    secondName != "" &&
    phone != "" &&
    address != "" &&
    bio != "" &&
    gender != "" &&
    country != ""
  ) {
    var userData = {
      phone: phone,
      address: address,
      bio: bio,
      firstName: firstName,
      secondName: secondName,
      gender: gender,
      country: country
    };
    usersRef.set(userData, function(error) {
      if (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message : " + errorMessage);
      } else {
        window.location.href = "MainPage.html";
      }
    });
  } else {
    window.alert("fill all fields first");
  }
});
