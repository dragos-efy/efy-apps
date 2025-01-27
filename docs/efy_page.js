const efy_page = $('div[efy_content=efy]');

$add('div', {class: 'dash_hide'}, [
    ['h2', {efy_lang: 'join_future', efy_searchable:''}],
    ['p', {efy_lang: 'sidebar_about_text', efy_searchable:''}],
    ['div', {id: 'dc_buttons', class: 'dc_cta', efy_searchable: ''}, [
        ['button', {efy_sidebar_btn:'', efy_lang: 'try_it', tabindex: '-1'}, [
            ['input', {type: 'radio', name: 'dc_cta'}],
            ['i', {efy_icon: 'play'}]
        ]],
        ['button', {class: 'apps featured', tabindex: '-1'}, [
            ['input', {type: 'radio', name: 'dc_cta'}],
            ['i', {efy_icon: 'dots'}], ['p', 'Apps']
        ]],
        ['a', {href: 'https://github.com/dragos-efy/efy', tabindex: '-1', role: 'button', class: 'efy_trans_filter efy_color_trans'}, [
            ['input', {type: 'radio', name: 'dc_cta'}],
            ['i', {efy_icon: 'github'}], ['p', 'Github · 65']
        ]],
        ['a', {href: 'https://matrix.to/#/#efy_ui:matrix.org', tabindex: '-1', role: 'button', class: 'efy_trans_filter efy_color_trans'}, [
            ['input', {type: 'radio', name: 'dc_cta'}],
            ['i', {efy_icon: 'group'}], ['p', 'Matrix · 58']
        ]],
        ['button', {class: 'faq', efy_card: '', tabindex: '-1'}, [
            ['input', {type: 'radio', name: 'dc_cta'}],
            ['i', {efy_icon: 'help'}], ['p', 'FAQ']
        ]],
        ['button', {class: 'docs', efy_card: '', tabindex: '-1'}, [
            ['input', {type: 'radio', name: 'dc_cta'}],
            ['i', {efy_icon: 'menu3'}], ['p', 'Docs']
        ]],
        ['a', {href: 'https://translate.codeberg.org/projects/efy', tabindex: '-1', role: 'button', class: 'translations efy_trans_filter'}, [
            ['input', {type: 'radio', name: 'dc_cta'}],
            ['i', {efy_icon: 'globe'}], ['p', {efy_lang: 'translations'}]
        ]],
        ['button', {class: 'themes', efy_card: '', tabindex: '-1', disabled: ''}, [
            ['input', {type: 'radio', name: 'dc_cta'}],
            ['i', {efy_icon: 'heart'}], ['p', 'Themes']
        ]]
    ]]
], efy_page);

$all('#dc_buttons.dc_cta').forEach(parent =>{
    $event(parent, 'click', ()=>{
        const target = event.target, x = target.parentElement;
        if (x.matches('.faq') || target.matches('.faq')){
            const y = $('[efy_tabs=dc] [efy_tab=faq]');
            y.dispatchEvent(new Event('click', {'bubbles': true })); y.focus(); focus_index = 2;
        }
        else if (x.matches('.apps') || target.matches('.apps')){
            const y = $('[efy_tabs=dc] [efy_tab=apps]');
            y.dispatchEvent(new Event('click', {'bubbles': true })); y.focus(); focus_index = 3;
        }
        else if (x.matches('.docs') || target.matches('.docs')){
            const y = $('[efy_tabs=dc] [efy_tab=docs]');
            y.dispatchEvent(new Event('click', {'bubbles': true })); y.focus(); focus_index = 5;
        }
        else if (x.matches('a')){ window.location.href = x.getAttribute('href')}
        else if (x.matches('button')){ x.dispatchEvent(new Event('click', {'bubbles': true })); x.focus()}
    })
});