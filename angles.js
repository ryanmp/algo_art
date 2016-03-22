 var angles = new function () {

     //global vars
     this.canvas;
     this.ctx;
     this.color1;
     this.w;
     this.h;
     this.starting_polygon = new Array();
     this.starting_iter = 11;
     this.i = 6;

     //starting color
     this.c1 = new Color(125, 125, 125, 1);
     this.c2 = new Color(255, 125, 125, 1);

     this.init = function () {
         this.canvas = document.getElementById('c');
         this.w = this.canvas.width = (window.innerWidth - 40) * 2;
         this.h = this.canvas.height = (window.innerHeight - 80) * 2;
         this.canvas.addEventListener("mousedown", doMouseDown, false);
         this.ctx = this.canvas.getContext('2d');


         this.starting_polygon = [{
             x: 0,
             y: 0
            }, {
             x: this.w,
             y: 0
            }, {
             x: this.w,
             y: this.h
            }, {
             x: 0,
             y: this.h
            }];



         var dataURL = this.canvas.toDataURL();

         this.clear();

     }


     this.doMouseDown = function (event) {
         console.log("doMouseDown");
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

         var new_poly = [{
             x: canvasX,
             y: canvasY
            }, {
             x: this.w,
             y: 0
            }, {
             x: this.w,
             y: this.h
            }, {
             x: 0,
             y: this.h
            }];

         this.run([new_poly], 6);


     }

     this.clear = function () {
         var grd = this.ctx.createLinearGradient(0, 0, this.w, this.h);
         var start_color = new Color(getRandomInt(150, 255), getRandomInt(150, 255), getRandomInt(150, 255), 1);
         var end_color = new Color(getRandomInt(150, 255), getRandomInt(150, 255), getRandomInt(150, 255), 1);

         grd.addColorStop(0, start_color.toRGBA());
         grd.addColorStop(1, end_color.toRGBA());
         this.ctx.fillStyle = grd;

         this.ctx.fillRect(0, 0, this.w, this.h);
     }


     this.runner = function () {
         this.run([this.starting_polygon], this.starting_iter);
     }

     this.run = function (arr, counter) {

         for (var i = 0; i < arr.length; i++) {
             //print1(arr[i]);
             c3 = new Color(0, 0, 0, 1);
             c3.randC2();
             this.draw_polygon(c3, arr[i]);
             new_arr = this.split_polygon(arr[i]);
             if (counter > 0) {
                 this.run(new_arr, --counter);
             } else {
                 break;
             }
         };

     }

     //this.init();
     //this.run([starting_polygon], 11);

     //var dataURL = this.canvas.toDataURL();
     //document.getElementById('canvasImg').src = dataURL;


     this.split_polygon = function (p) {
         var pt1, pt2, p1, p2, slopes;
         pt1 = {
             x: 0,
             y: 0
         };
         pt2 = {
             x: 0,
             y: 0
         };
         p1 = new Array();
         p2 = new Array();

         //pick two points on two separate edges of the polygon..
         //drawing a line for testing


         r1 = getRandomInt(2, 6);
         r2 = getRandomInt(1, r1 - 1);
         r3 = r1 - r2;
         rp1 = rp2 = getRandomInt(0, 3);
         while (rp2 == rp1) {
             rp2 = getRandomInt(0, 3);
         }

         pt1.x = (p[(rp1) % 4].x * r2 + p[(rp1 + 1) % 4].x * r3) / r1;
         pt1.y = (p[(rp1) % 4].y * r2 + p[(rp1 + 1) % 4].y * r3) / r1;

         r1 = getRandomInt(2, 20);
         r2 = getRandomInt(1, r1 - 1);
         r3 = r1 - r2;

         pt2.x = (p[(rp2) % 4].x * r2 + p[(rp2 + 1) % 4].x * r3) / r1;
         pt2.y = (p[(rp2) % 4].y * r2 + p[(rp2 + 1) % 4].y * r3) / r1;

         this.ctx.beginPath();
         this.ctx.moveTo(pt1.x, pt1.y);
         this.ctx.lineTo(pt2.x, pt2.y);
         this.ctx.lineWidth = .05;
         this.ctx.stroke();

         //now we have 6 points... use these to return 2 polygons..    
         for (var i = 0; i < p.length; i++) {
             p1[i] = {
                 x: p[i].x,
                 y: p[i].y
             };
             p2[i] = {
                 x: p[i].x,
                 y: p[i].y
             };

         }

         p1[rp1] = pt1;
         p1[rp1 + 1] = pt2;

         p2[rp2] = pt1;
         p2[rp2 + 1] = pt2;

         return [p1, p2];
     }

     this.draw_polygon = function (color, p) {

         this.ctx.fillStyle = color.toRGBA();
         this.ctx.beginPath();
         this.ctx.moveTo(p[0].x, p[0].y);
         for (i in p) {
             this.ctx.lineTo(p[i].x, p[i].y);
         }
         this.ctx.closePath();
         this.ctx.fill();
     }



 }