const faq_page = $('div[efy_content=faq]');

$add('details', {efy_searchable: 'features'}, [
    ['summary', {}, 'Features'],
    ['ul', {}, [
        ['li', {}, 'Minimalism, Search & Toggles - no dependencies or repetition'],
        ['li', {}, 'Modularity - users decide, billions of dynamic patterns'],
        ['li', {}, 'Sounds, 3D Layers & Visual Filters'],
        ['li', {}, 'Convergence - on most devices, browsers, touchscreen, mouse, keyboards & gamepads'],
        ['li', {}, 'Transparency - custom alpha, transparent OS window support'],
        ['li', {}, 'Private - data saved on your device (localStorage & IndexedDB)'],
        ['li', {}, 'Accessible - in progress'],
        ['li', {}, [
            ['p', {}, 'Static & Offline - '], ['mark', {}, 'https:///'],
            ['p', {}, ' & '], ['mark', {}, 'file:///'], ['p', {}, ' protocols']
        ]]
    ]]
], faq_page);

$add('details', {efy_searchable: 'how_to_use'}, [
    ['summary', {}, 'How do I use it on my own projects?'],
    ['p', {}, [
        ['p', {}, 'In any way you want, as long as you keep it open source & follow the '],
        ['a', {href: 'https://github.com/dragos-efy/efy/blob/main/LICENSE'}, 'AGPL 3.0 License'],
        ['p', {}, '. Better documentation is coming soon.']
    ]], ['hr', {style: 'margin: 0'}],
    ['p', {}, [
        ['p', {}, 'Download the efy folder from '],
        ['a', {href: 'https://github.com/dragos-efy/efy'}, 'Github'],
        ['p', {}, ' in your project or install it from the terminal:'],
    ]],
    ['pre', {efy_code: 'npm / yarn / pnpm', style: 'margin-bottom: 10rem'},
        'npm install efy\nyarn add efy\npnpm add efy'
    ],
    ['p', {}, 'Then add this code (local or server):'],
    ['pre', {efy_code: 'html · local', style: 'margin-bottom: 10rem'},
        '<link rel="stylesheet" href="./efy/efy_local.css">\n<link rel="stylesheet" href="your_efy_config_file.css">\n<script src="./efy/efy_local.js"></script>'
    ],
    ['pre', {efy_code: 'html · server', style: 'margin-bottom: 10rem'},
        '<link rel="stylesheet" href="./efy/efy.css">\n<link rel="stylesheet" href="your_efy_config_file.css">\n<script src="./efy/efy.js"></script>'
    ],
    ['p', {}, [
        ['p', {}, 'In the config file you can set your own defaults. '],
        ['a', {href: 'https://github.com/dragos-efy/efy-apps/blob/main/apps/efy_global.css'}, 'Here\'s an example'],
        ['p', {}, '. You can also add your own css inside after the template ends, or make a new file if you prefer to keep things separated. Both ways work, just make sure that the config file runs before efy.js so that it knows what your preferences are.']
    ]]
], faq_page);


$add('details', {efy_searchable: 'reset'}, [
    ['summary', {}, 'I see glitches or errors. How do I reset it?'],
    ['p', {}, [
        ['mark', {}, 'EFY'], ['i', {efy_icon: 'chevron'}], ['mark', {efy_lang: 'backup'}],
        ['i', {efy_icon: 'chevron'}], ['mark', {efy_lang: 'theme'}], ['p', {}, 'or'],
        ['mark', {efy_lang: 'efy_database'}], ['i', {efy_icon: 'chevron'}], ['mark', {efy_lang: 'reset'}]
    ]], ['hr'],
    ['p', {}, 'Or clear your browser\'s cache, try a different browser, device, etc.']
], faq_page);

