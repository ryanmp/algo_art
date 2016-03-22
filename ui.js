    db = {
        "quilt": quilt,
        "branches": branches,
        "angles": angles,
        "bezier_garden": bezier_garden
    }
    curr = "quilt";

    var frame = 0
    var fps = 60



    $(document).ready(function () {

        function draw() {
            setTimeout(function () {
                window.requestAnimationFrame(draw);

                if (db[curr].animate) {
                    db[curr].animate(frame);
                }



                frame += 1;
            }, 1000 / fps);
        }
        draw();



        $("#title").text(curr.toUpperCase());

        side_bar_vis = true;



        db[curr].init();
        db[curr].runner();

        $('#sidebar ul li').click(function (e) {

            var is_active = $(this).hasClass("active");

            if (!is_active) {

                $('#sidebar ul li').removeClass("active");
                $('#sidebar ul li').addClass("link");

                $("#title").text($(this).attr('id').toUpperCase());

                curr = $(this).attr('id');

                db[curr].init();
                db[curr].runner();

                $(this).addClass("active");
                $(this).removeClass("link");

            }


        });


        $('#redraw').click(function (e) {

            db[curr].clear();
            db[curr].runner();

            $(this).blur();
        });

        $('#clear').click(function (e) {
            db[curr].clear();
            $(this).blur();
        });

        $('#save').click(function (e) {
            var dataURL = db[curr].canvas.toDataURL();
            //document.getElementById('canvasImg').src = dataURL;
            SaveToDisk(dataURL, "canvas-experiments-quilt");
        });

        //ui logic
        $('.dropdown-menu').find('form').click(function (e) {
            e.stopPropagation();
        });

        $("#opt-start-len").keyup(function () {
            start_len = $(this).val();
        }).keyup();

        $("#opt-start-width").keyup(function () {
            start_width = $(this).val();
        }).keyup();

        $("#opt-branches").keyup(function () {
            branches = $(this).val();
        }).keyup();

        $("#opt-len-dec").keyup(function () {
            len_dec = $(this).val();
        }).keyup();

        $('.back1').click(function (event) {
            event.preventDefault();
            if (!side_bar_vis) {
                $('#sidebar').animate({
                    left: "0px"
                }, 250);
                $('#article').animate({
                    left: "159px"
                }, 250);
                side_bar_vis = true;

            } else {
                $('#sidebar').animate({
                    left: "-159px"
                }, 250);
                $('#article').animate({
                    left: "0px"
                }, 250);
                side_bar_vis = false;

            }
        });

        $(function () {
            $("[data-toggle2='tooltip']").tooltip({
                placement: "bottom"
            });
        });

        $("[data-toggle2='tooltip']").click(function () {
            $(this).tooltip("destroy");

        });

    });