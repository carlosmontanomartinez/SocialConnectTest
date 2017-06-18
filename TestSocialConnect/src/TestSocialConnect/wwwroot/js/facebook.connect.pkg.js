window.fbAsyncInit = function () {
    var x = FB.init({
        appId: 772904349527252,
        status: true,
        cookie: true,
        oauth: true,
        xfbml: true
    });
};

(function (d) {
    var js, id = 'facebook-jssdk';
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = '//connect.facebook.net/es_LA/all.js';
    d.getElementsByTagName('head')[0].appendChild(js);
}(document));