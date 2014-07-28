// Class Shape - designed to make different shapes
function Shape(startPointX, startPointY) {
    this.startPointX = startPointX;
    this.startPointY = startPointY;
    this.lineWidth = 4;
    this.init();
}

Shape.prototype = {
    // Reset pointer to constructor
    constructor: Shape,
    // Initialization, sets this.context to point
    // to the context of the canvas object
    init: function () {
        if (typeof this.context === 'undefined') {
            var canvas = document.getElementById('drawing-area');
            Shape.prototype.context = canvas.getContext('2d');
        }
    },
    // Draws a line
    drawLine: function (endPointX, endPointY) {
        var ctx = this.context;
        ctx.strokeStyle = this.getColor();
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.startPointX, this.startPointY);
        ctx.lineTo(endPointX, endPointY);
        ctx.closePath();
        ctx.stroke();
    },
    // Draws an arc
    drawArc: function (radius) {
        var ctx = this.context;
        ctx.strokeStyle = this.getColor();
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.arc(this.startPointX, this.startPointY, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    },
    // Draws a curve
    drawCurve: function (controlPointX, controlPointY, endPoinX, endPointY) {
        var ctx = this.context;
        ctx.strokeStyle = this.getColor();
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.startPointX, this.startPointY);
        ctx.quadraticCurveTo(controlPointX, controlPointY, endPoinX, endPointY);
        ctx.stroke();
    },
    // Draws a rectangle
    drawRectangle: function (rectWidth, rectHeight) {
        var ctx = this.context;
        ctx.strokeStyle = this.getColor();
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.rect(this.startPointX, this.startPointY, rectWidth, rectHeight);
        ctx.closePath();
        ctx.stroke();
    },
    // Generates a random color
    getColor: function () {
        var rgb = [];
        for (var i = 0; i < 3; i++) {
            rgb[i] = Math.round(255 * Math.random());
        }
        return 'rgb(' + rgb.join(',') + ')';
    }
}