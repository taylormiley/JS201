define(["jquery"], function($) {
  
  return function(datakey) {
    var myFirebaseRef = new Firebase("https://nss-taylor-family.firebaseio.com/");
    myFirebaseRef.child("family").child(datakey).set({});

  };
    

});