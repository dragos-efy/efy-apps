const $app_card =(title, href, icon, status, description, tags)=>{
    let tags_array = tags.split(' ').map(tag => ['p', {tag: ''}, tag] ),
    icon_array = (icon === 'piped' || icon === 'efydb') ? ['div', {class: 'logo'}, [ logos[icon] ]] : ['i', {efy_icon: icon}],
    link_attributes = {role: 'button', efy_card: '', efy_searchable: ''};
    if (href !== '') link_attributes.href = href;

    return ['a', link_attributes, [
        ['div', {class: 'top'}, [ icon_array, ['div', { class: 'column_flex'}, [
            ['p', {}, title], ['hr'], ['p', {efy_lang: status, class: 'efy_btn_trans'}]
        ]]]],
        ['div', {class: 'description'}, description], ['div', {tags: ''}, tags_array]
    ]];
};

let logos = {
    piped: $ns('svg', {class: 'piped_logo', 'viewBox': '0 0 508 819', width: '496', height: '800'}, [ $ns('path', {d: "m0.4 27.8c0 0 7.3-5.4 20.3-12.7 7.3-3.1 16.4-6.4 26.8-9.3 10.9-2.2 23.1-4 35.6-4.9 12.8 0 25.8 0.8 38 2.4 12.1 2.4 23.3 5.6 32.7 8.9 18.2 8.5 29.6 15.6 29.6 15.6v749.9h-183z"}), $ns('path', {d: "m242.1 163.5c0 0 0-9.7-0.1-22.3-0.2-5.6-0.4-11.9-0.6-18.2-0.2-6.3-0.4-13-0.6-19.9-0.1-7.4-0.1-15.5 0-23.8 0.3-9.3 0.7-19 1.2-28.2 1.3-21.2 2.6-37.7 2.6-37.7 0 0 14.6-1.2 39.3-1.4 5.9 0.4 12.4 1 19.4 1.8 6.9 0.9 14.3 2 22.1 3.5q11.3 2.9 23.4 7.1c8 2.8 16.3 6 24.7 9.7q12 6.5 24.1 14.5 12.1 8 24 17.6 11.3 10.3 22.1 22.1c6.8 8.2 13.4 16.8 19.7 25.9q8.9 14.1 16.8 29.3c4.8 10.4 9.2 21 13.2 32 3.5 11.1 6.6 22.4 9.2 33.9 2.1 11.6 3.7 23.3 4.8 35q1 17.6 0.3 35c-0.9 11.6-2.4 23-4.4 34.2q-0.9 4.1-1.9 8.2-1 4.1-2.1 8.1-1.2 4.1-2.4 8.1-1.2 4-2.5 8-1.5 3.8-3 7.6-1.6 3.8-3.3 7.5-1.6 3.8-3.4 7.4-1.7 3.7-3.6 7.4-2 3.4-4 6.8-2.1 3.4-4.2 6.7-2.2 3.4-4.4 6.6-2.3 3.3-4.6 6.5-2.4 3-4.9 6-2.5 2.9-5.1 5.8-2.6 2.8-5.2 5.6-2.7 2.8-5.4 5.6-2.9 2.4-5.8 4.8-2.9 2.4-5.9 4.7-3 2.3-6 4.6-3.1 2.2-6.2 4.4c-8.1 5.6-16.3 10.8-24.6 15.4-8.9 4-17.8 7.6-26.5 10.7-8.8 3.1-17.3 5.8-25.7 8.1-8.7 1.7-17.2 3.2-25.1 4.4-8 1.1-15.5 2-22.4 2.6-14.5 0.4-26.2 0.5-34.2 0.4-8 0-12.4-0.2-12.4-0.2 0 0 0.3-9.6 0.8-23.1 0.1-6.4 0.3-13.8 0.5-21.6 0.1-7.8 0.1-16.3 0.1-25.1-0.1-9.2-0.2-19-0.5-28.8-0.3-10.5-0.7-21.1-1.2-30.8-1.1-21.5-2.1-37.5-2.1-37.5 0 0 6.9 0.4 18.6 0.5 5.5-0.2 12.1-0.7 19.3-1.6 7-1.3 14.4-3 22-5.3 7.1-2.7 14.3-6.1 21.2-10.1q4.9-3.2 9.4-7 4.3-3.8 8.2-8.2 3.5-4.4 6.6-9.2 2.7-4.9 4.8-10.2 1.8-5.3 3-10.7 0.8-5.6 0.9-11.2-0.2-5.6-1.1-11.2-1.3-5.6-3.2-11-2.2-5.4-5-10.5-3.2-5.1-6.9-9.8-4-4.6-8.4-8.8-4.6-4.1-9.6-7.7c-7.2-4.5-14.5-8.4-21.9-11.7-7.8-2.9-15.5-5.2-22.6-7-7.5-1.5-14.3-2.5-20-3.2-12.1-0.9-19.3-1.1-19.3-1.1z"}), $ns('path', {d: "m92 819c-50.9 0-92-16.5-92-37 0-20.5 41.1-37 92-37 50.9 0 92 16.5 92 37 0 20.5-41.1 37-92 37z"}), $ns('path', {d: "m248.4 165c-22.5 0-40.7-34.1-40.7-76.3 0-42.1 18.2-76.2 40.7-76.2 22.4 0 40.6 34.1 40.6 76.3 0 42.1-18.2 76.2-40.6 76.2z"}), $ns('path', {d: "m249.9 486c-22.5 0-40.6-37.5-40.6-84 0-46.5 18.1-84 40.6-84 22.5 0 40.6 37.6 40.6 84 0 46.5-18.1 84-40.6 84z"}) ]),

    efydb: $ns('svg', {class: 'piped_logo', 'viewBox': '0 0 3000 3000', width: '3000', height: '3000'}, [$ns('path', {'fill-rule': 'evenodd', d: "M1498 0a98680 98680 0 0 1 1112 4 501 501 0 0 1 110 29 588 588 0 0 1 109 64 634 634 0 0 1 73 73 477 477 0 0 1 29 40l11 19a545 545 0 0 1 49 132 507 507 0 0 1 8 57l1 1083a89589 89589 0 0 1-4 1109 353 353 0 0 1-18 78 624 624 0 0 1-38 87 651 651 0 0 1-46 65 511 511 0 0 1-104 91l-18 11a472 472 0 0 1-187 56c-15 2-160 2-1085 2s-1070 0-1084-2a838 838 0 0 1-79-13 571 571 0 0 1-108-43l-19-11a556 556 0 0 1-87-72 2099 2099 0 0 1-32-38 518 518 0 0 1-68-128l-6-21-5-20a484 484 0 0 1-10-55L0 1509A155831 155831 0 0 1 4 394a415 415 0 0 1 41-140 557 557 0 0 1 46-75 569 569 0 0 1 66-70 486 486 0 0 1 145-84A506 506 0 0 1 404 3l19-2 1075-1zM400 205a292 292 0 0 0-64 23 254 254 0 0 0-118 130 321 321 0 0 0-17 71l-1 172 1 340 1 179h2598c0-619-1-696-2-702a1278 1278 0 0 0-9-40 286 286 0 0 0-29-64 336 336 0 0 0-30-37 286 286 0 0 0-42-35 285 285 0 0 0-86-36c-7-2-19-4-26-4-12-2-159-2-1077-2l-1076 1-23 4zM200 1941l1 635a310 310 0 0 0 18 69 310 310 0 0 0 35 60 292 292 0 0 0 87 70 303 303 0 0 0 71 22l13 2h2151a610 610 0 0 0 57-13 316 316 0 0 0 55-28 320 320 0 0 0 43-36 277 277 0 0 0 51-78 334 334 0 0 0 16-62c1-6 2-136 2-635v-627H200zM2017 373l19 2a72 72 0 0 1 40 23 14100 14100 0 0 1 116 164l49-72a5228 5228 0 0 1 66-93l12-10 12-7a75 75 0 0 1 34-7l20 2a64 64 0 0 1 37 24l5 11c2 7 2 9 2 20 0 10 0 13-2 19l-5 14-159 231v90a2518 2518 0 0 1-4 119c0 4-3 10-5 15a55 55 0 0 1-25 25l-16 6c-6 1-11 2-24 2a78 78 0 0 1-39-8l-11-7c-2-2-7-6-9-10a79 79 0 0 1-13-28l-2-204-77-112c-43-61-79-115-81-119l-6-14-1-17a54 54 0 0 1 10-31l9-11a62 62 0 0 1 33-16l15-1zm-1236 7c127 0 146 0 154 2l16 5 11 8 8 11 5 14a96 96 0 0 1 0 33l-5 14-8 11-9 8-13 5c-8 2-9 2-229 3l1 107h103l108 2 9 4c2 0 6 3 8 5l9 9 6 13a79 79 0 0 1 3 33l-3 15-6 13-11 10-13 6c-5 2-11 2-26 3l-188 1v115h110l116 2 12 4 9 6 8 9a56 56 0 0 1 9 37l-1 21-5 11-7 9-10 8-13 5c-6 1-17 2-310 2l-9-3-15-6-11-6a58 58 0 0 1-16-22l-5-12c-1-7-2-15-2-233 0-217 1-226 2-232l5-14 7-12a57 57 0 0 1 32-20l13-3 151-1zm718 0c124 0 143 0 151 2 5 0 11 2 15 4l11 8c3 3 7 7 8 10 2 2 4 8 5 13a118 118 0 0 1 1 38l-5 12-8 12-10 7c-2 2-8 4-13 5-8 2-8 2-216 3v113h91l99 1 13 3 11 5a46 46 0 0 1 20 28l1 20-1 19-5 12c-2 4-5 8-8 10-2 3-6 6-10 8l-12 5-199 2v80a2570 2570 0 0 1-4 104c0 3-3 10-5 14-2 6-5 9-10 15-6 5-10 8-15 10l-14 6-24 1a81 81 0 0 1-41-7l-11-8a66 66 0 0 1-16-19l-7-21V666c0-221 1-230 2-236l5-14 7-12a57 57 0 0 1 32-20l13-3 148-1zM731 1500a5587 5587 0 0 1 242 4 1681 1681 0 0 1 91 13 744 744 0 0 1 143 46 619 619 0 0 1 96 57 711 711 0 0 1 52 46 510 510 0 0 1 84 119 442 442 0 0 1 39 111 733 733 0 0 1-13 382 637 637 0 0 1-53 112 617 617 0 0 1-57 71 567 567 0 0 1-99 78 645 645 0 0 1-329 88 8496 8496 0 0 1-416-6 172 172 0 0 1-30-11 133 133 0 0 1-26-18 117 117 0 0 1-34-56 176 176 0 0 1-6-36l-1-437 1-439a295 295 0 0 1 8-37 186 186 0 0 1 16-33 137 137 0 0 1 29-29 136 136 0 0 1 24-12 195 195 0 0 1 50-12l188-1zm-23 889a3800 3800 0 0 0 239-5 474 474 0 0 0 70-17l14-6a332 332 0 0 0 54-30 312 312 0 0 0 37-34 286 286 0 0 0 41-68 307 307 0 0 0 20-71 798 798 0 0 0 7-54 725 725 0 0 0-11-158 416 416 0 0 0-26-68 233 233 0 0 0-149-120 546 546 0 0 0-64-14 713 713 0 0 0-140-5h-92zm1314-889a13263 13263 0 0 1 261 3 1125 1125 0 0 1 82 14 523 523 0 0 1 76 28 350 350 0 0 1 83 59 272 272 0 0 1 48 67 246 246 0 0 1 26 109 327 327 0 0 1-15 106 344 344 0 0 1-25 51 522 522 0 0 1-22 31 346 346 0 0 1-60 52l-44 23 10 3a400 400 0 0 1 65 30 331 331 0 0 1 52 42 317 317 0 0 1 43 63 297 297 0 0 1 25 98 408 408 0 0 1-18 144 356 356 0 0 1-43 75 347 347 0 0 1-99 80 467 467 0 0 1-140 43l-35 5-248 2a9701 9701 0 0 1-262-4 172 172 0 0 1-45-14 119 119 0 0 1-28-21l-12-15a173 173 0 0 1-17-33 234 234 0 0 1-7-38c-1-9-2-91-2-439s1-430 2-438a329 329 0 0 1 7-38 145 145 0 0 1 17-34 119 119 0 0 1 42-37 159 159 0 0 1 57-15c8-1 52-2 225-2zm-69 448c204 0 228 0 242-2a332 332 0 0 0 49-8l16-7a144 144 0 0 0 29-20l10-12a121 121 0 0 0 14-32 146 146 0 0 0-9-94l-8-12c-2-4-7-9-10-11a233 233 0 0 0-23-16 160 160 0 0 0-36-12l-21-4-133-2h-120zm0 464 280-2a386 386 0 0 0 41-9l17-7a117 117 0 0 0 27-21c4-3 9-9 11-13a129 129 0 0 0 13-29 180 180 0 0 0 6-43 230 230 0 0 0-6-43 123 123 0 0 0-13-30 115 115 0 0 0-25-25 128 128 0 0 0-33-16 173 173 0 0 0-38-8l-146-2h-134z"})])
};

