const docs_page = $('div[efy_content=learn]'),
[comma, comma2, colon, hr, nl, br] = [['p', ' , '], ['p', ', '], ['p', ': '], ['hr', '\n'], ['p', {class: 'new_line'}, '\n'], ['br']],
shapes = [];

['wavy_line', 'arc', 'inverted_radius', 'inverted_radius2', 'triangle', 'flower', 'slant', 'rect_progress']
    .map(name => shapes.push(['div', {efy_card: 'half'}, [['div', {efy_shape: name}]]]));

$add('div', {efy_tabs: 'docs_tabs'}, [
    ['div', {class: 'efy_tabs'}, [
        ['input', {efy_tab: 'docs_tab_start', efy_searchable: 'start', type: 'radio', id: 'docs_tab_start', name: 'docs_tabs', efy_active: ''}],
        ['label', {for: 'docs_tab_start'}, 'Start'],
        ['input', {efy_tab: 'docs_tab_questions', efy_searchable: 'questions', type: 'radio', id: 'docs_tab_questions', name: 'docs_tabs'}],
        ['label', {for: 'docs_tab_questions'}, 'Questions'],
        ['input', {efy_tab: 'docs_tab_common_actions', efy_searchable: 'common_actions', type: 'radio', id: 'docs_tab_common_actions', name: 'docs_tabs'}],
        ['label', {for: 'docs_tab_common_actions'}, 'Common Actions'],
        ['input', {efy_tab: 'docs_tab_html', efy_searchable: 'html', type: 'radio', id: 'docs_tab_html', name: 'docs_tabs'}],
        ['label', {for: 'docs_tab_html'}, 'HTML Examples'],
        ['input', {efy_tab: 'docs_tab_variables', efy_searchable: 'css_variables', type: 'radio', id: 'docs_tab_variables', name: 'docs_tabs'}],
        ['label', {for: 'docs_tab_variables'}, 'CSS Variables'],
        ['input', {efy_tab: 'docs_tab_modes', efy_searchable: 'modes', type: 'radio', id: 'docs_tab_modes', name: 'docs_tabs'}],
        ['label', {for: 'docs_tab_modes'}, 'Modes'],
        ['input', {efy_tab: 'docs_tab_modules', efy_searchable: 'modules', type: 'radio', id: 'docs_tab_modules', name: 'docs_tabs'}],
        ['label', {for: 'docs_tab_modules'}, 'Modules'],
        ['input', {efy_tab: 'docs_tab_icons', efy_searchable: 'icons', type: 'radio', id: 'docs_tab_icons', name: 'docs_tabs'}],
        ['label', {for: 'docs_tab_icons'}, 'Icons'],
        ['input', {efy_tab: 'docs_tab_shapes', efy_searchable: 'shapes', type: 'radio', id: 'docs_tab_shapes', name: 'docs_tabs'}],
        ['label', {for: 'docs_tab_shapes'}, 'Shapes'],
        ['input', {efy_tab: 'docs_tab_themes', efy_searchable: 'themes', type: 'radio', id: 'docs_tab_themes', name: 'docs_tabs'}],
        ['label', {for: 'docs_tab_themes'}, 'Themes'],

        ['div', {class: 'group docs_tab_group_components'}, [
            ['input', {
                type: 'checkbox', id: 'docs_tab_group_components', name: 'docs_tabs', efy_searchable: 'components',
                efy_toggle: '.docs_tab_group_components :is(input, label):not(#docs_tab_group_components, [for=docs_tab_group_components])'
            }],
            ['label', {for: 'docs_tab_group_components', class: 'summary'}, 'Components'],
            ['input', {efy_tab: 'docs_tab_clock', efy_searchable: 'clock', type: 'radio', id: 'docs_tab_clock', name: 'docs_tabs', class: 'efy_hide_i'}],
            ['label', {for: 'docs_tab_clock', class: 'efy_hide_i'}, 'Clock'],
            ['input', {efy_tab: 'docs_tab_color_picker', efy_searchable: 'color-picker', type: 'radio', id: 'docs_tab_color_picker', name: 'docs_tabs', class: 'efy_hide_i'}],
            ['label', {for: 'docs_tab_color_picker', class: 'efy_hide_i'}, 'Color Picker'],
            ['input', {efy_tab: 'docs_tab_notifications', efy_searchable: 'notifications', type: 'radio', id: 'docs_tab_notifications', name: 'docs_tabs', class: 'efy_hide_i'}],
            ['label', {for: 'docs_tab_notifications', class: 'efy_hide_i'}, 'Notifications'],
            ['input', {efy_tab: 'docs_tab_select_menu', efy_searchable: 'select_menu', type: 'radio', id: 'docs_tab_select_menu', name: 'docs_tabs', class: 'efy_hide_i'}],
            ['label', {for: 'docs_tab_select_menu', class: 'efy_hide_i'}, 'Select Menu'],
            ['input', {efy_tab: 'docs_tab_tabs', efy_searchable: 'tabs', type: 'radio', id: 'docs_tab_tabs', name: 'docs_tabs', class: 'efy_hide_i'}],
            ['label', {for: 'docs_tab_tabs', class: 'efy_hide_i'}, 'Tabs'],
            ['input', {efy_tab: 'docs_tab_timer', efy_searchable: 'timer', type: 'radio', id: 'docs_tab_timer', name: 'docs_tabs', class: 'efy_hide_i'}],
            ['label', {for: 'docs_tab_timer', class: 'efy_hide_i'}, 'Timer']
        ]],

        ['div', {class: 'group docs_tab_group_functions'}, [
            ['input', {
                type: 'checkbox', id: 'docs_tab_group_functions', name: 'docs_tabs', efy_searchable: 'functions',
                efy_toggle: '.docs_tab_group_functions :is(input, label):not(#docs_tab_group_functions, [for=docs_tab_group_functions])'
            }],
            ['label', {for: 'docs_tab_group_functions', class: 'summary'}, 'Functions'],
            ['input', {efy_tab: 'docs_tab_add', efy_searchable: 'add', type: 'radio', id: 'docs_tab_add', name: 'docs_tabs'}],
            ['label', {for: 'docs_tab_add', class: 'efy_hide_i'}, '$add - create html']
        ]]
    ]],

    ['div', {efy_content: 'docs_tab_start', efy_active: '', class: 'efy_shadow_trans_off efy_trans_filter_off'}, [
        ['h4', `Welcome to the Learning Center. What interests you?`],
        ['div', {class: 'efy_flex'}, [
            ['button', {class: 'questions'}, 'Frequent Questions'],
            ['button', {class: 'common_actions'}, 'Common Actions'],
            ['button', {class: 'components'}, 'Components'],
            ['button', {class: 'functions'}, 'Functions'],
            ['button', {class: 'icons'}, 'Icons'],
            ['button', {class: 'questions'}, 'How to Help']
        ]]
    ]],

    ['div', {efy_content: 'docs_tab_questions', class: 'efy_shadow_trans_off efy_trans_filter_off'}, [
        ['details', {efy_searchable: 'features'}, [
            ['summary', 'Features'],
            ['ul', [
                ['li', 'Minimalism, Search & Toggles - no dependencies or repetition'],
                ['li', 'Modularity - users decide, billions of dynamic patterns'],
                ['li', 'Sounds, 3D Layers & Visual Filters'],
                ['li', 'Convergence - on most devices, browsers, touchscreen, mouse, keyboards & gamepads'],
                ['li', 'Transparency - custom alpha, transparent OS window support'],
                ['li', 'Private - data saved on your device (localStorage & IndexedDB)'],
                ['li', 'Accessible - in progress'],
                ['li', [
                    ['p', 'Static & Offline - '], ['mark', 'https:///'],
                    ['p', ' & '], ['mark', 'file:///'], ['p', ' protocols']
                ]]
            ]]
        ]],
        ['details', {efy_searchable: 'how_to_use'}, [
            ['summary', 'How do I use it on my own projects?'],
            ['p', [
                ['p', 'In any way you want, as long as you keep it open source & follow the '],
                ['a', {href: 'https://github.com/dragos-efy/efy/blob/main/LICENSE'}, 'AGPL 3.0 License'],
                ['p', '. Better documentation is coming soon.']
            ]], ['hr', {style: 'margin: 0'}],
            ['p', [
                ['p', 'Download the efy folder from '],
                ['a', {href: 'https://github.com/dragos-efy/efy'}, 'Github'],
                ['p', ' in your project or install it from the terminal:'],
            ]],
            ['pre', {efy_code: 'npm / yarn / pnpm', style: 'margin-bottom: 10rem'},
                'npm install efy\nyarn add efy\npnpm add efy'
            ],
            ['p', 'Then add this code (local or server):'],
            ['pre', {efy_code: 'html · local', style: 'margin-bottom: 10rem'},
                '<link rel="stylesheet" href="./efy/efy_local.css">\n<link rel="stylesheet" href="your_efy_config_file.css">\n<script src="./efy/efy_local.js"></script>'
            ],
            ['pre', {efy_code: 'html · server', style: 'margin-bottom: 10rem'},
                '<link rel="stylesheet" href="./efy/efy.css">\n<link rel="stylesheet" href="your_efy_config_file.css">\n<script src="./efy/efy.js"></script>'
            ],
            ['p', [
                ['p', 'In the config file you can set your own defaults. '],
                ['a', {href: 'https://github.com/dragos-efy/efy-apps/blob/main/global/efy_global.css'}, 'Here\'s an example'],
                ['p', '. You can also add your own css inside after the template ends, or make a new file if you prefer to keep things separated. Both ways work, just make sure that the config file runs before efy.js so that it knows what your preferences are.']
            ]]
        ]],
        ['details', {efy_searchable: 'reset'}, [
            ['summary', 'I see glitches or errors. How do I reset it?'],
            ['p', [
                ['mark', 'EFY'], ['i', {efy_icon: 'chevron'}], ['mark', {efy_lang: 'backup'}],
                ['i', {efy_icon: 'chevron'}], ['mark', {efy_lang: 'theme'}], ['p', 'or'],
                ['mark', {efy_lang: 'efy_database'}], ['i', {efy_icon: 'chevron'}], ['mark', {efy_lang: 'reset'}]
            ]], ['hr'],
            ['p', 'Or clear your browser\'s cache, try a different browser, device, etc.']
        ]],
        ['details', {efy_searchable: 'bugs_ideas'}, [
            ['summary', 'Report bugs or share your ideas'],
            ['p', [
                ['p', 'On '], ['a', {href: 'https://github.com/dragos-efy/efy'}, 'Github'],
                ['p', ' or '], ['a', {href: 'https://matrix.to/#/#efy_ui:matrix.org'}, 'Matrix'],
                ['p', '. Specify what causes the bugs, on what device, browser, etc. or why your ideas should be implemented']
            ]]
        ]],
        ['details', {efy_searchable: 'status'}, [
            ['summary', 'Is it stable / production-ready?'],
            ['p', 'EFY is currently in Beta, so expect potential bugs. Features & apps that are unstable are usually marked this way:'],
            ['hr', {style: 'margin: 0'}], ['p', [
                ['mark', {efy_lang: 'soon'}], ['i', {efy_icon: 'chevron'}],
                ['mark', {efy_lang: 'alpha'}], ['i', {efy_icon: 'chevron'}],
                ['mark', {efy_lang: 'beta'}], ['i', {efy_icon: 'chevron'}],
                ['mark', {efy_lang: 'stable'}]
            ]], ['hr', {style: 'margin: 0'}],
            ['p', [['mark', {efy_lang: 'soon'}], ['p', '- unavailable, expected']]],
            ['p', [['mark', {efy_lang: 'alpha'}], ['p', '- unsafe, lots of bugs']]],
            ['p', [['mark', {efy_lang: 'beta'}], ['p', '- safer, less bugs']]],
            ['p', [['mark', 'Stable'], ['p', '- safe, less bugs']]],
            ['hr', {style: 'margin: 0'}], ['p', 'If you\'re a dev, wait for the docs to add explainations on how to use it before adding it to your apps']
        ]],
        ['details', {efy_searchable: 'name'}, [
            ['summary', [['p','What does '], ['code', 'EFY'], ['p', ' mean?']]],
            ['p', 'Nothing. It\'s just a name, like Andy or Izzy.']
        ]],
        ['details', {efy_searchable: 'bg_image'}, [
            ['summary', 'Add background images'],
            ['p', [
                ['mark', 'EFY'], ['i', {efy_icon: 'chevron'}],
                ['mark', {efy_lang: 'theme'}], ['i', {efy_icon: 'chevron'}],
                ['mark', {efy_lang: 'mode'}], ['i', {efy_icon: 'chevron'}],
                ['mark', {efy_lang: 'trans'}], ['i', {efy_icon: 'chevron'}],
                ['mark', {style: 'display: inline-flex; aspect-ratio: 1'}, [['i', {efy_icon: 'plus', style: 'margin: 0'}]]]
            ]]
        ]],
        ['details', {efy_searchable: 'test'}, [
            ['summary', 'More coming soon...'], ['p', 'This is just the beginning...']
        ]]
    ]],

    ['div', {efy_content: 'docs_tab_common_actions', class: 'efy_shadow_trans_off efy_trans_filter_off'}, [
        ['h4', 'Common Actions'], ['p', `Coming soon...`],
    ]],

    ['div', {efy_content: 'docs_tab_html', class: 'efy_shadow_trans_off efy_trans_filter_off'}, [
        ['p', {style: 'margin-bottom: 15rem', efy_searchable: ''}, 'Examples of HTML elements styled with efy:'],
        ['div', {efy_searchable: '', class: 'dc_grid'}, [
            ['div', [
                ['figure', [
                    ['img', { 'src': './assets/image.avif', 'alt': 'image', 'loading': 'lazy' }],
                    ['figcaption', 'image + figcaption']
                ]]
            ]],
            ['div', [
                ['video', { 'src': './assets/efy_video.webm', 'controls': '', 'loading': 'lazy' }]
            ]]
        ]],
        ['div', {efy_searchable: '', id: 'dc_headings'}, [
            ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], ['p', 'paragraph'], ['a', { 'href': '#' }, 'link'], ['abbr', { 'title': 'Abbreviations' }, 'abbr'], ['del', 'del'], ['dfn', 'dfn'], ['em', 'em'], ['ins', 'ins'], ['mark', 'mark'], ['s', 'strike through'], ['small', 'small'], ['strong', 'strong'], ['sub', 'sub'], ['sup', 'sup'], ['u', 'underlined'], ['code', '<code>'], ['kbd', 'kbd']
        ]],
        ['div', {id: 'dc_lists', efy_searchable: ''}, [
            ['ul', [
                ['li', 'List item'],
                ['ul', [ ['li', 'List item'], ['li', 'List item'] ]],
                ['li', 'List item']
            ]],
            ['ol', [
                ['li', 'List item'],
                ['ol', [ ['li', 'List Item'], ['li', 'List Item'] ]],
                ['li', 'List item']
            ]],
            ['dl', [ 'Definition list', ['dt', 'dt'], ['dd', 'dd'] ]],
            ['div', { 'efy_searchable': '' }, [
                ['h6', 'Navigation'],
                ['nav', { 'style': 'display: flex; gap: 10rem' }, [
                    ['a', { 'href': '#' }, 'Link1'], ['a', { 'href': '#' }, 'Link2'], ['a', { 'href': '#' }, 'Link3']
                ]]
            ]]
        ]],
        ['div', {efy_searchable: ''}, [ ['section', [
            ['h4', 'Section'], ['p', 'A lot of boring text. In fact it\'s so boring that even if you find it funny while reading it, it will stay boring because it\'s pretty much useless. Reading it is a waste of time.']
        ]] ]],
        ['div', {efy_searchable: '', id: 'dc_lists'}, [
            ['div', [ ['h6', 'Pre'], ['pre', 'div {\n  color: var(--text);\n  background: var(--bg);\n}'] ]],
            ['div', [ ['h6', 'Pre > Code'], ['pre', [['code', 'div {\n  color: var(--text);\n  background: var(--bg);\n}']]] ]],
            ['div', { 'efy_searchable': '' }, [
                ['h6', 'Article'],
                ['article', { 'class': 'efy_shadow_trans' }, [ ['h4', 'H3'], ['p', 'Paragraph inside an article'] ]]
            ]],
            ['div', { 'efy_searchable': '' }, [
                ['h6', 'Blockquote'],
                ['blockquote', [ ['p', 'paragraph inside blockquote'], ['p', [['cite', 'cite']]] ]]
            ]]
        ]],
        ['div', { 'efy_searchable': '', 'class': 'dc_grid' }, [
            ['table', [
                ['thead', [['tr', Array(6).fill(['th', 'Table heading'])]]],
                ['tfoot', [['tr', Array(6).fill(['th', 'Table footer'])]]],
                ['tbody', Array(5).fill(['tr', Array(6).fill(['td', 'Table data'])])]
            ]],
            ['div', [
                ['details', {open: ''}, [ ['summary', 'Details'],
                    ['p', 'Content'],
                    ['details', {style: 'margin: 0 var(---gap) var(---gap) var(---gap)' }, [ ['summary', 'Summary'], ['p', 'content'] ]]
                ]],
                ['audio', {src: './assets/dreamy.webm', controls: '', loading: 'lazy'}],
                ['div', {efy_searchable: ''}, [
                    ['h6', 'Progress & Meter'],
                    ['progress', {value: '40', max: '100'}, '40%'],
                    ['meter', {value: '5', min: '0', max: '10', style: 'margin-left: 5rem' }, '5 / 10']
                ]]
            ]]
        ]],
        ['div', { 'efy_searchable': '' }, [ ['form', [
                ['fieldset', { 'class': 'dc_grid' }, [
                    ['label', [['input', { 'type': 'color' }]]],
                    ['label', ['hidden input', ['input', { 'type': 'hidden' }]]],
                    ['label', [['input', { 'type': 'date' }]]],
                    ['label', [['input', { 'type': 'datetime-local' }]]],
                    ['label', [['input', { 'type': 'email', 'placeholder': 'email' }]]],
                    ['label', [['input', { 'type': 'month' }]]],
                    ['label', [['input', { 'type': 'number', 'value': '123' }]]],
                    ['label', [['input', { 'type': 'password', 'value': 'password', 'autocomplete': 'new-password' }]]],
                    ['label', [['input', { 'type': 'range' }]]],
                    ['label', [['input', { 'type': 'search', 'placeholder': 'search' }]]],
                    ['label', [['input', { 'type': 'tel', 'placeholder': 'phone' }]]],
                    ['label', [['input', { 'type': 'text', 'placeholder': 'text' }]]],
                    ['label', [['input', { 'type': 'time' }]]],
                    ['label', [['input', { 'type': 'url', 'placeholder': 'url' }]]],
                    ['label', [['input', { 'type': 'week' }]]],
                    ['label', [['input', { 'type': 'text', 'readonly': '', 'placeholder': 'input, read only' }]]],
                    ['label', [['textarea', { 'placeholder': 'textarea' }]]],
                    ['label', [['textarea', { 'placeholder': 'disabled textarea', 'disabled': '' }]]],
                    ['label', [
                        ['select', [
                            ['option', 'select'],
                            ['optgroup', { 'label': 'optgroup 1' }, [
                                ['option', 'option 1'],
                                ['option', 'option 2']
                            ]],
                            ['optgroup', { 'label': 'optgroup 2' }, [
                                ['option', 'option 1'],
                                ['option', 'option 2']
                            ]],
                            ['option', 'option']
                        ]]
                    ]],
                    ['label', [['select', { 'disabled': '' }, [['option', 'select disabled'], ['option', '2']]]]],
                    ['label', [['select', { 'multiple': '' }, [['option', 'select multiple (ctrl + click)'], ['option', '1'], ['option', '2'], ['option', '3']]]]],
                    ['div', { 'id': 'dc_lists', 'style': 'margin: 0' }, [
                        ['label', { 'style': 'width: 100%' }, [['input', {type: 'file'}]]],
                        ['input', {type: 'radio', name: 'input-radio', value: '1', checked: ''}], ['label', ' radio'],
                        ['input', { 'type': 'radio', 'name': 'input-radio', 'value': '2' }], ['label', ' radio'],
                        ['input', { 'type': 'checkbox', 'checked': '' }], ['label', 'checkbox'],
                        ['input', { 'type': 'checkbox' }], ['label', 'checkbox'],
                        ['input', { 'type': 'checkbox', 'disabled': '', checked: ''}], ['label', 'disabled'],
                        ['input', { 'type': 'radio', 'disabled': '' }], ['label', 'disabled'],
                    ]]
                ]],
                ['div', { 'efy_searchable': '', 'id': 'dc_buttons' }, [
                    ['button', 'button'],
                    ['a', { 'href': '#' }, [['button', 'a > button']]],
                    ['a', { 'href': '#', 'role': 'button', 'style': 'display: unset; float: unset' }, '[role=button]'],
                    ['button', { 'type': 'submit', 'onclick': 'return false;' }, 'button[type=submit]'],
                    ['button', { 'type': 'reset', 'onclick': 'return false;' }, 'button[type=reset]'],
                    ['input', { 'type': 'button', 'value': 'input[type=button]' }],
                    ['input', { 'type': 'submit', 'value': 'input[type=submit]', 'onclick': 'return false;' }],
                    ['input', { 'type': 'reset', 'value': 'input[type=reset]', 'onclick': 'return false;' }],
                    ['button', { 'type': 'button', 'disabled': '' }, 'disabled']
                ]]
        ]] ]]
    ]],

    ['div', {efy_content: 'docs_tab_variables', class: 'efy_trans_filter_off'}, [
        ['h4', 'Structure'], ['ul', [
            ['li', {style: 'white-space: pre-line'}, [
                ['p', 'EFY variables start with '], ['mark', '---'],
                ['p', ' . Example: '], ['mark', 'radius'], ['p', ' becomes '], ['mark', '---radius']
            ]],
            ['li', {style: 'white-space: pre-line'}, [
                ['mark', 'x'], ['p', ' = less , '], ['mark', 'o'], ['p', ' = more']
            ]],
            ['li', 'Variables reuse each other modularly to reduce the total number']
        ]], hr,
        ['h4', 'Colors'],
        ['p', 'The accent is a gradient made out of 1 to 18 colors. Some colors have customizable opacity / alpha too.'],
        ['div', {class: 'dc_colors', efy_select: ''}, [
            ['div', {class: 'dc_color dc-fill-bg efy_trans_filter', style: 'background: var(---color)'}, 'accent'],
            ['div', {class: 'dc_color efy_trans_filter', style: 'background: var(---color), var(---color_trans); background-clip: text, border-box; -webkit-text-fill-color: transparent !important;'}, 'accent-x'],
            ['div', {class: 'dc_color dc-fill-bg efy_trans_filter', style: 'background: var(---text)'}, 'text'],
            ['div', {class: 'dc_color efy_trans_filter', style: 'background: var(---text-x)'}, 'text-x'],
            ['div', {class: 'dc_color dc-fill-bg efy_trans_filter', style: 'background: var(---text-xx)'}, 'text-xx'],
            ['div', {class: 'dc_color efy_trans_filter', style: 'background: var(---text-xxx)'}, 'text-xxx'],
            ['div', {class: 'dc_color efy_trans_filter', style: 'background: var(---bg)'}, 'bg'],
            ['div', {class: 'dc_color efy_trans_filter', style: 'background: var(---card)'}, 'card'],
            ['div', {class: 'dc_color efy_trans_filter', style: 'background: var(---border-color)'}, 'border-color'],
            ['div', {class: 'dc_color efy_trans_filter', style: 'background: var(---border-color-invert)'}, 'border-color-invert']
        ]], hr,

        ['h4', 'Radius'],
        ['p', 'All corners'],
        ['div', {class: 'dc_colors dc_radius', efy_select: ''}, [
            ['div', {class: 'dc_gap efy_trans_filter'}, [['div', {style: 'border-radius: var(---radius-xx)'}], ['p', 'radius-xx']]],
            ['div', {class: 'dc_gap efy_trans_filter'}, [['div', {style: 'border-radius: var(---radius-x)'}], ['p', 'radius-x']]],
            ['div', {class: 'dc_gap efy_trans_filter'}, [['div', {style: 'border-radius: var(---radius)'}], ['p', 'radius']]],
            ['div', {class: 'dc_gap efy_trans_filter'}, [['div', {style: 'border-radius: var(---radius-o)'}], ['p', 'radius-o']]]
        ]],
        ['p', {style: 'margin-top: 15rem'}, 'Partial corners (coming soon)'],
        ['div', {class: 'dc_colors dc_radius', efy_select: ''}, [
            ['div', {class: 'dc_gap r1 xx efy_trans_filter'}, [['div'], ['p', 'radius-1-xx']]],
            ['div', {class: 'dc_gap r1 x efy_trans_filter'}, [['div'], ['p', 'radius-1-x']]],
            ['div', {class: 'dc_gap r1 efy_trans_filter'}, [['div'], ['p', 'radius-1']]],
            ['div', {class: 'dc_gap r1 o efy_trans_filter'}, [['div'], ['p', 'radius-1-o']]]
        ]],
        ['div', {class: 'dc_colors dc_radius', efy_select: ''}, [
            ['div', {class: 'dc_gap r2 xx efy_trans_filter'}, [['div'], ['p', 'radius-2-xx']]],
            ['div', {class: 'dc_gap r2 x efy_trans_filter'}, [['div'], ['p', 'radius-2-x']]],
            ['div', {class: 'dc_gap r2 efy_trans_filter'}, [['div'], ['p', 'radius-2']]],
            ['div', {class: 'dc_gap r2 o efy_trans_filter'}, [['div'], ['p', 'radius-2-o']]]
        ]],
        ['div', {class: 'dc_colors dc_radius', efy_select: ''}, [
            ['div', {class: 'dc_gap r3 xx efy_trans_filter'}, [['div'], ['p', 'radius-3-xx']]],
            ['div', {class: 'dc_gap r3 x efy_trans_filter'}, [['div'], ['p', 'radius-3-x']]],
            ['div', {class: 'dc_gap r3 efy_trans_filter'}, [['div'], ['p', 'radius-3']]],
            ['div', {class: 'dc_gap r3 o efy_trans_filter'}, [['div'], ['p', 'radius-3-o']]]
        ]],
        ['div', {class: 'dc_colors dc_radius', efy_select: ''}, [
            ['div', {class: 'dc_gap r4 xx efy_trans_filter'}, [['div'], ['p', 'radius-4-xx']]],
            ['div', {class: 'dc_gap r4 x efy_trans_filter'}, [['div'], ['p', 'radius-4-x']]],
            ['div', {class: 'dc_gap r4 efy_trans_filter'}, [['div'], ['p', 'radius-4']]],
            ['div', {class: 'dc_gap r4 o efy_trans_filter'}, [['div'], ['p', 'radius-4-o']]]
        ]], hr,

        ['h4', 'Gap'],
        ['p', 'They can be used as gaps, margins, paddings, etc.'],
        ['div', {class: 'dc_colors', efy_select: ''}, [
            ['div', {class: 'dc_gap efy_trans_filter', style: '---demo: var(---gap-xx);'}, [['div'], ['p', 'gap-xx']]],
            ['div', {class: 'dc_gap efy_trans_filter', style: '---demo: var(---gap-x);'}, [['div'], ['p', 'gap-x']]],
            ['div', {class: 'dc_gap efy_trans_filter'}, [['div'], ['p', 'gap']]],
            ['div', {class: 'dc_gap efy_trans_filter', style: '---demo: var(---gap-o);'}, [['div'], ['p', 'gap-o']]],
            ['div', {class: 'dc_gap efy_trans_filter', style: '---demo: var(---gap-oo);'}, [['div'], ['p', 'gap-oo']]]
        ]], hr,
        ['h4', 'Size'],
        ['p', 'Mostly used for button heights, inputs & thumbnails'],
        ['div', {class: 'dc_colors', efy_select: ''}, [
            ['div', {class: 'dc_gap efy_trans_filter', style: '---demo: var(---size0);'}, [['div'], ['p', 'size-x']]],
            ['div', {class: 'dc_gap efy_trans_filter', style: '---demo: var(---size);'}, [['div'], ['p', 'size']]],
            ['div', {class: 'dc_gap efy_trans_filter', style: '---demo: var(---size-o);'}, [['div'], ['p', 'size-o']]]
        ]], hr,
        ['h4', 'Padding'],
        ['p', 'Mostly used for buttons. The examples have a 15rem container inside the padding to simulate a real case.'],
        ['div', {class: 'dc_colors dc_padding', efy_select: ''}, [
            ['div', {class: 'dc_gap efy_trans_filter'}, [
                ['div', {style: 'border-width: var(---padding2);'}, [['p', 'padding']]], ['p', 'padding-x']
            ]],
            ['div', {class: 'dc_gap efy_trans_filter'}, [
                ['div', {style: 'border-width: var(---padding);'}, [['p', 'padding']]], ['p', 'padding']
            ]]
        ]], hr,
        ['h4', 'Border Size'],
        ['p', 'Mostly used for containers, buttons & separators'],
        ['div', {class: 'dc_colors', efy_select: ''}, [
            ['div', {id: 'dc_size0', style: 'background: var(---card)'}, [['p', {style: 'padding-left: 10rem; border-left: var(---border_size) solid var(---text);'}, 'border-size']]],
            ['div', {id: 'dc_size0', style: 'background: var(---card)'}, [['p', {style: 'padding-left: 10rem; border-left: var(---border_size2) solid var(---text);'}, 'border-size-o']]]
        ]]
    ]],

    ['div', {efy_content: 'docs_tab_modules', class: 'efy_trans_filter_off'}, [
        ['h4', 'Info Coming Soon'], ['p', 'Stay tuned...']
    ]],
    ['div', {efy_content: 'docs_tab_themes', class: 'efy_trans_filter_off'}, [
        ['h4', 'Info Coming Soon'], ['p', 'Stay tuned...']
    ]],

    ['div', {efy_content: 'docs_tab_icons', class: 'efy_trans_filter_off'}, [
        ['div', {style: 'display: flex; gap: var(---gap); width: 100%'}, [
            ['div', {
                class: 'efy_square_btn efy_trans_filter',
                style: 'background: var(---card); height: 100%; min-height: 84rem; width: unset; aspect-ratio: 1; border-radius: var(---radius); border: var(---border)'
                }, [
                ['i', {efy_icon: 'star', style: 'font-size: 40rem'}]
            ]],
            ['pre', {efy_code: 'example · html', style: 'margin: 0; width: 100%'}, [
                ['p', '<i '], ['code', 'efy_icon'], ['p', '='], ['code', '"star"'], ['p', '></i>']
            ]]
        ]],
        ['div', {div: '', class: 'efy_trans_filter_off'}, [['div', {id: 'dc_icons'}]]]
    ]],

    ['div', {efy_content: 'docs_tab_shapes', class: 'efy_trans_filter_off'}, [
        ['p', `Alpha stage, not ready to be used yet...`],
        ['div', {class: 'docs_shapes'}, shapes]
    ]],

    ['div', {efy_content: 'docs_tab_modes', class: 'efy_trans_filter_off'}, [
        ['ul', [
            ['li', ['[efy_mode] sets the mode, the default value is ', ['code', 'default']]],
            ['li', [
                ['p', 'Options: '], ['mark', 'default'], comma, ['mark', 'light'], comma,
                ['mark', 'light,sepia'], comma, ['mark', 'light,trans'], comma, ['mark', 'dark'], comma,
                ['mark', 'dark,nord'], comma, ['mark', 'dark,black'], comma, ['mark', 'dark,trans']
            ]]
        ]],
        ['h4', 'Structure'], ['ul', [
            ['li', [['p', '1st part: can be '], ['mark', 'light'], ['p', ' or '], ['mark', 'dark'], ['p', ' to indicate the general mode']]],
            ['li', [['p', '2nd part: indicates the specific type of light / dark mode: '], ['mark', 'sepia'], comma, ['mark', 'nord'], comma, ['mark', 'black'], comma, ['mark', 'trans']]],
            ['li', [['mark', 'trans'], ['p', ' = Transparent - it makes the background invisible so that you can see behind the window (if your web engine, browser or operating system supports it) or the image you choose from the sidebar menu']]]
        ]],
        ['h4', 'Examples'], ['div', {style: 'display:grid; gap: 10rem'}, [
            ['p', 'Specific mode:'],
            ['pre', {efy_code: 'css'}, [['code', '[efy_mode=light,sepia]'], ['p', ' { your css }']]],
            ['p', 'All light modes:'],
            ['pre', {efy_code: 'css'}, [['code', '[efy_mode*=light]'], ['p', ' { your css }']]],
            ['p', 'Not this specific mode:'],
            ['pre', {efy_code: 'css'}, [['code', ':not([efy_mode=light,sepia])'], ['p', ' { your css }']]],
            ['p', 'Remove selector if any light mode is on:'],
            ['pre', {efy_code: 'js'}, [['code', "$('[efy_mode*=light] #your_selector')"], ['p', '.remove()']]]
        ]]
    ]],

    ['div', {efy_content: 'docs_tab_add', class: 'efy_trans_filter_off'}, [
        ['p', [
            ['p', "$add('"], ['code', 'Tag'], ['p', "', {"], ['code', 'Attributes'], ['p', "}, ['"],
            ['code', 'Text'], ['p', "', "], ['code', 'Children'], ['p', "], "], ['code', 'Parent'],
            ['p', ", '"], ['code', 'Position'], ['p', "')"]
        ]],
        ['h4', 'Structure'],
        ['div', [['p', {efy_card: '', style: 'margin: 0'}, [
            ['i', {efy_icon: 'help', style: 'display: inline-flex; margin-top: -3rem'}],
            ['p', 'Only '], ['code', 'Tag'], ['p', ' is required. Other parameters are optional']
        ]]]],
        ['p', [['code', 'Tag'], ['p', [' - html tag']]]],
        ['p', [['code', 'Attributes'], ['p', [' - html attributes, can be skiped']]]],
        ['p', [['code', 'Text'], ['p', [' - text content']]]],
        ['p', [['code', 'Children'], ['p', [' - nested html tags']]]],
        ['p', [['code', 'Parent'], ['p', [" - where? It defaults to 'body' if not specified"]]]],
        ['p', [
            ['code', 'Position'], ['p', ' - relative to the parent: '],
            ['mark', 'beforebegin'], comma, ['mark', 'afterbegin'], comma, ['mark', 'beforeend'], comma, ['mark', 'afterend']
        ]],
        ['h4', 'Examples'],
        ['div', {style: 'display:grid; gap: 10rem;'}, [
            ['p', 'Add an empty button to body after all existent children'],
            ['pre', {efy_code: 'js + efy'}, [
                ['p', '$add('],
                ['code', "'button'"],
                ['p', ')']
            ]],
            ['p', [
                ['p', 'Add a css styled button inside the '],
                ['mark', '#test'],
                ['p', ' selector, before other children']
            ]],
            ['pre', {efy_code: 'js + efy'}, [
                ['p', '$add('], ['code', "'button'"], ['p', ', {style: '],
                ['code', "'background: red; padding: 20rem'"], ['p', '}, '], ['code', "'Text'"],
                ['p', ', $('], ['code', "'#test'"], ['p', '), '], ['code', "'afterbegin'"],
                ['p', ')'],
            ]],
            ['p', [
                ['p', 'Range input with some attributes before '], ['mark', '#test'], ['p', ' ends']
            ]],
            ['pre', {efy_code: 'js + efy'}, [
                ['p', '$add('], ['code', "'input'"], ['p', ', {\n\ttype: '], ['code', "'range'"],
                ['p', ', value: '], ['code', "'50'"], ['p', ', min: '], ['code', "'0'"],
                ['p', ', max: '], ['code', "'100'"], ['p', ', step: '], ['code', "'1'"],
                ['p', ',\n\tclass: '], ['code', "'test'"], ['p', ', id: '], ['code', "'test'"],
                ['p', ',\n\tstyle: '], ['code', "'margin: 0; padding: 15rem'"], ['p', '\n}, [], $('],
                ['code', "'#test'"], ['p', '))']
            ]],
            ['p', '2 nested buttons inside a div'],
            ['pre', {efy_code: 'js + efy', style: 'margin: 0'}, [
                ['p', '$add('], ['code', "'div'"], ['p', ', [\n\t['], ['code', "'button'"],
                comma2, ['code', "'1'"], ['p', '],\n\t['], ['code', "'button'"],
                comma2, ['code', "'2'"], ['p', ']\n])']
            ]]
        ]]
    ]],

    ['div', {efy_content: 'docs_tab_color_picker', class: 'efy_trans_filter_off', efy_searchable: 'color_picker'}, [
        ['div', {efy_color: '1 0.5 0.2 0 1, 2 0.7 0.2 100 1, 3 0.5 0.2 200 1, range:1-9'}],
        ['pre', {efy_code: 'logic'}, [
            ['code', 'efy_color'], ['p', ' = '], ['code', 'color'], comma2,
            ['code', 'range'], ['p', ':'], ['code', 'min'], ['p', '-'], ['code', 'max'],
            ['hr', {style: 'margin: 5rem auto 10rem auto'}, '\n'],
            ['ul', [
                ['li', 'it uses the OKLCH format, which renders vibrant, human intuitive colors'], nl,
                ['li', [
                    ['code', 'color'], ['p', ' = '], ['code', 'name'], comma2,
                    ['code', 'lightness'], ['p', ' (0 - 1), '], ['code', 'chroma'],
                    ['p', ' (0 - 0.37), '], ['code', 'hue'], ['p', ' (0 - 360), '],
                    ['code', 'alpha'], ['p', ' (0 - 1), '], ['code', 'id'], ['p', ' (optional)']
                ]], nl,
                ['li', [
                    ['code', 'range'], ['p', ' (optional): '], ['code', 'min'],
                    ['p', ' (0 - 100) - '], ['code', 'max'], ['p', ' (1 - 100)']
                ]]
            ]]
        ]],
        ['pre', {'efy_code': 'example · html'}, [
            ['p', '<div '], ['code', 'efy_color'], ['p', '='], ['code', '"Demo 0.7 0.2 100 1"'], ['p', '></div>\n'],
            ['p', '<div '], ['code', 'efy_color'], ['p', '='], ['code', '"1 0.5 0.2 0 1, 2 0.7 0.2 100 1, 3 0.5 0.2 200 1, range:1-9"'], ['p', '></div>']
        ]],
        ['pre', {'efy_code': 'example · js'}, [
            ['p', '$add('], ['code', "'div'"], ['p', ', {'], ['code', 'efy_color'],
            colon, ['code', "'Demo 0.7 0.2 100 1'"], ['p', '})\n'],
            ['p', '$add('], ['code', "'div'"], ['p', ', {'], ['code', 'efy_color'],
            colon, ['code', "'1 0.5 0.2 0 1, 2 0.7 0.2 100 1, 3 0.5 0.2 200 1, range:1-9'"],
            ['p', '})\n']
        ]]
    ]],
    ['div', {efy_content: 'docs_tab_notifications', class: 'efy_trans_filter_off'}, [
        ['button', {id: 'dc_notify_test'}, [['i', {efy_icon: 'notify'}], ['p', 'Test Notification']]],
        ['pre', {efy_code: 'logic · js'}, [
            ['p', "$notify('"], ['code', 'time'], ['p', "', '"], ['code', 'text'], ['p', "', '"], ['code', 'text'],
            ['p', "', '"], ['code', 'lang'], ['p', "', "], ['code', 'function'], ['p', ')'],
            ['hr', {style: 'margin: 5rem auto'}, '\n'],
            ['code', 'lang'], ['p', ' & '], ['code', 'function'], ['p', ' are optional\n'],
            ['code', 'time'], ['p', ' = '], ['code', 'short'], comma2, ['code', 'long'], comma2, ['code', 'infinite'],
            ['p', ' or '], ['code', 'seconds'], ['p', ' (example: '], ['code', '3'], ['p', ')\n'],
            ['code', 'lang'], ['p', ' - use efy translation variables instead of normal text']
        ]],
        ['pre', {efy_code: 'example · js'}, [
            ['p', '$notify('], ['code', "'short'"], comma2, ['code', "'Short'"], comma2, ['code', "'Disappears in 5s'"],
            ['p', ')\n$notify('], ['code', "'long'"], comma2, ['code', "'Long'"], comma2, ['code', "'Disappears in 30s'"],
            ['p', ')\n$notify('], ['code', "'infinite'"], comma2, ['code', "'Infinite'"], comma2, ['code', "'Never disappears'"], ['p', ')'],
            hr,
            ['span', {style: 'color: var(---text-x)'}, '// Attach it to a click event\n'],
            ['p', '$event('], ['code', 'selector'], comma2, ['code', "'click'"], ['p', ', ()=> '],
            ['code', '$notify'], ['p', '('], ['code', "'short'"], comma2, ['code', "'Test'"], comma2, ['code', "'Test'"], ['p', '))']
        ]]
    ]],

    ['div', {efy_content: 'docs_tab_clock', class: 'efy_trans_filter_off'}, [
        ['div', {class: 'efy_flex preview'}, [
            ['div', {'efy_clock': ''}],
            ['div', {'efy_clock': '12'}],
            ['div', {'efy_clock': 'hms'}],
        ]],
        ['pre', {efy_code: 'logic', efy_card: ''}, [
            ['code', 'efy_clock'], ['p', ' = empty, '], ['code', '12'], ['p', ' (hour format, default is 24), '],
            ['code', 'hms'], ['p', ' (hour : minute : second) or '], ['code', '12hms'], ['p', ' (12 + hms)']
        ]],
        ['pre', {efy_code: 'example · html'}, [
            ['p', '<div '], ['code', 'efy_clock'], ['p', '></div>\n<div '],
            ['code', 'efy_clock'], ['p', '='], ['code', '"12"'], ['p', '></div>\n<div '],
            ['code', 'efy_clock'], ['p', '='], ['code', '"hms"'], ['p', '></div>\n<div '],
            ['code', 'efy_clock'], ['p', '='], ['code', '"12hms"'], ['p', '></div>']
        ]],
        ['pre', {efy_code: 'example · js'}, [
            ['p', '$add('], ['code', "'div'"], ['p', ', {'], ['code', 'efy_clock'], colon, ['code', "''"], ['p', '})\n$add('],
            ['code', "'div'"], ['p', ', {'], ['code', 'efy_clock'], colon, ['code', "'12'"], ['p', '})\n$add('],
            ['code', "'div'"], ['p', ', {'], ['code', 'efy_clock'], colon, ['code', "'hms'"], ['p', '})\n$add('],
            ['code', "'div'"], ['p', ', {'], ['code', 'efy_clock'], colon, ['code', "'12hms'"], ['p', '})']
        ]]
    ]],

    ['div', {efy_content: 'docs_tab_timer', class: 'efy_trans_filter_off'}, [
        ['div', {class: 'efy_flex preview'}, [
            ['div', {'efy_timer': 'efy_demo'}],
            ['div', {'efy_timer': 'efy_demo2,5,reverse'}]
        ]],
        ['pre', {efy_code: 'logic', efy_card: ''}, [
            ['code', 'efy_timer'], ['p', ' = '], ['code', 'id'], comma2, ['code', 'seconds'],
            ['p', ' (until it stops), '], ['code', 'reverse'], ['p', ' (count backwards)'],
            ['hr', {style: 'margin: 5rem auto 10rem auto'}, '\n'],
            ['code', 'id'], comma2, ['code', 'seconds'], comma2, ['code', 'reverse'], ['p', ' are optional']
        ]],
        ['pre', {efy_code: 'example · html'}, [
            ['p', '<div '], ['code', 'efy_timer'], ['p', '></div>\n'],
            ['p', '<div '], ['code', 'efy_timer'], ['p', '="'], ['code', 'efy_demo, 5, reverse'], ['p', '"></div>'],
        ]],
        ['pre', {efy_code: 'example · js'}, [
            ['p', '$add('], ['code', "'div'"], ['p', ', {'], ['code', 'efy_timer'], colon, ['code', "''"], ['p', '})\n'],
            ['p', '$add('], ['code', "'div'"], ['p', ', {'], ['code', 'efy_timer'], colon, ['code', "'efy_demo, 5, reverse'"], ['p', '})']
        ]]
    ]],

    ['div', {efy_content: 'docs_tab_select_menu', class: 'efy_trans_filter_off'}, [
        ['details', {efy_select: '', open: ''}, [
            ['summary', 'Select Menu'],
            ['div', [
                ['p', 'Radio'],
                ['input', {type: 'radio', name: 'efy_example_radio', id: 'efy_example_select1'}],
                ['label', {for: 'efy_example_select1'}, 'Option 1'],
                ['input', {type: 'radio', name: 'efy_example_radio', id: 'efy_example_select2', checked: ''}],
                ['label', {for: 'efy_example_select2'}, 'Option 2'],
                ['input', {type: 'radio', name: 'efy_example_radio', id: 'efy_example_select3'}],
                ['label', {for: 'efy_example_select3'}, 'Option 3'],
                ['p', 'Checkbox'],
                ['input', {type: 'checkbox', name: 'efy_example_checkbox', id: 'efy_example_select4', checked: ''}],
                ['label', {for: 'efy_example_select4'}, 'Option 4'],
                ['input', {type: 'checkbox', name: 'efy_example_checkbox', id: 'efy_example_select5'}],
                ['label', {for: 'efy_example_select5'}, 'Option 5'],
                ['input', {type: 'checkbox', name: 'efy_example_checkbox', id: 'efy_example_select6', checked: ''}],
                ['label', {for: 'efy_example_select6'}, 'Option 6']
            ]]
        ]],
        ['pre', {efy_code: 'logic'}, [['ul', [
            ['li', [
                ['p', 'Add '], ['code', 'efy_select'], ['p', ' to a '], ['code', 'details'],
                ['p', ' tag, the '], ['code', 'Name'], ['p', ' inside a '], ['code', 'summary'],
                ['p', ' & your radio / checkbox inputs inside a '], ['code', 'div']
            ]], nl,
            ['li', "It works this way cuz it's semantic html & you can add other html too, like div, img, etc."]
        ]]]],
        ['pre', {efy_code: 'example · html'}, [
            ['p', '<details '], ['code', 'efy_select'],
            ['p', '>\n\t<summary>'], ['code', 'Name'], ['p', '</summary>\n\t<div>'],
            hr,
            ['p', '\t\t<input type='], ['code', '"radio"'], ['p', ' name='], ['code', '"demo_radio"'], ['p', ' id='], ['code', '"demo_radio1"'],
            ['p', '>\n\t\t<label for='], ['code', '"demo_radio1"'], ['p', '>Radio 1</label>\n\t\t<input type='],
            ['code', '"radio"'], ['p', ' name='], ['code', '"demo_radio"'], ['p', ' id='], ['code', '"demo_radio2"'],
            ['p', '>\n\t\t<label for='], ['code', '"demo_radio2"'], ['p', '>Radio 2</label>'],
            hr,
            ['p', '\t\t<input type='], ['code', '"checkbox"'], ['p', ' name='], ['code', '"demo_checkbox"'], ['p', ' id='], ['code', '"demo_checkbox1"'],
            ['p', '>\n\t\t<label for='], ['code', '"demo_checkbox1"'], ['p', '>Checkbox 1</label>\n\t\t<input type='],
            ['code', '"checkbox"'], ['p', ' name='], ['code', '"demo_checkbox"'], ['p', ' id='], ['code', '"demo_checkbox2"'],
            ['p', '>\n\t\t<label for='], ['code', '"demo_checkbox2"'], ['p', '>Checkbox 2</label>'],
            hr, ['p', '\t</div>\n</details>']
        ]]
    ]],

    ['div', {efy_content: 'docs_tab_tabs', class: 'efy_trans_filter_off'}, [
        ['div', {'efy_tabs': 'dc2'}, [
            ['div', {class: 'efy_tabs'}, [
                ['input', {efy_tab: 'c4_1', type: 'radio', id: 'c4_1', name: 'c4'}],
                ['label', {for: 'c4_1'}, '1'],
                ['input', {efy_tab: 'c4_2', type: 'radio', id: 'c4_2', name: 'c4', efy_active: ''}],
                ['label', {for: 'c4_2'}, '2'],
                ['input', {efy_tab: 'c4_3', type: 'radio', id: 'c4_3', name: 'c4'}],
                ['label', {for: 'c4_3'}, '3']
            ]],
            ['div', {efy_content: 'c4_1'}, '1'],
            ['div', {efy_content: 'c4_2', efy_active: ''}, '2'],
            ['div', {efy_content: 'c4_3'}, [
                ['div', {'efy_tabs': 'dc3'}, [
                    ['div', {class: 'efy_tabs', 'style': 'margin-top: 5rem'}, [
                        ['input', {efy_tab: 'e_1', type: 'radio', id: 'e_1', name: 'e_' }],
                        ['label', {for: 'e_1'}, '4'],
                        ['input', {efy_tab: 'e_2', type: 'radio', id: 'e_2', name: 'e_', efy_active: ''}],
                        ['label', {for: 'e_2'}, '5']
                    ]],
                    ['div', {efy_content: 'e_1'}, '4'],
                    ['div', {efy_content: 'e_2', efy_active: ''}, '5']
                ]]
            ]]
        ]],
        ['pre', {efy_code: 'logic'}, [['ul', [
            ['li', [
                ['p', 'Add '], ['code', 'efy_tabs'], ['p', ' to a '], ['code', 'div'], ['p', '. Inside, an '],
                ['code', 'efy_tabs'], ['p', ' class with nested '], ['code', 'efy_tab'], ['p', ' inputs + labels and '],
                ['code', 'efy_content'], ['p', ' divs (where you can add your html)']
            ]],
            ['li', [
                ['p', 'Add '], ['code', 'efy_active'], ['p', ' to the '], ['code', 'efy_tab'], ['p', ' and '],
                ['code', 'efy_content'], ['p', ' you want open by default']
            ]],
            ['li', [
                ['p', 'The matching '], ['code', 'efy_tab'], ['p', ' and '], ['code', 'efy_content'],
                ['p', ' should have the same name and '], ['code', 'efy_tabs'],
                ['p', ' should have an unique name, unless you want to control a duplicate set of tabs']
            ]],
            ['li', [['p', 'You can nest tabs if you add them inside an '], ['code', 'efy_content'], ['p', ' div']]],
            ['li', [
                ['p', 'We use '], ['mark', 'input + label'], ['p', ' instead of '], ['mark', 'button'],
                ['p', " for tab names cuz they're more accessible & navigable with arrow keys"]
            ]]
        ]]]],
        ['pre', {efy_code: 'example · html', style: 'margin: 0'}, [
            ['p', '<div '], ['code', 'efy_tabs'], ['p', '='], ['code', '"demo"'], ['p', '>\n\t<div class='],
            ['code', '"efy_tabs"'], ['p', '>'],
            hr,
            ['p', '\t\t<input '], ['code', 'efy_tab'], ['p', '='], ['code', '"tab1"'], ['p', ' type="radio" '], ['code', 'id'], ['p', '='], ['code', '"tab1" efy_active'],
            ['p', ' />\n\t\t<label '], ['code', 'for'], ['p', '='], ['code', '"tab1"'], ['p', '>Tab 1</label>'],
            hr,
            ['p', '\t\t<input '], ['code', 'efy_tab'], ['p', '='], ['code', '"tab2"'], ['p', ' type="radio" '], ['code', 'id'], ['p', '='], ['code', '"tab2"'],
            ['p', ' />\n\t\t<label '], ['code', 'for'], ['p', '='], ['code', '"tab2"'], ['p', '>Tab 2</label>'],
            hr,
            ['p', '\t</div>\n\t<div '], ['code', 'efy_content'], ['p', '='], ['code', '"tab1" efy_active'], ['p', '>Your HTML 1</div>\n\t<div '],
            ['code', 'efy_content'], ['p', '='], ['code', '"tab2"'], ['p', '>Your HTML 2</div>\n</div>']
        ]],
        ['pre', {efy_code: 'example · js', style: 'margin: 0'}, [
            ['p', "$add('div', {"], ['code', 'efy_tabs'], colon, ['code', "'demo'"], ['p', "}, [\n\t['div', {class: "], ['code', "'efy_tabs'"], ['p', '}, ['],
            hr,
            ['p', "\t\t['input', {"], ['code', 'efy_tab'], colon, ['code', "'tab1'"], ['p', ", type: 'radio', "], ['code', 'id'], colon, ['code', "'tab1'"], comma2, ['code', 'efy_active'], ['p', ": ''}],"],
            ['p', "\n\t\t['label', {"], ['code', 'for'], colon, ['code', "'tab1'"], ['p', "}, 'Tab 1'],"],
            hr,
            ['p', "\t\t['input', {"], ['code', 'efy_tab'], colon, ['code', "'tab2'"], ['p', ", type: 'radio', "], ['code', 'id'], colon, ['code', "'tab2'"], ['p', "}],"],
            ['p', "\n\t\t['label', {"], ['code', 'for'], colon, ['code', "'tab2'"], ['p', "}, 'Tab 2'],"],
            hr,
            ['p', "\t]],\n\t['div', {"], ['code', 'efy_content'], colon, ['code', "'tab1'"], comma2, ['code', 'efy_active'], ['p', ": ''}, 'Your HTML 1'],\n\t['div', {"],
            ['code', 'efy_content'], colon, ['code', "'tab2'"], ['p', "}, 'Your HTML 2']\n])"],
        ]]
    ]]
], docs_page);

