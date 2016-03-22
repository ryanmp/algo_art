var bezier_garden = new function () {

    this.canvas = document.getElementById('c');
    this.canvas.addEventListener("mousedown", doMouseDown, false);
    this.w = this.canvas.width = (window.innerWidth - 40) * 2;
    this.h = this.canvas.height = (window.innerHeight - 80) * 2;
    this.ctx = this.canvas.getContext('2d');

    this.num_flowers = 7;
    this.fs = [];

    //global variables
    this.fps = 60;
    this.interval = 1000 / this.fps;
    this.frame = 0;
    this.sf = Math.min(this.w, this.h) / 1.5; //scale factor

    this.grd = this.ctx.createRadialGradient(this.w / 2, this.h / 2, 0, this.w / 2, this.h / 2, this.sf * 1.2);
    this.grd.addColorStop(0, "rgba(255,255,255,.25)");
    this.grd.addColorStop(1, cb(rand(200, 255), rand(200, 255), rand(200, 255), 25));

    this.clear = function () {

        this.fs = [];
        this.num_flowers = 0;
        this.grd = this.ctx.createRadialGradient(this.w / 2, this.h / 2, 0, this.w / 2, this.h / 2, this.sf * 1.2);
        this.grd.addColorStop(0, "rgba(255,255,255,.25)");
        this.grd.addColorStop(1, cb(rand(200, 255), rand(200, 255), rand(200, 255), 25));

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
        this.add_flower(canvasX, canvasY);


    }

    this.init = function () {

        this.num_flowers = 7;
        this.fs = [];

    }

    this.animate = function (frame) {
        this.frame = frame
            //clear canvas
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = this.grd;

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);


        if (this.num_flowers > 0 && this.fs.length > 0) {

            for (var i = 0; i < this.num_flowers; i++) {
                this.draw_flower(this.sf * this.fs[i].size / 10, this.fs[i].petals * 2, 0, this.fs[i].rot / 15, this.fs[i].c, this.fs[i].x, this.fs[i].y);
            }
        }
    }


    this.runner = function () {
        //flowers!

        this.num_flowers = 7;
        for (var i = 0; i < this.num_flowers; i++) {
            this.fs.push({
                size: rand(1, 10),
                petals: rand(4, 12),
                rot: rand(-5, 5),
                c: [rand(100, 255), rand(100, 255), rand(100, 255)],
                x: this.canvas.width / 2,
                y: this.canvas.height / 2
            });
        }

        this.fs.sort(function (a, b) {
            return parseFloat(b.size) - parseFloat(a.size)
        });
    }

    function cb(r, g, b, o) {
        return "rgba(" + r + "," + g + "," + b + "," + o + ")";
    }

    this.add_flower = function (_x, _y) {
        this.fs.push({
            size: rand(1, 10),
            petals: rand(4, 12),
            rot: rand(-5, 5),
            c: [rand(100, 255), rand(100, 255), rand(100, 255)],
            x: _x,
            y: _y
        });
        this.num_flowers++;
    }

    this.draw_flower = function (_rad, _num_pts, init_angle, spin_vel, c, _x, _y) {

        this.ctx.shadowBlur = 0;
        this.ctx.lineWidth = 1;
        this.ctx.shadowColor = cb(c[0], c[1], c[2], 1);
        this.ctx.fillStyle = cb(c[0], c[1], c[2], .6);
        c2 = [Math.floor(c[0] / 1.6), Math.floor(c[1] / 1.6), Math.floor(c[2] / 1.6)];

        this.ctx.strokeStyle = cb(c2[0], c2[1], c2[2], 1);

        var pts = [];
        for (var i = 0; i <= _num_pts; i++) {
            var _a = (360 / _num_pts) * i + init_angle + this.frame * spin_vel;

            pts.push({
                x: P2L(_rad, _a).x,
                y: P2L(_rad, _a).y
            });
        }

        for (var i = 1; i <= _num_pts; i += 2) {
            idx = i % _num_pts;
            this.ctx.beginPath();
            this.ctx.moveTo(_x, _y);
            this.ctx.bezierCurveTo(_x + pts[i - 1].x, _y + pts[i - 1].y, _x + pts[idx + 1].x, _y + pts[idx + 1].y, _x, _y);
            this.ctx.stroke();
            this.ctx.fill();
        }
    }

    function rand(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    //polar to linear coordinate transform
    function P2L(r, angle) {
        var ret = {
            x: 0,
            y: 0
        };
        ret.x = Math.cos(angle * Math.PI / 180) * r;
        ret.y = Math.sin(angle * Math.PI / 180) * r;
        return (ret);
    }



}