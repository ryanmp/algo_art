side_bar_vis = true;

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

    this.randC1 = function () {
        /*this.r = getRandomInt(50, 255);
        this.g = getRandomInt(50, 100);
        this.b = getRandomInt(50, 150);
        this.o = .5;*/

        var rg = getRandomInt(0, 150);
        this.r = getRandomInt(0, 50) + Math.floor(rg * 0.5) + this.p1;
        this.g = rg + this.p2;
        this.b = getRandomInt(10, 50) + this.p3;
        this.o = .5;

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

$(document).ready(function () {

    quilt.init();
    quilt.run([quilt.starting_polygon], quilt.starting_iter);

    $('#sidebar ul li').click(function (e) {

        var is_active = $(this).hasClass("active");

        $('#sidebar ul li').removeClass("active");
        $('#sidebar ul li').addClass("link");

        if (!is_active) {

            $("#title").text($(this).attr('id').toUpperCase());
            quilt.init();
            quilt.run([quilt.starting_polygon], quilt.starting_iter);

            $(this).addClass("active");
            $(this).removeClass("link");

        }


    });


    $('#redraw').click(function (e) {
        quilt.clear();
        quilt.run([quilt.starting_polygon], quilt.starting_iter);
        $(this).blur();
    });

    $('#clear').click(function (e) {
        quilt.clear();
        $(this).blur();
    });

    $('#save').click(function (e) {
        var dataURL = quilt.canvas.toDataURL();
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
                left: "150px"
            }, 250);
            side_bar_vis = true;

        } else {
            $('#sidebar').animate({
                left: "-150px"
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