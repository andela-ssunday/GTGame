app.service('gtResources', function() {

    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];
    this.load = function(urlOrArr) {
      var _load = this._load;
        if(urlOrArr instanceof Array) {
            
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {

            this._load(urlOrArr);
        }
    }
    this._load = function(url) {
        //var isReady = this.isReady;
       var isReady = function() {
          var ready = true;
           for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
       }

        if(resourceCache[url]) {

            return resourceCache[url];
        } else {

            var img = new Image();
            
            img.onload = function() {

                resourceCache[url] = img;

 
                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }
    this.get = function(url) {
        return resourceCache[url];
    }

    this.onReady = function(func) {
        readyCallbacks.push(func);
    }
    this.Resources = {
        load: this.load,
        get: this.get,
        onReady: this.onReady,
        isReady: this.isReady
    };
});