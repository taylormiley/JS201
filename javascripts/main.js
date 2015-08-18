requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'lodash': '/bower_components/lodash/lodash.min',
    'firebase': '../bower_components/firebase/firebase',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "add", "delete"], 
  function ($, _, _firebase, Handlebars, bootstrap, add, deleteFam) {
  var myFirebaseRef = new Firebase("https://nss-taylor-family.firebaseio.com/");
  var storedFamilyData = [];

  myFirebaseRef.child("family").on("value", function(snapshot) {
    var family = snapshot.val();
    for (var key in family) {
      storedFamilyData.push(family[key]);
    }
    familyObject = {
      family: storedFamilyData
    };
    displayFamily(family);
  });

  function displayFamily(data) {
    require(['hbs!../templates/main'], function(template) {
      $('#family-list').html(template(data));
    });
  }

  $(document).on('click', '#addFamilyButton', function() {
    var newFam = {};
        newFam.name = $('#nameInput').val();
        newFam.age = $('#ageInput').val();
        newFam.skills = $('#skillsInput').val().split(", ");
        newFam.gender = $("input[name=inlineRadioOptions]:checked").val();
    console.log(newFam);
    add(newFam);
  });

  $(document).on('click', '#deleteButton', function(){
    var datakey = $(this).parent().attr('data-key');
    deleteFam(datakey);
  });

























  
});