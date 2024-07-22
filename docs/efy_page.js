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
            ['p', '63']
        ]],
        ['a', {href: 'https://matrix.to/#/#efy_ui:matrix.org', tabindex: '-1', role: 'button', class: 'efy_btn_split efy_trans_filter'}, [
            ['input', {type: 'radio', name: 'dc_cta'}],
            ['p', 'Matrix'],
            ['p', '58']
        ]]
    ]]
], efy_page);

$add('div', {}, [['div', {id: 'dc_buttons', class: 'apps', efy_searchable: ''}, [
    ['a', {href: './media.html', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'audio'}],
        ['div', {class: 'column_flex'}, [['div', 'Media'], ['mark', {efy_lang: 'beta'}]]]
    ]],
    ['a', {href: './planner.html', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'edit'}],
        ['div', {class: 'column_flex'}, [['div', 'Planner'], ['mark', {efy_lang: 'beta'}]]]
    ]],
    ['a', {href: 'https://efy.piped.pages.dev', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}],
        ['div', {class: 'logo'}, [$ns('svg', {class: 'piped_logo', 'viewBox': '0 0 508 819', width: '496', height: '800'}, [ $ns('path', {d: "m0.4 27.8c0 0 7.3-5.4 20.3-12.7 7.3-3.1 16.4-6.4 26.8-9.3 10.9-2.2 23.1-4 35.6-4.9 12.8 0 25.8 0.8 38 2.4 12.1 2.4 23.3 5.6 32.7 8.9 18.2 8.5 29.6 15.6 29.6 15.6v749.9h-183z"}), $ns('path', {d: "m242.1 163.5c0 0 0-9.7-0.1-22.3-0.2-5.6-0.4-11.9-0.6-18.2-0.2-6.3-0.4-13-0.6-19.9-0.1-7.4-0.1-15.5 0-23.8 0.3-9.3 0.7-19 1.2-28.2 1.3-21.2 2.6-37.7 2.6-37.7 0 0 14.6-1.2 39.3-1.4 5.9 0.4 12.4 1 19.4 1.8 6.9 0.9 14.3 2 22.1 3.5q11.3 2.9 23.4 7.1c8 2.8 16.3 6 24.7 9.7q12 6.5 24.1 14.5 12.1 8 24 17.6 11.3 10.3 22.1 22.1c6.8 8.2 13.4 16.8 19.7 25.9q8.9 14.1 16.8 29.3c4.8 10.4 9.2 21 13.2 32 3.5 11.1 6.6 22.4 9.2 33.9 2.1 11.6 3.7 23.3 4.8 35q1 17.6 0.3 35c-0.9 11.6-2.4 23-4.4 34.2q-0.9 4.1-1.9 8.2-1 4.1-2.1 8.1-1.2 4.1-2.4 8.1-1.2 4-2.5 8-1.5 3.8-3 7.6-1.6 3.8-3.3 7.5-1.6 3.8-3.4 7.4-1.7 3.7-3.6 7.4-2 3.4-4 6.8-2.1 3.4-4.2 6.7-2.2 3.4-4.4 6.6-2.3 3.3-4.6 6.5-2.4 3-4.9 6-2.5 2.9-5.1 5.8-2.6 2.8-5.2 5.6-2.7 2.8-5.4 5.6-2.9 2.4-5.8 4.8-2.9 2.4-5.9 4.7-3 2.3-6 4.6-3.1 2.2-6.2 4.4c-8.1 5.6-16.3 10.8-24.6 15.4-8.9 4-17.8 7.6-26.5 10.7-8.8 3.1-17.3 5.8-25.7 8.1-8.7 1.7-17.2 3.2-25.1 4.4-8 1.1-15.5 2-22.4 2.6-14.5 0.4-26.2 0.5-34.2 0.4-8 0-12.4-0.2-12.4-0.2 0 0 0.3-9.6 0.8-23.1 0.1-6.4 0.3-13.8 0.5-21.6 0.1-7.8 0.1-16.3 0.1-25.1-0.1-9.2-0.2-19-0.5-28.8-0.3-10.5-0.7-21.1-1.2-30.8-1.1-21.5-2.1-37.5-2.1-37.5 0 0 6.9 0.4 18.6 0.5 5.5-0.2 12.1-0.7 19.3-1.6 7-1.3 14.4-3 22-5.3 7.1-2.7 14.3-6.1 21.2-10.1q4.9-3.2 9.4-7 4.3-3.8 8.2-8.2 3.5-4.4 6.6-9.2 2.7-4.9 4.8-10.2 1.8-5.3 3-10.7 0.8-5.6 0.9-11.2-0.2-5.6-1.1-11.2-1.3-5.6-3.2-11-2.2-5.4-5-10.5-3.2-5.1-6.9-9.8-4-4.6-8.4-8.8-4.6-4.1-9.6-7.7c-7.2-4.5-14.5-8.4-21.9-11.7-7.8-2.9-15.5-5.2-22.6-7-7.5-1.5-14.3-2.5-20-3.2-12.1-0.9-19.3-1.1-19.3-1.1z"}), $ns('path', {d: "m92 819c-50.9 0-92-16.5-92-37 0-20.5 41.1-37 92-37 50.9 0 92 16.5 92 37 0 20.5-41.1 37-92 37z"}), $ns('path', {d: "m248.4 165c-22.5 0-40.7-34.1-40.7-76.3 0-42.1 18.2-76.2 40.7-76.2 22.4 0 40.6 34.1 40.6 76.3 0 42.1-18.2 76.2-40.6 76.2z"}), $ns('path', {d: "m249.9 486c-22.5 0-40.6-37.5-40.6-84 0-46.5 18.1-84 40.6-84 22.5 0 40.6 37.6 40.6 84 0 46.5-18.1 84-40.6 84z"}) ])]],
        ['div', {class: 'column_flex'}, [['div', 'Piped'], ['mark', {efy_lang: 'beta'}]]]
    ]],
    ['a', {href: './money.html', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'group'}],
        ['div', {class: 'column_flex'}, [['div', 'Money'], ['mark', {efy_lang: 'beta'}]]]
    ]],
    ['a', {href: './calculator.html', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'plus'}],
        ['div', {class: 'column_flex'}, [['div', 'Calculator'], ['mark', {efy_lang: 'alpha'}]]]
    ]],
    ['a', {href: './converter.html', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'reload'}],
        ['div', {class: 'column_flex'}, [['div', 'Converter'], ['mark', {efy_lang: 'alpha'}]]]
    ]],
    ['a', {href: './os.html', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'dots'}],
        ['div', {class: 'column_flex'}, [['div', 'OS'], ['mark', {efy_lang: 'alpha'}]]]
    ]],
    ['a', {href: './weather.html', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'sun'}],
        ['div', {class: 'column_flex'}, [['div', 'Weather'], ['mark', {efy_lang: 'alpha'}]]]
    ]],
    ['a', {href: './pong.html', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'circle'}],
        ['div', {class: 'column_flex'}, [['div', 'Pong'], ['mark', {efy_lang: 'alpha'}]]]
    ]],
    ['a', {href: './xo.html', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'remove'}],
        ['div', {class: 'column_flex'}, [['div', 'X & O'], ['mark', {efy_lang: 'alpha'}]]]
    ]],
    ['a', {href: './gamepads.html', efy_card: '', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'group'}],
        ['div', {class: 'column_flex'}, [['div', 'Gamepads'], ['mark', {efy_lang: 'alpha'}]]]
    ]],
    ['button', {efy_card: '', class: 'more', tabindex: '-1'}, [
        ['input', {type: 'radio', name: 'dc_apps'}], ['i', {efy_icon: 'chevron'}],
        ['div', {class: 'column_flex'}, [['div', 'More'], ['mark', 'Apps']]]
    ]]
]]], efy_page);

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