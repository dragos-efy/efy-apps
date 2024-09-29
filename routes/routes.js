const $url_prev = [
    {name: 'donate', url: 'https://liberapay.com/efy'},
    {name: 'github', url: 'https://github.com/dragos-efy/efy'},
    {name: 'matrix', url: 'https://matrix.to/#/#efy_ui:matrix.org'},
    {name: 'translate', url: 'https://translate.codeberg.org/projects/efy'},
    {name: 'call', url: 'https://jitsi.riot.im/efy'}
]; for (const {name, url} of $url_prev){ if (document.referrer.includes('/'+name)){ window.location.href = url; break}}

let apps = [], rm_listeners = {};

const file_map = {
    /*Global*/ efy: ['global/efy_global.js'],
    empty: ['global/empty.css'], routes: ['routes/routes2.js'],
    /*Apps*/
    avatars: ['avatars/avatars.css', 'avatars/avatars.js'],
    builder: ['builder/builder.css', 'builder/builder.js'],
    calculator: ['calculator/calculator.css', 'calculator/calculator.js'],
    converter: ['converter/converter.css', 'global/empty.css', 'converter/converter.js'],
    cubes: ['cubes/cubes.css', 'global/empty.css', 'cubes/cubes.js'],
    draw: ['draw/draw.css', 'global/start_info.css', 'global/empty.css', 'global/oklch_convert.js', 'draw/draw.js'],
    emoji: ['emoji/emoji.css', 'emoji/emoji.js'],
    index: ['docs/docs.css', 'docs/docs.js'],
    // instruments: ['instruments/instruments.css', 'instruments/instruments.js'],
    files: ['files/files.css', 'files/files.js'],
    gamepads: ['gamepads/gamepads.css', 'gamepads/gamepads.js'],
    keyboard: ['keyboard/keyboard.css', 'keyboard/keyboard.js'],
    media: ['media/media.css', 'global/music_tags.js', 'media/media.js'],
    // money: ['money/money.css', 'money/money.js'],
    // os: ['os/os.css', 'os/os.js'],
    // planner: ['planner/planner.css', 'planner/planner.js'],
    // planner2: ['planner/planner2.css', 'planner/planner2.js'],
    pong: ['pong/pong.css', 'global/start_info.css', 'pong/pong.js'],
    recorder: ['recorder/recorder.css', 'recorder/recorder.js'],
    shade: ['shade/shade.css', 'global/start_info.css', 'global/empty.css', 'shade/shade.js'],
    space_invaders: ['space_invaders/space_invaders.css', 'global/start_info.css', 'space_invaders/space_invaders.js'],
    sports: ['sports/sports.css', 'global/start_info.css', 'sports/sports.js'],
    text: ['text/text.css', 'text/text.js'],
    themes: ['themes/themes.css', 'themes/themes.js'],
    torch: ['torch/torch.css', 'torch/torch.js'],
    weather: ['weather/weather.css', 'weather/weather.js'],
    xo: ['xo/xo.css', 'global/empty.css', 'xo/xo.js']
};

/*if (efy.gamepads_status)*/ file_map.efy.push('global/gamepads.css', 'global/gamepads.js');
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
    if (window.location.hash.endsWith('#'+name)) apps.push(name);
});

if (apps.length === 0) load_files('index');
load_files('efy');
apps.forEach(app => load_files(app));

$event(window, 'hashchange', ()=> location.reload());