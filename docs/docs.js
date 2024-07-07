/*Storage*/ let  efy_dc = {}, $dc_save =()=>{}; try {
    if (localStorage.efy_dc) efy_dc = JSON.parse(localStorage.efy_dc);
    $dc_save =()=> localStorage.efy_dc = JSON.stringify(efy_dc);
} catch {}

/*Ready*/ $ready('#efy_sbtheme', ()=>{

/*Icons*/ $ready('#dc_icons', (a)=>{ 'accessibility arrow arrow_down arrow_left arrow_up audio camera check chevron chevron_down chevron_left chevron_up circle cloud copy dots edit flash fullscreen github globe group heart help key menu menu2 microphone moon move notify notify_active paste pause play plus rain reload remove screen search snow star sun user zoom_in zoom_out'.split(' ').map(b=> $add('div', {efy_card: ''}, [['i', {efy_icon: b}], ['p', {}, b]], $('#dc_icons')) )}, 1);

/* Hash Isolated Parts*/ let searchables = {faq: '', docs: '', apps: '', html: ''}; const link = window.location, hash = link.hash, href = link.href,
hash_fn =(a,b)=>{ a = $(`[efy_content=${a}] [efy_searchable="${b}"]`);
    a.scrollIntoView(); a.open = true; a.classList.add('hash_focus'); $wait(2, ()=> a.classList.remove('hash_focus')) },
searchable =(a)=>{ let p = [];
    $all(`[efy_content=${a}] [efy_searchable]`).forEach((x)=>{ p.push(x.getAttribute('efy_searchable')) } );
    searchables[a] = p;
};

'faq html docs apps'.split(' ').forEach(tab =>{ if (hash.includes(`#${tab}`)){
    $(`[efy_tabs=dc] [efy_tab=${tab}]`).click();
    if (('faq apps html docs'.includes(tab))){
        const frame = $(`[efy_tabs=dc] [efy_content="${tab}"]:not(.loading)`), src = `./pages/${tab}_page.js`;
        $add('script', {src: src}, [], $('head'));
        $event($(`script[src="${src}"]`), 'load', ()=>{
            $(`[efy_content=${tab}] + .loading`).classList.add('efy_hide_i')
            frame.classList.add('efy_dom'); frame.classList.remove('efy_hide_i');
            if (('faq apps docs'.includes(tab))){
                searchable(tab);
                searchables[tab].forEach(q =>{ if (hash.includes(`#${q}`)) hash_fn(tab, q) });
            }
        });
    }
}});

['apps', 'html', 'faq'].map(tab =>{ const frame = $(`[efy_content=${tab}]:not(.loading)`);
    $event($(`[efy_tab=${tab}]`), 'click', () =>{ if (! frame.classList.contains('efy_dom')){
        const src = `./pages/${tab}_page.js`;
        $(`[efy_content=${tab}] + .loading`).classList.remove('efy_hide_i');
        $add('script', {src: src}, [], $('head'));
        $event($(`script[src="${src}"]`), 'load', ()=>{
            $(`[efy_content=${tab}] + .loading`).classList.add('efy_hide_i')
            frame.classList.add('efy_dom'); frame.classList.remove('efy_hide_i');
        });
    }});
});

/*Copy URL / Icon*/ $event($('[efy_content=docs]'), 'click', (e)=>{
    const x = e.target, match = [x.matches('.copy_url'), x.matches('#dc_icons [efy_card]')];
    if (match[0] || match[1]){ const text = match[0] ?
        href.replace(hash, '') + '#docs#' + $$(x.parentNode, '[efy_tab=preview]').textContent.toLowerCase().replaceAll(' ', '_') : x.textContent;
        navigator.clipboard.writeText(text);
        if (efy.notify_clipboard != false) $notify('short', 'Copied to clipboard', text);
}});

$event($('#dc_buttons.apps'), 'pointerdown', ()=>{ x = event.target;
    if (x.matches('.apps .more')){
        const x = $('[efy_tabs=dc] [efy_tab=apps]');
        x.dispatchEvent(new Event('click', {'bubbles': true })); x.focus();
    }
    else if (x.matches('a')){ window.location.href = x.getAttribute('href')}
});

$event(document, 'keydown', (event)=>{
    const key = event.key, active = document.activeElement;
    if ((key === ' ') || (key === 'Enter')){
        if (active.matches('.apps .more input')){
            const x = $('[efy_tabs=dc] [efy_tab=apps]');
            x.dispatchEvent(new Event('click', {'bubbles': true })); x.focus();
        }
        else if (active.matches('#dc_buttons:is(.apps, .dc_cta) input')){
            const a = event.target.closest('a');
            if (a) window.location.href = a.getAttribute('href');
        }
    }
});

// Move to docs_page.js when html is too
$event($('#dc_notify_test'), 'click', ()=> $notify('short', 'Short Notification', 'Disappears in 5s'));
$ready('[efy_tabs=demo_color_picker] [efy_color] [efy_tab="1"]', (x)=> x.click());

}, 1);