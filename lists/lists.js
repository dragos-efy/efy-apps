/*Storage*/ let  efy_pn = {currency: '$', view: 'cards'}, $pn_save =()=>{};
try {
    if (localStorage.efy_pn){ efy_pn = JSON.parse(localStorage.efy_pn)}
    $pn_save =()=>{ localStorage.efy_pn = JSON.stringify(efy_pn)}
} catch {}

/*default data*/ let item_id = 0,
pn_defaults = [
    {name: 'Goal 1', date: '25/04/2023', time: 30, group: 'Goals', priority: 'high'},
    {name: 'Goal 2', date: '25/04/2023', time: 0,
        info: 'The sub-goals bellow help you track individual progress for each part of the main goal',
        scores: [['Part 1', 6, 9], ['Part 2', 1, 3]], group: 'Goals', priority: 'medium'
    },
    {name: 'Goal 3', date: '25/04/2023', time: 150, group: 'Goals', priority: 'low'},
    {name: 'Goal 4', date: '29/06/2023', time: 5, info: 'description', group: 'Goals'},
    {name: 'Goal 5', date: '25/04/2023', time: 600, done: true, group: 'Goals'},
    {name: 'Note 1', info: '1', date: '25/04/2023', group: 'Notes', priority: 'medium'},
    {name: 'Note 2', info: '2', date: '27/06/2023', group: 'Notes'},
    {name: 'Food', quantity: 2, price: 123, date: '24/12/2023', group: 'Money'},
    {name: 'Ben', email: 'contact@efy.ooo', phone: '+01234567890', birthday: '01/01/2000', info: 'He likes flowers', group: 'Contacts'},
    {name: 'Personal', group: 'Tags'},
    {name: 'Work', group: 'Tags'}
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
    currency(value){
        value = (String(value).replace(/\D/g, '') / 100).toLocaleString('en-GB', {style: 'currency', currency: 'eur'});
        const signal = Number(value) < 0 ? '-' : ''; return signal + value;
    }
};

goal = {
    all: JSON.parse(localStorage[`efy_pn_data`] || []),
    add(item){ goal.all.push(item); App_goals.reload()},
    duplicate(index){
        const item = goal.all[index], copy = {...item, name: `${item.name} - copy`};
        goal.all.push(copy); App_goals.reload();
    },
    remove(index){ goal.all.splice(index, 1); App_goals.reload()}
},

pn_form_goals =()=>{
    let x = '.pn_goals_form #', y = '.pn_goals_form .',
    a = $(x+'text'), b = $(x+'priority input:checked').id.replace('priority_', ''), c = $(x+'date'),
    d1 = $(y+'hour'), d2 = $(y+'minute'), d3 = $(y+'second'), e = $(x+'group input:checked'),
    aa = a.value, cc = format.date(c.value), ee = e.id.replace('group_', ''),
    dd = String(Math.floor((Number(d1.value) * 3600) + (Number(d2.value) * 60) + Number(d3.value))),
    time = (dd > 0) ? {time: dd} : null, info = $('#info'), info2 = null,
    price = $('#price'), price2 = null,
    quantity = $('#quantity'), quantity2 = null,
    email = $('#email'), email2 = null,
    phone = $('#phone'), phone2 = null,
    birthday = $('#birthday'), birthday2 = null,
    links = [], links2 = null,
    scores = [], scores2 = null;
    try {
        if (aa.trim() === '' || cc.trim() === '' || cc.trim() === 'undefined/undefined/' || dd.trim() == ''){
            $notify('short', 'Missed Required Fields', 'Fill in the rest')
        } else {
            if (info.value.trim() !== '') info2 = {info: info.value};
            if (price.value.trim() !== '') price2 = {price: price.value};
            if (quantity.value.trim() !== '') quantity2 = {quantity: quantity.value};
            if (email.value.trim() !== '') email2 = {email: email.value};
            if (phone.value.trim() !== '') phone2 = {phone: phone.value};
            if (birthday.value.trim() !== '') birthday2 = {birthday: birthday.value};
            if ($('.lt_form_scores').children.length > 0){
                const [name, min, max] = [$all('[name="form_add_scores_name"]'), $all('[name="form_add_scores_min"]'), $all('[name="form_add_scores_max"]')];
                for (let i = 0; i < $('.lt_form_scores').children.length; i++){
                    scores.push([name[i].value, min[i].value, max[i].value]);
                }
                scores2 = {scores: scores};
            }
            if ($('.lt_form_links').children.length > 0){
                const [name, url] = [$all('[name="form_add_links_name"]'), $all('[name="form_add_links_url"]')];
                for (let i = 0; i < $('.lt_form_links').children.length; i++){
                    links.push([name[i].value, url[i].value]);
                }
                links2 = {links: links};
            }
            /*Add*/ goal.add({
                name: aa, priority: b, /*...priority_full,*/ date: cc, ...time, group: ee, ...info2, ...price2, ...quantity2,
                ...email2, ...phone2, ...birthday2, ...links2, ...scores2
            });
            /*Reset*/ a.value = ''; info.value = ''; d3.value = '';
            $(x+'priority #priority_none').checked = 'true';
            pn_modal.toggle()
        }
    } catch (error){ console.log(error.message)}
};

