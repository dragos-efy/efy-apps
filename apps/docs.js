/*Storage*/ let  efy_dc = {}, $dc_save =()=>{}; try { if (localStorage.efy_dc){ efy_dc = JSON.parse(localStorage.efy_dc)} $dc_save =()=>{localStorage.efy_dc = JSON.stringify(efy_dc)}} catch {}

/*Sidebar Ready*/ $ready('#efy_sbtheme', ()=>{

/*Icons*/ $ready('#dc_icons', (a)=>{ 'accessibility arrow arrow_down arrow_left arrow_up audio camera circle copy check chevron chevron_down chevron_left chevron_up dots edit fullscreen github globe group heart help key menu menu2 microphone move notify notify_active paste pause play plus reload remove search star zoom_in zoom_out user'.split(' ').map(b=> $add('div', {efy_card: ''}, [ $add('i', {efy_icon: b}), $add('p', {}, b) ], $('#dc_icons')) )}, 1);

/* Hash Isolated Parts*/ let faq = [], docs = []; const link = window.location, hash = link.hash, href = link.href, path = link.pathname,
hash_fn =(a)=>{ a.scrollIntoView(); a.open = true; a.classList.add('hash_focus'); $wait(2, ()=> a.classList.remove('hash_focus')) },
searchable =(a,b)=>{ $all(`[efy_content=${a}] [efy_searchable]`).forEach((c, i) => b[i] = c.getAttribute('efy_searchable') || b[i] )}; searchable('faq', faq); searchable('docs', docs);

'faq html docs apps'.split(' ').forEach(tab =>{ if (hash.includes(`#${tab}`)){
    $(`[efy_tabs=dc] [efy_tab=${tab}]`).click();
    if (tab === 'faq'){ faq.forEach(q =>{
        if (hash.includes(`#${q}`)) hash_fn($(`[efy_content=faq] [efy_searchable="${q}"]`))
    })}
    if (tab === 'docs'){ docs.forEach(q =>{
        if (hash.includes(`#${q}`)) hash_fn($(`[efy_content=docs] [efy_searchable="${q}"]`))
    })}
    if (tab === 'apps' || tab === 'html'){ const frame = $(`[efy_tabs=dc] [efy_content="${tab}"]:not(.loading)`);
        $add('script', {src: `./apps/${tab}_page.js`}, [], $('head'));
        $event($(`script[src="./apps/${tab}_page.js"]`), 'load', ()=>{
            $(`[efy_content=${tab}] + .loading`).classList.add('efy_hide_i')
            frame.classList.add('efy_dom'); frame.classList.remove('efy_hide_i');
        });
    }
}});

/*Live Auto Demo*/ let n = 0; const color = [$css_prop('--efy_color'), $css_prop('--efy_color_trans')],
common = [
    'html[efy_mode=default]:not([efy_color_bgcol]) .efy_3d_back, html:is([efy_mode=default], [efy_mode*=light], [efy_mode*=dark]) .efy_3d_back {background: ',
    '!important} [efy_mode*=trans] .efy_3d_back {filter: none!important}'
],
hsla =(array)=>{ array.push(
    array[0].replace(/hsl(?=\()|\),|\)\)/g, (match)=>{ return {'hsl': 'hsla', '),': ' / .3),', '))': ' / .3))'}[match] || match})
)},
setColor = (array) => {
    $css_prop('--efy_color_trans', array[1]);
    $css_prop('--efy_color', array[0]);
},
auto =()=>{ let m = n * 14;
    if (n == 25){ n = 0; clearInterval(counts); $('.auto_demo').textContent = '';
        $css_prop('--efy_radius', '12rem');
        $css_prop('--efy_gap', '15rem');
        setColor(color);
    } else {
        $css_prop('--efy_radius', ++n + 'rem');
        $css_prop('--efy_gap', (n * 1.2) + 'rem');
        let aa = ['linear-gradient(0deg, hsl(170 100% 50%), hsl(170 100% 50%))'],
        bb = ['radial-gradient(circle at center, hsl(0 100% 0%), hsl(0 100% 100%), hsl(0 100% 0%), hsl(0 100% 100%), hsl(0 100% 0%), hsl(0 100% 100%))'],
        c = ['linear-gradient(hsl(0 100% 0%), hsla(0 100% 50%), hsl(70 100% 50%), hsl(140 100% 50%), hsl(210 100% 50%), hsl(280 100% 50%))'],
        d = ['linear-gradient(hsl(0 0% 0%), hsl(0 0% 0%))']; hsla(aa); hsla(bb); hsla(c); hsla(d);
        switch (n) {
            case 1: case 2: setColor(aa);
                $('.auto_demo').textContent = common[0] + 'hsl(170 100% 10%)!important; filter: blur(0rem)' + common[1] + ':root { --efy_text: hsl(170 100% 50%) }';
            break; case 3: case 4: setColor(bb);
                $('.auto_demo').textContent = common[0] + 'radial-gradient(circle at 60vw 0, hsl(157.85deg 100% 50% / 34%), #ff69697d 50%, #a600adb3), radial-gradient(circle at 35vw 90vh, hsl(182.22deg 100% 50%), #ffc30000 50%, #ff000000), radial-gradient(circle at bottom right, #ffa200, #00fdcf, hsl(255.32deg 100% 41.18%))' + common[1];
            break; case 5: case 6: setColor(bb);
                $('.auto_demo').textContent = common[0] + 'linear-gradient(352deg, #00ffbd, #6e74ca, #ca916e, #00a491)' + common[1];
            break; case 8: case 9: setColor(c);
                $('.auto_demo').textContent = common[0]+'repeating-conic-gradient(#fc0 0% 25%, #7a0 0% 50%) 0 0 / 100rem 100rem'+common[1];
            break; case 10: case 11: setColor(c);
                $('.auto_demo').textContent = common[0]+'repeating-conic-gradient(#c0f 0% 15%, #f00 0% 70%) 0 0 / 500rem 500rem'+common[1];
            break; case 14: case 15: setColor(d);
            $('.auto_demo').textContent = common[0]+'repeating-conic-gradient(hsl(70 100% 50%) 0% 20%, hsl(90 100% 30%) 0% 78%) 0 0 / 500rem 500rem'+common[1] +
            'html .efy_3d_back {filter: blur(50rem)!important}' + ':root {--efy_scheme: light; --efy_bg_var: 0 0% 0%; --efy_bg: hsl(0 0% 100%); --efy_text: hsl(0deg 0% 0%)}';
            break; case 16: case 17: setColor(d);
                $('.auto_demo').textContent = common[0]+'repeating-conic-gradient(hsl(140 100% 50%) 0% 20%, hsl(140 100% 30%) 0% 78%) 0 0 / 500rem 500rem'+common[1] +
                'html .efy_3d_back {filter: blur(50rem)!important}' + ':root {--efy_scheme: light; --efy_bg_var: 0 0% 0%; --efy_bg: hsl(0 0% 100%); --efy_text: hsl(0deg 0% 0%)}';
            break; case 19: case 20: x = ['linear-gradient(hsl(0 0% 0%), hsl(140 100% 30%))']; hsla(x); setColor(x);
                $('.auto_demo').textContent = common[0]+'radial-gradient(circle at 100% 50%, #000000 20%, #c500ff 21%, #00ff8e 34%, #000000 35%, #00000000), radial-gradient(circle at 0% 50%, #000000 20%, #00ff8e 21%, #c500ff 34%, #000000 35%, black) 0 -100rem!important; filter: none!important; background-size: 150rem 200rem!important; rotate: 45deg!important; scale: 2'+common[1];
            break; case 21: case 22: x = ['linear-gradient(hsl(0 0% 100%), hsl(0 0% 100%))']; hsla(x); setColor(x);
                $('.auto_demo').textContent = common[0]+'radial-gradient(circle at 100% 50%, #000000 20%, #ffab86 21%, #96ff00 34%, #000000 50%, #00000000), radial-gradient(circle at 0% 50%, #000000 20%, #96ff00 21%, #ffab86 27%, #000000 48%, black) 0 -100rem!important; filter: blur(0rem)'+common[1];
            break; case 23: case 24: x = ['linear-gradient(165deg, hsl(179 100% 45%), hsl(277 44% 50%), hsl(49 100% 50%))']; hsla(x); setColor(x);
                $('.auto_demo').textContent = common[0]+'radial-gradient(circle at center, #413348 30%, #ffc800 30%, #000000 70%, #534067 70%, #000000)!important; filter: blur(0rem)'+common[1];
            break; default: const a = `${m} 100% 50%`, b = `${m + 50} 100% 50%`;
                $css_prop('--efy_color', `linear-gradient(${m}deg, hsl(${a}), hsl(${b}))`);
                $css_prop('--efy_color_trans', `linear-gradient(${m}deg, hsla(${a} / .3), hsla(${b} / .3))`);
                break;
}}}; $add('style', {class: 'auto_demo'});
$event($('.dc_cta [efy_sidebar_btn]'), 'click', () =>{ counts = setInterval(auto, 100) });

