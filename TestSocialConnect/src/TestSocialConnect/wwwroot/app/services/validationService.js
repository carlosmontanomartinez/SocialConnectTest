app.service("validationService", ["$http", "$sessionStorage", function ($http, $sessionStorage) {
    var onlyNumbers = function (which) {
        if (which === 8 || (which > 47 && which < 58)) {
            return true;
        }
        return false;
    }

    var onlyLetters = function (which) {
        if (which >= 97 && which <= 122 || which >= 65 && which <= 90
            || which == 32 || which == 241 || which == 209 || which == 225 || which == 233
            || which == 237 || which == 243 || which == 250 || which == 193 || which == 201 || which == 205
            || which == 211 || which == 218 || which == 252) {

                return true;
        }
        return false;
    }

    return {
        onlyNumbers: onlyNumbers,
        onlyLetters: onlyLetters
    }
}]);