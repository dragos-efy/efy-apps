/*Storage*/ let  efy_tt = {}, $tt_save =()=>{};
try {
    if (localStorage.efy_tt){ efy_tt = JSON.parse(localStorage.efy_tt)}
    $tt_save =()=>{ localStorage.efy_tt = JSON.stringify(efy_tt)}
} catch {}

(function (root, factory) {
    if (typeof define === 'function' && define.amd) { define(['exports'], factory)}
    else if (typeof exports !== 'undefined') { factory(exports)}
    else { factory((root.tt_highlight = {}))}
}(this, function (exports){ let test = 'test', i, highlighted, el; // current highlighted element

    let reset =(cls)=>{ highlighted = document.getElementsByClassName(cls||'tt_highlight');

        for (i = 0; el = highlighted[i++];){
            let text  = el.textContent, /*current position*/ pos = 0,
            /*next char*/ next1 = text[0],  /*current char*/ chr = 1, prev1 /*prev char*/,
            prev2 /*1 before prev*/, token = el.innerHTML = '', token_type = 0,
            last_token_type /*regex or division?*/, multichar /*is token multi-character?*/, node;

            // run through characters & highlight
            while (prev2 = prev1,
                   // escape if needed (except for comments), previous character won't be recognized as a token finalize condition
                   prev1 = token_type < 7 && prev1 == '\\' ? 1 : chr
            ) {
                chr = next1;
                next1 = text[++pos];
                multichar = token.length > 1;

                // checking if current token should be finalized
                if (!chr  || // end of content types 9-10 (single-line comments) end with a newline
                    (token_type > 9 && chr == '\n') ||
                    [ // finalize conditions for other token types
                        /*0: whitespaces (merged)*/ /\S/[test](chr),
                        /*Single character --> 1: operators, 2: braces*/ 1, 1,
                        /*3: (key)word*/ !/[$\w]/[test](chr),
                        /*4: regex*/ (prev1 == '/' || prev1 == '\n') && multichar,
                        /*5: " , 6: ' , 7: ` */ prev1 == '"' && multichar, prev1 == "'" && multichar, prev1 == "`" && multichar,
                        /*8: xml comment */ text[pos-4]+prev2+prev1 == '-->',
                        /*9: multiline comment */ prev2+prev1 == '*/'
                    ][token_type]
                ) {
                    // append the token to the result
                    if (token) {
                        $add('span', {class: [ /* 0: unchanged, 1: keywords, 2: punctuation, 3: strings & regexps, 4: comments*/ 'tt_text0', 'tt_text1', 'tt_text2', 'tt_text3', 'tt_text4'][
                            !token_type ? 0 : // unchanged
                            token_type < 3 ? 2 : // punctuation
                            token_type > 6 ? 4 : // comments
                            token_type > 3 ? 3 : // regex and strings
                            // otherwise token_type == 3, (key)word (1 if regexp matches, 0 otherwise)
                            + /^(a(bstract|lias|nd|rguments|rray|s(m|sert)?|uto)|b(ase|egin|ool(ean)?|reak|yte)|c(ase|atch|har|hecked|lass|lone|ompl|onst|ontinue)|de(bugger|cimal|clare|f(ault|er)?|init|l(egate|ete)?)|do|double|e(cho|ls?if|lse(if)?|nd|nsure|num|vent|x(cept|ec|p(licit|ort)|te(nds|nsion|rn)))|f(allthrough|alse|inal(ly)?|ixed|loat|or(each)?|riend|rom|unc(tion)?)|global|goto|guard|i(f|mp(lements|licit|ort)|n(it|clude(_once)?|line|out|stanceof|t(erface|ernal)?)?|s)|l(ambda|et|ock|ong)|m(icrolight|odule|utable)|NaN|n(amespace|ative|ext|ew|il|ot|ull)|o(bject|perator|r|ut|verride)|p(ackage|arams|rivate|rotected|rotocol|ublic)|r(aise|e(adonly|do|f|gister|peat|quire(_once)?|scue|strict|try|turn)|oot)|s(byte|ealed|elf|hort|igned|izeof|tatic|tring|truct|ubscript|uper|ynchronized|witch)|t(emplate|hen|his|hrows?|ransient|rue|ry|ype(alias|def|id|name|of))|u(n(checked|def(ined)?|ion|less|signed|til)|se|sing)|v(ar|irtual|oid|olatile)|w(char_t|hen|here|hile|ith)|xor|yield|\$(add|event|ready|wait)|\$)$/[test](token)
                        ]}, token, el);
                    }

                    /*Save previous token type, (skip whitespaces & comments)*/ last_token_type = (token_type && token_type < 7) ? token_type : last_token_type;
                    /*New token*/ token = '';

                    /*Determine new token type*/ token_type = 12;
                    while (![ /*0: whitespace, 1: operator or braces, 2: closing brace, 3: keyword*/ 1, /[\/{}[(\-+*=<>:;|\\.,?!&@~]/[test](chr), /[\])]/[test](chr), /[$\w]/[test](chr),

                        chr == '/' && /*4: regex*/ (last_token_type < 2) && /*previous token was an opening brace or an operator (otherwise division, not regex)*/
                        /*xml closing tags*/ prev1 != '<',
                        chr == '"' /*5: string with " */, chr == "'" /*6: string with ' */, chr == "`" /*7: string with ` */,
                        chr+next1+text[pos+1]+text[pos+2] == '<!--', /*8: xml comment*/
                        chr+next1 == '/*', /*9: multiline comment*/ chr+next1 == '//', /*10: single-line comment*/ chr == '#' /*11: hash-style comment*/
                    ][--token_type]);
                }
                token += chr;
            }
        }
    };

    exports.reset = reset;

    if (document.readyState == 'complete'){ reset()} else { window.addEventListener('load', ()=>{ reset()}, 0)}
}));



