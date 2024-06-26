/*Storage*/ let  efy_pn = {}, $pn_save =()=>{};
try {
    if (localStorage.efy_pn){ efy_pn = JSON.parse(localStorage.efy_pn)}
    $pn_save =()=>{ localStorage.efy_pn = JSON.stringify(efy_pn)}
} catch {}

/*default data*/ let pn_defaults = [
    // goals
    {name: 'Goal 1', date: '25/04/2023', time: 30, tags: 'goal high'},
    {name: 'Goal 2', date: '25/04/2023', time: 0,
        info: 'The sub-goals bellow help you track individual progress for each part of the main goal',
        scores: ['Part 1, 6, 9', 'Part 2, 1, 3'], tags: 'goal medium'
    },
    {name: 'Goal 3', date: '25/04/2023', time: 150, tags: 'goal low'},
    {name: 'Goal 4', date: '29/06/2023', time: 5, info: 'description', tags: 'goal normal'},
    {name: 'Goal 5', date: '25/04/2023', time: 600, done: true, tags: 'goal normal'},
    {name: 'Note 1', info: '1', date: '25/04/2023', tags: 'note medium'},
    {name: 'Note 2', info: '2', date: '27/06/2023', tags: 'note'},
    {name: 'EFY Site', url: 'https://efy.ooo', tags: 'link'},
    {name: 'Media', url: './media.html', tags: 'link'},
    {name: 'Github', url: 'https://github.com/dragos-efy/efy', tags: 'link'},
    {name: 'Github - Apps', url: 'https://github.com/dragos-efy/efy-apps', tags: 'link'},
    {name: 'Personal', tags: 'tag'},
    {name: 'Work', tags: 'tag'},
    {name: 'Later', tags: 'tag'},
    {name: 'Fun', color: '0.5 2 0 0', tags: 'tag'},
    {name: 'Food', quantity: 1, price: 61300, date: '24/12/2023', tags: 'money'},
    {name: 'Ben', email: 'contact@efy.ooo', phone: '+01234567890', birthday: '01/01/2000', info: 'He likes flowers', tags: 'contact'}
];

if (localStorage[`efy_pn_data`] === undefined){
    localStorage[`efy_pn_data`] = JSON.stringify(Object.values(pn_defaults));
}

/*Convert Month Number to Name*/ let month_name = {}; for (let i = 1; i <= 12; i++){
    month_name[i < 10? '0' + i : '' + i] = 'January February March April May June July August September October November December'.split(' ')[i - 1]
};
/*Variables*/ const pn_modal = {
    toggle(){ $('.modal-overlay').classList.toggle('active'); $('.modal_grid #text').focus()}
},

format = {
  date(date){ const split = date.split('-'); return `${split[2]}/${split[1]}/${split[0]}`},
  currency(value){ value = (String(value).replace(/\D/g, '') / 100).toLocaleString('en-GB', {style: 'currency', currency: 'eur'}); const signal = Number(value) < 0 ? "-" : ""; return signal + value}
};

goal = {
    all: JSON.parse(localStorage[`efy_pn_data`] || []),
    add(item){ goal.all.push(item); App_goals.reload()},
    remove(index){ goal.all.splice(index, 1); App_goals.reload()}
},

pn_form_goals =()=>{
    let x = '.pn_goals_form #', y = '.pn_goals_form .',
    a = $(x+'text'), b = $(x+'priority input:checked'), c = $(x+'date'),
    d1 = $(y+'hour'), d2 = $(y+'minute'), d3 = $(y+'second'),
    aa = a.value, bb = b.id, cc = format.date(c.value),
    dd = String(Math.floor((Number(d1.value) * 3600) + (Number(d2.value) * 60) + Number(d3.value)));
    try {
        if (aa.trim() === '' || bb.trim() === '' || cc.trim() === '' || cc.trim() === 'undefined/undefined/' || dd.trim() == ''){
            $notify('short', 'Missed Required Fields', 'Fill in the rest')
        } else {
            /*Add*/ goal.add({name: aa, tags: `goal ${bb}`, date: cc, time: dd});
            /*Reset*/ a.value = ''; c.value = ''; d3.value = '';
            $(x+'priority #normal').checked = 'true';
            pn_modal.toggle()
        }
    } catch (error){ console.log(error.message)}
},

