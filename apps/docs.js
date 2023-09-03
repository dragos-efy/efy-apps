/*Storage*/ let  efy_dc = {}, $dc_save =()=>{}; try { if (localStorage.efy_dc){ efy_dc = JSON.parse(localStorage.efy_dc)} $dc_save =()=>{localStorage.efy_dc = JSON.stringify(efy_dc)}} catch {}

/*Menu*/ $ready('#efy_sbtheme', ()=>{

/*Icons*/ $ready('#dc_icons', ()=>{ let a = $('#dc_icons'); 'accessibility arrow audio copy check chevron dots edit fullscreen globe group heart help key menu menu2 notify notify_active paste pause play plus reload remove search star zoom_in zoom_out user'.split(' ').map(b=>{ $add('div', {efy_card: ''}, [ $add('i', {efy_icon: b}), $add('p', {}, [b]) ], a)})}, 1);

/*Live Auto Demo*/ let n = 0; const color = [getComputedStyle($root).getPropertyValue('--efy_color'), getComputedStyle($root).getPropertyValue('--efy_color_trans')], auto =()=>{
    let m = n * 14 , a = `${m} 100% 50%`, b = `${m + 50} 100% 50%`, c = `linear-gradient(${m}deg`, d = ['html[efy_mode=default]:not([efy_color_bgcol]) .efy_3d_back, html:is([efy_mode=default], [efy_mode*=light], [efy_mode*=dark]) .efy_3d_back {background: ', '!important} [efy_mode*=trans] .efy_3d_back {filter: none!important}'];

    if (n == 25){ n = 0; clearInterval(counts); $('.auto_demo').textContent ='';
        $root.style.setProperty('--efy_radius', '12rem'); $root.style.setProperty('--efy_gap', '15rem');
        $root.style.setProperty('--efy_color', color[0]); $root.style.setProperty('--efy_color_trans', color[1]);
    }
    else { $root.style.setProperty('--efy_radius', ++n + 'rem'); $root.style.setProperty('--efy_gap', (n * 1.2) + 'rem');

        if (n == 1 || n == 2){let a = 'linear-gradient(0deg, hsla(170 100% 50% / .3), hsla(170 100% 50% / .3))', b = a.replaceAll('hsla', 'hsl').replaceAll(' / .3', '');
            $root.style.setProperty('--efy_color_trans', a); $root.style.setProperty('--efy_color', b);
            $('.auto_demo').textContent = d[0]+'hsl(170 100% 10%)!important; filter: blur(0rem)'+d[1] + ':root { --efy_text: hsl(170 100% 50%) }';
        }
        else if (n == 3 || n == 4){ let a = 'radial-gradient(circle at center, hsla(0 100% 0% / .3), hsla(0 100% 100% / .3), hsla(0 100% 0% / .3), hsla(0 100% 100% / .3), hsla(0 100% 0% / .3), hsla(0 100% 100% / .3))', b = a.replaceAll('hsla', 'hsl').replaceAll(' / .3', '');
            $root.style.setProperty('--efy_color_trans', a); $root.style.setProperty('--efy_color', b);
            $('.auto_demo').textContent = d[0] + 'radial-gradient(circle at 60vw 0, hsl(157.85deg 100% 50% / 34%), #ff69697d 50%, #a600adb3), radial-gradient(circle at 35vw 90vh, hsl(182.22deg 100% 50%), #ffc30000 50%, #ff000000), radial-gradient(circle at bottom right, #ffa200, #00fdcf, hsl(255.32deg 100% 41.18%))' + d[1]
        }
        else if (n == 5 || n == 6){ let a = 'radial-gradient(circle at center, hsla(0 100% 0% / .3), hsla(0 100% 100% / .3), hsla(0 100% 0% / .3), hsla(0 100% 100% / .3), hsla(0 100% 0% / .3), hsla(0 100% 100% / .3))', b = a.replaceAll('hsla', 'hsl').replaceAll(' / .3', '');
            $root.style.setProperty('--efy_color_trans', a); $root.style.setProperty('--efy_color', b);
            $('.auto_demo').textContent = d[0] + 'linear-gradient(352deg, #00ffbd, #6e74ca, #ca916e, #00a491)' + d[1]
        }
        else if (n == 8 || n == 9){ let a = 'linear-gradient(hsla(0 100% 0% / .3), hsla(0 100% 50% / .3), hsla(70 100% 50% / .3), hsla(140 100% 50% / .3), hsla(210 100% 50% / .3), hsla(280 100% 50% / .3))', b = a.replaceAll('hsla', 'hsl').replaceAll(' / .3', '');
            $root.style.setProperty('--efy_color_trans', a); $root.style.setProperty('--efy_color', b);
            $('.auto_demo').textContent = d[0]+'repeating-conic-gradient(#fc0 0% 25%, #7a0 0% 50%) 0 0 / 100rem 100rem'+d[1]
        }
        else if (n == 10 || n == 11){ let a = 'linear-gradient(hsla(0 100% 50% / .3), hsla(0 100% 50% / .3), hsla(70 100% 50% / .3), hsla(140 100% 50% / .3), hsla(210 100% 50% / .3), hsla(280 100% 50% / .3))', b = a.replaceAll('hsla', 'hsl').replaceAll(' / .3', '');
            $root.style.setProperty('--efy_color_trans', a); $root.style.setProperty('--efy_color', b);
            $('.auto_demo').textContent = d[0]+'repeating-conic-gradient(#c0f 0% 15%, #f00 0% 70%) 0 0 / 500rem 500rem'+d[1]
        }
        else if (n == 14 || n == 15){ let a = 'linear-gradient(hsla(0 0% 0% / .3), hsla(0 0% 0% / .3))', b = a.replaceAll('hsla', 'hsl').replaceAll(' / .3', '');
            $root.style.setProperty('--efy_color_trans', a); $root.style.setProperty('--efy_color', b);
            $('.auto_demo').textContent = d[0]+'repeating-conic-gradient(hsl(70 100% 50%) 0% 20%, hsl(90 100% 30%) 0% 78%) 0 0 / 500rem 500rem'+d[1] +
            'html .efy_3d_back {filter: blur(50rem)!important}' + ':root {--efy_scheme: light; --efy_bg_var: 0 0% 0%; --efy_bg: hsl(0 0% 100%); --efy_text: hsl(0deg 0% 0%)}';  debugger
        }
        else if (n == 16 || n == 17){ let a = 'linear-gradient(hsla(0 0% 0% / .3), hsla(0 0% 0% / .3))', b = a.replaceAll('hsla', 'hsl').replaceAll(' / .3', '');
            $root.style.setProperty('--efy_color_trans', a); $root.style.setProperty('--efy_color', b);
            $('.auto_demo').textContent = d[0]+'repeating-conic-gradient(hsl(140 100% 50%) 0% 20%, hsl(140 100% 30%) 0% 78%) 0 0 / 500rem 500rem'+d[1] +
            'html .efy_3d_back {filter: blur(50rem)!important}' + ':root {--efy_scheme: light; --efy_bg_var: 0 0% 0%; --efy_bg: hsl(0 0% 100%); --efy_text: hsl(0deg 0% 0%)}';  debugger
        }
        else if (n == 19 || n == 20){ let a = 'linear-gradient(hsla(0 0% 0% / .3), hsla(140 100% 30% / .3))', b = a.replaceAll('hsla', 'hsl').replaceAll(' / .3', '');
            $root.style.setProperty('--efy_color_trans', a); $root.style.setProperty('--efy_color', b);
            $('.auto_demo').textContent = d[0]+'radial-gradient(circle at 100% 50%, #000000 20%, #c500ff 21%, #00ff8e 34%, #000000 35%, #00000000), radial-gradient(circle at 0% 50%, #000000 20%, #00ff8e 21%, #c500ff 34%, #000000 35%, black) 0 -100rem!important; filter: none!important; background-size: 150rem 200rem!important; rotate: 45deg!important; scale: 2'+d[1]
        }
        else if (n == 21 || n == 22){ let a = 'linear-gradient(hsla(0 0% 100% / .3), hsla(0 0% 100% / .3))', b = a.replaceAll('hsla', 'hsl').replaceAll(' / .3', '');
            $root.style.setProperty('--efy_color_trans', a); $root.style.setProperty('--efy_color', b);
            $('.auto_demo').textContent = d[0]+'radial-gradient(circle at 100% 50%, #000000 20%, #ffab86 21%, #96ff00 34%, #000000 50%, #00000000), radial-gradient(circle at 0% 50%, #000000 20%, #96ff00 21%, #ffab86 27%, #000000 48%, black) 0 -100rem!important; filter: blur(0rem)'+d[1];
        }
        else if (n == 23 || n == 24){ let a = 'linear-gradient(165deg, hsla(179 100% 45% / .3), hsla(277 44% 50% / .3), hsla(49 100% 50% / .3))', b = a.replaceAll('hsla', 'hsl').replaceAll(' / .3', '');
            $root.style.setProperty('--efy_color_trans', a); $root.style.setProperty('--efy_color', b);
            $('.auto_demo').textContent = d[0]+'radial-gradient(circle at center, #413348 30%, #ffc800 30%, #000000 70%, #534067 70%, #000000)!important; filter: blur(0rem)'+d[1];
        }
        else {
            $root.style.setProperty('--efy_color', `${c}, hsl(${a}), hsl(${b}))`);
            $root.style.setProperty('--efy_color_trans', `${c}, hsla(${a} / .3), hsla(${b} / .3))`);
        }
    }
}; $event($('.dc_cta [efy_sidebar_btn]'), 'click', ()=> counts = setInterval(auto, 100));

$add('style', {class: 'auto_demo'});


/* Hash Isolated Parts*/ let faq = [], docs = []; const hash = location.hash,
hash_fn =(a)=>{ a.scrollIntoView(); a.open = true; a.classList.add('hash_focus'); $wait(2, ()=> a.classList.remove('hash_focus')) },
searchable =(a,b)=>{ $all(`[efy_content=${a}] [efy_searchable]`).forEach((c, i) => b[i] = c.getAttribute('efy_searchable') || b[i] )}; searchable('faq', faq); searchable('docs', docs);

['faq', 'html', 'docs'].forEach(tab =>{ if (hash.includes(`#${tab}`)){
    $(`[efy_tabs=dc] [efy_tab=${tab}]`).click();
    if (tab === 'faq'){ faq.forEach(q =>{
        if (hash.includes(`#${q}`)) hash_fn($(`[efy_content=faq] [efy_searchable="${q}"]`))
    })}
    if (tab === 'docs'){ docs.forEach(q =>{
        if (hash.includes(`#${q}`)) hash_fn($(`[efy_content=docs] [efy_searchable="${q}"]`))
    })}
}});


}, 1);