/*Icons*/ $ready('#dc_icons', (a)=>{ 'accessibility arrow arrow_down arrow_left arrow_up audio camera car check chevron chevron_down chevron_left chevron_up circle circle2 circle3 circle4 cloud copy dots edit flash fullscreen gamepad github globe group heart help home key location menu menu2 menu3 microphone moon move notify notify_active paste pause play plus rain reload remove rocket screen search snow square star sun triangle user zoom_in zoom_out'.split(' ').map(b=> $add('div', {efy_card: ''}, [['i', {efy_icon: b}], ['p', b]], $('#dc_icons')) )}, 1);

/*Copy URL / Icon*/ $event($('[efy_tabs=docs_tabs]'), 'click', (e)=>{
    const x = e.target, match = [x.matches('.copy_url'), x.matches('#dc_icons [efy_card]')];
    if (match[0] || match[1]){ const text = match[0] ?
        href.replace(hash, '') + '#learn#' + $$(x.parentNode, '[efy_tab=preview]').textContent.toLowerCase().replaceAll(' ', '_') : x.textContent;
        navigator.clipboard.writeText(text);
        if (efy.notify_clipboard != false) $notify('short', 'Copied to clipboard', text);
}});

$event(document, 'click', (event)=>{ target = event.target;
    if (target.matches('#dc_notify_test')) $notify('short', 'Short Notification', 'Disappears in 5s')
    if (target.matches('.questions')) docs_tab_questions.click();
    if (target.matches('.common_actions')) docs_tab_common_actions.click();
    if (target.matches('.components')) {docs_tab_group_components.click(); docs_tab_clock.click()}
    if (target.matches('.functions')) {docs_tab_group_functions.click(); docs_tab_add.click()}
    if (target.matches('.icons')) docs_tab_icons.click();
});