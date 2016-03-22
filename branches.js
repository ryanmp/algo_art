var branches = new function () {

    //global vars
    this.canvas,
        this.ctx,
        this.color1 = new Color(125, 125, 125, 1);
    this.start_len = 200; //make this about 80
    this.len_dec = 22;
    this.branches = 3;
    this.start_width = 5;
    this.min_length = 10;
    this.min_angle = 0;
    this.max_angle = 360;

    this.init = function () {
        this.canvas = document.getElementById('c');
        this.w = this.canvas.width = (window.innerWidth - 40) * 2;
        this.h = this.canvas.height = (window.innerHeight - 80) * 2;
        this.canvas.addEventListener("mousedown", doMouseDown, false);
        this.ctx = this.canvas.getContext('2d');
        this.clear();
    }

    this.runner = function () {
        this.run(this.start_len, {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        }, this.color1, {
            min: this.min_angle,
            max: this.max_angle
        });
    }


    //called recursively
    this.run = function (r2, arr, color2, range) {
        var range2 = range;
        var color3 = new Color(0, 0, 0, 1);
        color3 = color2;
        r2 -= this.len_dec;
        color3.o = r2 / this.start_len * .7 + .3;
        color3.r += 1 * Math.round(Math.random() * 2 - 1);
        if (color3.r > 255) color3.r = 255;
        if (color3.r < 0) color3.r = 0;
        color3.g += 1 * Math.round(Math.random() * 2 - 1);
        if (color3.g > 150) color3.g = 150;
        if (color3.g < 100) color3.g = 100;

        /*range2.min-=.01; range2.max+=.01;
        if (range2.min<0) range2.min = 0;
        if (range2.max>360) range2.max = 360;*/

        for (var i = 0; i < this.branches; i++) {

            var temp;
            temp = this.radial_line(arr, {
                r: r2,
                theta: (randRange(range2.min, range2.max) / 360) * Math.PI * 2
            }, color3, r2 * this.start_width / this.start_len);
            if (r2 > this.min_length) {
                this.run(r2, temp, color3, range2);
            }
        }


    }


    /* theta can go from 0 to 2pi */
    /* returns ending point just for fun */
    this.radial_line = function (start, polar, color, width) {
        var end = {
            x: start.x + polar.r * Math.cos(polar.theta),
            y: start.y + polar.r * Math.sin(polar.theta)
        }
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.strokeStyle = color.toRGBA();
        this.ctx.lineWidth = width;
        this.ctx.stroke();
        return end;
    }



    this.doMouseDown = function (event) {
        var totalOffsetX = 0;
        var totalOffsetY = 0;
        var canvasX = 0;
        var canvasY = 0;
        var currentElement = this.canvas;

        do {
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        }
        while (currentElement = currentElement.offsetParent)

        var curr_w = $("#c").width();
        var curr_h = $("#c").height();


        canvasX = (event.pageX - totalOffsetX) * this.w / curr_w;
        canvasY = (event.pageY - totalOffsetY) * this.h / curr_h;

        this.run(200, {
            x: canvasX,
            y: canvasY
        }, this.color1, {
            min: this.min_angle,
            max: this.max_angle
        });
    }


    this.clear = function () {
        var grd_angle = getRandomInt(0, this.canvas.height);
        var grd = this.ctx.createLinearGradient(this.canvas.width, 0, 0, grd_angle);
        var start_color = new Color(getRandomInt(230, 255), getRandomInt(190, 255), getRandomInt(230, 255), 1);
        var end_color = new Color(getRandomInt(200, 255), getRandomInt(220, 255), getRandomInt(180, 255), 1);
        grd.addColorStop(0, start_color.toRGBA());
        grd.addColorStop(1, end_color.toRGBA());

        this.ctx.fillStyle = grd;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }






}