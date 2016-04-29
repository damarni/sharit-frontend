angular.module('app.services', [])

  .factory('StubsFactory', ['$http', function ($http) {
    return [
      {
        name: 'Hammer',
        imgUrl: 'assets/img/s3H3Hyn0Rn0tv96qQEsc_martillo.jpg',
        stars: 3,
        description: "Deixo el meu martell de fusta. és nou de fa poc i es troba en perfectes condicions. També serveix per treure claus.",
        lastSharit: "Fa una setmana",
        ownerName: "Dani Gil",
        location: "51.503333, -0.127500"

      },
      {
        name: 'Stairs',
        imgUrl: 'assets/img/SCoBGo4hTsChNUhEKt1B_escalera-madera.jpg',
        stars: 5,
        description: "Deixo la meva escala. És de mida mitjana i pesa poc.",
        lastSharit: "Fa un mes",
        ownerName: "Xavi Pedrals",
        location: "38.897778,-77.036667"
      },
      {
        name: 'Taladro (Trepant)',
        imgUrl: 'assets/img/VjM6q6RuSv2jUaKFFdtA_taladro.JPG',
        stars: 4,
        description: "Deixo la meu taladro. És gran i fa uns bons forats.",
        lastSharit: "Fa 3 dies",
        ownerName: "Marçal Peiró",
        location: "44.419246, 38.205275"
      }
    ]
  }])

  .factory('FileService', function () {
    var images;
    var IMAGE_STORAGE_KEY = 'images';

    function getImages() {
      var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
      if (img) {
        images = JSON.parse(img);
      } else {
        images = [];
      }
      return images;
    }

    function addImage(img) {
      images.push(img);
      window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
    }

    return {
      storeImage: addImage,
      images: getImages
    }
  })

  .factory('ImageService', ['$cordovaCamera', 'FileService', '$q', '$cordovaFile', '$cordovaImagePicker', function ($cordovaCamera, FileService, $q, $cordovaFile, $cordovaImagePicker) {
    function makeid() {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    function optionsForType(type) {
      var source;
      switch (type) {
        case 0:
          source = Camera.PictureSourceType.CAMERA;
          break;
        case 1:
          source = Camera.PictureSourceType.PHOTOLIBRARY;
          break;
      }
      return {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: source,
        targetWidth: 200,
        targetHeight: 200,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        //popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
    }

    function saveMedia(type) {
      return $q(function (resolve, reject) {
        var options = optionsForType(type);

        // if(type = 1) {
          $cordovaCamera.getPicture(options).then(function (imageUrl) {
            //console.log("imageUrl-> " + imageUrl);
            console.log(imageUrl.indexOf('?'));
            var realUri = null;
            if(imageUrl.indexOf('?') != -1){
              realUri = imageUrl.substr(0, imageUrl.indexOf('?'));
              //console.log("realUri-> " + realUri);
            } else {
              realUri = imageUrl;
              //console.log("realUri-> " + realUri);
            }
            var name = realUri.substr(realUri.lastIndexOf('/') + 1);
            //console.log("name-> " + name);
            var namePath = realUri.substr(0, realUri.lastIndexOf('/') + 1);
            //console.log("namePath-> " + namePath);

            var newName = makeid() + name;
            $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
              .then(function (info) {
                FileService.storeImage(newName);
                resolve();
              }, function (e) {
                reject();
              });
          });
      })
    }

    function uploadImagesToServer(serverUrl, imagesUrl, options) {
      if(options === null){
        options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = "prova";
        options.mimeType = "text/plain";
      }
      if(serverUrl == null){
        serverUrl = "http://52.34.79.154:8080/user/putItem";
      }
      

    }

    return {
      handleMediaDialog: saveMedia
    }
  }])


.factory('ImageUploaderService', ['FileService', '$cordovaFile', '$cordovaFileTransfer', function (FileService, $cordovaFile, $cordovaFileTransfer) {
  var options = new FileUploadOptions();
  options.fileKey = "file";
  options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
  options.mimeType = "text/plain";

  function uploadSingleImageToServer(url, imagePath) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "text/plain";
  }

}]);


$cordovaFileTransfer.upload(server, filePath, options)
  .then(function(result) {
    // Success!
  }, function(err) {
    // Error
  }, function (progress) {
    // constant progress updates
  });

