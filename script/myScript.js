/**
 * Created by laurentmeyer on 07/09/15.
 */


$(window).resize(resizeAndRedrawCanvas);
$(window).ready(resizeAndRedrawCanvas);

function resizeAndRedrawCanvas()
{
    var desiredWidth = $(window).width();
    var desiredHeight = $(window).height();
    var canvas = $('#myCanvas');

    canvas.width = desiredWidth;
    canvas.height = desiredHeight;

    view.width = desiredWidth;
    view.height = desiredHeight;

    view.viewSize = new Size(desiredWidth, desiredHeight);
}

var barPath = createYearBar(1983, 2015);


function createYearBar(yearStart, yearEnd){
    var yearsToDraw = (yearEnd - yearStart);
    var topLeftX = view.center.x * 0.2;
    var topRightX = view.center.x * 1.8;
    var barSize = topRightX - topLeftX;
    var perYear = (barSize)/yearsToDraw;
    var topleft = new Point(topLeftX, 20);
    var size = new Size(barSize, 30);
    var rect = new Rectangle(topleft, size);
    var barPath = new Path.Rectangle(rect);
    barPath.strokeColor = 'black';
    barPath.fillColor = 'black';
    return barPath;
}

function onResize(event) {
    barPath.remove();
    barPath = createYearBar(1983, 2015);
}