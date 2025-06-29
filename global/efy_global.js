const $ns =(a,b,c)=>{ a = document.createElementNS("http://www.w3.org/2000/svg", a); for (let x in b){ a.setAttribute(x, b[x])}; if (c){ c.map(x=> a.appendChild(x))}; return a};

$ready('#efy_sbtheme', ()=>{

/*For iFrames - EXPERIMENTAL*/ if (window.parent !== window){ $root.classList.add('efy_iframe');

 $ready('.efy_iframe .eos_menu', ()=>{ $('.efy_sidebar .eos_menu').open = true});

/*On Storage Change*/ $event(window, 'storage', (event)=>{ if (event.key === 'efy'){ efy = JSON.parse(event.newValue);
    ['radius', 'gap'].forEach(a =>{ const store = efy[a];
        if (store) $root.style.setProperty(`---${a}`, store);
    });
    if (efy.text) $root.style.setProperty(`---color_text`, efy.text);
    $root.toggleAttribute('efy_color_text', (efy.text_status === 'on'));
}})};

}, 1);