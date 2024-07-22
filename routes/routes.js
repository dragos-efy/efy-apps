let apps = [], rm_listeners = {};

const file_map = {
    /*Global*/ efy: ['global/efy_global.js'], empty: ['global/empty.css'], routes: ['routes/routes2.js'],
    builder: ['builder/builder.css', 'builder/builder.js'],
    calculator: ['calculator/calculator.css', 'calculator/calculator.js'],
    converter: ['converter/converter.css', 'global/empty.css', 'converter/converter.js'],
    cubes: ['cubes/cubes.css', 'global/empty.css', 'cubes/cubes.js'],
    draw: ['draw/draw.css', 'global/start_info.css', 'global/empty.css', 'draw/draw.js'],
    emoji: ['emoji/emoji.css', 'emoji/emoji.js'],
    files: ['files/files.css', 'files/files.js'],
    gamepads: ['gamepads/gamepads.css', 'global/empty.css', 'gamepads/gamepads.js'],
    keyboard: ['keyboard/keyboard.css', 'keyboard/keyboard.js'],
    media: ['media/media.css', 'global/music_tags.js', 'media/media.js'],
    // money: ['money/money.css', 'money/money.js'],
    // os: ['os/os.css', 'os/os.js'],
    // planner: ['planner/planner.css', 'planner/planner.js'],
    pong: ['pong/pong.css', 'global/start_info.css', 'pong/pong.js'],
    // recorder: ['recorder/recorder.css', 'recorder/recorder.js'],
    shade: ['shade/shade.css', 'global/start_info.css', 'global/empty.css', 'shade/shade.js'],
    text: ['text/text.css', 'text/text.js'],
    torch: ['torch/torch.css', 'torch/torch.js'],
    weather: ['weather/weather.css', 'weather/weather.js'],
    xo: ['xo/xo.css', 'global/empty.css', 'xo/xo.js']
},

load_files =(path)=>{ const files = file_map[path];
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

console.log(apps);

if (apps.length === 0) load_files('empty');
load_files('efy');
apps.forEach(app => load_files(app));

$event(window, 'hashchange', ()=> location.reload());