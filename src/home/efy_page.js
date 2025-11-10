const efy_page = $('div[efy_content=efy]');

$add('div', {class: 'dash_hide'}, [
    ['h2', {efy_lang: 'join_future', efy_searchable:''}],
    ['p', {efy_lang: 'sidebar_about_text', efy_searchable:''}],
    ['div', {id: 'hm_buttons', class: 'hm_cta', efy_searchable: ''}, [
        ['button', {efy_sidebar_btn:'', efy_lang: 'customize', tabindex: '-1'}, [
            ['input', {type: 'radio', name: 'hm_cta'}],
            ['i', {efy_icon: 'menu'}]
        ]],
        ['button', {class: 'apps efy-glass efy_card_filter efy_color_trans', tabindex: '-1'}, [
            ['input', {type: 'radio', name: 'hm_cta'}],
            ['i', {efy_icon: 'dots'}], ['p', 'Apps']
        ]],
        ['button', {class: 'themes efy-glass efy_card_filter efy_color_trans', tabindex: '-1'}, [
            ['input', {type: 'radio', name: 'hm_cta'}],
            ['i', {efy_icon: 'heart'}], ['p', 'Themes']
        ]],
        ['button', {class: 'learn', efy_card: '', tabindex: '-1'}, [
            ['input', {type: 'radio', name: 'hm_cta'}],
            ['i', {efy_icon: 'help'}], ['p', 'Learn']
        ]],
        ['button', {class: 'social efy-glass efy_card_filter', tabindex: '-1'}, [
            ['input', {type: 'radio', name: 'hm_cta'}],
            ['i', {efy_icon: 'user'}],
            ['i', {efy_icon: 'group', style: 'margin-left: -10rem'}],
            ['i', {efy_icon: 'github', style: 'margin-left: -10rem'}],
            ['p', 'Community']
        ]]
    ]],
    ['div', {id: 'efy_social_options', class: 'efy_hide_i', efy_card: ''}, [
        ['p', 'Join the community, ask questions, give feedback, receive support, or contribute'],
        ['div', {class: 'hm_cta', efy_searchable: '', efy_select: ''}, [
            ['a', {href: 'https://github.com/dragos-efy/efy', tabindex: '-1', role: 'button'}, [
                ['input', {type: 'radio', name: 'hm_cta'}],
                ['i', {efy_icon: 'github'}], ['p', 'EFY Github · 65']
            ]],
            ['a', {href: 'https://github.com/dragos-efy/efy-apps', tabindex: '-1', role: 'button'}, [
                ['input', {type: 'radio', name: 'hm_cta'}],
                ['i', {efy_icon: 'github'}], ['p', 'Apps Github · 7']
            ]],
            ['a', {href: 'https://matrix.to/#/#efy_ui:matrix.org', tabindex: '-1', role: 'button'}, [
                ['input', {type: 'radio', name: 'hm_cta'}],
                ['i', {efy_icon: 'group'}], ['p', 'Matrix Chat · 59']
            ]],
            ['a', {href: 'https://translate.codeberg.org/projects/efy', tabindex: '-1', role: 'button'}, [
                ['input', {type: 'radio', name: 'hm_cta'}],
                ['i', {efy_icon: 'globe'}], ['p', 'Translate · 60%']
            ]]
        ]]
    ]]
], efy_page);

$all('#hm_buttons.hm_cta').forEach(parent =>{
    $event(parent, 'click', ()=>{
        const target = event.target, x = target.parentElement;
        if (x.matches('.themes') || target.matches('.themes')){
            const y = $('[efy_tabs=hm] [efy_tab=themes]');
            y.dispatchEvent(new Event('click', {'bubbles': true })); y.focus(); focus_index = 2;
        }
        else if (x.matches('.apps') || target.matches('.apps')){
            const y = $('[efy_tabs=hm] [efy_tab=apps]');
            y.dispatchEvent(new Event('click', {'bubbles': true })); y.focus(); focus_index = 3;
        }
        else if (x.matches('.learn') || target.matches('.learn')){
            const y = $('[efy_tabs=hm] [efy_tab=learn]');
            y.dispatchEvent(new Event('click', {'bubbles': true })); y.focus(); focus_index = 5;
        }
        else if (x.matches('.social') || target.matches('.social')){
            $('#efy_social_options').classList.toggle('efy_hide_i');
        }
        else if (x.matches('a')){ window.location.href = x.getAttribute('href')}
        else if (x.matches('button')){ x.dispatchEvent(new Event('click', {'bubbles': true })); x.focus()}
    })
});

$event($('#efy_social_options .hm_cta'), 'click', ()=>{
    const x = event.target.parentElement;
    if (x.matches('a')){ window.location.href = x.getAttribute('href')}
});