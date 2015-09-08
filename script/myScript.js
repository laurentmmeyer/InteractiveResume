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
    var allComponents = [];
    var barHeight = 30;
    var barYOffset = view.center.y-barHeight/2;

    var yearsToDraw = (yearEnd - yearStart)+1   ;
    // Basebar
    var topLeftX = view.center.x * 0.2;
    var topRightX = view.center.x * 1.8;
    var barSize = topRightX - topLeftX;
    var perYear = (barSize) / yearsToDraw;
    var topLeft = new Point(topLeftX, barYOffset);
    var size = new Size(barSize, barHeight);
    var rect = new Rectangle(topLeft, size);
    var barPath = new Path.Rectangle(rect);
    barPath.strokeColor = 'black';
    barPath.fillColor = 'black';
    allComponents.push(barPath);
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
        allComponents.push(yearPath);
        var text = new PointText(new Point(topLeftChild.x+perYear/2, view.center.y));
        text.content = i;
        text.style = {
            fontFamily: 'Courier New',
            fontWeight: 'bold',
            fontSize: 8,
            fillColor: 'blue',
            justification: 'center'
        };
        allComponents.push(text);
        smallRectangleStart+=rectangleChild.width+widthMargin;
    }

    return allComponents;
}

function onResize(event) {
    barPath.forEach(function (entry) {
        entry.remove();
    });
    barPath = createYearBar(startYear, endYear);
}