const today = new Date(),
date_today = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

//////////////////////////////////

$body.setAttribute('id', 'pn_body');

$add('div', {class: 'pn_nav'}, [
    ['div', {style: 'display: flex; gap: var(---gap-x)'}, [
        ['button', {class: 'button new efy_square_btn', onClick: 'pn_modal.toggle()', title: 'Add'}, [
            ['i', {efy_icon: 'plus'}]
        ]],
        ['div', {efy_select: 'margin0', class: 'pn_toggles'}, [
            ['input', {type: 'checkbox', id: 'pn_edit_toggle'}],
            ['label', {for: 'pn_edit_toggle', title: 'Edit'}, [['i', {efy_icon: 'edit'}], ['p', {efy_lang: 'edit'}]]],
            ['input', {type: 'checkbox', id: 'pn_drag_toggle'}],
            ['label', {for: 'pn_drag_toggle', title: 'Move'}, [['i', {efy_icon: 'move'}], ['p', {efy_lang: 'move'}]]],
            ['input', {type: 'checkbox', id: 'lt_views_toggle', name: 'lt_views_toggle', efy_toggle: '.lt_views'}],
            ['label', {for: 'lt_views_toggle', title: 'Views'}, [['i', {efy_icon: 'dots'}], ['p', {efy_lang: 'views'}]]]
        ]]
    ]],
    ['div', {class: 'pn_toggles pn_right'}, [
        ['button', {efy_sidebar_btn: '', class: 'efy_square_btn', title: 'Menu'}, [['i', {efy_icon: 'menu'}]]]
    ]]
]);

$add('div', {class: 'lt_move_info efy_hide_i'}, [
    ['i', {efy_icon: 'help'}],
    ['p', 'Select the item you wanna move, then where to move it']
]);

let views_dom_inputs = []; [['cards', 'menu'], ['masonry', 'group'], ['table', 'dots'], ['nodes', 'group'], ['calendar', 'dots']].map(x =>{
    const [name, icon] = x, id = `lt_views_${name}`, checked = name === efy_pn.view ? {checked: true} : null;
    views_dom_inputs.push(
        ['input', {type: 'radio', id: id, name: 'lt_views', ...checked}],
        ['label', {for: id, title: name}, [['i', {efy_icon: icon}], ['p', {efy_lang: name}]]]
    );
})
$add('div', {class: 'lt_views efy_hide_i', efy_select: ''}, views_dom_inputs);

