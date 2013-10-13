(function (global) {
    var AddLessonViewModel,
        app = global.app = global.app || {};

    AddLessonViewModel = kendo.data.ObservableObject.extend({
        isLessonAdded: false,
        subject: "",
        day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        startTime: "",
        endTime: "",
        room: "",
        selectedDay:"",

        addLesson: function () {
            var that = this,
                subject = that.get("subject").trim(),
                selectedDay = that.get("selectedDay"),
                startTime = that.get("startTime").trim(),
                endTime = that.get("endTime").trim(),
                room = that.get("room").trim();

            if (subject === "" || room === "" || startTime === "" || endTime === "" || selectedDay === "") {
                navigator.notification.alert("All fields are required!",
                    function () { }, "Add lesson failed", 'OK');

                return;
            }

            that.set("isLessonAdded", true);
            
            var userData = {
                subject: subject,
                day: selectedDay,
                startTime: startTime,
                endTime: endTime,
                room: room
            };
            
            var accessToken = localStorage.getItem("accessToken");

            httpRequester.postJSON(app.servicesBaseUrl + 'lesson', userData, accessToken)
            .then(function(success) {
                console.log(success);
                that.clearForm();
            }, function(error){
                console.log(error);
            });
        },

        clearForm: function () {
            var that = this;
            
            that.set("subject", "");
            that.set("selectedDay", "");
            that.set("startTime", "");
            that.set("endTime", "");
            that.set("room", "");
        }
    });

    app.addLessonService = {
        viewModel: new AddLessonViewModel()
    };
})(window);