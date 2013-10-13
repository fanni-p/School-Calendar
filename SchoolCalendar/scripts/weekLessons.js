/*(function(global) {  
    var WeekViewModel,
        app = global.app = global.app || {};
    
    WeekViewModel = kendo.data.ObservableObject.extend({
        weekDataSource: null,
        weeklessons:[],
        accessToken: localStorage.getItem("accessToken"),
        
        init: function (e) {
            var that = this,
                dataSource;
            
             kendo.bind(e.view.element, WeekViewModel);
             that.getData();
            /*kendo.data.ObservableObject.fn.init.apply(that, []);
            
            that.getData();
            dataSource = new kendo.data.DataSource.create({data: that.weeklessons, group: "day"});
            
       * }, 
        getData: function(){
            var that = this;
            
        }
    });  
    
    app.weekService = {
        viewModel: new WeekViewModel()
    };
})(window);*/




var app = app || {};

(function(a) {
    
    function getLessons() {
        var accessToken = localStorage.getItem("accessToken");
         httpRequester.getJSON(app.servicesBaseUrl + "lesson", accessToken)
            .then(function (lessons) {
                console.log(lessons)
                var dataSource = new kendo.data.DataSource({data: lessons, group:{field:"day"}});
                viewModel.set("lessons", dataSource); 
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