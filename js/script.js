var myNameSpace = myNameSpace || {};

myNameSpace.CanvasInterface = (function () {
    $('#main-nav button').on('click', onDrawActionClick);

    $('#canvas-form').submit(function (event) {
        event.preventDefault();
        draw();
    });

    $('#clear-area-btn').on('click', clearTheDrawingArea);

    // Draw a shape
    function draw() {
        var whatToDraw = $('#main-nav button.current-action').eq(0).attr('id'),
            startPointX = document.getElementById('start-point-x').value,
            startPointY = document.getElementById('start-point-y').value;

        switch (whatToDraw) {
            case 'line-action':
                var endPointX = document.getElementById('end-point-x').value,
                    endPointY = document.getElementById('end-point-y').value,
                    line = new Shape(startPointX, startPointY);

                line.drawLine(endPointX, endPointY);
                break;
            case 'arc-action':
                var radius = document.getElementById('radius').value,
                    arc = new Shape(startPointX, startPointY);

                arc.drawArc(radius);
                break;
            case 'curve-action':
                var controlPointX = document.getElementById('control-point-x').value,
                    controlPointY = document.getElementById('control-point-y').value,
                    endPointX = document.getElementById('ending-point-x').value,
                    endPointY = document.getElementById('ending-point-y').value,
                    curve = new Shape(startPointX, startPointY);

                curve.drawCurve(controlPointX, controlPointY, endPointX, endPointY);
                break;
            case 'rect-action':
                var rectWidth = document.getElementById('rect-width').value,
                    rectHeight = document.getElementById('rect-height').value,
                    rectangle = new Shape(startPointY, startPointY);

                rectangle.drawRectangle(rectWidth, rectHeight);
                break;
        }
    }

    // On draw action button click
    function onDrawActionClick() {
        loadUserInputsHTML($(this));
        checkCurrentActionClass($(this));
    }

    // Check for "current-action" class
    function checkCurrentActionClass(element) {
        if (!element.hasClass('current-action')) {
            $('#main-nav button.current-action').removeClass('current-action');
            element.addClass('current-action');
        }
    }

    // Load the appropriate user inputs
    function loadUserInputsHTML(element) {
        // If the element has "current-action" class then stop the function.
        // There is no need to add the same user inputs again.
        if (element.hasClass('current-action')) {
            return false;
        }

        var userInputs = document.getElementById('user-inputs'),
            loadHTML;
        switch (element.attr('id')) {
            case 'line-action':
                loadHTML =
                '<div>' +
                    '<label for="start-point-x">Starting point axis - X:</label>' +
                    '<input id="start-point-x" type="number" name="start-point-x" min="0" max="594" required autofocus /> ' +
                '</div>' +
                '<div>' +
                    '<label for="start-point-y">Starting point axis - Y:</label>' +
                    '<input id="start-point-y" type="number" name="start-point-y" min="0" max="450" required /> ' +
                '</div>' +
                '<div>' +
                    '<label for="end-point-x">Ending point axis - X:</label>' +
                    '<input id="end-point-x" type="number" name="end-point-x" min="0" max="594" required />' +
                '</div>' +
                '<div>' +
                    '<label for="end-point-y">Ending point axis - Y:</label>' +
                    '<input id="end-point-y" type="number" name="end-point-y" min="0" max="450" required />' +
                '</div>';
                break;
            case 'arc-action':
                loadHTML =
                '<div>' +
                    '<label for="start-point-x">Starting point axis - X:</label>' +
                    '<input id="start-point-x" type="number" name="start-point-x" min="0" max="594" required autofocus /> ' +
                '</div>' +
                '<div>' +
                    '<label for="start-point-y">Starting point axis - Y:</label>' +
                    '<input id="start-point-y" type="number" name="start-point-y" min="0" max="450" required /> ' +
                '</div>' +
                '<div>' +
                    '<label for="radius">Radius:</label>' +
                    '<input id="radius" type="number" name="radius" min="1" max="224" required />' +
                '</div>';
                break;
            case 'curve-action':
                loadHTML =
                '<div>' +
                    '<label for="start-point-x">Starting point axis - X:</label>' +
                    '<input id="start-point-x" type="number" name="start-point-x" min="0" max="594" required autofocus /> ' +
                '</div>' +
                '<div>' +
                    '<label for="start-point-y">Starting point axis - Y:</label>' +
                    '<input id="start-point-y" type="number" name="start-point-y" min="0" max="450" required /> ' +
                '</div>' +
                '<div>' +
                    '<label for="control-point-x">Control point axis - X:</label>' +
                    '<input id="control-point-x" type="number" name="control-point-x" min="0" max="594" required />' +
                '</div>' +
                '<div>' +
                    '<label for="control-point-y">Control point axis - Y:</label>' +
                    '<input id="control-point-y" type="number" name="control-point-y" min="0" max="450" required />' +
                '</div>' +
                '<div>' +
                    '<label for="ending-point-x">Ending point axis - X:</label>' +
                    '<input id="ending-point-x" type="number" name="ending-point-x" min="0" max="594" required />' +
                '</div>' +
                '<div>' +
                    '<label for="ending-point-y">Control point axis - Y:</label>' +
                    '<input id="ending-point-y" type="number" name="ending-point-y" min="0" max="450" required />' +
                '</div>';
                break;
            case 'rect-action':
                loadHTML =
                '<div>' +
                    '<label for="start-point-x">Starting point axis - X:</label>' +
                    '<input id="start-point-x" type="number" name="start-point-x" min="0" max="594" required autofocus /> ' +
                '</div>' +
                '<div>' +
                    '<label for="start-point-y">Starting point axis - Y:</label>' +
                    '<input id="start-point-y" type="number" name="start-point-y" min="0" max="450" required /> ' +
                '</div>' +
                '<div>' +
                    '<label for="rect-width">Rectangle width:</label>' +
                    '<input id="rect-width" type="number" name="rect-width" min="0" max="594" required />' +
                '</div>' +
                '<div>' +
                    '<label for="rect-height">Rectangle height:</label>' +
                    '<input id="rect-height" type="number" name="rect-height" min="0" max="450" required />' +
                '</div>';
                break;
        }
        userInputs.innerHTML = loadHTML;
    }

    // Clear the drawing area
    function clearTheDrawingArea() {
        var canvas = document.getElementById('drawing-area'),
            context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
})();