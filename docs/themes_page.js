(()=>{

const themes_page = $('[efy_content=themes]');
let app_themes = [], style = {},
theme_names = [
    'Default', 'gradient_dark', 'sky_dark', 'sky2_dark', 'sunset_dark', 'teal_squared',
    'bw_contrast_light', 'bw_contrast_dark', 'rainbow_light', 'rainbow_dark',
    'violet_neon', 'pink', 'germany_flag', 'romania_flag', 'ireland_flag',
    'europe_flag', 'quirky_pastel', 'textured', 'orange_pastel', 'green_pastel', 'teal_pastel',
    'violet_pastel', 'red_pastel', 'orange_dashes', 'blue_round_dark', 'blue_round_light', 'nord_trans',
    'transparent_test' /*', united_kingdom_flag'*/
];

const variables = 'theme scheme mode color color_trans color_text color_button text radius radius-x radius-xx border bg color_bg bg card gap text-shadow text-stroke'.split(' ');

theme_names.map(x =>{
    app_themes.push(['div', {efy_theme: x.replaceAll('_', ' '), class: 'efy_trans_filter efy-glass', efy_searchable: ''}, [
        ['p', {class: 'title'}, 'Current Theme'],
        ['div',  {efy_preview: ''},[
            ['button', {tabindex: '-1'}, '123'],
            ['div', {efy_select: ''}, [['label', '123']]],
            ['mark', '123'],
            ['input', {type: 'radio', checked: '', tabindex: '-1'}],
            ['input', {type: 'radio', tabindex: '-1'}],
            ['input', {type: 'radio', disabled: '', tabindex: '-1'}],
            ['div', {efy_card: ''}, '123'],
            ['div', {efy_card: '', class: 'bg'}, '123'],
            ['a', {tabindex: '-1'}, '123'],
            ['progress', {value: 1, max: 2}]
        ]],
        ['div', {class: 'actions'}, [
            ['button', {class: 'efy_square_btn try', title: 'Try'}, [['i', {efy_icon: 'play'}]]],
            ['button', {class: 'efy_square_btn disabled', title: 'Apply', tabindex: '-1'}, [['i', {efy_icon: 'check'}]]],
            ['button', {class: 'efy_square_btn disabled', title: 'Save', tabindex: '-1'}, [['i', {efy_icon: 'arrow_down'}]]],
            ['button', {class: 'efy_square_btn disabled', title: 'Favorite', tabindex: '-1'}, [['i', {efy_icon: 'heart'}]]],
            ['button', {class: 'efy_square_btn disabled', title: 'Copy URL', tabindex: '-1'}, [['i', {efy_icon: 'globe'}]]]
        ]]
    ]]);
});

$add('p', {efy_card: '', style: 'margin: 0 0 var(---gap) 0; display: flex; align-items: start; place-content: start'}, [
    ['i', {efy_icon: 'help', style: 'display: inline-flex; margin-top: -1rem'}],
    ['p', 'Experimental & unstable!!! A working update is coming soon...']
], themes_page);

$add('div', {id: 'app'}, app_themes, themes_page);
const themes_style = $add('style', {efy_theme: 0});

const load_files =(files)=>{
    try {
        files.map(file =>{ if (file !== 'Default'){
            const url = `./themes/${file}.css`;
            $add('link', {rel: 'stylesheet', href: url, class: `efy_theme_style_${file}`});
        }});
    }
    catch { $notify('short', 'Error', "Can't Load Themes")}
};

load_files(theme_names);

const $string =(obj)=>{
    if (typeof obj === 'string') return obj; // no quotes
    if (typeof obj === 'object') {
        const entries = Object.entries(obj).map(([key, value]) => {
            return key + ':' + $string(value); // no quotes
        });
        return entries.join(';'); // semicolon separator
    }
};

$ready('[efy_theme] [efy_preview]', (x)=>{
    variables.map(y =>{
        const z = `---${y}`, important = (!['theme', 'mode'].includes(y)) ? '!important' : '';
        style[z] = $css_prop(z, false, x) + important;
    });
    const style_dom = `[efy_theme="${x.parentElement.getAttribute('efy_theme')}"] [efy_preview]`;
    x.style = `${style_dom} {${$string(style)}}`;
    console.log(style);
    $$(x.parentElement, '.title').textContent = x.parentElement.getAttribute('efy_theme');
});

$event($body, 'click', ()=>{ const x = event.target;
    if (x.matches('[efy_theme] [efy_preview]')){
        themes_style.textContent = '';
        variables.map(y =>{
            const z = `---${y}`;
            style[z] = $css_prop(z, false, x) + '!important';
        });
        const mode = (style['---mode'].includes('trans')) ? '' : `.efy_3d_bg {background: ${style['---bg']}}`;
        console.log(style['---mode'].includes('trans'));
        themes_style.textContent = `
            :root:not([efy_theme]) {${$string(style)}}
            ${mode}
        `;
    }
    if (x.matches('[efy_theme="Default"] [efy_preview]')){
        themes_style.textContent = '';
    }
    if (x.matches('[efy_theme] .try')){
        $$(x.closest('[efy_theme]'), '[efy_preview]').click();
    }
});

})();