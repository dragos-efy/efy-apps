let app_themes = [];

$add('div', {class: 'nav'}, [
    ['div', [
        ['h6', 'EFY Themes'],
        ['p', [['i', {efy_icon: 'help'}], ['div', 'Demo Concept. Coming Soon']]]
    ]],
    ['button', {efy_sidebar_btn: '', class: 'efy_square_btn'}, [['i', {efy_icon: 'menu'}]]]
]);

['', 'new', 'new2'].map(x =>{
    app_themes.push(['div', {efy_theme: x}, [
        ['p', {class: 'efy_trans_filter'}, 'Current Theme'],
        ['div',  {efy_preview: '', class: 'efy_trans_filter_off'},[
            ['button', '123'],
            ['div', {efy_select: ''}, [['label', '123']]],
            ['mark', '123'],
            ['input', {type: 'radio', checked: ''}],
            ['input', {type: 'radio'}],
            ['input', {type: 'radio', disabled: ''}],
            ['div', {efy_card: ''}, '123'],
            ['div', {efy_card: '', class: 'bg'}, '123'],
            ['a', '123'],
            ['i', {efy_icon: 'star'}],
            ['progress', {value: 1, max: 2}]
        ]]
    ]]);
});

$add('div', {id: 'app'}, app_themes);