$add('div', {class: 'modal-overlay'}, [
    ['div', {class: 'modal', efy_card: ''}, [
        ['div', {efy_tabs: 'pn_form'}, [
            ['div', {class: 'input-group actions'}, [
                ['div', {class: 'pn_tabs'}, [
                    ['button', {efy_tab: 'goals', efy_active: '', efy_lang: 'goal_note'}],
     ['button', {efy_tab: 'money', efy_lang: 'money'}]
                ]],
     ['div', {class: 'buttons'}, [
         ['button', {class: 'pn_submit efy_square_btn', title: 'Save'}, [
             ['i', {efy_icon: 'check'}]
         ]],
     ['button', {onClick: 'pn_modal.toggle()', onSubmit: 'preventDefault()', href: '#', class: 'cancel efy_square_btn', title: 'Close'}, [
         ['i', {efy_icon: 'remove'}]
     ]]
     ]]
            ]]
        ]],
     ['div', {class: 'efy_trans_filter_off'}, [
         ['div', {efy_content: 'goals', efy_active: '', class: 'form pn_goals_form efy_shadow_trans_off efy_trans_filter_off'}, [
             ['form', {action: '#'}, [
                 ['div', {class: 'modal_grid'}, [
                     ['div', {class: 'grid'}, [
                         ['div', {class: 'input-group'}, [
                             ['label', {for: 'text', efy_lang: 'name', class: 'efy_trans_filter'}],
     ['input', {type: 'text', id: 'text', name: 'text'}]
                         ]],
     ['div', {class: 'input-group'}, [
        ['label', {for: 'date', efy_lang: 'date', class: 'efy_trans_filter'}],
        ['input', {type: 'date', id: 'date', name: 'date', value: date_today}]
     ]],
     ['div', {class: 'input-group time'}, [
         ['label', {efy_lang: 'timer', class: 'efy_trans_filter'}],
     ['input', {type: 'number', value: '00', step: 'any', min: '0', max: '24', class: 'hour', id: 'add_hour'}],
     ['label', ':'],
     ['input', {type: 'number', value: '00', step: 'any', min: '0', max: '60', class: 'minute', id: 'add_minute'}],
     ['label', ':'],
     ['input', {type: 'number', value: '00', step: 'any', min: '0', max: '60', class: 'second', id: 'add_second'}]
     ]],
     ['div', {class: 'input-group'}, [
         ['details', {efy_select: '', id: 'priority', name: 'priority'}, [
             ['summary', {efy_lang: 'priority'}],
             ['div', [
                ['input', {id: 'priority_none', name: 'add_priority', type: 'radio', checked: ''}],
                ['label', {for: 'priority_none', efy_lang: 'normal'}],
                ['input', {id: 'priority_low', name: 'add_priority', type: 'radio'}],
                ['label', {for: 'priority_low', efy_lang: 'low'}],
                ['input', {id: 'priority_medium', name: 'add_priority', type: 'radio'}],
                ['label', {for: 'priority_medium', efy_lang: 'medium'}],
                ['input', {id: 'priority_high', name: 'add_priority', type: 'radio'}],
                ['label', {for: 'priority_high', efy_lang: 'high'}]
             ]]
         ]]
     ]],
     ['div', {class: 'input-group'}, [
         ['details', {efy_select: '', id: 'group', name: 'group'}, [
             ['summary', {efy_lang: 'group'}],
             ['div', [
                ['input', {id: 'group_Goals', name: 'add_group', type: 'radio', checked: ''}],
                ['label', {for: 'group_Goals', efy_lang: 'goals'}],
                ['input', {id: 'group_Notes', name: 'add_group', type: 'radio'}],
                ['label', {for: 'group_Notes', efy_lang: 'notes'}],
                ['input', {id: 'group_Money', name: 'add_group', type: 'radio'}],
                ['label', {for: 'group_Money', efy_lang: 'money'}],
                ['input', {id: 'group_Contacts', name: 'add_group', type: 'radio'}],
                ['label', {for: 'group_Contacts', efy_lang: 'contacts'}],
                ['input', {id: 'group_Tags', name: 'add_group', type: 'radio'}],
                ['label', {for: 'group_Tags', efy_lang: 'tags'}]
             ]]
         ]]
     ]],
     ['div', {class: 'input-group'}, [
        ['label', {for: 'price', efy_lang: 'price', class: 'efy_trans_filter'}],
        ['input', {type: 'text', id: 'price', name: 'price'}]
     ]],
     ['div', {class: 'input-group'}, [
        ['label', {for: 'quantity', efy_lang: 'quantity', class: 'efy_trans_filter'}],
        ['input', {type: 'text', id: 'quantity', name: 'quantity'}]
     ]],
     ['div', {class: 'input-group'}, [
        ['label', {for: 'email', efy_lang: 'email', class: 'efy_trans_filter'}],
        ['input', {type: 'text', id: 'email', name: 'email', autocomplete: 'off'}]
     ]],
     ['div', {class: 'input-group'}, [
        ['label', {for: 'phone', efy_lang: 'phone', class: 'efy_trans_filter'}],
        ['input', {type: 'text', id: 'phone', name: 'phone', autocomplete: 'off'}]
     ]],
     ['div', {class: 'input-group'}, [
        ['label', {for: 'birthday', efy_lang: 'birthday', class: 'efy_trans_filter'}],
        ['input', {type: 'text', id: 'birthday', name: 'birthday'}]
     ]],
     ['div', {class: 'input-group efy_flex'}, [
        ['button', {efy_lang: 'scores', id: 'lt_add_scores', type: 'button', class: 'efy_trans_filter', style: 'margin: 0'}],
        ['button', {efy_lang: 'links', id: 'lt_add_links', type: 'button', class: 'efy_trans_filter', style: 'margin: 0'}]
     ]],
     ]],
     ['div', {class: 'lt_form_scores efy_trans_filter_off_all'}],
     ['div', {class: 'lt_form_links efy_trans_filter_off_all'}],
     ['textarea', {id: 'info', name: 'info', placeholder: 'Info'}]
                 ]]
             ]]
         ]]
     ]]
    ]]
]);

