$ready('#efy_sbtheme', ()=>{

const start = $add('div', {id: 'start_container', class: 'efy_trans_filter', efy_card: ''}, [
    ['h1', 'DRAW · DEMO'],
    ['hr'],
    ['div', {class: 'rules'}, [
      ['li', 'Expect bugs! Custom background & zoom levels are coming soon...'],
      ['li', 'You can choose multiple main brush colors, sizes & shapes']
    ]],
    ['hr'],
    ['h6', 'Controls'],
    ['hr'],
    ['li', [ ['p', 'Draw: '], ['p', {class: 'key fit'}, 'Left Click'], ['p', 'or'], ['p', {class: 'key fit'}, 'Touchscreen'] ]],
    ['hr'],
    ['li', [ ['p', 'Undo: '], ['p', {class: 'key fit'}, 'CTRL'], ['p', '+'], ['p', {class: 'key'}, 'Z'] ]],
    ['hr'],
    ['li', [ ['p', 'Redo: '], ['p', {class: 'key fit'}, 'CTRL'], ['p', '+'], ['p', {class: 'key'}, 'X'] ]],
    ['hr'],
    ['li', [ ['p', 'Reset Canvas: '], ['p', {class: 'key fit'}, 'CTRL'], ['p', '+'], ['p', {class: 'key'}, 'E'] ]],
    ['hr'],
    ['li', [ ['p', 'Save File: '], ['p', {class: 'key fit'}, 'CTRL'], ['p', '+'], ['p', {class: 'key'}, 'S'] ]],
    ['hr'],
    ['div', {class: 'efy_flex'}, [
        ['button', {id: 'start'}, 'Start'],
        ['button', {class: 'efy_quick_fullscreen efy_square_btn'}, [['i', {efy_icon: 'fullscreen'}]] ]
    ]]
]);

$event($$(start, 'button'), 'click', ()=>{ start.remove();

$add('div', {id: 'efy_dw'}, [['canvas']]);
$add('div', {class: 'dw_color_menu', efy_card: ''}, [
  ['div', {class: 'dw_actions'}, [
    ['button', {id: 'undo', title: 'Undo (Ctrl + Z)', class: 'efy_square_btn'}, [['i', {efy_icon: 'chevron_left'}]]],
    ['button', {id: 'redo', title: 'Redo (Ctrl + Y)', class: 'efy_square_btn'}, [['i', {efy_icon: 'chevron'}]]],
    ['button', {id: 'clear', efy_lang: 'clear'}, [['i', {efy_icon: 'reload'}]]],
    ['button', {id: 'download', efy_lang: 'save', title: 'Ctrl + E'}, [['i', {efy_icon: 'arrow_down'}]]]
  ]],
  ['div', {class: 'efy_hr_div'}, [['p', 'Shapes'], ['hr']]],
  ['div', {class: 'dw_shapes'}, [
    ['div', {id: 'pencil', class: 'dt-tools-container efy_square_btn', title: 'Brush'}, [['i', {efy_icon: 'edit'}]]],
    ['div', {id: 'highlighter', class: 'dt-tools-container efy_square_btn', title: 'Highlighter'}, [['i', {efy_icon: 'square'}]]],
    ['div', {id: 'eraser', class: 'dt-tools-container efy_square_btn', title: 'Eraser'}, [['i', {efy_icon: 'checkboard'}]]],
    ['div', {efy_range_text: 'Brush Size', efy_lang: 'size', id: 'size'}, [
      ['input', {type: 'range', min: '1', max: '100', step: '1', value: '3'}]
    ]]
  ]],
  ['div', {class: 'efy_hr_div'}, [['p', {efy_lang: 'colors'}], ['hr']]],
  ['div', {efy_color: '1 0.7 0.2 50 1, 2 0.7 0.2 200 1, range:1-50', id: 'brush_colors'}]
], $('#efy_modules'));

$ready('#brush_colors .efy_paste', (x)=>{
  $add('button', {class: 'dw_current_color'}, 'Brush', x.parentNode, 'afterbegin')
});


const type = {pencil: "pencil", eraser: "eraser", highlighter: "highlighter"},
canvas = $('#efy_dw canvas');

let efy_dw = {
  width: window.innerWidth, height: window.innerHeight, size: undefined,
  bg: 'transparent',
  color: $('html').getAttribute('efy_mode').includes('light') ? '#000' : '#fff',
  brushSize: 2,
  fullSize: false, fullWidth: true, fullHeight: true,
  scale: 1,
  lineCap: "round", lineJoin: "round",
  pen_pressure: 1
};


  let ctx = canvas.getContext("2d"),

  constants = {DATA_KEY: "paths"},
  isDrawing = false, paths = [], redo = [],
  brushType = type.pencil,
  pressureValues = [];

  const initializeCanvasSize =()=>{
    canvas.width = $('#efy_dw').clientWidth;
    canvas.height = $('#efy_dw').clientHeight;
  },

  clearOnlyScreen =()=>{ ctx.clearRect(0, 0, canvas.width, canvas.height)},

  pen_pressure =(event)=>{
    if (event.pressure !== undefined) efy_dw.pen_pressure = event.pressure.toFixed(2);
    efy_dw.pointer_type = event.pointerType;
  },

  drawPath =()=>{
    for (let i = 0; i < paths.length; i++) {
      const line = paths[i];
      const startPath = line[0];
      ctx.lineWidth = startPath[2].brushSize;

      try { if (efy_dw.pointer_type === 'pen') {

        for (let j = 0; j < line.length; j++) { pressureValues.push(efy_dw.pen_pressure)}

        let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

        for (let k = 0; k < pressureValues.length; k++){
          gradient.addColorStop(k / (pressureValues.length - 1), `rgba(255, 0, 0, ${pressureValues[k]})`);
        }

        startPath[2].color = gradient;
        console.log(startPath[2])
      }} catch (error) {console.log(error.message)}
      ctx.strokeStyle = startPath[2].color;

      ctx.beginPath();
      ctx.moveTo(...startPath);
      for (let j = 0; j < line.length; j++) {
        ctx.lineTo(line[j][0], line[j][1]);
      }
      ctx.lineCap = startPath[2].lineCap;
      ctx.lineJoin = startPath[2].lineJoin;
      ctx.stroke();
    }
  },

  handleStart =(e)=>{
    e.preventDefault();
    if (e.which == 1 || e.which == 0 || e.touches) {
      isDrawing = true;
      paths.push([[...coordinates(e), getBrush()]]);
      draw();
    }
  },

  handleMove =(e)=> {
    e.preventDefault();
    const coords = coordinates(e);
    if (isDrawing) {
      paths[paths.length - 1].push(coords);
      draw();
    }
  },

  handleEnd =()=>{
    if (isDrawing){ save()}
    isDrawing = false;
    pressureValues = [];
  },

  handleResize =()=>{
      efy_dw.width = $('#efy_dw').clientWidth;
      efy_dw.height = $('#efy_dw').cientHeight;
      initializeCanvasSize();
      draw();
  },

  coordinates =(e)=>{
    if (e.touches && e.touches.length > 0) {
      return [
        e.touches[0].clientX - canvas.offsetLeft,
        e.touches[0].clientY - canvas.offsetTop,
      ];
    }
    return [
      e.clientX - canvas.offsetLeft,
      e.clientY - canvas.offsetTop,
    ];
  },

  draw =()=>{ clearOnlyScreen(); drawPath()};

  initializeCanvasSize();
  canvas.style.background = efy_dw.bg;

  /*Restore*/ if (localStorage.paths){
    paths = JSON.parse(localStorage[constants.DATA_KEY]);
    draw()
  }

  const getBrush =()=>{
    return {
      color: efy_dw.color,
      bg: efy_dw.bg,
      brushSize: efy_dw.brushSize,
      lineCap: efy_dw.lineCap,
      lineJoin: efy_dw.lineJoin,
    };
  },

  brushColor =(color, pressure = 1)=>{
    let oklch = [], oklch1 = [];
    const color1 = $('.dw_color_menu [efy_color] [efy_content][efy_active]') || $('.dw_color_menu [efy_color] [efy_content]');
    oklch1.push($$(color1, '.lightness').value * 100);
    oklch1.push($$(color1, '.chroma').value * 100);
    oklch1.push($$(color1, '.hue').value);
    const alpha1 = $$(color1, '.alpha').value * pressure;
    efy_dw.color = `rgb(${oklch2rgb(oklch1).join(', ')}, ${alpha1})`;
    $css_prop('--dw_current_color', efy_dw.color);
  },

  pencil =()=>{
    brushType = type.pencil;
    efy_dw.lineCap = "round";
    efy_dw.lineJoin = "round";
  },

  highlighter =()=>{
    brushType = type.highlighter;
    efy_dw.lineCap = "butt";
    efy_dw.lineJoin = "round";
  },

  eraser =()=>{
    $notify('short', 'Coming soon...');
    // brushType = type.eraser;
    // efy_dw.color = efy_dw.bg;
    // efy_dw.lineCap = "round";
    // efy_dw.lineJoin = "round";
  },

  clear =()=>{
    clearOnlyScreen();
    paths = [];
    delete localStorage[constants.DATA_KEY];
    isDrawing = false;
  },

  undo_fn =()=>{ if (paths.length > 0){
    redo.push({type: "path", data: paths[paths.length - 1]});
    paths.pop(); draw();
  }},

  redo_fn =()=>{
    const redoObj = redo[redo.length - 1];
    if (redoObj && redoObj.type == "path") {
      paths.push(redoObj.data);
      draw(); redo.pop();
    }
  },

  save =()=> localStorage[constants.DATA_KEY] = JSON.stringify(paths),

  download =(filename = "drawing")=> {
    ctx.fillStyle = efy_dw.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawPath();
    const a = document.createElement("a");
    a.download = filename;
    a.style.display = "none";
    const dataUrl = canvas.toDataURL();
    a.href = dataUrl;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

//////////////////////////////////////
// Events
$event(canvas, 'mousedown', handleStart);
$event(canvas, 'mousemove', handleMove);
$event(document, 'mouseup', handleEnd);

$event(canvas, 'touchstart', handleStart);
$event(canvas, 'touchmove', handleMove);
$event(document, 'touchend', handleEnd);

$event(canvas, 'pointermove', pen_pressure);
// $event(canvas, 'pointerup', ()=> brushColor($('.dw_color_menu [efy_color]').value));

$event(document, 'keydown', (event)=>{
  if (event.ctrlKey){ switch (event.key){
    case 'z': undo_fn(); break;
    case 'x': redo_fn(); break;
    case 's': event.preventDefault(); download(); break;
    case 'e': event.preventDefault(); clear(); break;
  }}
});
$event(window, 'resize', handleResize);
$event($('.dw_color_menu [efy_color]'), 'input', (e)=> brushColor(e.target.value));
$event($('.dw_color_menu [efy_color]'), 'click', (e)=> $wait(.1, ()=>{ brushColor(e.target.value)}));
$event(size, 'input', (e)=> efy_dw.brushSize = parseInt(e.target.value));
$event($('#pencil'), 'click', ()=> pencil());
$event($('#highlighter'), 'click', ()=> highlighter());
$event($('#eraser'), 'click', ()=> eraser());
$event($('#undo'), 'click', ()=> undo_fn());
$event($('#redo'), 'click', ()=> redo_fn());
$event($('#clear'), 'click', ()=> clear());
$event($('#download'), 'click', ()=> download());

// Observe Container Resize
// const observer = new ResizeObserver(entries => {
//     for (let entry of entries){
//         const {width, height} = entry.contentRect, canvas = $('canvas');
//         canvas.width = width; canvas.height = height;
//         // draw()
//     }
// }); observer.observe($('#efy_dw'));


});

}, 1);