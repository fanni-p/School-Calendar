(function (global) {
    app = global.app = global.app || {};

    document.addEventListener("deviceready", function () {
        app.servicesBaseUrl = "http://timetableservices.apphb.com/api/";
        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout", skin:"flat", transition:"slide"});
    }, false);
})(window);