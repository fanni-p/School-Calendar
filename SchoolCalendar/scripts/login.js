/// <reference path="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha1.js" />

(function (global) {
    var LoginViewModel,
        app = global.app = global.app || {};

    LoginViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        username: "",
        password: "",
        accessToken: "",
        
        init: function () {
            var that = this;
            kendo.data.ObservableObject.fn.init.apply(that, []);
            
            that.set("accessToken", localStorage.getItem("accessToken"));
            
            if(that.accessToken != "" && that.accessToken != null){
                that.set("isLoggedIn", true); 
                that.set("username", localStorage.getItem("username"));
            }          
        },

        onLogin: function () {
            var that = this,
                username = that.get("username").trim(),
                password = that.get("password").trim();

            if (username === "" || password === "") {
                navigator.notification.alert("Both fields are required!",
                    function () { }, "Login failed", 'OK');

                return;
            }

            that.set("isLoggedIn", true);
            
            var userData = {
                username: username,
                authCode: CryptoJS.SHA1(username + password).toString()
            };

            httpRequester.postLogin(app.servicesBaseUrl + 'auth/token', userData).then(function(success) {
                that.accessToken = success.accessToken;
                localStorage.setItem("username", that.username);
                localStorage.setItem("accessToken", that.accessToken);
                console.log(success);
            }, function(error){
                console.log(error);
            });
        },

        onLogout: function () {
            var that = this;

            httpRequester.putLogout(app.servicesBaseUrl + 'user/logout', that.accessToken).then(function(success) {
                console.log(success);
            }, function(error){
                console.log(error);
            });
            
            that.clearForm();
            that.set("isLoggedIn", false);
        },

        clearForm: function () {
            var that = this;
            
            localStorage.setItem("username", "");
            localStorage.setItem("accessToken", "");
            that.set("accessToken", "");
            that.set("username", "");
            that.set("password", "");
        }
    });

    app.loginService = {
        viewModel: new LoginViewModel()
    };
})(window);