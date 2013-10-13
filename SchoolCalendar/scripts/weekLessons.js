var app = app || {};

(function(a) {
    
    function getLessons() {
        var accessToken = localStorage.getItem("accessToken");
        httpRequester.getJSON(app.servicesBaseUrl + "lesson", accessToken)
            .then(function (lessons) {
                console.log(lessons)
                viewModel.set("lessons", lessons);          
            }, function(error){
                console.log(error);
            }); 
    }
    
    var viewModel = kendo.observable({
        lessons:[],
        getLessons: getLessons
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        getLessons();
    }   
    
    a.lessons = {
        init:init          
    };
}(app));