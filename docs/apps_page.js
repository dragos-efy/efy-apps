const apps_list = {
    Avatars: [
        '#avatars', 'user', 'alpha',
        'Customize your own avatars & reuse them across apps like Sports',
        'fun offline static'
    ],
    Builder: [
        '#builder', 'edit', 'alpha',
        'Create static apps & websites with efy components visually',
        'productivity offline static'
    ],
    Calculator: [
        '#calculator', 'plus', 'beta',
        'Basic calculator. In the future it can also help with converting units like meters, temperature, kilograms, speed, currencies etc.',
        'productivity offline static'
    ],
    Converter: [
        '#converter', 'reload', 'alpha',
        'Convert efy translations from or to css and json, minify and beautify html, css, js',
        'productivity offline static'
    ],
    Cubes: [
        '#cubes', 'square_full', 'alpha',
        'Test experimental 3D objects in EFY',
        '3d fun offline static'
    ],
    Draw: [
        '#draw', 'edit', 'alpha',
        'Unleash your creativity with this simple drawing app',
        'fun productivity offline static'
    ],
    Emoji: [
        '#emoji', 'snow', 'alpha',
        'Search & copy emojis',
        'fun productivity offline static'
    ],
    Empty: [
        '#empty', '', 'stable',
        'Test efy on an empty page',
        'productivity offline static'
    ],
    Files: [
        '#files', 'help', 'alpha',
        "Experimental static file manager that allows you to create, read, update and delete files on your actual OS. Only works in chromium browsers (chrome, brave, edge, vivaldi etc). Very buggy currently, only use it for testing",
        'productivity offline static'
    ],
    Gamepads: [
        '#gamepads', 'gamepad', 'alpha',
        'Test and remap your gamepads or use them to control efy apps',
        'game fun offline static'
    ],
    Injector: [
        '', 'globe', 'soon',
        "Inject efy into normal websites and apps that don't have it. It won't work in all cases",
        'fun extension dynamic'
    ],
    Invaders: [
        '#space_invaders', 'rocket', 'alpha',
        'Shoot enemies & increase your score',
        'game fun offline static'
    ],
    Keyboard: [
        '#keyboard', 'accessibility', 'alpha',
        'Virtual keyboard for efy apps and potentially linux as well soon',
        'productivity offline static dynamic'
    ],
    Lists: [
        './planner2.html', 'check', 'alpha',
        'Newest version of Planner, separated for testing, but unsafe to use normally currently',
        'productivity offline static'
    ],
    Media: [
        '#media', 'audio', 'beta',
        'Play local offline music, videos and images. Organize them with custom tags, categories and search',
        'audio video image static fun',
        'chromium firefox safari offline touchscreen keyboard mouse',
        'gamepads'
    ],
    Money: [
        './money.html', 'group', 'beta',
        'Keep track of your income, expenses, subscriptions, products and services. Create your budgets and categorize your tranzactions',
        'productivity offline static'
    ],
    OS: [
        './os.html', 'dots', 'alpha',
        'Web based operating system with efy apps inside. It has window tiling and it works regardless of your actual OS, but some features are limited compared to a real OS',
        'productivity offline static'
    ],
    Passwords: [
        '', 'key', 'soon',
        'Store encrypted passwords, generate TOTP codes for 2FA, export and import files. Experiment',
        'productivity offline static'
    ],
    Planner: [
        './planner.html', 'check', 'alpha',
        'Organize your tasks, take notes, time-based reminders, track your progress and time',
        'productivity offline static'
    ],
    Pong : [
        '#pong', 'circle', 'alpha',
        '1-4 player 2d ping pong game with effects and extra customization',
        'game fun offline static'
    ],
    Recorder: [
        '#recorder', 'circle3', 'alpha',
        'Record audio, your video camera, screen sharing, take pictures, all in one place',
        'audio video image productivity offline'
    ],
    Shade: [
        '#shade', 'shade', 'alpha',
        'Jump, go through objects, collect points, avoid enemies & find portals',
        'game fun offline static'
    ],
    Sports: [
        '#sports', 'star', 'alpha',
        'Helps you stay fit, relax, breathe, manage poses, create personalized routines, track your progress',
        'fun offline static'
    ],
    Text: [
        '#text', 'menu', 'alpha',
        'Edit text files, dynamic syntax highlighting, multiple tabs, split view, custom text colors. Mainly for simple use cases, not competing with complex text editors',
        'productivity offline static'
    ],
    Themes: [
        '', 'heart', 'soon',
        'Upload, Share & Download user made efy themes',
        'fun public server static'
    ],
    Torch: [
        '#torch', 'flash', 'alpha',
        'Toggle the flashlight of your device or make your screen a color that imitates one',
        'productivity fun offline static'
    ],
    Weather: [
        '#weather', 'sun', 'beta',
        'See the forecast for today or a few days in advance',
        'productivity offline static'
    ],
    XO: [
        '#xo', 'remove', 'alpha',
        '1-4 player tic tac toe game with 3 - 8 columns and rows. Currently very basic and unstable',
        'game fun offline static'
    ]
};