$add('div', {id: 'dc_buttons', class: 'apps_page', efy_searchable: ''}, [

    $app_card(
        'Media', './media.html', 'audio', 'beta',
        'Play local offline music, videos and images. Organize them with custom tags, categories and search',
        'audio video image offline static fun'
    ), $app_card(
        'Money', './money.html', 'group', 'beta',
        'Keep track of your income, expenses, subscriptions, products and services. Create your budgets and categorize your tranzactions',
        'productivity offline static'
    ), $app_card(
        'Recorder', './recorder.html', 'circle', 'alpha',
        'Record audio, your video camera, screen sharing, take pictures, all in one place',
        'audio video image productivity offline'
    ), $app_card(
        'Piped', 'https://efy.piped.pages.dev', 'piped', 'beta',
        "An alternative privacy-friendly YouTube frontend which is efficient by design. Currently, only a few instances use efy and it's considered expiremental",
        'video fun server'
    ), $app_card(
        'Planner', './planner.html', 'check', 'beta',
        'Organize your tasks, take notes, time-based reminders, track your progress and time',
        'productivity offline static'
    ), $app_card(
        'Calculator', './calculator.html', 'plus', 'alpha',
        'Basic calculator. In the future it can also help with converting units like meters, temperature, kilograms, speed, currencies etc.',
        'productivity offline static'
    ), $app_card(
        'Converter', './converter.html', 'reload', 'alpha',
        'Convert efy translations from or to css and json, minify and beautify html, css, js',
        'productivity offline static'
    ), $app_card(
        'OS', './os.html', 'dots', 'alpha',
        'Web based operating system with efy apps inside. It has window tiling and it works regardless of your actual OS, but some features are limited compared to a real OS',
        'productivity offline static'
    ), $app_card(
        'Text Editor', '', 'menu', 'soon',
        'Edit text files, dynamic syntax highlighting, multiple tabs, split view, custom text colors. Mainly for simple use cases, not competing with complex text editors',
        'productivity offline static'
    ), $app_card(
        'Files', './files.html', 'help', 'alpha',
        "Experimental static file manager that allows you to create, read, update and delete files on your actual OS. Only works in chromium browsers (chrome, brave, edge, vivaldi etc). Very buggy currently, only use it for testing",
        'productivity offline static'
    ), $app_card(
        'Injector', '', 'edit', 'soon',
        "Inject efy into normal websites and apps that don't have it. It won't work in all cases",
        'fun extension dynamic'
    ), $app_card(
        'Sports', '', 'star', 'soon',
        'Helps you stay fit, relax, breathe, manage poses, create personalized routines, track your progress',
        'fun offline static'
    ), $app_card(
        'Passwords', '', 'key', 'soon',
        'Store encrypted passwords, generate TOTP codes for 2FA, export and import files. Experiment',
        'productivity offline static'
    ), $app_card(
        'Weather', '', 'help', 'soon',
        'See the forecast for today or a few days in advance',
        'productivity offline static'
    ), $app_card(
        'efyDB', '', 'efydb', 'soon',
        'Upload, Share & Download user made efy themes on a public server',
        'server fun public'
    ),  $app_card(
        'Builder', './builder.html', 'edit', 'alpha',
        'Create static apps & websites with efy components visually',
        'productivity offline static'
    ), $app_card(
        'Social Media', '', 'user', 'soon',
        'It would be cool to bring efy to social platforms like matrix (element), mastodon, lemmy etc',
        'social public server'
    ), $app_card(
        'Tic Tac Toe', './xo.html', 'remove', 'alpha',
        '1-4 player tic tac toe game with 3 - 8 columns and rows. Currently very basic and unstable',
        'game fun offline static'
    ), $app_card(
        'Ping Pong', '', 'circle', 'soon',
        '1-4 player 2d ping pong game with effects and extra customization',
        'game fun offline static'
    )

], $('div[efy_content=apps]'));