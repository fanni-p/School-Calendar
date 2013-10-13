(function (global) {
    app = global.app = global.app || {};

    document.addEventListener("deviceready", function () {
        app.servicesBaseUrl = "http://timetableservices.apphb.com/api/";
        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout", skin:"flat", transition:"slide"});
        document.addEventListener("offline", onOffline, false);
    }, false);
    
    function onOffline() {
        navigator.notification.vibrate(2000);
        navigator.notification.alert("You need a connection to use this app.", function() {
            navigator.app.exitApp();
        }, "No connection", "Exit");
    }
})(window);