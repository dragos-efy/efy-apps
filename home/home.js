/*Storage*/ let  efy_hm = {}, $hm_save =()=>{}; try {
    if (localStorage.efy_hm) efy_hm = JSON.parse(localStorage.efy_hm);
    $hm_save =()=> localStorage.efy_hm = JSON.stringify(efy_hm);
} catch {}

const link = window.location, hash = link.hash, href = link.href;

/*Ready*/ $ready('#efy_sbtheme', ()=>{

let contents = [], tabs = [];

['EFY', 'Apps', 'Themes', 'Learn'].map(name =>{
    const tab = name.toLowerCase();
    tabs.push(
        ['input', {id: `hm_left_${tab}`, type: 'radio', efy_tab: tab, name: 'hm_left'}],
        ['label', {for: `hm_left_${tab}`, class: 'efy_card_filter_off'}, name]
    );
    contents.push(
        ['div', {efy_content: tab, class: 'efy_card_filter_off efy_hide_i'}],
        ['i', {efy_icon: 'reload', efy_content: tab, class: 'loading efy_card_filter_off efy_hide_i'}]
    );
});

$add('div', {id: 'efy_home', efy_search: 'details, #efy_home [efy_searchable]'}, [
    ['div', {efy_tabs: 'hm', class: 'hm_nav efy_shadow_card_off'}, [
        ['div', {class: 'hm_nav_div'}, [
            ['div', {class: 'hm_left efy_button_text_off'}, tabs],
            ['div', {class: 'hm_left efy_button_text_off'}, [
                ['div', {class: 'hm_right'}, [
                    ['label', {class: 'hm_search'}, [
                        ['i', {efy_icon: 'search'}],
                        ['input', {type: 'text', efy_search_input: '', placeholder: 'Search...', name: 'hm_search_input'}]
                    ]],
                    ['button', {efy_sidebar_btn: '', title: 'Menu'}, [
                        ['i', {efy_icon: 'menu'}], ['p', {efy_lang: 'customize'}]
                    ]]
                ]]
            ]]
        ]], ...contents
    ]]
]);

const hm_search = $('#efy_home .hm_search [efy_search_input]');

/* Hash Isolated Parts*/ let searchables = {apps: '', themes: '', learn: ''};
const hash_fn =(a,b)=>{
    const x = $(`[efy_content="${a}"] [efy_searchable="${b}"]`);
    x.click(); x.classList.add('hash_focus'); $wait(2, ()=> x.classList.remove('hash_focus'))
},
searchable =(a)=>{ let p = [];
    $all(`[efy_content=${a}] [efy_searchable]`).forEach((x)=>{ p.push(x.getAttribute('efy_searchable')) } );
    searchables[a] = p;
},
tab_load_fn =(tab, click = false)=>{
    const frame = $(`[efy_tabs=hm] [efy_content="${tab}"]:not(.loading)`), src = `./home/${tab}_page.js`,
    loading = $(`[efy_content=${tab}] + .loading`); let apps_unlisted = true;
    if ((tab === 'apps') && apps_unlisted){
        $add('script', {src: `./global/apps_list.js`}, [], $('head'));
        apps_unlisted = false;
    }
    if (tab === 'themes'){
        $add('link', {rel: 'stylesheet', href: `./home/themes.css`}, null, $('head'));
    }
    const wait_time = apps_unlisted ? '0' : '0.1';
    loading.classList.remove('efy_hide_i');
    $wait(wait_time, ()=>{
        $add('script', {src: src}, [], $('head'))
        $event($(`script[src="${src}"]`), 'load', ()=>{
            loading.classList.add('efy_hide_i'); frame.classList.add('efy_dom'); frame.classList.remove('efy_hide_i');
            if (click) $(`[efy_tabs=hm] [efy_tab=${tab}]`).click();
            if (('apps learn themes'.includes(tab))){
                searchable(tab);
                searchables[tab].forEach(q =>{ if ((q !== '') && (hash.includes(`#${q}`))) hash_fn(tab, q) });
            }
        })
    });
};

if (hash === '') tab_load_fn('efy', true);
for (const tab of ['efy', 'apps', 'learn', 'themes']){
    if (hash.includes(`#${tab}`)) tab_load_fn(tab, true);
    const frame = $(`[efy_tabs=hm] [efy_content="${tab}"]:not(.loading)`);
    $event($(`[efy_tabs=hm] [efy_tab=${tab}]`), 'click', ()=>{
        if (!frame.classList.contains('efy_dom')) tab_load_fn(tab);
    });
}

$wait(5, ()=>{
    $('[efy_tabs=hm] .hm_right [efy_sidebar_btn] p').classList.add('efy_hide_p');
});

// Options

let [apps_quick_start_checked, apps_invert_layout_checked] = [null, null];
if (efy_hm.apps_quick_start) {
    apps_quick_start_checked = {checked: ''};
    $root.classList.add('apps_quick_start');
}
if (efy_hm.apps_invert_layout) {
    apps_invert_layout_checked = {checked: ''};
    $root.classList.add('apps_invert_layout');
}

$add('details', {id: 'home_menu', name: 'efy_sidebar_modules'}, [
    ['summary', [ ['i', {efy_icon: 'home'}], ['p', 'Home'], ['mark', {efy_lang: 'alpha'}] ]],
    ['div', {efy_tabs: 'pn_menu', efy_select: ''}, [
        ['div', {class: 'efy_tabs'}, [
            ['input', {type:'radio', id: 'hm_tab_apps', efy_tab: 'hm_apps', efy_active: '', name: 'hm_menu_tabs'}],
            ['label', {for: 'hm_tab_apps'}, 'Apps'],
            ['input', {type:'radio', id: 'hm_tab_learn', efy_tab: 'hm_learn', name: 'hm_menu_tabs'}],
            ['label', {for: 'hm_tab_learn'}, 'Learn'],
            ['input', {type:'radio', id: 'hm_tab_themes', efy_tab: 'hm_themes', name: 'hm_menu_tabs'}],
            ['label', {for: 'hm_tab_themes'}, 'Themes']
        ]],
        ['div', {efy_content: 'hm_apps', efy_active: '', class: 'hm_apps', efy_select: ''}, [
            ['input', {id: 'home_apps_quick_start', type: 'checkbox', ...apps_quick_start_checked, name: 'hm_menu_toggles'}],
            ['label', {for: 'home_apps_quick_start'}, 'Quick Start'],
            ['p', 'Skip the app info card'],
            ['hr'],
            ['input', {id: 'home_apps_invert_layout', type: 'checkbox', ...apps_invert_layout_checked, name: 'hm_menu_toggles'}],
            ['label', {for: 'home_apps_invert_layout'}, 'Invert Layout'],
            ['p', 'Move the info card after apps']
        ]],
        ['div', {efy_content: 'hm_learn', efy_select: '', class: 'hm_learn'}, [
            ['div', {efy_lang: 'coming_soon'}]
        ]],
        ['div', {efy_content: 'hm_themes', efy_select: '', class: 'hm_themes'}, [
            ['div', {efy_lang: 'coming_soon'}]
        ]],
    ]]
], $('#efy_modules'));


$event(document, 'change', ()=>{
    const x = event.target;
    if (x.matches('#home_apps_quick_start')) {
        $root.classList.toggle('apps_quick_start');
        efy_hm.apps_quick_start = x.checked; $hm_save();
    }
    if (x.matches('#home_apps_invert_layout')) {
        $root.classList.toggle('apps_invert_layout');
        efy_hm.apps_invert_layout = x.checked; $hm_save();
    }
});

$event(document, 'keydown', (event)=>{
    if (
        event.target.matches('[efy_tabs=hm] :is(.hm_nav_div *, [efy_content=apps] [app], :is([efy_content=themes] [efy_theme], [efy_content=learn], [efy_content=efy]) *)')
        && (/^[a-z0-9]$/i.test(event.key)) // Alphanumeric ?
    ) {
        event.preventDefault();
        if (document.activeElement !== hm_search) hm_search.focus();
        hm_search.value += event.key;
        hm_search.dispatchEvent(new Event('input', {'bubbles': true}));

    }
});

}, 1);