const apps_keys = Object.keys(apps_list),
banner = $add('div', {class: 'current_app efy_hide_i', efy_searchable: '', efy_card: ''}, [], $('div[efy_content=apps]'));

$banner_card =(title, href, icon, status, description, tags, compatible, uncompatible)=>{
    let link_attributes = {class: 'start', role: 'button', efy_lang: 'start'}, copy_url = null;

    if (href !== ''){
        link_attributes.href = href;
        copy_url = $add('button', {class: 'copy_url efy_color_trans'}, [['i', {efy_icon: 'copy'}], ['p', {efy_lang: 'copy'}]], banner);
    }

    banner.innerHTML = '';

    $add('div', {class: 's1'}, [
        ['i', {class: 'logo', efy_icon: icon}],
        ['div', {class: 'actions'}, [
            ['div', {class: 'info'}, [
                ['div', {class: 'title_container'}, [
                    ['p', {class: 'title'}, title],
                    ['p', {efy_lang: status, class: 'status efy_color_trans'}]
                ]],
                ['div', {class: 'description'}, description],
            ]]
        ]]
    ], banner);

    $add('div', {class: 'buttons'}, [
        ['a', link_attributes, [['i', {efy_icon: 'play'}]]],
        copy_url,
        ['button', {class: 'hide_current_app efy_square_btn efy_color_trans'}, [['i', {efy_icon: 'chevron'}]]]
    ], banner);

    const tags_container = $add('div', {class: 'tags'}, [], banner);

    if (compatible){
        $add('div', {tags: ''}, [
            ['p', {tag: 'title'}, 'Support:'],
            ...compatible.split(' ').map(tag => ['p', {tag: ''}, tag])
        ], tags_container);
    }
    if (uncompatible){
        $add('div', {tags: ''}, [
            ['p', {tag: 'title'}, 'No Support:'],
            ...uncompatible.split(' ').map(tag => ['p', {tag: ''}, tag])
        ], tags_container);
    }
    if (tags){
        $add('div', {tags: ''}, [
            ['p', {tag: 'title'}, 'Tags:'],
            ...tags.split(' ').map(tag => ['p', {tag: ''}, tag])
        ], tags_container);
    }
};

const app_previews = $add('div', {id: 'dc_buttons', class: 'apps_page', efy_searchable: ''}, [], $('div[efy_content=apps]'));

const $app_card =(i, title, href, icon, status, description, tags)=>{
    // Switch to Inputs

    // $add('a', {app: i, role: 'button', efy_card: '', efy_searchable: title.replaceAll(' ', '_')}, [
    //     ['div', {class: 'top'}, [
    //         ['i', {efy_icon: icon}],
    //         ['div', {class: 'column_flex'}, [
    //             ['p', title]
    //         ]]
    //     ]]
    // ], app_previews);
    const id = `dc_app_${i}`;
    $add('input', {type: 'radio', app: i, id: id, name: 'dc_apps'}, [], app_previews);
    $add('label', {for: id, role: 'button', efy_card: '', efy_searchable: title.replaceAll(' ', '_')}, [
        ['div', {class: 'top'}, [
            ['i', {efy_icon: icon}],
            ['div', {class: 'column_flex'}, [
                ['p', title]
            ]]
        ]]
    ], app_previews);
};

for (let i = 0; i < apps_keys.length; i++){
    $app_card(i, apps_keys[i], ...Object.values(apps_list)[i]);
};

$event($('div[efy_content=apps]'), 'click', ()=>{
    const x = event.target,
    reset_active =()=> $all('div[efy_content=apps] [app].active').forEach(a => a.classList.remove('active'));
    if (x.matches('#dc_buttons [app]')){
        if (x.classList.contains('active')){
            banner.classList.add('efy_hide_i');
            reset_active();
        }
        else {
            reset_active(); x.classList.add('active');
            const id = x.getAttribute('app');
            $banner_card(apps_keys[id], ...Object.values(apps_list)[id]);
            banner.classList.remove('efy_hide_i');
        }
    }
    else if (x.matches('.current_app .copy_url')){
        const text = $('.current_app .start').href;
        navigator.clipboard.writeText(text);
        if (efy.notify_clipboard != false) $notify('short', 'Copied to clipboard', text);
    }
    else if (x.matches('.hide_current_app')){
        banner.classList.add('efy_hide_i'); reset_active();
    }
});