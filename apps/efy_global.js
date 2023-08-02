const $ns =(a,b,c)=>{ a = document.createElementNS("http://www.w3.org/2000/svg", a); for (let x in b){ a.setAttribute(x, b[x])}; if (c){ c.map(x=> a.appendChild(x))}; return a};

$ready('#efy_sbtheme', ()=>{

/*For iFrames - EXPERIMENTAL*/ if (window.parent !== window){ $root.classList.add('efy_iframe');
/*On Storage Change*/ $event(window, 'storage', (event)=>{ if (event.key === 'efy'){ efy = JSON.parse(event.newValue);
    $root.style.setProperty('--efy_radius', efy.radius);
    $root.style.setProperty('--efy_color_text_var', efy.colorText)
}})};

}, 1);