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


//var barPath = createYearBar(startYear, endYear);

function createYearBar(yearStart, yearEnd) {
    var yearsToDraw = (yearEnd - yearStart) + 1;
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
    perYear = (barSize - widthMargin) / yearsToDraw - widthMargin;
    var smallRectangleStart = topLeftX + widthMargin;
    for (var i = yearStart; i <= yearEnd; i++) {
        var topLeftChild = new Point(smallRectangleStart, barYOffset + heightMargin);
        var rectSize = new Size(perYear, barHeight - 2 * heightMargin);
        var rectangleChild = new Rectangle(topLeftChild, rectSize);
        var yearPath = new Path.Rectangle(rectangleChild);
        yearPath.fillColor = 'yellow';
        yearPath.onMouseEnter = function () {
            this.fillColor = 'red';
        };
        yearPath.onMouseLeave = function () {
            this.fillColor = 'yellow';
        };
        smallRectangleStart += rectangleChild.width + widthMargin;
    }

    return barPath;
}
//
//Global.commonMethods = {
//    draw : '',
//    clear : '',
//    redraw: function(){
//        this.clear();
//        this.draw();
//    }
//}

function DrawnObject(path) {
    this.path = path;
}

DrawnObject.prototype.delete = function () {
    this.path.remove();
};

function BGYear(pointStart, size, color, hoverColor, year, title) {
    this.color = color;
    this.hover = hoverColor;
    this.year = year;
    this.title = title;
    this.pointStart = pointStart;
    this.size = size;
    this.path = null;
    DrawnObject.call(this, this.path);
}


BGYear.prototype = Object.create(DrawnObject.prototype);
BGYear.prototype.constructor = BGYear;

BGYear.prototype.draw = function(){
    var rectangleChild = new Rectangle(this.pointStart, this.size);
    var yearPath = new Path.Rectangle(rectangleChild);
    this.path = yearPath;
    yearPath.fillColor = this.color;
    yearPath.onMouseEnter = function () {
        this.fillColor = 'red';
    };
    yearPath.onMouseLeave = function () {
        this.fillColor = this.color;
    };
};


function BGBar(startYear, endYear) {
    this.startYear = startYear;
    this.endYear = endYear;
    this.children = null;
    DrawnObject.call(this, this.children)
}

BGBar.prototype = Object.create(DrawnObject.prototype);
BGBar.prototype.constructor = BGBar;

BGBar.prototype.draw = function () {
    var yearsToDraw = (this.startYear - this.endYear) + 1;

    // Basebar
    var barHeight = 100;
    var barYOffset = view.center.y / 2 - barHeight / 2;

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
    this.children = [];
    this.children.push(barPath);

    var heightMargin = 3;
    var widthMargin = 4;
    perYear = (barSize - widthMargin) / yearsToDraw - widthMargin;
    var smallRectangleStart = topLeftX + widthMargin;
    for (var i = this.startYear; i <= this.endYear; i++) {
        var topLeftChild = new Point(smallRectangleStart, barYOffset + heightMargin);
        var rectSize = new Size(perYear, barHeight - 2 * heightMargin);
        var YB = new BGYear(topLeftChild, rectSize, 'yellow', 'red', i, i);
        YB.draw();
        this.children.push(YB);
        smallRectangleStart += YB.path.width + widthMargin;
    }
};
var test = new BGBar(1983, 2015);

test.draw();

function onResize(event) {
    test.delete();
    test = new BGBar(1983, 2015);

}