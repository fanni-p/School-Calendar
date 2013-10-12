(function (global) {
    var CameraViewModel,
        app = global.app = global.app || {};

    CameraViewModel = kendo.data.ObservableObject.extend({
    _pictureSource: null,
    _destinationType: null,
    
    capturePhoto: function() {
        var that = this;
        that._pictureSource = navigator.camera.PictureSourceType;
	    that._destinationType = navigator.camera.DestinationType;
        // Take picture using device camera and retrieve image as base64-encoded string.
        navigator.camera.getPicture(function(){
            that._onPhotoDataSuccess.apply(that,arguments);
        },function(){
            that._onFail.apply(that,arguments);
        },{
            quality: 50,
            destinationType: that._destinationType.DATA_URL
        });
    },
    
    _capturePhotoEdit: function() {
        var that = this;
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string. 
        // The allowEdit property has no effect on Android devices.
        navigator.camera.getPicture(function(){
            that._onPhotoDataSuccess.apply(that,arguments);
        }, function(){
            that._onFail.apply(that,arguments);
        }, {
            quality: 20, allowEdit: true,
            destinationType: cameraApp._destinationType.DATA_URL
        });
    },
    
    _getPhoto: function(source) {
        var that = this;
        // Retrieve image file location from specified source.
        navigator.camera.getPicture(function(){
            that._onPhotoURISuccess.apply(that,arguments);
        }, function(){
            cameraApp._onFail.apply(that,arguments);
        }, {
            quality: 50,
            destinationType: cameraApp._destinationType.FILE_URI,
            sourceType: source
        });
    },
    
    _onPhotoDataSuccess: function(imageData) {
        var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'block';
    
        // Show the captured photo.
        smallImage.src = "data:image/jpeg;base64," + imageData;
    },
    
    _onPhotoURISuccess: function(imageURI) {
        var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'block';
         
        // Show the captured photo.
        smallImage.src = imageURI;
    },
    
    _onFail: function(message) {
        alert(message);
    }
    });

    app.cameraService = {
        viewModel: new CameraViewModel()
    };
})(window);