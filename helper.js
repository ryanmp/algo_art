function doMouseDown(event) {
    db[curr].doMouseDown(event);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randRange(min, max) {
    return Math.random() * (max - min) + min;
}

function Color(r, g, b, o) {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.o = 1;

    this.r = r;
    this.g = g;
    this.b = b;
    this.o = o;
    this.toRGBA = function () {
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.o + ")";
    }

    this.p1 = 0;
    this.p2 = 0;
    this.p3 = 0;

    this.fromHEX = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        this.r = parseInt(result[1], 16);
        this.g = parseInt(result[2], 16);
        this.b = parseInt(result[3], 16);
        this.o = 1;
    }

    this.randC1 = function () {
        var rg = getRandomInt(0, 150);
        this.r = getRandomInt(0, 50) + Math.floor(rg * 0.5) + this.p1;
        this.g = rg + this.p2;
        this.b = getRandomInt(10, 50) + this.p3;
        this.o = .5;
    }

    this.randC2 = function () {
        this.r = getRandomInt(70, 255);
        this.g = getRandomInt(70, 120);
        this.b = getRandomInt(70, 170);
        this.o = .06;
    }

}

function SaveToDisk(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || 'unknown';

        var event = document.createEvent('Event');
        event.initEvent('click', true, true);
        save.dispatchEvent(event);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE
    else if (!!window.ActiveXObject && document.execCommand) {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}