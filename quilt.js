 var quilt = new function () {

     this.canvas
     this.ctx
     this.color1
     this.w
     this.h;
     this.starting_polygon = new Array();

     this.i = 6;
     this.starting_iter = 13;
     this.max_ratio = 3;
     this.skew = 0; //try values between 0 and 1
     this.min_squareness = 3;
     this.line_width = 1

     this.color_p1 = 0;
     this.color_p2 = 0;

     //starting color
     this.c1 = new Color(125, 125, 125, 1);
     this.c2 = new Color(255, 125, 125, 1);

     this.init = function () {
         this.canvas = document.getElementById('c');
         this.w = this.canvas.width = window.innerWidth - 40;
         this.h = this.canvas.height = window.innerHeight - 68;
         this.ctx = this.canvas.getContext('2d');
         this.starting_polygon = [
             {
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

     this.clear = function () {
         var c = new Color(255, getRandomInt(180, 230), 255, 1);

         this.skew = randRange(0, 0.7);

         this.color_p1 = getRandomInt(0, 100);
         this.color_p2 = getRandomInt(0, 100);
         this.color_p3 = getRandomInt(0, 200);

         this.ctx.fillStyle = c.toRGBA();
         this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
     }

     this.run = function (arr, counter) {
         this.line_width = randRange(0, 1);
         for (var i = 0; i < arr.length; i++) {

             //print1(arr[i]);
             c3 = new Color(0, 0, 0, 1);
             c3.p1 = this.color_p1;
             c3.p2 = this.color_p2;
             c3.p3 = this.color_p3;
             c3.randC1();
             this.draw_polygon(c3, arr[i]);

             var iter = 9; //checks for squareness
             while (iter > 0) {
                 iter--;
                 new_arr = this.split_polygon(arr[i]);
                 if (this.squareness(new_arr) < this.min_squareness) break;
             }

             if (counter > 0) {

                 this.run(new_arr, --counter);

             } else {
                 break;
             }
         };

     }

     //init();
     //run([starting_polygon], starting_iter);

     this.squareness = function (arr) {
         var area = 0;
         var len;
         var wid;
         for (var i = 0; i < arr.length; i++) {
             len = arr[i][1].x - arr[i][0].x;
             wid = arr[i][2].y - arr[i][1].y;
             area += Math.abs((len - wid) / Math.min(len, wid));
         };
         return area;
     }

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
         r1 = getRandomInt(2, this.max_ratio + 1);
         r2 = getRandomInt(1, r1 - 1) + getRandomInt(0, 1) * this.skew;
         r3 = r1 - r2;

         //just two possibilities hor or ver
         rp1 = getRandomInt(0, 1);
         rp2 = rp1 + 2;

         pt1.x = (p[(rp1) % 4].x * r2 + p[(rp1 + 1) % 4].x * r3) / r1;
         pt1.y = (p[(rp1) % 4].y * r2 + p[(rp1 + 1) % 4].y * r3) / r1;

         temp2 = r2;
         temp3 = r3;
         r1 = r1;
         r2 = temp3 + getRandomInt(0, 1) * this.skew;
         r3 = r1 - r2;

         pt2.x = (p[(rp2) % 4].x * r2 + p[(rp2 + 1) % 4].x * r3) / r1;
         pt2.y = (p[(rp2) % 4].y * r2 + p[(rp2 + 1) % 4].y * r3) / r1;

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

         if (rp1 == 1 && rp2 == 3) {
             p1[2] = pt1;
             p1[3] = pt2;
             p2[1] = pt1;
             p2[0] = pt2;
         }

         if (rp1 == 0 && rp2 == 2) {
             p1[1] = pt1;
             p1[2] = pt2;
             p2[3] = pt2;
             p2[0] = pt1;
         }

         return [p1, p2];
     }

     function print1(p) {
         var tempStr = "";
         for (i in p) {
             tempStr += p[i].x;
             tempStr += ",";
             tempStr += p[i].y;
             tempStr += " | ";
         }
         alert(tempStr);
     }

     this.draw_polygon = function (color, p) {

         this.ctx.fillStyle = color.toRGBA();
         this.ctx.lineWidth = this.line_width;
         this.ctx.strokeStyle = new Color(0, 0, 0, 0.2).toRGBA();
         this.ctx.beginPath();
         this.ctx.moveTo(p[0].x, p[0].y);
         for (i in p) {
             this.ctx.lineTo(p[i].x, p[i].y);
         }
         this.ctx.closePath();
         this.ctx.fill();
         this.ctx.stroke();
     }



 }