//////////////////////////



$ready('#efy_sbtheme', ()=>{

$add('div', {efy_tabs: 'text', id: 'tabs'}, [
    ['div', {class: 'tt_nav'}, [
        ['div', {class: 'buttons'}, [
            ['label', {efy_upload: 'fileToLoad, .txt, small, multiple', title: 'Add Files'}],
            ['button', {id: 'export', class: 'export efy_square_btn', title: 'Export'}, [['i', {efy_icon: 'arrow_down'}]]],
            ['input', {efy_tab: '0', id: 'tt_files_0', type: 'radio', name: 'tt_files', efy_active: ''}],
            ['label', {for: 'tt_files_0'}, 'text.txt']
        ]],
        ['div', {class: 'tt_nav'}, [
            ['button', {class: 'new_tab efy_square_btn', title: 'Shortcuts'}, [['i', {efy_icon: 'star'}]]],
            ['button', {class: 'ms_menu efy_square_btn', efy_sidebar_btn: '', title: 'Menu'}, [['i', {efy_icon: 'menu'}]]]
        ]],

    ]],
    ['div', {class: 'content efy-glass'}, [
        ['pre', {efy_content: '0', efy_active: '', id: 'inputTextToSave', class: 'tt_highlight', contenteditable: ''}]
    ]]
]);

    let load_text_file =()=>{ let files_nr = $("#fileToLoad").files.length;
        for (let i = 0; i < files_nr; i++){
            let fileToLoad = $("#fileToLoad").files[i], fileReader = new FileReader();
            fileReader.onload =(fileLoadedEvent)=>{ let textFromFileLoaded = fileLoadedEvent.target.result, tabId = "tab" + Date.now();
                $add('input', {efy_tab: tabId, id: tabId, type: 'radio', name: 'tt_files'}, [], $('#tabs .buttons'));
                $add('label', {for: tabId}, fileToLoad.name, $('#tabs .buttons'));

                $add('div', {efy_content: tabId}, [
                    ['pre', {contentEditable: 'true', class: 'tt_highlight efy_card_filter_off', spellcheck: 'false'}, textFromFileLoaded],
                    ['div', {class: 'tt_nr', id: `tt_nr_${tabId}`}]
                ], $('#tabs .content'));
                tt_highlight.reset();

                /*Line Number*/ $(`[efy_content=${tabId}] pre`).textContent.split('\n').map(function(line, index){
                    let i = String(index + 1);
                    $add('span', {class: 'line-number'}, i, $(`#tt_nr_${tabId}`))
                });

            };  fileReader.readAsText(fileToLoad, "UTF-8");
        }
    }


    /* save_text_file =()=>{ let divs = div('#inputTextToSave'), text = divs.innerHTML,
        text_blob = new Blob([text], {type: 'text/plain'}),
        text_url = window.URL.createObjectURL(text_blob),
        download_link = $add('a', {href: text_url, download: 'editedText.txt', onclick: (event)=>{document.body.removeChild(event.target)}, style: 'display: none'}, ['Download file'], $body);
        download_link.click();
    }; */

$ready('#fileToLoad', ()=>{
    const file_input = $('#fileToLoad');
    file_input.setAttribute('accept', '.txt, .js, .css, .php, .json, .md, .yml, .html');
    $event(file_input, 'change', load_text_file);
    // $event($("#export"), 'change', save_text_file);
}, 1);


//////


let text_colors = (efy_tt.text_colors) ? String(efy_tt.text_colors) :
'keywords .8 .17 73 1, punctuation .9 .15 195 1, strings .76 .21 133 1';

const set_text_colors =(colors = text_colors)=>{
    colors.replaceAll(', ', ',').split(',').map((a, i)=>{ a = a.split(' ');
        let tag = [a[0], `${a[1]} ${a[2]} ${a[3]}`, a[4]];
        $root.style.setProperty(`--tt_text_color_${tag[0]}`, `${tag[1]} / ${tag[2]}`);
    });
}; set_text_colors();

$add('details', {id: 'tt_menu'}, [
    ['summary', {efy_lang: 'text_editor'}, [['i', {efy_icon: 'menu'}]]],
    ['div', {class: 'fonts', efy_select: ''}, [
        ['input', {type: 'checkbox', id: 'tt_mono', name: 'tt_mono'}],
        ['label', {for: 'tt_mono', efy_lang: 'mono_font'}]
    ]],
     ['div', {class: 'colors'}, [
        ['p', {efy_lang: 'colors'}],
        ['div', {efy_color: text_colors}]
     ]]
], $('#efy_sbtheme'), 'beforebegin');

$event($('#tt_menu .colors'), 'input', ()=>{
    let final = [], names = [], content = [];
    $all('#tt_menu .colors [efy_content]').forEach(tag =>{
        let values = [];
        $$all(tag, '[type=range]').forEach(val =>{
            values.push(val.value);
        });
        content.push(`${values[2]} ${values[1]} ${values[0]} ${values[3]}`);
    });
    $all('#tt_menu .colors [efy_tab] + label').forEach((tag, i) =>{
        final.push(`${tag.textContent} ${content[i]}`);
    });
    efy_tt.text_colors = String(final);
    $tt_save();
    set_text_colors(efy_tt.text_colors);
});

$event($('#tt_mono'), 'change', ()=>{ $('#tabs .content').classList.toggle('mono')});
$event($('.tt_highlight'), 'click', ()=>{ tt_highlight.reset() });

}, 1);