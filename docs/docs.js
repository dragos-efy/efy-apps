/*Storage*/ let  efy_dc = {}, $dc_save =()=>{}; try {
    if (localStorage.efy_dc) efy_dc = JSON.parse(localStorage.efy_dc);
    $dc_save =()=> localStorage.efy_dc = JSON.stringify(efy_dc);
} catch {}

const link = window.location, hash = link.hash, href = link.href;

/*Ready*/ $ready('#efy_sbtheme', ()=>{

let contents = [], tabs = [];

['EFY', 'FAQ', 'Apps', 'HTML', 'Docs'].map(name =>{
    const tab = name.toLowerCase(), details = (tab === 'html') ? null : {efy_details: ''};
    tabs.push(
        ['input', {id: `dc_left_${tab}`, type: 'radio', efy_tab: tab, name: 'dc_left'}],
        ['label', {for: `dc_left_${tab}`, class: 'efy_trans_filter_off'}, name]
    );
    contents.push(
        ['div', {efy_content: tab, class: 'efy_trans_filter_off efy_hide_i', ...details}],
        ['i', {efy_icon: 'reload', efy_content: tab, class: 'loading efy_trans_filter_off efy_hide_i'}]
    );
});

$add('div', {id: 'efy_docs', efy_search: 'details, #efy_docs [efy_searchable]'}, [
    ['div', {efy_tabs: 'dc', class: 'dc_nav efy_shadow_trans_off'}, [
        ['div', {class: 'dc_nav_div'}, [
            ['div', {class: 'dc_left efy_button_text_off'}, tabs],
            ['div', {class: 'dc_left efy_button_text_off'}, [
                ['div', {class: 'dc_right'}, [
                    ['label', {class: 'dc_search'}, [
                        ['i', {efy_icon: 'search'}],
                        ['input', {type: 'text', efy_search_input: '', placeholder: 'Search...', name: 'dc_search_input'}]
                    ]],
                    ['button', {efy_sidebar_btn: '', class: 'efy_square_btn efy_trans_filter_off', title: 'Menu'}, [['i', {efy_icon: 'menu'}]]]
                ]]
            ]]
        ]], ...contents
    ]]
]);

/* Hash Isolated Parts*/ let searchables = {faq: '', docs: '', apps: '', html: ''};
const hash_fn =(a,b)=>{ const x = $(`[efy_content="${a}"] [efy_searchable="${b}"]`);
    $wait(.3, ()=>{
        x.scrollIntoView({behavior: 'instant', block: 'start'});
        const number = efy.gap ? Number(efy.gap.replace('rem', '')) * -1 : -15;
        $body.scrollBy({top: number === -0 ? 0 : number});
    });
    x.open = true; x.classList.add('hash_focus'); $wait(2, ()=> x.classList.remove('hash_focus'))
},
searchable =(a)=>{ let p = [];
    $all(`[efy_content=${a}] [efy_searchable]`).forEach((x)=>{ p.push(x.getAttribute('efy_searchable')) } );
    searchables[a] = p;
},
tab_load_fn =(tab, click = false)=>{
    const frame = $(`[efy_tabs=dc] [efy_content="${tab}"]:not(.loading)`), src = `./docs/${tab}_page.js`,
    loading = $(`[efy_content=${tab}] + .loading`); let apps_unlisted = true;
    if ((tab === 'apps') && apps_unlisted){
        $add('script', {src: `./global/apps_list.js`}, [], $('head'));
        apps_unlisted = false;
    }
    const wait_time = apps_unlisted ? '0' : '0.1';
    loading.classList.remove('efy_hide_i');
    $wait(wait_time, ()=>{
        $add('script', {src: src}, [], $('head'))
        $event($(`script[src="${src}"]`), 'load', ()=>{
            loading.classList.add('efy_hide_i'); frame.classList.add('efy_dom'); frame.classList.remove('efy_hide_i');
            if (click) $(`[efy_tabs=dc] [efy_tab=${tab}]`).click();
            if (('faq apps docs'.includes(tab))){
                searchable(tab);
                searchables[tab].forEach(q =>{ if ((q !== '') && (hash.includes(`#${q}`))) hash_fn(tab, q) });
            }
        })
    });
};

if (hash === '') tab_load_fn('efy', true);
for (const tab of ['efy', 'apps', 'faq', 'html', 'docs']){
    if (hash.includes(`#${tab}`)) tab_load_fn(tab, true);
    const frame = $(`[efy_tabs=dc] [efy_content="${tab}"]:not(.loading)`);
    $event($(`[efy_tabs=dc] [efy_tab=${tab}]`), 'click', ()=>{
        if (!frame.classList.contains('efy_dom')) tab_load_fn(tab);
    });
}

}, 1);