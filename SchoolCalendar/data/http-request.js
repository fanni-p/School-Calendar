(function (global) {
    function getJSON(url, accessToken){
        var promise = new RSVP.Promise(function(resolve, reject){
            $.ajax({
                url:url,
                type:"GET",
                dataType:"json",
                contentType:"application/json",
                timeout:10000,
                beforeSend: function (xhr) {
                  xhr.setRequestHeader('X-accessToken', accessToken);
                },
                success:function(data){
                    resolve(data);
                },
                error:function(err){
                    reject(err);
                }
            });
        });
        return promise;
    }
    
     function postLogin(url, data) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                timeout: 10000,
                data: JSON.stringify(data),
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }
    
    function postJSON(url, data, accessToken) {
       var promise = new RSVP.Promise(function(resolve, reject){
            $.ajax({
                url:url,
                type:"POST",
                dataType:"json",
                contentType:"application/json",
                timeout:10000,
                data: JSON.Stringify(data),
                beforeSend: function (xhr) {
                  xhr.setRequestHeader('X-accessToken', accessToken);
                },
                success:function(data){
                    resolve(data);
                },
                error:function(err){
                    reject(err);
                }
            });
        });
        return promise;
    }
    
    function putJSON(url, data, accessToken) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                type: "PUT",
                dataType: "json",
                contentType: "application/json",
                timeout: 10000,
                data: JSON.stringify(data),
				beforeSend: function (xhr) {
                  xhr.setRequestHeader('X-accessToken', accessToken);
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }
    
    function putLogout(url, accessToken) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                type: "PUT",
                dataType: "json",
                contentType: "application/json",
                timeout: 10000,
				beforeSend: function (xhr) {
                  xhr.setRequestHeader('X-accessToken', accessToken);
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    global.httpRequester = {
        getJSON: getJSON,
        postJSON: postJSON,
        postLogin: postLogin,
        putJSON: putJSON,
        putLogout: putLogout
    };  
})(window);