(()=>{

$add('div', {efy_app: 'fractals'}, [
    ['div', {id: 'ft_canvas_container', efy_card: ''}, [
        ['canvas', {id: 'ft_canvas'}, 'Your browser doesnt support canvas']
    ]],
    ['div', {id: 'ft_options', efy_card: ''}, [
        ['select', {id: 'fractal_select'}, [
            ['option', {value: 'tree'}, 'Tree'],
            ['option', {value: 'sierpinski'}, 'Sierpinski Triangle'],
            ['option', {value: 'koch'}, 'Koch Snowflake'],
            ['option', {value: 'mandelbrot'}, 'Mandelbrot Set']
        ]],
        ['div', {efy_range_text: 'Angle', class: 'tree'}, [
            ['input', {id: 'angle', type: 'range', value: 0.39, min: 0, max: 3.15, step: 0.01}]
        ]],
        ['div', {efy_range_text: 'Length', class: 'tree'}, [
            ['input', {id: 'length', type: 'range', value: 118, min: 10, max: 170, step: 0.01}]
        ]],
        ['div', {efy_range_text: 'Reducer', class: 'tree'}, [
            ['input', {id: 'reducer', type: 'range', value: 0.7, min: 0.5, max: 0.75, step: 0.01}]
        ]],
        ['div', {efy_range_text: 'Sierpinski Depth', class: 'sierpinski'}, [
            ['input', {id: 'sierpinski_depth', type: 'range', value: 5, min: 1, max: 10, step: 1}]
        ]],
        ['div', {efy_range_text: 'Koch Depth', class: 'koch'}, [
            ['input', {id: 'koch_depth', type: 'range', value: 4, min: 1, max: 6, step: 1}]
        ]]
    ]]
]);

const canvas_resize = () => {
    ft_canvas.width = ft_canvas_container.clientWidth;
    ft_canvas.height = ft_canvas_container.clientHeight;
    draw();
};

let selectedFractal = 'tree', ctx = ft_canvas.getContext("2d"), angle, len, reducer,
[angle_id, len_id, reducer_id] = [$('#angle'), $('#length'), $('#reducer')];

 function draw() {
     const W = ft_canvas.width, H = ft_canvas.height;
     ctx.setTransform(1, 0, 0, 1, 0, 0);
     ctx.clearRect(0, 0, W, H);

     // Center the origin for all fractals except the tree
     if (selectedFractal === 'tree'){ ctx.translate(W / 2, H)}
     else if (selectedFractal === 'sierpinski'){ ctx.translate(W / 2, H - H / 5)}
     else if (selectedFractal === 'koch'){ ctx.translate(W / 2, H / 40)}
     else if (selectedFractal === 'mandelbrot'){ ctx.translate(W / 150, H / 200)}
     else { ctx.translate(W / 2, H / 2)}

     if (selectedFractal === 'tree') {
         [angle, len, reducer] = [angle_id.value, len_id.value, reducer_id.value];
         ctx.beginPath();
         draw_branch(len);
         ctx.strokeStyle = "#eeeeee";
         ctx.stroke();
     } else if (selectedFractal === 'sierpinski') {
         const size = Math.min(W, H) * 0.8; // Size of the triangle
         const depth = $('#sierpinski_depth').value; // Get depth from input
         drawSierpinski(-size / 2, 0, size, depth); // Draw Sierpinski Triangle with specified depth
     } else if (selectedFractal === 'koch') {
         ctx.beginPath();
         ctx.moveTo(-W / 2, H / 2); // Starting point for Koch Snowflake
         const depth = $('#koch_depth').value; // Get depth from input
         drawKochCurve(-W / 2, H / 2, W / 2, H / 2, depth); // Draw Koch Snowflake with specified depth
         ctx.strokeStyle = "#eeeeee";
         ctx.stroke();
     } else if (selectedFractal === 'mandelbrot') {
         drawMandelbrot(-2, 2, -2, 2, W, H, 100); // Draw Mandelbrot Set
     }
 }

 function drawSierpinski(x, y, size, depth) {
     if (depth === 0) {
         ctx.beginPath();
         ctx.moveTo(x, y);
         ctx.lineTo(x + size, y);
         ctx.lineTo(x + size / 2, y - (Math.sqrt(3) / 2) * size);
         ctx.closePath();
         ctx.fillStyle = "#eeeeee";
         ctx.fill();
     } else {
         drawSierpinski(x, y, size / 2, depth - 1);
         drawSierpinski(x + size / 2, y, size / 2, depth - 1);
         drawSierpinski(x + size / 4, y - (Math.sqrt(3) / 4) * size, size / 2, depth - 1);
     }
 }

 function drawKochCurve(x1, y1, x2, y2, depth) {
     if (depth === 0) {
         ctx.lineTo(x2, y2);
     } else {
         const x3 = (x1 + x2) / 2 + (Math.sqrt(3) / 6) * (y1 - y2);
         const y3 = (y1 + y2) / 2 + (Math.sqrt(3) / 6) * (x2 - x1);
         drawKochCurve(x1, y1, (x1 + x2) / 2, (y1 + y2) / 2, depth - 1);
         drawKochCurve((x1 + x2) / 2, (y1 + y2) / 2, x3, y3, depth - 1);
         drawKochCurve(x3, y3, (x1 + x2) / 2, (y1 + y2) / 2, depth - 1);
         drawKochCurve((x1 + x2) / 2, (y1 + y2) / 2, x2, y2, depth - 1);
     }
 }

 function drawMandelbrot(xMin, xMax, yMin, yMax, width, height, maxIter) {
     for (let x = 0; x < width; x++) {
         for (let y = 0; y < height; y++) {
             let zx = 0, zy = 0;
             let cx = xMin + (x / width) * (xMax - xMin);
             let cy = yMin + (y / height) * (yMax - yMin);
             let iter = 0;

             while (zx * zx + zy * zy < 4 && iter < maxIter) {
                 let tmp = zx * zx - zy * zy + cx;
                 zy = 2 * zx * zy + cy;
                 zx = tmp;
                 iter++;
             }

             const color = iter === maxIter ? 0 : (iter / maxIter) * 255;
             ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
             ctx.fillRect(x, y, 1, 1);
         }
     }
 }

 function draw_branch(lenght) {
     ctx.moveTo(0,0); ctx.lineTo(0,-lenght); ctx.translate(0, -lenght);
     if (lenght > 4) {
         ctx.save(); ctx.rotate(angle);
         draw_branch(lenght * reducer); ctx.restore();

         ctx.save(); ctx.rotate(-angle);
         draw_branch(lenght * reducer); ctx.restore();
}}

 $event(ft_options, 'input', () => {
     if (event.target.matches('input')) {
         draw();
     }
 });

 $event($('#fractal_select'), 'change', () => {
     selectedFractal = $('#fractal_select').value; // Update the selected fractal
     draw(); // Redraw the canvas with the new fractal
 });

 $event(window, 'resize', canvas_resize);
 canvas_resize();

})();