['apps', 'html'].map(tab =>{ const frame = $(`[efy_content=${tab}]:not(.loading)`);
    $event($(`[efy_tab=${tab}]`), 'click', () =>{ if (! frame.classList.contains('efy_dom')){
        $(`[efy_content=${tab}] + .loading`).classList.remove('efy_hide_i');
        $add('script', {src: `./apps/${tab}_page.js`}, [], $('head'));
        $event($(`script[src="./apps/${tab}_page.js"]`), 'load', ()=>{
            $(`[efy_content=${tab}] + .loading`).classList.add('efy_hide_i')
            frame.classList.add('efy_dom'); frame.classList.remove('efy_hide_i');
        });
    }});
});

$event($('.apps .more'), 'click', ()=>{
    $('[efy_tabs=dc] [efy_tab=apps]').dispatchEvent(new Event('click', {'bubbles': true }))
});
$event($('#dc_notify_test'), 'click', ()=>{
    $notify('short', 'Short Notification', 'Disappears in 5s');
});

/*Copy URL / Icon*/ $event($('[efy_content=docs]'), 'click', (e)=>{ const x = e.target, match = [x.matches('.copy_url'), x.matches('#dc_icons [efy_card]')];
    if (match[0] || match[1]){ const text = match[0] ?
        href.split(path)[0] + path + '#docs#' + $$(x.parentNode, '[efy_tab=preview]').textContent.toLowerCase().replaceAll(' ', '_') : x.textContent;
        navigator.clipboard.writeText(text);
        if (efy.notify_clipboard != false) $notify('short', 'Copied to clipboard', text);
}});

$('[efy_tabs=demo_color_picker] [efy_color] [efy_tab="1"]').click();

}, 1);