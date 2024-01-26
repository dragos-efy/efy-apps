const html_page = $('div[efy_content=html]');

$add('p', {style: 'margin-bottom: 15rem', efy_searchable: ''}, 'Examples of HTML elements styled with efy:', html_page);

$add('div', {efy_searchable: '', class: 'dc_grid'}, [
    ['div', {}, [
        ['figure', {}, [
            ['img', { 'src': './apps/assets/image.webp', 'alt': 'image', 'loading': 'lazy' }],
            ['figcaption', {}, 'image + figcaption']
        ]]
    ]],
    ['div', {}, [
        ['video', { 'src': './apps/assets/efy_video.mp4', 'controls': '', 'loading': 'lazy' }]
    ]]
], html_page);

$add('div', {efy_searchable: '', id: 'dc_headings'}, [
    ['h1', {}, 'H1'], ['h2', {}, 'H2'], ['h3', {}, 'H3'], ['h4', {}, 'H4'], ['h5', {}, 'H5'], ['h6', {}, 'H6'], ['p', {}, 'paragraph'], ['a', { 'href': '#' }, 'link'], ['abbr', { 'title': 'Abbreviations' }, 'abbr'], ['del', {}, 'del'], ['dfn', {}, 'dfn'], ['em', {}, 'em'], ['ins', {}, 'ins'], ['mark', {}, 'mark'], ['s', {}, 'strike through'], ['small', {}, 'small'], ['strong', {}, 'strong'], ['sub', {}, 'sub'], ['sup', {}, 'sup'], ['u', {}, 'underlined'], ['code', {}, '<code>'], ['kbd', {}, 'kbd']
], html_page);

$add('div', {id: 'dc_lists', efy_searchable: ''}, [
        ['ul', {}, [
            ['li', {}, 'List item'],
            ['ul', {}, [ ['li', {}, 'List item'], ['li', {}, 'List item'] ]],
            ['li', {}, 'List item']
        ]],
        ['ol', {}, [
            ['li', {}, 'List item'],
            ['ol', {}, [ ['li', {}, 'List Item'], ['li', {}, 'List Item'] ]],
            ['li', {}, 'List item']
        ]],
        ['dl', {}, [ 'Definition list', ['dt', {}, 'dt'], ['dd', {}, 'dd'] ]],
        ['div', { 'efy_searchable': '' }, [
            ['h6', {}, 'Navigation'],
            ['nav', { 'style': 'display: flex; gap: 10rem' }, [
                ['a', { 'href': '#' }, 'Link1'], ['a', { 'href': '#' }, 'Link2'], ['a', { 'href': '#' }, 'Link3']
            ]]
        ]]
], html_page);

$add('div', {efy_searchable: ''}, [ ['section', {}, [
    ['h4', {}, 'Section'], ['p', {}, 'A lot of boring text. In fact it\'s so boring that even if you find it funny while reading it, it will stay boring because it\'s pretty much useless. Reading it is a waste of time.']
]] ], html_page);

$add('div', {efy_searchable: '', id: 'dc_lists'}, [
    ['div', {}, [ ['h6', {}, 'Pre'], ['pre', {}, 'div {\n  color: var(--text);\n  background: var(--bg);\n}'] ]],
    ['div', {}, [ ['h6', {}, 'Pre > Code'], ['pre', {}, [['code', {}, 'div {\n  color: var(--text);\n  background: var(--bg);\n}']]] ]],
    ['div', { 'efy_searchable': '' }, [
        ['h6', {}, 'Article'],
        ['article', { 'class': 'efy_shadow_trans' }, [ ['h4', {}, 'H3'], ['p', {}, 'Paragraph inside an article'] ]]
    ]],
    ['div', { 'efy_searchable': '' }, [
        ['h6', {}, 'Blockquote'],
        ['blockquote', {}, [ ['p', {}, 'paragraph inside blockquote'], ['p', {}, [['cite', {}, 'cite']]] ]]
    ]]
], html_page)

$add('div', { 'efy_searchable': '', 'class': 'dc_grid' }, [
    ['table', {}, [
        ['thead', {}, [['tr', {}, Array(6).fill(['th', {}, 'Table heading'])]]],
        ['tfoot', {}, [['tr', {}, Array(6).fill(['th', {}, 'Table footer'])]]],
        ['tbody', {}, Array(5).fill(['tr', {}, Array(6).fill(['td', {}, 'Table data'])])]
    ]],
    ['div', {}, [
        ['details', { 'open': '', 'style': 'height: fit-content' }, [ ['summary', {}, 'Details'],
            ['p', {}, 'Content'],
            ['details', {}, [ ['summary', {}, 'Summary'], ['p', {}, 'content'] ]]
        ]],
        ['audio', { 'src': './apps/assets/efy_audio.mp4', 'controls': '', 'loading': 'lazy' }],
        ['div', { 'efy_searchable': '' }, [
            ['h6', {}, 'Progress & Meter'],
            ['progress', { 'value': '40', 'max': '100' }, '40%'],
            ['meter', { 'value': '5', 'min': '0', 'max': '10', 'style': 'margin-left: 5rem' }, '5 / 10']
        ]]
    ]]
], html_page);

