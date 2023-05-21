$ready_once('.efy_sidebar').then(()=>{

/*Load App*/ $add('h4', {}, ['EFY Converter - Alpha'], $body);
$add('p', {}, ['Disabled options are not ready yet. The other ones should in theory work, but you might experience bugs. Have fun!'], $body);
$add('div', {class: 'lc_grid'}, [], $body);

let d = 'JSON to CSS (Translations), CSS to JSON (Translations), Minify CSS, Beautify CSS, Minify JS, Beautify JS, Minify HTML, Beautify HTML'.split(', '), e = 'json css css css js js html html'.split(' '); 'json css css_minify css_beautify js_minify js_beautify html_minify html_beautify'.split(' ').map((a,i)=>{
    $add('div', {lc_card: a, efy_card: ''}, [
        $add('h6', {}, [d[i]]), $add('hr', {}), $add('div', {}, [
            $add('label', {efy_upload: `lc_import_${a}, .${e[i]}`}),
            $add('a', {role: 'button', efy_lang: 'save', id: `lc_save_${a}`, disabled: ''})
        ])
    ], $('.lc_grid'))
});

$wait(2, ()=>{

let g = 'json css css'.split(' '), h = 'css json min.css'.split(' '), j = 'text/css application/json text/css'.split(' '); 'json css css_minify'.split(' ').map((a,i)=>{ let b = $(`#lc_import_${a}`), f = '';
    b.addEventListener('change', ()=>{ let e = $(`#lc_save_${a}`), file = b.files[0], name = b.files[0].name, read = new FileReader();
    read.onload =()=>{
        if (a == 'json'){ f = read.result.replaceAll('  ', '').replaceAll('{\n"', '[efy_lang]{\n--').replaceAll('",\n"', ';\n--').replaceAll(`": "`, `:`).replaceAll(`"\n}`, `;\n}`).replaceAll(`"`, '')}
        else if (a == 'css'){ f = read.result.replaceAll('[efy_lang]{\n--', '{\n"').replaceAll(';\n--', '",\n"').replaceAll(`: `, `":"`).replaceAll('":"', ':').replaceAll(':', `":"`).replaceAll(`;\n}`, `"\n}`)}
        else if (a == 'css_minify'){ f = read.result.replaceAll('\n', '').replaceAll('  ', '').replaceAll(': ', ':').replaceAll(' :', ':').replaceAll(' ;', ';').replaceAll('; ', ';').replaceAll(' ,',',').replaceAll(', ', ',').replaceAll('{ ', '{').replaceAll(' {', '{').replaceAll('} ', '}').replaceAll(' }', '}').replaceAll(';}', '}').replaceAll(/\/\*.*?\*\//g, '')}
console.log(a);
        e.href = URL.createObjectURL(new Blob([f], {type: j[i]}));
        e.setAttribute('download', `${name.replace(`.${g[i]}`, '')}.${h[i]}`); e.click(); $audio_play(efy_audio.ok3)
    }; read.readAsText(file)});
});


});

});