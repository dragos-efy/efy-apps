const docs_page = $('div[efy_content=docs]'), [comma, comma2, colon, hr, nl] = [['p', ' , '], ['p', ', '], ['p', ': '], ['hr', '\n'], ['p', {class: 'new_line'}, '\n']];

$add('h5', {efy_searchable: ''}, 'Learn how to use efy', docs_page);

$add('div', {class: 'columns'}, [
    ['div', {style: 'display: flex; flex-direction: column; gap: var(--efy_gap)'}, [
        ['details', {efy_searchable: 'mode'}, [['summary', '[efy_mode]'],
            ['ul', [
                ['li', ['It sets the mode, the default value is ', ['code', 'default']]],
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
        ['details', {efy_searchable: 'add'}, [
            ['summary', [['p', '$add'], ['div', {style: 'font-weight: normal; display: inline'}, ' - create html']]],
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
        ]]
    ]],
    ['div', [
        ['details', {efy_searchable: 'soon'}, [['summary', 'More coming soon...'], ['p', 'This is just the beginning...']]]
    ]]
], docs_page);

$add('h5', {efy_searchable: ''}, 'Components', docs_page);

$add('div', {class: 'dc_separator'}, [
    ['div', [
        ['div', {efy_tabs: 'demo_icons', class: 'dc_code_preview', efy_searchable: 'icons'}, [
            ['div', {class: 'tabs'}, [
                ['button', {efy_tab: 'preview', efy_active: ''}, 'Icons'],
                ['button', {efy_tab: 'collection'}, 'Collection'],
                ['button', {class: 'copy_url efy_square_btn', title: 'Copy URL'}, [['i', {efy_icon: 'globe'}]]]
            ]],
            ['div', {efy_content: 'preview', class: 'efy_trans_filter_off', efy_active: ''}, [
                ['div', {style: 'display: flex; gap: var(--efy_gap); width: 100%;'}, [
                    ['div', {class: 'efy_square_btn', style: 'background: var(--efy_bg1); height: 100%; width: unset; aspect-ratio: 1; border-radius: var(--efy_radius); border: var(--efy_border)'}, [
                        ['i', {efy_icon: 'star', style: 'font-size: 40rem'}]
                    ]],
                    ['pre', {efy_code: 'example · html', style: 'margin: 0'}, [
                        ['p', '<i '], ['code', 'efy_icon'], ['p', '='], ['code', '"star"'], ['p', '></i>']
                    ]]
                ]]
            ]],
            ['div', {efy_content: 'collection', class: 'efy_trans_filter_off'}, [['div', {id: 'dc_icons'}]]]
        ]],
        ['div', {efy_tabs: 'demo_color_picker', class: 'dc_code_preview', efy_searchable: 'color_picker'}, [
            ['div', {class: 'tabs'}, [
                ['button', {efy_tab: 'preview', efy_active: ''}, 'Color Picker'],
                ['button', {efy_tab: 'code'}, 'Code'],
                ['button', {class: 'copy_url efy_square_btn', title: 'Copy URL'}, [['i', {efy_icon: 'globe'}]]],
            ]],
            ['div', {efy_content: 'preview', class: 'efy_trans_filter_off', efy_active: ''}, [
                ['div', {efy_color: '1 0.5 0.2 0 1, 2 0.7 0.2 100 1, 3 0.5 0.2 200 1, range:1-9'}],
            ]],
            ['div', {efy_content: 'code', class: 'efy_trans_filter_off'}, [
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
                ]],
            ]],
        ]],
        ['div', {efy_tabs: 'demo_notifications', class: 'dc_code_preview', efy_searchable: 'notifications'}, [
            ['div', {class: 'tabs'}, [
                ['button', {efy_tab: 'preview', efy_active: ''}, 'Notifications'],
                ['button', {efy_tab: 'code'}, 'Code'],
                ['button', {class: 'copy_url efy_square_btn', title: 'Copy URL'}, [['i', {efy_icon: 'globe'}]]],
            ]],
            ['div', {efy_content: 'preview', class: 'efy_trans_filter_off', efy_active: ''}, [
                ['button', {id: 'dc_notify_test'}, [['i', {efy_icon: 'notify'}], ['p', 'Test Notification']]]
            ]],
            ['div', {efy_content: 'code', class: 'efy_trans_filter_off'}, [
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
                    ['span', {style: 'color: var(--efy_text_trans)'}, '// Attach it to a click event\n'],
                    ['p', '$event('], ['code', 'selector'], comma2, ['code', "'click'"], ['p', ', ()=> '],
                    ['code', '$notify'], ['p', '('], ['code', "'short'"], comma2, ['code', "'Test'"], comma2, ['code', "'Test'"], ['p', '))']
                ]]
            ]]
        ]],
        ['div', {efy_tabs: 'demo_clock', class: 'dc_code_preview', efy_searchable: 'clock'}, [
            ['div', {class: 'tabs'}, [
                ['button', {efy_tab: 'preview', efy_active: ''}, 'Clock'],
                ['button', {efy_tab: 'code'}, 'Code'],
                ['button', {class: 'copy_url efy_square_btn', title: 'Copy URL'}, [['i', {efy_icon: 'globe'}]]],
            ]],
            ['div', {efy_content: 'preview', class: 'efy_trans_filter_off', efy_active: ''}, [
                ['div', {'efy_clock': ''}],
                ['div', {'efy_clock': '12'}],
                ['div', {'efy_clock': 'hms'}]
            ]],
            ['div', {efy_content: 'code', class: 'efy_trans_filter_off'}, [
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
            ]]
        ]],
        ['div', {efy_tabs: 'demo_timer', class: 'dc_code_preview', efy_searchable: 'timer'}, [
            ['div', {class: 'tabs'}, [
                ['button', {efy_tab: 'preview', efy_active: ''}, 'Timer'],
                ['button', {efy_tab: 'code'}, 'Code'],
                ['button', {class: 'copy_url efy_square_btn', title: 'Copy URL'}, [['i', {efy_icon: 'globe'}]]],
            ]],
            ['div', {efy_content: 'preview', class: 'efy_trans_filter_off', efy_active: ''}, [
                ['div', {'efy_timer': 'efy_demo'}],
                ['div', {'efy_timer': 'efy_demo2,5,reverse'}]
            ]],
            ['div', {efy_content: 'code', class: 'efy_trans_filter_off'}, [
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
            ]]
        ]]
    ]],
    ['div', [
        ['div', {efy_tabs: 'demo_select_menu', class: 'dc_code_preview', efy_searchable: 'select_menu'}, [
            ['div', {class: 'tabs'}, [
                ['button', {efy_tab: 'preview', efy_active: ''}, 'Select Menu'],
                ['button', {efy_tab: 'code'}, 'Code'],
                ['button', {class: 'copy_url efy_square_btn', title: 'Copy URL'}, [['i', {efy_icon: 'globe'}]]],
            ]],
            ['div', {efy_content: 'preview', class: 'efy_trans_filter_off', efy_active: ''}, [
                ['details', {efy_select: '', style: 'width: 100%; margin: 0', open: ''}, [
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
                ]]
            ]],
            ['div', {efy_content: 'code', class: 'efy_trans_filter_off'}, [
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
            ]]
        ]],
        ['div', {efy_tabs: 'demo_tabs', class: 'dc_code_preview', efy_searchable: 'tabs'}, [
            ['div', {class: 'tabs'}, [
                ['button', {efy_tab: 'preview', efy_active: ''}, 'Tabs'],
                ['button', {efy_tab: 'code'}, 'Code'],
                ['button', {class: 'copy_url efy_square_btn', title: 'Copy URL'}, [['i', {efy_icon: 'globe'}]]],
            ]],
            ['div', {efy_content: 'preview', class: 'efy_trans_filter_off', efy_active: ''}, [
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
                ]]
            ]],
            ['div', {efy_content: 'code', class: 'efy_trans_filter_off'}, [
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
        ]]
    ]]
], docs_page);


