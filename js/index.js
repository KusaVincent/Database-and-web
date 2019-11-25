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

//TODO
//firebase.analytics();

console.log(firebase);

$("#btn-signin").click(function () {
    // console.log("Sign in Clicked");

    var email = $("#email").val();
    var password = $("#password").val();

    if (email == "" && password == "") {
        window.alert("Please enter the details");

    } else {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {

            var errCode = error.code;
            var message = error.message;

            window.alert("You have an error " + message);
        });
    }

});



$("#btn-signup").click(function () {

    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();

    if (email != "" && password != "" && confirmPassword != "") {

        if (password == confirmPassword) {

            firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {

                window.alert("Your Signup successful with name " + user.displayName);

            }, function (error) {

                var errCode = error.code;
                var message = error.message;

                window.alert("You have an error " + message);


            });


        } else {
            window.alert("both the passwords must be same");
        }


    } else {
        window.alert("Please enter the details");
    }
});


$("#btn-resetPassword").click(function () {

    var auth = firebase.auth();
    var emailAddress = $("#email").val();

    if (emailAddress != "") {
        auth.sendPasswordResetEmail(emailAddress).then(function () {
            // Email sent.
            window.alert("An email is sent please check your inbox.");
        }).catch(function (error) {
            // An error happened.
            console.log("Email sending error " + error.message);
        });
    } else {
        window.alert("Please enter the email");
    }
});

$("#btn-update").click(function () {

    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var country = $("#country").val();
    var phone = $("#phone").val();
    var gender = $("#gender").val();
    var address = $("#address").val();
    var bio = $("#bio").val();

    if (firstName != "" && lastName != "" && country != "" && phone != "" && address != "" && bio != "" && gender != "") {

        console.log(firstName, lastName, country, phone, gender, address, bio);

        var user = firebase.auth().currentUser;
        console.log(user);

        var databaseRef = firebase.database().ref().child("Users");
        var userRef = databaseRef.child(user.uid);

        var userData = {
            "firstName": firstName,
            "lastName": lastName,
            "country": country,
            "phone": phone,
            "gender": gender,
            "address": address,
            "bio": bio
        }

        userRef.set(userData, function (error) {

            if (error) {
                window.alert("upload unsuccessful with error message " + error.message);
            } else {
                window.alert("upload successful");
                window.location.href = "mainPage.html";
            }

        });

    } else {
        window.alert("Please fill all the details!");
    }



});


function switchView(view) {

    $.get({
        url: view,
        cache: false
    }).then(function (data) {
        $("#container").html(data);
    });

}