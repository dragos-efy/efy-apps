const $url_prev = [
    {name: 'donate', url: 'https://liberapay.com/efy'},
    {name: 'github', url: 'https://github.com/dragos-efy/efy'},
    {name: 'matrix', url: 'https://matrix.to/#/#efy_ui:matrix.org'},
    {name: 'translate', url: 'https://translate.codeberg.org/projects/efy'}
]; for (const {name, url} of $url_prev){ if (document.referrer.includes('/'+name)){ window.location.href = url; break}}

let apps = [], rm_listeners = {}, empty = 'global/empty.css', start_info = 'global/start_info.css';

const file_map = {
    /*Global*/ efy: ['global/efy_global.js'],
    empty: [empty], routes: ['routes/routes2.js'],
    /*Apps*/
    '3d_tennis': ['3d_tennis/3d_tennis.css', empty, '3d_tennis/3d_tennis.js'],
    avatars: ['avatars/avatars.css', 'avatars/avatars.js'],
    builder: ['builder/builder.css', 'builder/builder.js'],
    calculator: ['calculator/calculator.css', 'calculator/calculator.js'],
    cars: [start_info, empty, 'cars/cars.css', 'cars/cars.js'],
    converter: ['converter/converter.css', empty, 'converter/converter.js'],
    cubes: [empty, 'cubes/cubes.css', 'cubes/cubes.js'],
    draw: [start_info, empty, 'draw/draw.css', 'global/oklch_convert.js', 'draw/draw.js'],
    emoji: ['emoji/emoji.css', 'emoji/emoji.js'],
    files: ['files/files.css', 'files/files.js'],
    fractals: [empty, 'fractals/fractals.css', 'global/oklch_convert.js', 'fractals/fractals.js'],
    gamepads: ['gamepads/gamepads.css', 'gamepads/gamepads.js'],
    gamepad_keyboard: ['gamepad_keyboard/gamepad_keyboard.css', 'gamepad_keyboard/gamepad_keyboard.js'],
    gametype: ['gametype/gametype.css', empty, 'gametype/gametype.js'],
    index: ['docs/docs.css', 'docs/docs.js'],
    instruments: ['instruments/instruments.css', 'instruments/instruments.js'],
    keyboard: ['keyboard/keyboard.css', 'keyboard/keyboard.js'],
    lists: ['lists/lists.css', 'lists/lists.js', 'global/calendar.css', 'global/calendar.js'],
    media: ['media/media.css', 'global/music_tags.js', 'media/media.js'],
    money: ['money/money.css', 'money/money.js'],
    os: ['./global/apps_list.js', 'os/os.css', 'os/os.js'],
    pong: [start_info, 'pong/pong.css', 'pong/pong.js'],
    recorder: ['recorder/recorder.css', 'recorder/recorder.js'],
    shade: [start_info, empty, 'shade/shade.css', 'shade/shade.js'],
    snake: ['snake/snake.css', 'snake/snake.js'],
    space_invaders: [start_info, 'space_invaders/space_invaders.css', 'space_invaders/space_invaders.js'],
    sports: [start_info, 'sports/sports.css', 'sports/sports.js'],
    tags: ['tags/tags.css', empty, 'tags/tags.js'],
    tanks: [start_info, empty, 'tanks/tanks.css', 'tanks/tanks.js'],
    text: ['text/text.css', 'text/text.js'],
    torch: ['torch/torch.css', 'torch/torch.js'],
    units: ['units/units.css', empty, 'units/units.js'],
    weather: ['weather/weather.css', 'weather/weather.js'],
    xo: ['xo/xo.css', empty, 'xo/xo.js']
};

/*if (efy.hands_status) file_map.efy.push('hands/handsfree.css', 'hands/handsfree.js', 'hands/hands.js');*/

const load_files =(path)=>{ const files = file_map[path];
    try { unload_files(path)} catch {/**/}
    files.map(file =>{ const url = `./${file}`;
        if (file.endsWith('.css')){
            const css = document.createElement('link');
            css.rel = 'stylesheet'; css.href = url;
            document.head.appendChild(css);
        }
        else if (file.endsWith('.js')){
            const js = document.createElement('script');
            js.src = url; document.head.appendChild(js);
        }
    });
    rm_listeners[path] = new AbortController();
},
unload_files =(path)=>{ const files = file_map[path];
    files.map(file =>{ const url = `./${file}`;
        if (file.endsWith('.css')){
            $(`link[href="${url}"`).remove();
        }
        else if (file.endsWith('.js')){
            $(`script[src="${url}"`).remove();
        }
    });
    rm_listeners[path].abort(); delete rm_listeners[path];
    if (path === 'routes') $('.routes_body').remove();
    if (path === 'xo') $('.xo_body').remove();
};

Object.keys(file_map).map(name =>{
    if (window.location.hash.endsWith('#'+name)){
        apps.push(name);
        document.title = name.replaceAll('_', ' ').split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + ' - EFY';
    }
});

if (apps.length === 0) load_files('index');
load_files('efy');
$wait(0.1, ()=>{ apps.forEach(app => load_files(app)); });

$event(window, 'hashchange', ()=> location.reload());
