(function(){
    var w, h, sw, sh, ratio;
    var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    video = document.getElementById('video'),
    vendorUrl = window.URL || window.webkitURL;
    
    video.addEventListener('loadedmetadata', function() {
        ratio = video.offsetWidth / video.offsetHeight;
        w = video.offsetWidth;
        h = parseInt(w / ratio, 10);
        sw = w*0.15;
        sh = parseInt(sw / ratio, 10);
        canvas.width = w;
        canvas.height = h;
    }, false);

    video.addEventListener('play', function () {
        var $this = this; //cache
        (function loop() {
            if (!$this.paused && !$this.ended) {

                context.save();
                context.scale(-1, 1);
                context.drawImage($this, 0, 0, w*-1, h);
                context.restore();

                context.save();
                context.scale(-1, 1);
                context.drawImage($this, -10, 10, sw*-1, sh);
                context.restore();
                
                // context.save();
                // context.scale(-1, 1);
                // context.drawImage($this, -220, 0, -100, 100);
                // context.restore();

                setTimeout(loop, 1000 / 30); // drawing at 30fps
            }
        })();
    }, 0);
    
    navigator.getMedia = navigator.getUserMedia ||
                     navigator.webkitGetUserMedia ||
                     navigator.mozGetUserMedia ||
                     navigator.msGetUserMedia; 
    
    
    
    navigator.getMedia({
        video: true,
        audio: true
    }, function(stream){
    
        video.srcObject = stream;
        video.play();
    }, function(error){
    //Error occured!
    });

})();