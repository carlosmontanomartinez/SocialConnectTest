app.controller("accountController", ["accountService", "$scope", "$location", "$sce", "$window",
    function (accountService, $scope, $route, $location, $sce, messagesService, $window) {
        var vm = this;
        urlBase = "";
        $scope.regexEmail = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/;
        $scope.requiredMail = false;
        $scope.twitterDisabled = false;
        $scope.faceBookDisabled = false;

        $scope.showPlaceholder = true;

       
        $scope.loginDisabled = true;

        //Functions
        vm.focusUsr = focusUsr;
        vm.login = login;
        vm.logout = logout;
        vm.navigateTo = navigateTo;
        vm.loginFacebook = loginFacebook;
        vm.loginTwitter = loginTwitter;
        vm.loginGoogle = loginGoogle;
        
        var oauthToken;
        var buttonDisabled;

        init();
        function init() {
           
        }    

        function focusUsr(loginForm) {
            $scope.loginDisabled = true;
            if (typeof (loginForm.email.$viewValue) !== 'undefined' && loginForm.email.$viewValue !== "") {
                $scope.emailValid = loginForm.email.$invalid;
                
                if (typeof (loginForm.password) !== 'undefined' && typeof (loginForm.password.$viewValue) !== 'undefined' && loginForm.password.$viewValue !== "" && !$scope.emailValid)
                    $scope.loginDisabled = false;



                if (loginForm.email !== null && loginForm.email.$viewValue.length > 100) {
                    $scope.emailValid = true;
                }
                $scope.requiredMail = false;
            } else {
                $scope.emailValid = false;
            }
        }

        function login(formUsr) {            
            if (formUsr.$valid) {
                var model = {
                    Email: vm.usr.email,
                    password: vm.usr.password
                };
           
                accountService.excAction(model, '/Account/Login')
                  .then(function (response) {
                      if (response.message !== null) {
                          swal({
                              title: "Error",
                              text: response.message,
                              type: "error",
                              confirmButtonText: 'Aceptar'
                          });
                      }
                      else {
                          localStorage.setItem("T2j__tMz", response.sToken);
                          var expirationCookie = new Date();
                          expirationCookie.setMinutes(expirationCookie.getMinutes() + 30);
                          $cookies.put("_rs7ea", response.sToken, { expires: expirationCookie });
                          vm.usr.email = null;
                          vm.usr.password = null;
                      }
                  });

            } else {
                swal({
                    title: "Error",
                    text: $scope.message.completeUsr,
                    type: "error",
                    confirmButtonText: 'Aceptar'
                });
          
          
                if (typeof ($scope.loginForm.email.$viewValue) !== 'undefined' && $scope.loginForm.email.$viewValue !== "") {
                    $scope.emailValid = $scope.loginForm.email.$invalid;
                    $scope.requiredMail = false;
                } else {
                    $scope.emailValid = false;
                    $scope.requiredMail = true;
                }

                $scope.pwdRequired = typeof (vm.usr) === "undefined";
                if (!$scope.pwdRequired)
                    $scope.pwdRequired = typeof (vm.usr.password) === "undefined";
            }
        }

        function logout() {
            accountService.excAction({ Email: $scope.order_model.user.email }, '/Account/Logout')
                  .then(function (response) {
                      if (response === "") {
                          $scope.order_model.user = {};
                          $cookies.remove("_rs7ea");
                          $("#PasswordPlaceholder").show();
                          $("#UserPlaceholder").show();
                          $(".idlogin__body").hide();
                          $(".idlogin").removeClass("js-active");
                          $sessionStorage.dom_model.back_action.showBack = true;
                      }
                      else {
                          swal({
                              title: "Error",
                              text: response.message,
                              type: "error",
                              confirmButtonText: 'Aceptar'
                          });
                      }
                  });
        }

        function loginFacebook() {
            FB.login(
                function (response) {
                    if (response.authResponse !== null) {
                        try {
                            FB.api('/me', {
                                fields: 'email'
                            }, function (response) {
                                if (!response || response.error) {
                                    swal({
                                        title: "Error",
                                        text: "Ocurrió un error.",
                                        type: "error",
                                        confirmButtonText: 'Aceptar'
                                    });
                                } else {
                                    console.log(response);
                                    swal({
                                        title: "Succes",
                                        text: "Autenticado",
                                        type: "success",
                                        confirmButtonText: 'Aceptar'
                                    });
                                }
                            });
                        } catch (e) {
                            swal({
                                title: "Error",
                                text: "Lo sentimos, ha ocurrido un error.",
                                type: "error",
                                confirmButtonText: 'Aceptar'
                            });
                        }
                    }
                }
            )
        };

        function loginTwitter() {
            $scope.twitterDisabled = true;
            
            accountService.excAction({}, '/Account/GetTokenTwitter')
            .then(function (response) {
                $window.open(response.auth_url, "", "width=500, height=400");
            });
        };

        function loginGoogle() {
            gapi.auth.signIn({
                cookiepolicy: "single_host_origin",
                callback: function (OAuth) {
                    if (OAuth['status']['signed_in']) {
                        gapi.client.load('plus', 'v1', function () {
                            if (OAuth['access_token']) {
                                if (oauthToken !== OAuth['access_token'])
                                {
                                    oauthToken = OAuth['access_token'];
                                    accountService.excAction({ oauthToken: oauthToken }, '/Account/GoogleCallback')
                                   .then(function (response) {
                                       if (response.Data.sToken !== null) {
                                           var expirationCookie = new Date();
                                           expirationCookie.setMinutes(expirationCookie.getMinutes() + 30);
                                           $cookies.put("_rs7ea", response.Data.sToken, { expires: expirationCookie });
                                           localStorage.setItem("T2j__tMz", response.Data.sToken);
                                       }
                                       else {
                                           swal({
                                               title: "Error",
                                               text: response.Data.message,
                                               type: "error",
                                               confirmButtonText: 'Aceptar'
                                           });
                                       }
                                   });
                                }
                            } else if (OAuth['error']) {
                                console.log(OAuth['error']);
                            }
                        });
                    }
                }
            });
        }

        function navigateTo() {
            $location.path(urlBase + "/boletos");
        }

    }]);