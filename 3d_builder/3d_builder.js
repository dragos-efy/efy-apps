const controls_container = $add('div', {builder3d_app: ''}, [
  ['div', {id: 'bd_sidebar', class: 'efy_card_filter efy-glass'}, [
    ['div', {class: 'nav'}, [
      ['button', {class: 'export'}, [['i', {efy_icon: 'arrow'}], ['p', 'Export HTML']] ],
      ['button', {efy_sidebar_btn: '', class: 'efy_square_btn efy_color_trans'}, [['i', {efy_icon: 'menu'}]] ],
      ['button', {id: 'search', class: 'efy_square_btn efy_color_trans'}, [['i', {efy_icon: 'search'}]] ],
      ['button', {class: 'efy_square_btn efy_quick_fullscreen efy_color_trans'}, [['i', {efy_icon: 'fullscreen'}]] ]
    ]],
    ['div', {class: 'controls2', efy_select: ''}, [
      ['div', {efy_color: 'Color .7 .37 85 .7'}],
      ['div', {efy_range_text: 'Radius 1'}, [['input', {id: 'prism_radius', type: 'range', min: '0', max: '40', value: '20', step: '1'}]]],
      ['div', {efy_range_text: 'Radius 2'}, [['input', {id: 'secondary', type: 'range', min: '-40', max: '40', value: '0', step: '1'}]]],
      ['div', {efy_range_text: 'Sides'}, [['input', {id: 'sides', type: 'range', min: '3', max: '20', value: '6', step: '1'}]]],
      ['div', {efy_range_text: 'Height'}, [['input', {id: 'height', type: 'range', min: '5', max: '40', value: '15', step: '1'}]]],

      ['input', {id: 'caps', type: 'checkbox', checked: true}],
      ['label', {for: 'caps'}, 'Caps'],

      ['p', 'Radius2 is:'],
      ['select', {id: 'mode'}, [
        ['option', {value: 'hole'}, 'Hole'],
        ['option', {value: 'cone'}, 'Cone']
      ]]
    ]]
  ]],
  ['div', {class: 'scene'}, [
    ['div', {id: 'shape', class: 'shape'}]
  ]]
]);

const radius = $('#prism_radius'), secondary = $('#secondary'),
sides = $('#sides'), height = $('#height'), caps = $('#caps'),
mode = $('#mode'), shape = $('#shape');

function update(){
  const R=+radius.value, H=+height.value, n=+sides.value, sec=+secondary.value, F=caps.checked, m=mode.value;
  shape.innerHTML='';
  const angle=360/n;

  // radii depending on mode
  let Rt=R, Rb=R;
  if(m==="cone") {
    // shrink the BOTTOM cap this time (your corrected intention)
    Rb=Math.max(0,R-sec);
  }

  // --- outer sides ---
  for(let i=0;i<n;i++){
    const face=document.createElement('div');
    face.className='face';

    const wB=2*Rb*Math.sin(Math.PI/n);
    const wT=2*Rt*Math.sin(Math.PI/n);
    const w=Math.max(wB,wT);
    face.style.width=w+'vmin';
    face.style.height=H+'vmin';
    face.style.left=-w/2+'vmin';
    face.style.top=-H/2+'vmin';

    if(m==="cone"){
      // trapezoid clipping
      const dx=(w-wT)/2/w*100;
      const dx2=(w-wB)/2/w*100;
      // face.style.clipPath=`polygon(${dx2}% 100%, ${100-dx2}% 100%, ${100-dx}% 0%, ${dx}% 0%)`;
      face.style.clipPath=`polygon(${dx}% 100%, ${100-dx}% 100%, ${100-dx2}% 0%, ${dx2}% 0%)`;
      // tilt face inward by slope
      const slope = Math.atan((Rt-Rb)/H)*180/Math.PI;
      face.style.transform=`rotateY(${i*angle}deg) translateZ(${(Rt+Rb)/2*Math.cos(Math.PI/n)}vmin) rotateX(${slope}deg)`;
    } else {
      face.style.transform=`rotateY(${i*angle}deg) translateZ(${R*Math.cos(Math.PI/n)}vmin)`;
    }
    shape.appendChild(face);
  }

  // --- inner sides if hole ---
  if(m==="hole" && sec>0){
    const r=sec;
    const wInner=2*r*Math.sin(Math.PI/n);
    for(let i=0;i<n;i++){
      const face=document.createElement('div');
      face.className='face';
      face.style.width=wInner+'vmin';
      face.style.height=H+'vmin';
      face.style.left=-wInner/2+'vmin';
      face.style.top=-H/2+'vmin';
      face.style.transform=`rotateY(${i*angle}deg) translateZ(${r*Math.cos(Math.PI/n)}vmin) rotateY(180deg)`;
      shape.appendChild(face);
    }
  }

  // caps
  if(F){
    const s = Math.PI/2 - Math.PI/n;
    for(const [y,rad] of [[-H/2,Rt],[H/2,Rb]]){
      const cap=document.createElement('div');
      cap.className='face cap';
      cap.style.width=2*R+'vmin';
      cap.style.height=2*R+'vmin';
      cap.style.left=-R+'vmin';
      cap.style.top=-R+'vmin';
      cap.style.clipPath=`polygon(${
        Array.from({length:n},(_,i)=>{
          const a=2*Math.PI*i/n + s;
          const rr=rad;
          const X=50+50*(rr/R)*Math.cos(a);
          const Y=50+50*(rr/R)*Math.sin(a);
          return `${X}% ${Y}%`;
        }).join(',')
      }${
        (m==="hole" && sec>0)
        ? ','+Array.from({length:n},(_,i)=>{
            const a=2*Math.PI*(n-i)/n + s;
            const X=50+50*(sec/R)*Math.cos(a);
            const Y=50+50*(sec/R)*Math.sin(a);
            return `${X}% ${Y}%`;
          }).join(',')
        : ''
      })`;
      cap.style.transform=`rotateX(90deg) translateZ(${y}vmin)`;
      shape.appendChild(cap);
    }
  }
}

[radius,secondary,sides,height,caps,mode].forEach(el=>el.oninput=update);
update();

$event($('[builder3d_app]'), 'input', ()=>{ const x = event.target;
  if (x.matches('[efy_color] input')){
    const parent = $('[builder3d_app] [efy_color]');
    console.log($$(parent, '.chroma').value);
    $css_prop('---b3d_face_bg', `oklch(${$$(parent, '.lightness').value} ${$$(parent, '.chroma').value} ${$$(parent, '.hue').value} / ${$$(parent, '.alpha').value}`);
  }
});

$event($('[builder3d_app]'), 'click', ()=>{ const x = event.target;
  if (x.matches('.export')){
    const copy = $('#shape').outerHTML;
    navigator.clipboard.writeText(copy);
    if (efy.notify_clipboard != false) $notify('short', 'Copied to clipboard', copy);
  }
});