$add('details', {efy_searchable: 'piped_instance'}, [
    ['summary', {}, 'Run your own Piped EFY Instance'],
    ['p', {}, [
        ['p', {}, 'Thanks '], ['a', {href: 'https://github.com/rubyowo'}, 'Ruby'], ['p', {}, ' for the instructions 👏']
    ]],
    ['hr', {}],
    ['pre', {efy_code: 'bash · linux', style: 'margin-bottom: 10rem'},
        'git clone --branch efy https://github.com/TeamPiped/Piped.git --recurse-submodules\ncd Piped\necho \'!.eslintrc.cjs\' >> .dockerignore\ndocker build . --tag piped-efy'
    ],
    ['p', {style: 'padding-bottom: 15rem'}, [
        ['p', {}, 'Go to your piped docker-compose & change the image from '],
        ['mark', {}, '1337kavin/piped-frontend'], ['p', {}, ' to '], ['mark', {}, 'piped-efy'],
        ['p', {}, '. I recommend building with buildx because its faster:']
    ]],
    ['pre', {efy_code: 'bash · linux'}, 'docker buildx build . --tag piped-efy'],
    ['hr', {}],
    ['p', {}, 'Public Instances:'],
    ['ul', {}, [
        ['li', {}, [['a', {href: 'https://efy.piped.pages.dev'}, 'https://efy.piped.pages.dev']]],
        ['li', {}, [['a', {href: 'https://piped.rubyowo.me'}, 'https://piped.rubyowo.me']]],
        ['li', {}, [['a', {href: 'https://piped.winscloud.net'}, 'https://piped.winscloud.net']]]
    ]]
], faq_page);

$add('details', {efy_searchable: 'bugs_ideas'}, [
    ['summary', {}, 'Report bugs or share your ideas'],
    ['p', {}, [
        ['p', {}, 'On '], ['a', {href: 'https://github.com/dragos-efy/efy'}, 'Github'],
        ['p', {}, ' or '], ['a', {href: 'https://matrix.to/#/#efy_ui:matrix.org'}, 'Matrix'],
        ['p', {}, '. Specify what causes the bugs, on what device, browser, etc. or why your ideas should be implemented']
    ]]
], faq_page);

$add('details', {efy_searchable: 'status'}, [
    ['summary', {}, 'Is it stable / production-ready?'],
    ['p', {}, 'EFY is currently in Beta, so expect potential bugs. Features & apps that are unstable are usually marked this way:'],
    ['hr', {style: 'margin: 0'}], ['p', {}, [
        ['mark', {efy_lang: 'soon'}], ['i', {efy_icon: 'chevron'}],
        ['mark', {efy_lang: 'alpha'}], ['i', {efy_icon: 'chevron'}],
        ['mark', {efy_lang: 'beta'}], ['i', {efy_icon: 'chevron'}],
        ['mark', {efy_lang: 'stable'}]
    ]], ['hr', {style: 'margin: 0'}],
    ['p', {}, [['mark', {efy_lang: 'soon'}], ['p', {}, '- unavailable, expected']]],
    ['p', {}, [['mark', {efy_lang: 'alpha'}], ['p', {}, '- unsafe, lots of bugs']]],
    ['p', {}, [['mark', {efy_lang: 'beta'}], ['p', {}, '- safer, less bugs']]],
    ['p', {}, [['mark', {}, 'Stable'], ['p', {}, '- safe, less bugs']]],
    ['hr', {style: 'margin: 0'}], ['p', {}, 'If you\'re a dev, wait for the docs to add explainations on how to use it before adding it to your apps']
], faq_page);

$add('details', {efy_searchable: 'name'}, [
    ['summary', {}, [['p', {},'What does '], ['code', {}, 'EFY'], ['p', {}, ' mean?']]],
    ['p', {}, 'Nothing. It\'s just a name, like Andy or Izzy.']
], faq_page);

$add('details', {efy_searchable: 'bg_image'}, [
    ['summary', {}, 'Add background images'],
    ['p', {}, [
        ['mark', {}, 'EFY'], ['i', {efy_icon: 'chevron'}],
        ['mark', {efy_lang: 'theme'}], ['i', {efy_icon: 'chevron'}],
        ['mark', {efy_lang: 'mode'}], ['i', {efy_icon: 'chevron'}],
        ['mark', {efy_lang: 'trans'}], ['i', {efy_icon: 'chevron'}],
        ['mark', {style: 'display: inline-flex; aspect-ratio: 1'}, [['i', {efy_icon: 'plus', style: 'margin: 0'}]]]
    ]]
], faq_page);

$add('details', {efy_searchable: 'test'}, [
    ['summary', {}, 'More coming soon...'], ['p', {}, 'This is just the beginning...']
], faq_page);