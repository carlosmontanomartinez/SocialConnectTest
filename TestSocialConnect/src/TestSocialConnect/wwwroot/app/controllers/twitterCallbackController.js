app.controller('twitterCallbackController', ["$scope", "$window", "twitterCallbackFactory", "$cookies",
    function ($scope, $window, twitterCallbackFactory, $cookies) {
        localStorage.removeItem("T2j__tMz");
        localStorage.setItem("T2j__tMz", twitterCallbackFactory.Token);
        var expirationCookie = new Date();
        expirationCookie.setMinutes(expirationCookie.getMinutes() + 30);
        $cookies.put("_rs7ea", twitterCallbackFactory.Token, { expires: expirationCookie });
        $window.close();
    }]);