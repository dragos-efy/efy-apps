$ready('#efy_sbtheme', ()=>{

const select_unit = [
    ['input', {id: 'style_margin', type: 'number', value: 0, class: 'efy_card_filter_off'}],
    ['select', {value: 'rem'}, [
        ['option', {value: 'rem'}, 'rem'],
        ['option', {value: 'px'}, 'px'],
        ['option', {value: 'rem'}, 'em'],
        ['option', {value: '%'}, '%'],
        ['option', {value: 'vw'}, 'vw'],
        ['option', {value: 'vh'}, 'vh'],
    ]]
];

$add('div', {id: 'builder'}, [
    ['div', {id: 'bd_sidebar', class: 'efy_card_filter'}, [
        ['div', {id: 'nav'}, [
            ['button', {efy_sidebar_btn: '', class: 'efy_square_btn efy_color_trans'}, [['i', {efy_icon: 'menu'}]] ],
            ['button', {id: 'search', class: 'efy_square_btn efy_color_trans'}, [['i', {efy_icon: 'search'}]] ],
            ['button', {id: 'editToggle', class: 'efy_square_btn efy_color_trans'}, [['i', {efy_icon: 'edit'}]] ],
            ['button', {id: 'search', class: 'efy_square_btn efy_quick_fullscreen efy_color_trans'}, [['i', {efy_icon: 'fullscreen'}]] ]
        ]],
        ['div', {efy_tabs: 'components'}, [
            ['div', {class: 'efy_tabs efy_color_trans'}, [
                ['input', {efy_tab: 'blocks', id: 'components_blocks', name: 'components_menu', type: 'radio', efy_active: ''}],
                ['label', {for: 'components_blocks'}, [['i', {efy_icon: 'dots'}], ['p', 'Blocks']] ],
                ['input', {efy_tab: 'style', id: 'components_style', name: 'components_menu', type: 'radio'}],
                ['label', {for: 'components_style'}, [['i', {efy_icon: 'heart'}], ['p', 'Style']] ],
                ['input', {efy_tab: 'extra', id: 'components_extra', name: 'components_menu', type: 'radio'}],
                ['label', {for: 'components_extra'}, [['i', {efy_icon: 'group'}], ['p', 'Extra']] ],
            ]],
            ['div', {efy_content: 'blocks', efy_active: ''}, [
                ['button', {id: 'add_text'}, [['i', {efy_icon: 'menu'}], ['p', 'Text']] ],
                ['button', {id: 'add_button'}, [['i', {efy_icon: 'play'}], ['p', 'Button']] ],
                ['button', {id: 'add_clock'}, [['i', {efy_icon: 'globe'}], ['p', 'Clock']] ],
                ['button', {id: 'add_icon'}, [['i', {efy_icon: 'star'}], ['p', 'Icon']] ],
                ['button', {id: 'add_audio'}, [['i', {efy_icon: 'audio'}], ['p', 'Audio']] ],
                ['button', {id: 'add_color_picker'}, [['i', {efy_icon: 'rain'}], ['p', 'Color Picker']] ]
            ]],
            ['div', {efy_content: 'style'}, [
                ['label', {for: 'style_margin'}, 'Margin'],
                ['div', {class: 'bd_menu_flex'}, [
                    ...select_unit, ...select_unit, ...select_unit, ...select_unit
                ]],
                ['label', {for: 'style_margin'}, 'Padding'],
                ['div', {class: 'bd_menu_flex'}, [
                    ...select_unit, ...select_unit, ...select_unit, ...select_unit
                ]],
                ['label', {for: 'style_margin'}, 'Radius'],
                ['div', {class: 'bd_menu_flex'}, [
                    ...select_unit, ...select_unit, ...select_unit, ...select_unit
                ]]
            ]]
        ]]
    ]],
    ['div', {id: 'preview'}]
]);

var components = [], editMode = false;

const preview = $('#preview'), sidebar = $('#bd_sidebar'), add_clock = $('#add_clock'), add_button = $('#add_button'),
add_text = $('#add_text'), add_icon = $('#add_icon'), add_audio = $('#add_audio'), add_color_picker = $('#add_color_picker'),

add_block =(block)=>{ if (block){ block = $add(...block, preview);
    components.push(block);
    const delete_btn = $add('button', {class: 'delete-button'}, 'Delete', block);
    $event(delete_btn, 'click', ()=> remove_block(block.id));
    if (!editMode) delete_btn.style.display = 'none';
}},
remove_block =(id)=>{
  var index = components.findIndex(component => component.id === id);
    if (index !== -1) {
      components[index].remove();
      components.splice(index, 1);
    }
};

$event(sidebar, 'click', ()=>{ let block = false; const x = event.target;
    if (x === add_text){
        block = ['p', {class: 'text'}, 'test'];
    }
    else if (x === add_button){
        block = ['button', {}, 'Button'];
    }
    else if (x === add_clock){
        block = ['div', {efy_clock: ''}, []];
    }
    else if (x === add_icon){
        block = ['i', {efy_icon: 'star'}, []]
    }
    else if (x === add_audio){
        block = ['audio', {controls: ''}, []]
    }
    else if (x === add_color_picker){
        block = ['div', {efy_color: 'Demo 0.7 0.2 100 1'}, []]
    }
    add_block(block);
});

components.forEach((component, index) => {
    const deleteButton = $add('button', {class: 'delete-button'}, 'Delete', component);
    $event(deleteButton, 'click', ()=> remove_block(component.id));
});

$('#editToggle').addEventListener('click', function(){ editMode = !editMode;
 components.forEach((component, index) => {
 var deleteButton = component.querySelector('.delete-button');
 if (editMode) {deleteButton.style.display = 'block'} else {deleteButton.style.display = 'none'}
 });
});


});