const efy_page = $('div[efy_content=efy]');

$add('div', {class: 'dash_hide'}, [
    ['h2', {efy_lang: 'join_future', efy_searchable:''}],
    ['p', {efy_lang: 'sidebar_about_text', efy_searchable:''}],
    ['div', {id: 'dc_buttons', class: 'dc_cta', efy_searchable: ''}, [
        ['button', {efy_sidebar_btn:'', efy_lang: 'try_it', tabindex: '-1'}, [
            ['input', {type: 'radio', name: 'dc_cta'}],
            ['i', {efy_icon: 'play'}]
        ]],
        ['a', {href: 'https://github.com/dragos-efy/efy', tabindex: '-1', role: 'button', class: 'efy_btn_split efy_trans_filter', title: 'Github'}, [
            ['input', {type: 'radio', name: 'dc_cta'}],
            ['p', [['i', {efy_icon: 'github'}]]],
            ['p', '65']
        ]],
        ['a', {href: 'https://matrix.to/#/#efy_ui:matrix.org', tabindex: '-1', role: 'button', class: 'efy_btn_split efy_trans_filter'}, [
            ['input', {type: 'radio', name: 'dc_cta'}],
            ['p', 'Matrix'],
            ['p', '58']
        ]]
    ]]
], efy_page);

$add('div', {}, [['div', {id: 'dc_buttons', class: 'apps', efy_searchable: ''}, [
    ['a', {href: '#media', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'audio'}],
        ['div', {class: 'column_flex'}, [['div', 'Media'], ['mark', {efy_lang: 'beta'}]]]
    ]],
    ['a', {href: '#weather', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'sun'}],
        ['div', {class: 'column_flex'}, [['div', 'Weather'], ['mark', {efy_lang: 'beta'}]]]
    ]],
    ['a', {href: '#calculator', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'plus'}],
        ['div', {class: 'column_flex'}, [['div', 'Calculator'], ['mark', {efy_lang: 'beta'}]]]
    ]],
    ['a', {href: '#emoji', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'snow'}],
        ['div', {class: 'column_flex'}, [['div', 'Emoji'], ['mark', {efy_lang: 'alpha'}]]]
    ]],
    ['a', {href: './money.html', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'group'}],
        ['div', {class: 'column_flex'}, [['div', 'Money'], ['mark', {efy_lang: 'beta'}]]]
    ]],
    ['a', {href: './os.html', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'dots'}],
        ['div', {class: 'column_flex'}, [['div', 'OS'], ['mark', {efy_lang: 'alpha'}]]]
    ]],
    ['a', {href: '#converter', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'reload'}],
        ['div', {class: 'column_flex'}, [['div', 'Converter'], ['mark', {efy_lang: 'alpha'}]]]
    ]],
    ['a', {href: '#pong', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'circle'}],
        ['div', {class: 'column_flex'}, [['div', 'Pong'], ['mark', {efy_lang: 'alpha'}]]]
    ]],
    ['a', {href: '#xo', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'remove'}],
        ['div', {class: 'column_flex'}, [['div', 'XO'], ['mark', {efy_lang: 'alpha'}]]]
    ]],
    ['a', {href: './planner.html', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'edit'}],
        ['div', {class: 'column_flex'}, [['div', 'Planner'], ['mark', {efy_lang: 'alpha'}]]]
    ]],
    ['a', {href: '#gamepads', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'gamepad'}],
        ['div', {class: 'column_flex'}, [['div', 'Gamepads'], ['mark', {efy_lang: 'alpha'}]]]
    ]],
    ['button', {class: 'more', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'chevron'}],
        ['div', {class: 'column_flex'}, [['div', 'More'], ['mark', 'Apps']]]
    ]]
]]], efy_page);

$all('#dc_buttons:is(.apps, .dc_cta)').forEach(parent =>{
    $event(parent, 'click', ()=>{
        const target = event.target, x = target.parentElement;
        if (x.matches('.more') || target.matches('.more')){
            const y = $('[efy_tabs=dc] [efy_tab=apps]');
            y.dispatchEvent(new Event('click', {'bubbles': true })); y.focus(); focus_index = 3;
        }
        else if (x.matches('a')){ window.location.href = x.getAttribute('href')}
        else if (x.matches('button')){ x.dispatchEvent(new Event('click', {'bubbles': true })); x.focus()}
    })
});