$add('div', { 'efy_searchable': '' }, [ ['form', {}, [
        ['fieldset', { 'class': 'dc_grid' }, [
            ['label', {}, [['input', { 'type': 'color' }]]],
            ['label', {}, ['hidden input', ['input', { 'type': 'hidden' }]]],
            ['label', {}, [['input', { 'type': 'date' }]]],
            ['label', {}, [['input', { 'type': 'datetime-local' }]]],
            ['label', {}, [['input', { 'type': 'email', 'placeholder': 'email' }]]],
            ['label', {}, [['input', { 'type': 'month' }]]],
            ['label', {}, [['input', { 'type': 'number', 'value': '123' }]]],
            ['label', {}, [['input', { 'type': 'password', 'value': 'password', 'autocomplete': 'new-password' }]]],
            ['label', {}, [['input', { 'type': 'range' }]]],
            ['label', {}, [['input', { 'type': 'search', 'placeholder': 'search' }]]],
            ['label', {}, [['input', { 'type': 'tel', 'placeholder': 'phone' }]]],
            ['label', {}, [['input', { 'type': 'text', 'placeholder': 'text' }]]],
            ['label', {}, [['input', { 'type': 'time' }]]],
            ['label', {}, [['input', { 'type': 'url', 'placeholder': 'url' }]]],
            ['label', {}, [['input', { 'type': 'week' }]]],
            ['label', {}, [['input', { 'type': 'text', 'readonly': '', 'placeholder': 'input, read only' }]]],
            ['label', {}, [['textarea', { 'placeholder': 'textarea' }]]],
            ['label', {}, [['textarea', { 'placeholder': 'disabled textarea', 'disabled': '' }]]],
            ['label', {}, [
                ['select', {}, [
                    ['option', {}, 'select'],
                    ['optgroup', { 'label': 'optgroup 1' }, [
                        ['option', {}, 'option 1'],
                        ['option', {}, 'option 2']
                    ]],
                    ['optgroup', { 'label': 'optgroup 2' }, [
                        ['option', {}, 'option 1'],
                        ['option', {}, 'option 2']
                    ]],
                    ['option', {}, 'option']
                ]]
            ]],
            ['label', {}, [['select', { 'disabled': '' }, [['option', {}, 'select disabled'], ['option', {}, '2']]]]],
            ['label', {}, [['select', { 'multiple': '' }, [['option', {}, 'select multiple (ctrl + click)'], ['option', {}, '1'], ['option', {}, '2'], ['option', {}, '3']]]]],
            ['p', { 'id': 'dc_lists', 'style': 'margin: 0' }, [
                ['label', { 'style': 'width: 100%' }, [['input', {type: 'file'}]]],
                ['input', {type: 'radio', name: 'input-radio', value: '1', checked: ''}], ['label', {}, ' radio'],
                ['input', { 'type': 'radio', 'name': 'input-radio', 'value': '2' }], ['label', {}, ' radio'],
                ['input', { 'type': 'checkbox', 'checked': '' }], ['label', {}, 'checkbox'],
                ['input', { 'type': 'checkbox' }], ['label', {}, 'checkbox'],
                ['input', { 'type': 'checkbox', 'disabled': '', checked: ''}], ['label', {}, 'disabled'],
                ['input', { 'type': 'radio', 'disabled': '' }], ['label', {}, 'disabled'],
            ]]
        ]],
        ['div', { 'efy_searchable': '', 'id': 'dc_buttons' }, [
            ['button', {}, 'button'],
            ['a', { 'href': '#' }, [['button', {}, 'a > button']]],
            ['a', { 'href': '#', 'role': 'button', 'style': 'display: unset; float: unset' }, 'role=button'],
            ['button', { 'type': 'submit', 'onclick': 'return false;' }, 'button type=submit'],
            ['button', { 'type': 'reset', 'onclick': 'return false;' }, 'button type=reset'],
            ['input', { 'type': 'button', 'value': 'input type=button' }],
            ['input', { 'type': 'submit', 'value': 'input type=submit', 'onclick': 'return false;' }],
            ['input', { 'type': 'reset', 'value': 'input type=reset', 'onclick': 'return false;' }],
            ['button', { 'type': 'button', 'disabled': '' }, 'disabled']
        ]]
]] ], html_page);