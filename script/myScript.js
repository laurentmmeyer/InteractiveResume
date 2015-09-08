/**
 * Created by laurentmeyer on 07/09/15.
 */


$(window).resize(resizeAndRedrawCanvas);
$(window).ready(resizeAndRedrawCanvas);

var startYear = 1983;
var endYear = 2015;

function resizeAndRedrawCanvas() {
    var desiredWidth = $(window).width();
    var desiredHeight = $(window).height();
    var canvas = $('#myCanvas');

    canvas.width = desiredWidth;
    canvas.height = desiredHeight;

    view.width = desiredWidth;
    view.height = desiredHeight;

    view.viewSize = new Size(desiredWidth, desiredHeight);
}


var barPath = createYearBar(startYear, endYear);


function createYearBar(yearStart, yearEnd) {
    var yearsToDraw = (yearEnd - yearStart)+1   ;
    // Basebar
    var topLeftX = view.center.x * 0.2;
    var topRightX = view.center.x * 1.8;
    var barSize = topRightX - topLeftX;
    var perYear = (barSize) / yearsToDraw;
    var barYOffset = 20;
    var topLeft = new Point(topLeftX, barYOffset);
    var barHeight = 100;
    var size = new Size(barSize, barHeight);
    var rect = new Rectangle(topLeft, size);
    var barPath = new Path.Rectangle(rect);
    barPath.strokeColor = 'black';
    barPath.fillColor = 'black';

    var heightMargin = 3;
    var widthMargin = 4;
    perYear = (barSize-widthMargin) / yearsToDraw - widthMargin;
    var smallRectangleStart = topLeftX + widthMargin;
    for (var i = yearStart; i <= yearEnd; i++) {
        var topLeftChild = new Point(smallRectangleStart, barYOffset + heightMargin);
        var rectSize = new Size(perYear, barHeight - 2*heightMargin);
        var rectangleChild = new Rectangle(topLeftChild, rectSize);
        var yearPath = new Path.Rectangle(rectangleChild);
        yearPath.fillColor = 'yellow';
        yearPath.onMouseEnter = function(){
            this.fillColor = 'red';
        };
        yearPath.onMouseLeave = function () {
            this.fillColor = 'yellow';
        };
        smallRectangleStart+=rectangleChild.width+widthMargin;
    }

    return barPath;
}

function onResize(event) {
    barPath.remove();
    barPath = createYearBar(startYear, endYear);
}