$ready('#efy_sbtheme', ()=>{

$add('div', {class: 'view_3d'}, [
  ['div', {class: 'map'}, [
    ['div', {class: 'cube'}], ['div', {class: 'cube trans'}], ['div', {class: 'cube bg1'}]
  ]]
]);

for (let i = 0; i < 6; i++){ ['', '.trans', '.bg1'].map(type =>{
  $add('div', {class: 'face efy_trans_filter'}, [], $(`.cube${type}`));
})}

let drag = false, x0 = null, y0 = null;
const A = .5, cubes = $all('.cube'),
getE =(e)=>{ return e.touches ? e.touches[0] : e},
lock =(ev)=>{ let e = getE(ev); drag = true; x0 = e.clientX; y0 = e.clientY},

rotate =(ev)=>{
  if (drag){ let e = getE(ev),
    x = e.clientX, y = e.clientY,
    dx = x - x0, dy = y - y0,
    d = Math.hypot(dx, dy);

    if (d){ cubes.forEach(cube=>{
        cube.style.setProperty('--p', getComputedStyle(cube).transform.replace('none', ''));
        cube.style.setProperty('--i', +(-dy).toFixed(2));
        cube.style.setProperty('--j', +dx.toFixed(2));
        cube.style.setProperty('--a', `${+(A * d).toFixed(2)}deg`);
        x0 = x; y0 = y;
    })}
  }
},

release =()=>{ if (drag) { drag = false; x0 = y0 = null}},

update_3d_colors =()=>{
    const color0deg = $css_prop('--efy_color').replace(efy.color_angle || '165deg', '0deg'),
    color_trans_0deg = $css_prop('--efy_color_trans').replace(efy.color_angle || '165deg', '0deg'),
    color_first = efy.colors[0].split(' '), color_last = efy.colors[efy.colors.length - 1].split(' '),
    trans_first = efy.colors[0].split(' '), trans_last = efy.colors[efy.colors.length - 1].split(' ');
    $css_prop('--efy_color_0deg', color0deg);
    $css_prop('--efy_color_trans_0deg', color_trans_0deg);
    $css_prop('--efy_color_first', `oklch(${color_first[1]} ${color_first[2]} ${color_first[3]} / ${color_last[4]})`);
    $css_prop('--efy_color_last', `oklch(${color_last[1]} ${color_last[2]} ${color_last[3]} / ${color_last[4]})`);
    $css_prop('--efy_color_trans_first', `oklch(${trans_first[1]} ${trans_first[2]} ${trans_first[3]} / ${(trans_first[4] / 3).toFixed(2)})`);
    $css_prop('--efy_color_trans_last', `oklch(${trans_last[1]} ${trans_last[2]} ${trans_last[3]} / ${(trans_last[4] / 3).toFixed(2)})`);
};

$event(document, 'mousedown', lock, false);
$event(document, 'touchstart', lock, false);
$event(document, 'mousemove', rotate, false);
$event(document, 'touchmove', rotate, false);
$event(document, 'mouseup', release, false);
$event(document, 'touchend', release, false);

$wait(.3, ()=>{
    update_3d_colors();
    $event($('#efy_gradient'), 'input', update_3d_colors);
});

}, 1);