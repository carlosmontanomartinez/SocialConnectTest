app.service("accountService", ["$http", function ($http) {

    return {
        excAction: excAction
    };

    function excAction(model, url) {
        return $http({
            url: urlBase + url,
            method: "POST",
            data: model
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
        });
    };

}]);