App_goals ={
    types: ['goal', 'note', 'link', 'contact', 'money', 'tag'],
    start(){
        goal.all.forEach((goal, index)=>{

            let where = '#pn_tags', done_btn = null, timer_buttons = [null, null];
            const tags = goal.tags.split(' ');

            tags.forEach(tag =>{ if (App_goals.types.includes(tag)) where = `#pn_${tag}s`});

            let now = 'pn_goal_' + Date.now(),
            date = null, date0 = '', date_div = null, month = '', pn_date = null,
            info_div = null, timer_div = null, time_div = null, scores_div = null,
            email_div = null, phone_div = null, birthday_div = null, price_div = null, quantity_div = null,
            this_details = `${where} [data-value="${index}"]`;
            if (goal.date){
                date = goal.date.split('/');
                month = month_name[date[1]];
                date0 = date[0];
                date_div = ['div', {class: 'date efy_shadow_trans'}, month +', '+ date0];
                pn_date = {pn_date: goal.date}
            }
            if (goal.info){
                info_div = ['textarea', {class: 'info efy_trans_filter_off efy_shadow_trans_off', readonly: ''}, goal.info];
            }
            if (goal.time){
                timer_div = ['div', {efy_timer: `${now},${goal.time},reverse` }];
                time_div = ['div', {class: 'time'}, $sec_time(goal.time)];
            }
            if (goal.scores){ let scores = [];
                goal.scores.map((score, i)=>{ score = score.split(', ');
                    scores[i] = ['div', {class: 'score'}, [
                        ['div', {class: 'top'}, [
                            ['p', {class: 'name'}, score[0]],
                            ['div', {class: 'buttons'}, [
                                ['div', {class: 'numbers efy_trans_filter_off_all'}, [
                                    ['input', {type: 'number', class: 'value', value: score[1]}],
                                    ['p', {}, '/'],
                                    ['input', {type: 'number', class: 'max', value: score[2]}]
                                ]],
                                ['button', {class: 'efy_square_btn remove'}, [['i', {efy_icon: 'remove'}]]]
                            ]]
                        ]],
                        ['progress', {value: score[1], max: score[2]}]
                    ]];
                })
                scores_div = ['div', {class: 'scores'}, scores];
            }
            if (goal.email){ email_div = ['p', {class: 'email efy_trans_filter_off efy_shadow_trans_off'}, [
                ['p', {}, 'Email'], ['a', {href: `mailto:${goal.email}`}, goal.email]
            ]]};
            if (goal.phone){ phone_div = ['p', {class: 'phone efy_trans_filter_off efy_shadow_trans_off'}, [
                ['p', {}, 'Phone'], ['a', {href: `tel:${goal.phone}`}, goal.phone]
            ]]};
            if (goal.birthday){ birthday_div = ['p', {class: 'birthday efy_trans_filter_off efy_shadow_trans_off'}, [
                ['p', {}, 'Birthday'], ['p', {}, goal.birthday]
            ]]};
            if (goal.price){ price_div = ['p', {class: 'price efy_trans_filter_off efy_shadow_trans_off'}, [
                ['p', {}, 'Price'], ['p', {}, format.currency(goal.price)]
            ]]};
            if (goal.quantity){ quantity_div = ['p', {class: 'quantity efy_trans_filter_off efy_shadow_trans_off'}, [
                ['p', {}, 'Quantity'], ['p', {}, String(goal.quantity)]
            ]]};

            const start_pause = {onClick: `
                $('${this_details} [efy_start].pseudo').toggleAttribute('efy_active');
                $('${this_details} [efy_timer] [efy_start]').dispatchEvent(new Event('click', { 'bubbles': true }))
            `},
            reset = {onClick: `
                $('${this_details} [efy_start].pseudo').toggleAttribute('efy_active');
                $('${this_details} [efy_timer] [efy_reset]').dispatchEvent(new Event('click', { 'bubbles': true }));
            `},
            done_fn = {onClick: `
            let x = $('${this_details}');
                if (x.getAttribute('pn_done') == 'true'){ x.setAttribute('pn_done', 'false')}
                else {
                    let y = $('#pn_confetti'); y.currentTime = 0; y.play();
                    x.toggleAttribute('open'); x.setAttribute('pn_done', 'true'); x.classList.remove('pn_fs');
                    $('html').classList.remove('pn_fs');
                    $('${this_details} [efy_timer] [efy_start]').dispatchEvent(new Event('click', { 'bubbles': true }))
                }
            `},
            fullscreen = {onClick: `
                let x = $('${this_details}');
                x.classList.toggle('pn_fs'); x.classList.toggle('efy_sidebar_width');
                $('html').classList.toggle('pn_fs');
                window.scrollTo(0,0);
            `},
            remove_fn = {onClick: `goal.remove(${index}); $('html').classList.remove('pn_fs');`};

             tags.forEach(tag =>{
                if (tag === 'goal'){ done_btn =
                    ['button', {class: 'done_btn efy_square_btn', efy_audio_mute: 'ok', ...done_fn}, [
                        ['i', {efy_icon: 'check'}]
                    ]];
                }
            });

            if (goal.time){ timer_buttons = [
                ['button', {efy_start: '', title: 'Start or Pause', class: 'pseudo efy_square_btn', ...start_pause}],
                ['button', {efy_reset: '', title: 'Reset', class: 'pseudo efy_square_btn', ...reset}]
            ]}


            $add('details', {efy_searchable: '', 'data-value': index, id: now, ...pn_date, pn_done: goal.done}, [
                ['summary', {}, [
                    ['div', {pn_priority: goal.tags}],
                    ['div', {class: 'title'}, goal.name],
                    time_div
                ]],
                ['div', {class: 'info'}, [scores_div, timer_div, price_div, quantity_div, email_div, phone_div, birthday_div, info_div]],
                ['div', {class: 'pn_tags'}, [
                    date_div, timer_buttons[0], timer_buttons[1], done_btn,
                    ['button', {class: 'pn_fs efy_square_btn', efy_audio_mute: 'ok', ...fullscreen}, [['i', {efy_icon: 'fullscreen'}]]],
                    ['button', {class: 'remove efy_square_btn', ...remove_fn}, [['i', {efy_icon: 'remove'}]]]
                ]]
            ], $(`${where} [efy_drag]`));
        });
        localStorage[`efy_pn_data`] = JSON.stringify(goal.all)
        App_goals.types.forEach(where=>{
            $(`#pn_${where}s .header mark`).textContent = $all(`#pn_${where}s [efy_drag] > *`).length
        });
    },
    reload(){
        $(`#pn_${where}s [efy_drag]`).innerHTML = '';
        App_goals.start()
    }
};

