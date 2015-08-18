define(["jquery", "q"], function($, Q) {
  
  return function(newFam) {
    var deferred = Q.defer();

    $.ajax({
        url: "https://nss-taylor-family.firebaseio.com/family.json",
        method: "POST",
        data: JSON.stringify(newFam)
      })
      .done(function(newFam) {
        deferred.resolve(newFam);
        console.log("newFam", newFam);
      })
      .fail(function(xhr, status, error) {
        deferred.reject(error);
      });  

    return deferred.promise;
  };

});