/*Icons*/ $ready('#dc_icons', (a)=>{ 'accessibility arrow arrow_down arrow_left arrow_up audio camera check chevron chevron_down chevron_left chevron_up circle cloud copy dots edit flash fullscreen github globe group heart help key menu menu2 microphone moon move notify notify_active paste pause play plus rain reload remove screen search snow star sun user zoom_in zoom_out'.split(' ').map(b=> $add('div', {efy_card: ''}, [['i', {efy_icon: b}], ['p', b]], $('#dc_icons')) )}, 1);

/*Copy URL / Icon*/ $event($('[efy_content=docs]'), 'click', (e)=>{
    const x = e.target, match = [x.matches('.copy_url'), x.matches('#dc_icons [efy_card]')];
    if (match[0] || match[1]){ const text = match[0] ?
        href.replace(hash, '') + '#docs#' + $$(x.parentNode, '[efy_tab=preview]').textContent.toLowerCase().replaceAll(' ', '_') : x.textContent;
        navigator.clipboard.writeText(text);
        if (efy.notify_clipboard != false) $notify('short', 'Copied to clipboard', text);
}});

$event(document, 'click', (event)=>{ target = event.target;
    if (target.matches('#dc_notify_test')) $notify('short', 'Short Notification', 'Disappears in 5s')
});