App_goals.start();

/*Add menu when ready*/ $ready('#efy_sbtheme', ()=>{

let tag_colors = (efy_pn.tag_colors) ? String(efy_pn.tag_colors) :
'low .7 .22 133 1, medium .8 .18 94 1, high .63 .26 29 1';

const set_tag_colors =(colors = tag_colors)=>{
    colors.replaceAll(', ', ',').split(',').map((a, i)=>{ a = a.split(' ');
        let tag = [a[0], `${a[1]} ${a[2]} ${a[3]}`, a[4]];
        $root.style.setProperty(`--pn_tag_color_${tag[0]}`, `${tag[1]} / ${tag[2]}`);
        $root.style.setProperty(`--pn_tag_color_alpha_${tag[0]}`, `${tag[1]} / ${tag[2] / 3}`);
    });
}; set_tag_colors();

$add('details', {id: 'pn_settings', class: 'eos_menu'}, [
    ['summary', {}, [
        ['i', {efy_icon: 'edit'}],
        ['p', {}, 'Planner'],
        ['mark', {efy_lang: 'alpha'}]
    ]],
    ['div', {efy_tabs: 'pn_menu', efy_select: ''}, [
        ['div', {class: 'efy_tabs'}, [
            ['input', {type:'radio', id: 'pn_tab_theme', efy_tab: 'theme', efy_active: ''}],
            ['label', {for: 'pn_tab_theme', efy_lang: 'theme'}],
            ['input', {type:'radio', id: 'pn_tab_backup', efy_tab: 'backup'}],
            ['label', {for: 'pn_tab_backup', efy_lang: 'backup'}],
            ['input', {type:'radio', id: 'pn_tab_tags', efy_tab: 'tags'}],
            ['label', {for: 'pn_tab_tags', efy_lang: 'tags'}]
        ]],
        ['div', {efy_content: 'backup', efy_select: '', id: 'pn_backup'}, [
            ['a', {role: 'button', class: 'pn_localstorage_export', efy_lang: 'save'}, [['i', {efy_icon: 'arrow_down'}]]],
            ['label', {efy_upload: 'pn_localstorage_import, .json'}],
            ['button', {class: 'pn_localstorage_reset', efy_lang: 'reset'}, [['i', {efy_icon: 'reload'}]]],
        ]],
        ['div', {efy_content: 'theme', efy_select: '', id: 'pn_theme', efy_active: ''}, [
            ['p', {efy_lang: 'priority', class: 'pn_title'}],
            ['div', {efy_color: tag_colors}],
            ['input', {type: 'checkbox', name: 'pn_priority_custom', id: 'pn_priority_custom'}],
            ['label', {for: 'pn_priority_custom', efy_lang: 'inside_goal'}]
        ]],
        ['div', {efy_content: 'tags', efy_select: '', id: 'pn_tags_tab'}, [
            ['div', {efy_lang: 'coming_soon'}]
        ]],
    ]]
], $('#efy_sbtheme'), 'beforebegin');

$event($('#pn_theme'), 'input', ()=>{
    let final = [], names = [], content = [];
    $all('#pn_theme [efy_content]').forEach(tag =>{
        let values = [];
        $$all(tag, '[type=range]').forEach(val =>{
            values.push(val.value);
        });
        content.push(`${values[2]} ${values[1]} ${values[0]} ${values[3]}`);
    });
    $all('#pn_theme [efy_tab] + label').forEach((tag, i) =>{
        final.push(`${tag.textContent} ${content[i]}`);
    });
    efy_pn.tag_colors = String(final);
    $pn_save();
    set_tag_colors(efy_pn.tag_colors);
});

$event($('#pn_priority_custom'), 'change', (a)=>{
    $('[pn_planner]').classList.toggle('priority_color');
    efy_pn.priority_match = a.target.checked; $pn_save()
});
if (efy_pn.priority_match == true){
    $('[pn_planner]').classList.add('priority_color');
    $('#pn_priority_custom').checked = true
}

$wait(2, ()=>{
    /*Export Settings*/ $event($('.pn_localstorage_export'), 'click', ()=>{ let e = $('.pn_localstorage_export'), s =(a)=>{ return localStorage[`efy_pn_${a}`].replaceAll('  ', '').replaceAll(',"', ', "').replaceAll('"},', '"},\n').replaceAll('":', '": ')}, f = s('goals'), g = s('notes'), h = s('links'), final = `${f}\n\n${g}\n\n${h}`;
    e.href = URL.createObjectURL(new Blob([final], {type: 'application/json'})); e.setAttribute('download', 'efy_planner.json') });

    /*Import Settings*/ let efy_ls_import = $('#pn_localstorage_import'); $event(efy_ls_import, 'change', ()=>{ let file = efy_ls_import.files[0], read = new FileReader();
	read.onload =()=>{ let obj = read.result.split('\n\n');
        ['goals'].map((a, i)=>{ localStorage[`efy_pn_${a}`] = obj[i] }); location.reload()
    }; read.readAsText(file)});

    /*Reset Settings*/ $all(".pn_localstorage_reset").forEach(x =>{ x.onclick =()=>{ Object.entries(localStorage).forEach(([k])=>{ if (k.includes('efy_pn')){ localStorage.removeItem(k)}}); location.reload()}});
});

/*Search*/ $add('label', {class: 'pn_search', title: 'Search'}, [
    ['i', {efy_icon: 'search'}],
    ['input', {id: 'pn_search', type: 'text', placeholder: 'Search...', efy_search_input:''}]
], $('.pn_nav .pn_toggles.pn_right'), 'afterbegin');
$body.setAttribute('efy_search','[pn_planner] [efy_drag] > *:not(.efy_ignore_search)');

/*Submit*/ $event($('.pn_submit'), 'click', ()=>{
    let a = $('[efy_tabs=pn_form] [efy_tab][efy_active]').getAttribute('efy_tab'),
    tags = [];
    $all('#priority input[name=priority]:checked + label').forEach(a =>{
        tags.push(a.textContent);
    });
    if (tags.includes('Goal')) pn_form_goals();
    else {$notify(3, "Can't submit it", 'Try a different approach')}
});


// Drag & Drop

function efy_drag(list){
let currentElement = '', initialX = 0, initialY = 0, x, y, chld = '*:not(.efy_no_drag, [efy_drag] > * > *, [efy_drag] [efy_drag_cursor])';

const isTouchDevice =()=>{ try { event.touches[0].clientX; return true} catch (e){ return false}},

getPosition =(value)=>{ let elementIndex;

  $$all(list, chld).forEach((element, index)=>{
    let elementValue = element.getAttribute("data-value");
    if (value == elementValue){ elementIndex = index}
  });
  return elementIndex;
},

dragStart =(e)=>{
  /*Target from pointer*/ if (isTouchDevice()){ initialX = e.touches[0].clientX; initialY = e.touches[0].clientY} else {initialX = e.clientX; initialY = e.clientY};
  currentElement = e.target; try { e.dataTransfer.setDragImage($('[efy_drag_cursor]'), 0, 0)} catch {/*Fix this*/}
},

dragOver =(e)=>{ e.preventDefault();
  /*Target from pointer*/ if (isTouchDevice()){ x = e.touches[0].clientX; y = e.touches[0].clientY} else {x = e.clientX; y = e.clientY}; targetElement = document.elementFromPoint(x, y);
  /*Active Class*/ $$all(list, '*').forEach(a => {a.classList.remove('active')}); targetElement.classList.add("active");
},

drop =(e)=>{ e.preventDefault();
  /*Target from pointer*/ if (isTouchDevice()){ x = e.touches[0].clientX; y = e.touches[0].clientY} else {x = e.clientX; y = e.clientY}; targetElement = document.elementFromPoint(x, y);

  /*Active Class*/ $$all(list, '*').forEach(a => {a.classList.remove('active')}); targetElement.classList.add("active"); $wait(0.3, ()=>{ targetElement.classList.remove("active") });

  let currentValue = currentElement.getAttribute("data-value"), targetValue = targetElement.getAttribute("data-value");
  /*Get index of current & target*/ let [currentPosition, targetPosition] = [getPosition(currentValue), getPosition(targetValue)]; initialX = x; initialY = y;

  if (list.contains(targetElement) && (list != targetElement) && (targetElement != currentElement) && currentElement.hasAttribute('data-value') && targetElement.hasAttribute('data-value') && (list.getAttribute('efy_drag') == 'on')){ try {
    if (currentPosition < targetPosition){ targetElement.insertAdjacentElement("afterend", currentElement)}
    else {targetElement.insertAdjacentElement("beforebegin", currentElement)}
  } catch (err){} }
};

if ($('#pn_drag_toggle').checked){ $$all(list, chld).forEach((a)=>{ a.draggable = true;
    $event(a, 'dragstart', dragStart, false); $event(a, 'dragover', dragOver, false); $event(a, 'drop', drop, false);
    $event(a, 'touchstart', dragStart, {passive: false}); $event(a, 'touchmove', drop, {passive: false});
})}
else { $$all(list, chld).forEach((a)=>{ a.draggable = false;
    $event_rm(a, 'dragstart', dragStart); $event_rm(a, 'dragover', dragOver); $event_rm(a, 'drop', drop);
    $event_rm(a, 'touchstart', dragStart); $event_rm(a, 'touchmove', drop);
})}

};


/*Save, Edit & Drag*/ const atb_all =(a,b,c)=>{ a.forEach(d => d.setAttribute(b,c))},

$pn_save_edits =()=>{ let data = [];
    /*Goals*/ $all('[pn_planner] details').forEach(a =>{ let goals = {};
        if (a.getAttribute('pn_date')) goals.date = a.getAttribute('pn_date');
        if ($$(a, '.info [efy_timer]')) goals.time = $$(a, '.info [efy_timer]').getAttribute('efy_timer').split(',')[1];
        if ($$(a, '.info textarea')) goals.info = $$(a, '.info textarea').value;
        if (a.getAttribute('pn_done') == 'true') goals.done = true;
        if ($$(a, '.scores')){
            let scores = [];
            $$all(a, '.score .top').forEach((score, i)=>{
                score = $$all(a, `.score:nth-of-type(${i+1}) .top :is(.name, [type=number])`);
                scores[i] = `${score[0].textContent}, ${score[1].value}, ${score[2].value}`;
            });
            goals.scores = scores;
        }

        data.push({
            name: $$(a, '.title').textContent,
            tags: $$(a, '[pn_priority]').getAttribute('pn_priority'),
            ...goals
        });
    });
    localStorage[`efy_pn_data`] = JSON.stringify(data);
};

/*Drag*/ $event($('#pn_drag_toggle'), 'change', (a) => { let b = $all('[pn_planner] [efy_drag]');
    'goal note link tag'.split(' ').forEach(c => efy_drag($(`#pn_${c}s [efy_drag]`)) );
    if (a.target.checked){ atb_all(b, 'efy_drag', 'on'); $notify(2, 'Move - ON', 'You can order items now'); let x = $('#pn_edit_toggle'); x.checked = false; x.dispatchEvent(new Event('change', { 'bubbles': true })) }
    else { atb_all(b, 'efy_drag', ''); $pn_save_edits(); }
});

/*Edit*/ $event($('#pn_edit_toggle'), 'change', (a) => { let b = $all('[pn_planner] :is(.title, .url, .name)'), c = []; $all('#pn_links .url').forEach(a => c.push({url: a.textContent}));
    if (a.target.checked){ atb_all(b, 'contenteditable', 'true'); let x = $('#pn_drag_toggle'); x.checked = false; x.dispatchEvent(new Event('change', { 'bubbles': true }));
        $all('#pn_links a').forEach(a=>{ a.removeAttribute('href'); a.removeAttribute('target')});
        $all('[pn_planner] .info').forEach(a=>{ a.removeAttribute('readonly')})
        $all('#pn_links .pn_tags').forEach(x => x.classList.add('active'))
    }
    else { atb_all(b, 'contenteditable', 'false'); $pn_save_edits();
        $all('#pn_links a').forEach((a,i)=>{ a.href = c[i].url; a.target = '_blank' });
        $all('[pn_planner] .info').forEach(a=>{ a.setAttribute('readonly', '')})
        $all('#pn_links .pn_tags').forEach(x => x.classList.remove('active'))
    }
});

/*Done Goals*/ $all('#pn_goals details .done_btn').forEach(a =>{ $event(a, 'click', $pn_save_edits) });

/*Auto Resize*/ $ready('[pn_planner] .info .info', (a)=>{
    a.style.height = 0; a.style.height = (a.scrollHeight + 1) + 'rem';
    $event(a, 'input', ()=>{
        a.style.height = 0; a.style.height = (a.scrollHeight + 1) + 'rem'
    })
});

$all('[pn_planner] details').forEach(a =>{
    let b = $$(a, '.info .info'), c = $$(a, '.pn_fs');
    const fn =()=>{ b.style.height = 0; b.style.height = (b.scrollHeight + 1) + 'rem'};
    $event(a, 'toggle', fn); $event(c, 'click', fn)
});

/*Fullscreen Grids*/ $all('.pn_full').forEach(a=>{
    $event(a, 'click', ()=>{
        $all('[pn_planner] [efy_drag]').forEach(b=> b.classList.toggle('pn_full_on'))
})});

/* Hash Isolated Parts*/ ['goals', 'notes', 'links'].map(a=>{
    if (location.hash == `#${a}`){ $(`#pn_${a} .pn_full`).dispatchEvent(new Event('click', { 'bubbles': true }))}
})


$ready('button.pn_fs', (a)=>{
    $event(a, 'click', ()=>{
        if (efy.audio_status == 'on' ) $audio_play(efy_audio.wind);
})});


}, 1);