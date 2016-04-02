angular.module('starter.controllers', [])

.controller("LoginCtrl", function($scope, $state, $firebaseAuth) {
    
    var fb = new Firebase("https://lab9.firebaseio.com/");
    var fbAuth = $firebaseAuth(fb);

    $scope.login = function(username, password) {
        console.log(username+","+password);
        fbAuth.$authWithPassword({
            email: username,
            password: password
        }).then(function(authData) {
            $state.go("tab.dash");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }

    $scope.register = function(username, password) {
        fbAuth.$createUser({email: username, password: password}).then(function(userData) {
            return fbAuth.$authWithPassword({
                email: username,
                password: password
            });
        }).then(function(authData) {
            $state.go("tab.dash");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }

})

.controller('DashCtrl', function($scope, $http) {
    $scope.calcSimpleInterest = function(principle, term, rate) {
    var reqUrl = "http://restlab10.amaxdsuktr.us-west-2.elasticbeanstalk.com/labassignment/calculate/si/"+principle+"/"+term+"/"+rate
    $http({
        method: 'GET',
        url: reqUrl
    })
    .success(function(response){
        console.log(response.SimpleInterest);
        $scope.calcStatus = true;
        $scope.message = "Simple Interest is "+response.SimpleInterest;
        return response.SimpleInterest;
    })
    }
    
    $scope.testSI = function(p,t,r) {
        var amt = p*t*r;
        var amt = amt/100;
        return amt;
    }
    
})

.controller('ChatsCtrl', function($scope, $http) {
    $scope.convertFahrenheit = function(kelvin) {
        var reqUrl = "http://restlab10.amaxdsuktr.us-west-2.elasticbeanstalk.com/labassignment/metrics/kelvintoF/"+kelvin;
        $http({
            method: 'GET',
            url: reqUrl
        })
        .success(function(response) {
            console.log(response.Fahrenheit);
            $scope.convertStatus = true;
            $scope.message = kelvin + "K to Fahrenheit is " + response.Fahrenheit;
        })
    }
    
    $scope.testKtoF = function(k) {
        var k = (k - 273.15) * 1.8 + 32.0;
        k = Math.round(k);
        return k;
    }
    
    $scope.convertCelcius = function(kelvin) {
     var reqUrl = "http://restlab10.amaxdsuktr.us-west-2.elasticbeanstalk.com/labassignment/metrics/kelvintoC/"+kelvin;
        $http({
            method: 'GET',
            url: reqUrl
        })
        .success(function(response) {
            console.log(response.Celcius);
            $scope.convertStatus = true;
            $scope.message = kelvin + "K to Celcius is " + response.Celcius;
        })
    }
    
    $scope.testKtoC = function(kelvin) {
        var c = kelvin - 273.15;
        return c;
    }
})


.controller('AccountCtrl', function($scope, $http) {
  $scope.calcCompoundInterest = function(principle, term, cnum, rate) {
      var reqUrl = "http://restlab10.amaxdsuktr.us-west-2.elasticbeanstalk.com/labassignment/calculate/ci/"+principle+"/"+rate+"/"+cnum+"/"+term;
      $http({
          method: 'GET',
          url: reqUrl
      }).success(function(response){
          console.log(response.CompoundInterest);
          $scope.calcStatus = true;
          $scope.message = "Compound Interest is "+response.CompoundInterest
          return response.CompoundInterest;
      })
  }
  
  $scope.testCI = function(p,r,t,n) {
      var ci = p * (1+r/n);
      var temp = n*t;
      var ci = Math.pow(ci, temp);
      return ci;
  }
});