$add('div', {class: 'calendar efy_trans_filter efy_shadow_trans efy-glass'});

let pn_sections = [];

const add_group_fn =(name) =>{ const id = 'pn_' + name;
    pn_sections.push(['div', {id: id, class: 'lt_group'}, [
        ['div', {class: 'header'}, [
            ['h5', {class: 'title'}, name],
            ['mark', {class: 'efy_trans_filter efy_shadow_trans'}, '0'],
            ['mark', {
                class: 'efy_trans_filter pn_full efy_shadow_trans',
                efy_toggle: `[pn_planner] > div:not(#${id})`, title: 'Full Size'
            }, [['i', {efy_icon: 'fullscreen'}]]]
        ]],
        ['div', {class: 'lt_cards'}]
    ]]);
};

[...new Set(goal.all.map(item => item.group))].map(name => add_group_fn(name));

$add('div', {pn_planner: ''}, pn_sections);
$add('video', {id: 'pn_confetti', src: './assets/confetti.webm'});


const App_goals ={
    start(){
        goal.all.forEach((goal, index)=>{

            item_id++;

            let done_btn = null, timer_buttons = [null, null];

            const where = (goal.group) ? `#pn_${goal.group}` : '#pn_no_group',
            priority = goal.priority || 'none',
            pn_group = (goal.group) ? goal.group : 'Goals';

            if ($(where) == null){ add_group_fn(goal.group); $add(...pn_sections[pn_sections.length - 1], $('[pn_planner]')) };

            let now = 'pn_goal_' + item_id,
            date = null, date0 = '', date_div = null, month = '', pn_date = null,
            info_div = null, timer_div = null, time_div = null, scores_div = null,
            email_div = null, phone_div = null, birthday_div = null, price_div = null,
            quantity_div = null, total_price_div = null, links_div = null,
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
                timer_div = ['div', {efy_timer: `${now},${goal.time},reverse`, class: 'efy_trans_filter_off'}];
                time_div = ['div', {class: 'time'}, $sec_time(goal.time)];
            }
            if (goal.scores){ let scores = [];
                goal.scores.map((score, i)=>{
                    scores[i] = ['div', {class: 'score'}, [
                        ['div', {class: 'top'}, [
                            ['p', {class: 'name'}, score[0]],
                            ['div', {class: 'buttons'}, [
                                ['div', {class: 'numbers efy_trans_filter_off_all'}, [
                                    ['input', {type: 'number', class: 'min', value: score[1]}],
                                    ['p', '/'],
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
                ['p', 'Email'], ['a', {href: `mailto:${goal.email}`, class: 'email_value'}, goal.email]
            ]]};
            if (goal.phone){ phone_div = ['p', {class: 'phone efy_trans_filter_off efy_shadow_trans_off'}, [
                ['p', 'Phone'], ['a', {href: `tel:${goal.phone}`, class: 'phone_value'}, goal.phone]
            ]]};
            if (goal.birthday){ birthday_div = ['p', {class: 'birthday efy_trans_filter_off efy_shadow_trans_off'}, [
                ['p', 'Birthday'], ['p', {class: 'birthday_value'}, goal.birthday]
            ]]};

            if (goal.links){
                let children = []; goal.links.map(x =>{
                    children.push(['div', {class: 'link'}, [
                        ['a', {href: x[1], target: '_blank'}],
                        ['i', {efy_icon: 'globe'}],
                        ['input', {type: 'text', placeholder: 'Name', value: x[0]}],
                        ['button', {class: 'remove efy_square_btn', type: 'button', title: 'Remove'}, [['i', {efy_icon: 'remove'}]]],
                        ['input', {type: 'text', placeholder: 'URL', value: x[1]}]
                    ]]);
                });
                links_div = ['div', {class: 'links efy_trans_filter_off_all efy_shadow_trans_off'}, children];
            };

            if (goal.price){ price_div = ['p', {class: 'price efy_trans_filter_off efy_shadow_trans_off'}, [
                ['p', 'Price'],
                ['input', {
                    type: 'number', step: '0.01', min: '-999999999', max: '999999999',
                    class: 'price_value', value: goal.price
                }]
            ]]};
            if (goal.quantity){ quantity_div = ['p', {class: 'quantity efy_trans_filter_off efy_shadow_trans_off'}, [
                ['p', 'Quantity'],
                ['input', {
                    type: 'number', step: '0.01', min: '0', max: '999999999',
                    class: 'quantity_value', value: goal.quantity
                }]
            ]]}
            if (goal.quantity > 1){ total_price_div = ['p', {class: 'total_price efy_trans_filter_off efy_shadow_trans_off'}, [
                ['p', 'Total Price'],
                ['input', {
                    type: 'number', step: '0.01', min: '-999999999', max: '999999999',
                    class: 'total_price_value', value: goal.quantity * goal.price
                }]
            ]]}

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
            duplicate_fn = {onClick: `goal.duplicate(${index});`},
            remove_fn = {onClick: `goal.remove(${index}); $('html').classList.remove('pn_fs');`};


            if (goal.group === 'Goals'){ done_btn =
                ['button', {class: 'done_btn efy_square_btn', efy_audio_mute: 'ok', ...done_fn}, [
                    ['i', {efy_icon: 'check'}]
                ]];
            }

            if (goal.time){ timer_buttons = [
                ['button', {efy_start: '', title: 'Start or Pause', class: 'pseudo efy_square_btn', ...start_pause}],
                ['button', {efy_reset: '', title: 'Reset', class: 'pseudo efy_square_btn', ...reset}]
            ]}

            const priorities = []; ['None', 'Low', 'Medium', 'High', 'Full'].forEach(item => {
                const name = item.toLowerCase(), id = `priority_${name}_${now}`,
                check = (priority === name) ? {checked: 'true'} : null, full = (item === 'Full'), full_name = full ? '_full' : '';
                priorities.push(
                    ['input', {type: full ? 'checkbox' : 'radio', name: `priority_${now}${full_name}`, id: id, ...check}],
                    ['label', {for: id, title: item}, [['i', {efy_icon: 'check'}]]]
                );
            });

            $add('div', {efy_searchable: '', class: 'card efy_trans_filter efy-glass', 'data-value': index, id: now, ...pn_date, pn_done: goal.done, lt_group: pn_group}, [
                ['label', {class: 'summary', for: `lt_toggle_${now}`}, [
                    ['input', {type: 'checkbox', id: `lt_toggle_${now}`, name: 'lt_cards'}],
                    ['button', {pn_priority: '', efy_toggle: `#${now} .priority_picker`}],
                    ['div', {class: 'title'}, goal.name],
                    time_div
                ]],
                ['div', {class: 'content'}, [
                    ['div', {class: 'info'}, [
                        ['div', {class: 'priority_picker efy_hide_i', efy_select: ''}, [...priorities]],
                        scores_div, timer_div, price_div, quantity_div, total_price_div, email_div, phone_div, birthday_div, links_div, info_div
                    ]],
                    ['div', {class: 'pn_tags'}, [
                        date_div, timer_buttons[0], timer_buttons[1], done_btn,
                        ['button', {class: 'duplicate efy_square_btn', ...duplicate_fn}, [['i', {efy_icon: 'copy'}]]],
                        ['button', {class: 'pn_fs efy_square_btn', efy_audio_mute: 'ok'}, [['i', {efy_icon: 'fullscreen'}]]],
                        ['button', {class: 'remove efy_square_btn', ...remove_fn}, [['i', {efy_icon: 'remove'}]]]
                    ]]
                ]]
            ], $(`${where} .lt_cards`));
        });
        localStorage[`efy_pn_data`] = JSON.stringify(goal.all);
        /*Count Items*/ [...new Set(goal.all.map(item => item.group))].map(where=>{
            $(`#pn_${where} .header mark`).textContent = $all(`#pn_${where} .lt_cards > *`).length
        });
    },
    reload(){
        $all('[pn_planner] > .lt_group .lt_cards').forEach(x =>{
            x.innerHTML = '';
            if (!$$(x, '.card')) x.closest('.lt_group').remove();
        });
        App_goals.start();
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

$add('details', {id: 'pn_settings'}, [
    ['summary', [
        ['i', {efy_icon: 'check'}],
        ['p', 'Lists'],
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
        $$all(tag, '[type=range]').forEach(val =>{ values.push(val.value)});
        content.push(`${values[2]} ${values[1]} ${values[0]} ${values[3]}`);
    });
    $all('#pn_theme [efy_tab] + label').forEach((tag, i) =>{
        final.push(`${tag.textContent} ${content[i]}`);
    });
    efy_pn.tag_colors = String(final);
    $pn_save(); set_tag_colors(efy_pn.tag_colors);
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
$body.setAttribute('efy_search','[pn_planner] .lt_cards > *:not(.efy_ignore_search)');

/*Submit*/ $event($('.pn_submit'), 'click', pn_form_goals);


/*Save, Edit & Drag*/ const atb_all =(a,b,c)=>{ a.forEach(d => d.setAttribute(b,c))},

$pn_save_edits =()=>{ let data = [];
    /*TODO: update only modified items efficiently in the future*/
    $all('[pn_planner] .card').forEach(a =>{ let item = {};
        if (a.getAttribute('pn_date')) item.date = a.getAttribute('pn_date');
        if ($$(a, '.info [efy_timer]')) item.time = $$(a, '.info [efy_timer]').getAttribute('efy_timer').split(',')[1];
        if ($$(a, '.info textarea')) item.info = $$(a, '.info textarea').value;
        if (a.getAttribute('pn_done') == 'true') item.done = true;
        if ($$(a, '.scores')){
            let scores = [];
            $$all(a, '.score .top').forEach((score, i)=>{
                score = $$all(a, `.score:nth-of-type(${i+1}) .top :is(.name, [type=number])`);
                scores[i] = [score[0].textContent, score[1].value, score[2].value];
            });
            item.scores = scores;
        }
        if ($$(a, '.email_value')) item.email = $$(a, '.email_value').textContent;
        if ($$(a, '.phone_value')) item.phone = $$(a, '.phone_value').textContent;
        if ($$(a, '.birthday_value')) item.birthday = $$(a, '.birthday_value').textContent;
        if ($$(a, '.price_value')) item.price = $$(a, '.price_value').value;
        if ($$(a, '.quantity_value')) item.quantity = $$(a, '.quantity_value').value;

        document.getElementsByName(`priority_${a.id}`).forEach(x =>{
            if (x.checked) item.priority = x.id.split('_')[1];
        })
        if (a.getAttribute('lt_group')) item.group = $$(a.closest('.lt_group'), '.header .title').textContent;

        data.push({name: $$(a, '.title').textContent, ...item});
    });
    localStorage[`efy_pn_data`] = JSON.stringify(data);
};

/*Drag*/ $event($('#pn_drag_toggle'), 'change', (a) => { let b = $all('[pn_planner] .lt_cards');
    $('[pn_planner]').classList.toggle('lt_move'); $('.lt_move_info').classList.toggle('efy_hide_i');
    if (a.target.checked){
        let x = $('#pn_edit_toggle'); x.checked = false; x.dispatchEvent(new Event('change', { 'bubbles': true }))
    }
});

/*Edit*/ $event($('#pn_edit_toggle'), 'change', (a) => {
    let b = $all('[pn_planner] :is(.title, .url, .name, .email_value, .phone_value, .birthday_value, .price_value, .quantity_value)'), c = [];
    // $all('#pn_links .url').forEach(a => c.push({url: a.textContent}));
    if (a.target.checked){
        atb_all(b, 'contenteditable', 'true'); let x = $('#pn_drag_toggle'); x.checked = false; x.dispatchEvent(new Event('change', { 'bubbles': true }));
        $all('[pn_planner] .info').forEach(a=>{ a.removeAttribute('readonly')})
        // $all('#pn_links a').forEach(a=>{ a.removeAttribute('href'); a.removeAttribute('target')});
        // $all('#pn_links .pn_tags').forEach(x => x.classList.add('active'))
    }
    else {
        atb_all(b, 'contenteditable', 'false'); $pn_save_edits();
        $all('[pn_planner] .info').forEach(a=>{ a.setAttribute('readonly', '')})
        // $all('#pn_links a').forEach((a,i)=>{ a.href = c[i].url; a.target = '_blank' });
        // $all('#pn_links .pn_tags').forEach(x => x.classList.remove('active'))
    }
});

/* Hash Isolated Parts*/ ['goals', 'notes', 'links'].map(a=>{
    if (location.hash == `#${a}`){ $(`#pn_${a} .pn_full`).dispatchEvent(new Event('click', { 'bubbles': true }))}
})

$event($('body'), 'click', ()=>{
    const x = event.target, parent = x.closest('.card');
    if (x.matches('[pn_planner] .card .pn_fs')){
        parent.classList.toggle('pn_fs'); parent.classList.toggle('efy_sidebar_width');
        $('html').classList.toggle('pn_fs'); window.scrollTo(0,0);
        if (efy.audio_status == 'on' ) $audio_play(efy_audio.wind);
        const info = $$(parent, '.info .info');
        if (info){ info.style.height = 0; info.style.height = (info.scrollHeight + 1) + 'rem'}
    }
    if (x.matches('[pn_planner] .card .done_btn')) $pn_save_edits;
    if (x.matches('[pn_planner] .pn_full')){ $all('[pn_planner] .lt_cards').forEach(b=> b.classList.toggle('pn_full_on'))}
    if (x.matches('#lt_add_links')){
        const container = $('.lt_form_links'), id = container.children.length;
        $add('div', {class: 'card'}, [
            ['input', {id: `link_name_${id}`, type: 'text', placeholder: 'Name', name: 'form_add_links_name'}],
            ['button', {class: 'remove efy_square_btn', type: 'button', title: 'Remove'}, [['i', {efy_icon: 'remove'}]]],
            ['input', {id: `link_url_${id}`, type: 'text', placeholder: 'URL', name: 'form_add_links_url'}],
        ], container);
    }
    if (x.matches('#lt_add_scores')){
        const container = $('.lt_form_scores'), id = container.children.length;
        $add('div', {class: 'card'}, [
            ['input', {id: `score_name_${id}`, type: 'text', placeholder: 'Name', name: 'form_add_scores_name'}],
             ['button', {class: 'remove efy_square_btn', type: 'button', title: 'Remove'}, [['i', {efy_icon: 'remove'}]]],
             ['input', {id: `score_min_${id}`, type: 'number', placeholder: 'Min', name: 'form_add_scores_min'}],
             ['input', {id: `score_max_${id}`, type: 'number', placeholder: 'Max', name: 'form_add_scores_max'}],
        ], container);
    }
    if (x.matches('.lt_form_links .remove')){ x.closest('.card').remove()}
    if (x.matches('.lt_form_scores .remove')){ x.closest('.card').remove()}
});

$event($('body'), 'input', ()=>{
    const x = event.target, parent = x.closest('.card');
    if (x.matches('[pn_planner] .quantity_value') || x.matches('.price_value') && $$(parent, '.quantity_value').value > 1){
        $$(parent, '.total_price_value').value =  $$(parent, '.price_value').value * $$(parent, '.quantity_value').value;
    }
    if (x.matches('[pn_planner] .priority_picker input')){ $pn_save_edits(); $$(parent, '.priority_picker').classList.add('efy_hide_i')}

    if (x.matches('[pn_planner] .card .info .info')){
        x.style.height = 0; x.style.height = (x.scrollHeight + 1) + 'rem';
    }
    else if (x.matches('[pn_planner] .card [name=lt_cards]')){
        const info = $$(parent, '.info .info');
        if (info){ info.style.height = 0; info.style.height = (info.scrollHeight + 1) + 'rem'}
    }

    if (x.matches('.lt_views [name=lt_views]')){ efy_pn.view = x.id.replace('lt_views_', ''); $pn_save()}

    if (x.matches('[pn_planner].lt_move .move_selected [name=lt_cards]')){ parent.classList.remove('move_selected')}
    else if (x.matches('[pn_planner].lt_move:not(:has(.move_selected)) [name=lt_cards]')){ parent.classList.add('move_selected')}
    else if (x.matches('[pn_planner].lt_move:has(.move_selected) .card:not(.move_selected) [name=lt_cards]')){
        $pn_save_edits();
        const selected = $('[pn_planner].lt_move .move_selected'), group = selected.closest('.lt_group').id.replace('pn_', ''),
        index = Number(selected.getAttribute('data-value')), target = Number(parent.getAttribute('data-value')),
        items = goal.all, [item] = items.splice(index, 1);
        item.group = $$(parent.closest('.lt_group'), '.title').textContent;
        localStorage.efy_pn_data = items.splice(target, 0, item);
        App_goals.reload(); $all(`#pn_${group} [name=lt_cards]`)[target].focus();
    }
});

}, 1);