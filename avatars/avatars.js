/*Storage*/ let efy_sp = {}, $sp_save =()=>{};
try {
    if (localStorage.efy_sp){ efy_sp = JSON.parse(localStorage.efy_sp)}
    $sp_save =()=>{ localStorage.efy_sp = JSON.stringify(efy_sp)}
} catch {}


$ready('#efy_sbtheme', ()=>{

let human_colors = (efy_sp.human_colors) ? String(efy_sp.human_colors) :
/*neutral*/ 'skin 0.6 0 0 1,hair 0.31 0.1 79 1,eye 1 0 68 0,eye2 0 0 0 1,mouth 0.51 0.16 56 1,shirt 0.58 0.15 41 1,underwear 0.42 0.19 192 1,skirt 0.7 0.3 180 0,pants 0.42 0.19 192 1,shoe 0.2 0.17 53 1,glasses 0.63 0.26 29 1';
// 'skin 0.81 0.09 66 1,hair 0.31 0.1 79 1,eye 1 0 68 0,eye2 0 0 0 1,mouth 0.51 0.16 56 1,shirt 0.58 0.15 41 1,underwear 0.42 0.19 192 1,skirt 0.7 0.3 180 0,pants 0.42 0.19 192 1,shoe 0.2 0.17 53 1,glasses 0.63 0.26 29 1';

const set_human_colors =(colors = human_colors)=>{
    colors.replaceAll(', ', ',').split(',').map((a, i)=>{ a = a.split(' ');
        let tag = [a[0], `${a[1]} ${a[2]} ${a[3]}`, a[4]];
        $root.style.setProperty(`---${tag[0]}_bg`, `${tag[1]} / ${tag[2]}`);
        $root.style.setProperty(`---${tag[0]}_bg_alpha`, `${tag[1]} / ${(tag[2] / 3).toFixed(2)}`);
    });
}; set_human_colors();

const rotate_attrs = {type: 'range', min: '-360', max: '360', value: '0', step: '1'},
pos_attrs = {type: 'range', min: '-1000', max: '1000', value: '0', step: '1'};

const controls_container = $add('div', {avatars_app: ''}, [
  ['div', {id: 'bd_sidebar', class: 'efy_card_filter efy-glass'}, [
    ['div', {class: 'nav'}, [
      ['button', {efy_sidebar_btn: '', class: 'efy_square_btn efy_color_trans'}, [['i', {efy_icon: 'menu'}]] ],
      ['button', {id: 'search', class: 'efy_square_btn efy_color_trans'}, [['i', {efy_icon: 'search'}]] ],
      ['button', {id: 'search', class: 'efy_square_btn efy_quick_fullscreen efy_color_trans'}, [['i', {efy_icon: 'fullscreen'}]] ]
    ]],
    ['div', {efy_tabs: 'avatars_sidebar'}, [
      ['div', {class: 'efy_tabs efy_color_trans'}, [
          ['input', {efy_tab: 'avatars', type: 'radio', id: 'avatars_sidebar_avatars', name: 'avatars_sidebar', efy_active: ''}],
          ['label', {for: 'avatars_sidebar_avatars'}, [['i', {efy_icon: 'user'}], ['p', 'Avatars']]],
          ['input', {efy_tab: 'avatar', type: 'radio', id: 'avatars_sidebar_avatar', class: 'efy_hide_i', name: 'avatars_sidebar'}],
          ['label', {for: 'avatars_sidebar_avatar'}, [['i', {efy_icon: 'user'}], ['p', 'Avatar']]],
          ['input', {efy_tab: 'poses', type: 'radio', id: 'avatars_sidebar_poses', name: 'avatars_sidebar'}],
          ['label', {for: 'avatars_sidebar_poses'}, [['i', {efy_icon: 'dots'}], ['p', 'Poses']]],
          ['input', {efy_tab: 'pose', type: 'radio', id: 'avatars_sidebar_pose', class: 'efy_hide_i', name: 'avatars_sidebar'}],
          ['label', {for: 'avatars_sidebar_pose'}, [['i', {efy_icon: 'triangle'}], ['p', 'Pose']]],
          ['input', {efy_tab: 'backup', type: 'radio', id: 'avatars_sidebar_backup', name: 'avatars_sidebar'}],
          ['label', {for: 'avatars_sidebar_backup'}, [['i', {efy_icon: 'arrow_down'}], ['p', 'Backup']]]
      ]],
      ['div', {efy_content: 'avatars', efy_select: '', efy_active: ''}, [
        ['div', {class: 'avatars'}, [
          ['div', {class: 'avatar'}, [
            ['div', {class: 'image'}, [['i', {efy_icon: 'plus'}]]],
            ['p', {class: 'name'}, 'Add New']
          ]],
          ['div', {class: 'avatar'}, [
            ['div', {class: 'image human_preview'}],
            ['p', {class: 'name'}, 'Avatar Name']
          ]],
          ['div', {class: 'avatar'}, [
            ['div', {class: 'image'}],
            ['p', {class: 'name'}, 'Avatar Name']
          ]],
          ['div', {class: 'avatar'}, [
            ['div', {class: 'image'}],
            ['p', {class: 'name'}, 'Avatar Name']
          ]]
        ]]
      ]],
      ['div', {efy_content: 'avatar', id: 'pn_theme', efy_select: ''}, [
        ['div', {class: 'nav'}, [
          ['div', {class: 'start'}, [
            ['button', {class: 'back efy_square_btn efy_color_trans'}, [['i', {efy_icon: 'chevron_left'}]] ],
            ['input', {type: 'text', id: 'avatar_name_input', class: 'title', value: 'Avatar Name'}]
          ]],
          ['button', {id: 'search', class: 'efy_square_btn efy_color_trans'}, [['i', {efy_icon: 'remove'}]] ]
        ]],
        ['p', {class: 'title'}, 'Colors'], ['hr'],
        ['div', {efy_color: human_colors}],

        ['hr'], ['p', {class: 'title'}, 'Hair'], ['hr'],
        ['div', {class: 'hair options'}, [
          ['label', [
            ['i', {efy_icon: 'remove'}],
            ['input', {type: 'radio', id: 'avatar_menu_hair_bald', name: 'avatar_menu_hair'}]
          ]],
          ['label', [
            ['div', {class: 'head'}],
            ['div', {efy_pose: 'hair_long_0'}],
            ['input', {type: 'radio', id: 'avatar_menu_hair_long_0', name: 'avatar_menu_hair'}]
          ]],
          ['label', [
            ['div', {class: 'head'}],
            ['div', {efy_pose: 'hair_long_1'}],
            ['input', {type: 'radio', id: 'avatar_menu_hair_long_1', name: 'avatar_menu_hair'}]
          ]],
          ['label', [
            ['div', {class: 'head'}],
            ['div', {efy_pose: 'hair_long_2'}],
            ['input', {type: 'radio', id: 'avatar_menu_hair_long_2', name: 'avatar_menu_hair'}]
          ]],
          ['label', [
            ['div', {class: 'head'}],
            ['div', {efy_pose: 'hair_short_0'}],
            ['input', {type: 'radio', id: 'avatar_menu_hair_short_0', name: 'avatar_menu_hair'}]
          ]],
          ['label', [
            ['div', {class: 'head'}],
            ['div', {efy_pose: 'hair_short_1'}],
            ['input', {type: 'radio', id: 'avatar_menu_hair_short_1', name: 'avatar_menu_hair'}]
          ]],
        ]]
      ]],
      ['div', {efy_content: 'poses', class: 'controls', efy_select: ''}],
      ['div', {efy_content: 'pose', id: 'pose', efy_card: '', efy_select: ''}, [
        ['div', {class: 'nav'}, [
          ['div', {class: 'start'}, [
            ['button', {class: 'back efy_square_btn efy_color_trans'}, [['i', {efy_icon: 'chevron_left'}]] ],
            ['input', {type: 'text', id: 'avatar_name_input', class: 'title', value: 'Pose Name'}]
          ]],
          ['button', {id: 'search', class: 'efy_square_btn efy_color_trans'}, [['i', {efy_icon: 'remove'}]] ]
        ]],
        ['p', {class: 'title'}, 'Scene'], ['hr'],
        // ['div', {class: 'efy_flex'}, [
        //   ['input', {type: 'checkbox', id: 'viewToggle'}],
        //   ['label', {for: 'viewToggle'}, 'Pointer Control']
        // ]],
        ['div', {efy_range_text: 'Perspective'}, [
            ['input', {id: 'perspective', type: 'range', min: '0', max: '1000', value: '1000', step: '10'}]
        ]],
        ['hr'], ['p', {class: 'title'}, 'Position'], ['hr'],
        ['div', {efy_range_text: 'X'}, [['input', {id: 'xPos', ...pos_attrs}]]],
        ['div', {efy_range_text: 'Y'}, [['input', {id: 'yPos', ...pos_attrs}]]],
        ['div', {efy_range_text: 'Z'}, [['input', {id: 'zPos', ...pos_attrs}]]],
        ['hr'], ['p', {class: 'title'}, 'Rotate'], ['hr'],
        ['div', {efy_range_text: 'X'}, [['input', {id: 'xRot', ...rotate_attrs}]]],
        ['div', {efy_range_text: 'Y'}, [['input', {id: 'yRot', ...rotate_attrs}]]],
        ['div', {efy_range_text: 'Z'}, [['input', {id: 'zRot', ...rotate_attrs}]]],
        ['hr'],

        ['div', {efy_tabs: 'av_rotate'}, [
          ['div', {class: 'efy_tabs'}, [
            ...['arm_1', 'arm_2', 'leg_1', 'leg_2'].flatMap((x, i) => [
              ['input', {
                efy_tab: x.replace('_', ''), type: 'radio', id: x.replace('_', ''), name: 'av_rotate',
                ...(i === 0 ? {efy_active: ''} : null), checked: (i === 0)
              }],
              ['label', {for: x.replace('_', '')}, x.charAt(0).toUpperCase() + x.slice(1).replace('_', ' ')]
            ])
          ]],
          ...['arm1', 'arm2', 'leg1', 'leg2'].map(x =>
            ['div', {efy_content: x, ...(x === 'arm1' ? {efy_active: ''} : null)}, [
              ...['x', 'y', 'z'].map(axis =>
                ['div', {efy_range_text: axis.toUpperCase()}, [
                  ['input', {id: `${x}_${axis}Rot`, ...rotate_attrs}]
                ]]
              ),
              ['hr'], ['p', {class: 'title'}, 'Lower'], ['hr'],
              ...['x', 'y', 'z'].map(axis =>
                ['div', {efy_range_text: axis.toUpperCase()}, [
                  ['input', {id: `${x}_lower_${axis}Rot`, ...rotate_attrs}]
                ]]
              ),
              ['hr'], ['p', {class: 'title'}, 'Lower 2'], ['hr'],
              ...['x', 'y', 'z'].map(axis =>
                ['div', {efy_range_text: axis.toUpperCase()}, [
                  ['input', {id: `${x}_lower2_${axis}Rot`, ...rotate_attrs}]
                ]]
              )
            ]]
          )
        ]]
      ]],
      ['div', {efy_content: 'backup', id: 'pn_backup', efy_select: ''}, [
        ['a', {role: 'button', class: 'pn_localstorage_export', efy_lang: 'save'}, [['i', {efy_icon: 'arrow_down'}]]],
        ['label', {efy_upload: 'pn_localstorage_import, .json'}],
        ['button', {class: 'pn_localstorage_reset', efy_lang: 'reset'}, [['i', {efy_icon: 'reload'}]]],
      ]]
    ]]
  ]]
])

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
    efy_sp.human_colors = String(final);
    set_human_colors(efy_sp.human_colors);

    const hair = $('[name=avatar_menu_hair]:checked').id.replace('avatar_menu_', '');
    $('.human .hair').setAttribute('efy_pose', hair);

    $sp_save();

    /*Generate Thumbnails*/ $wait(1, ()=>{
      domtoimage.toJpeg($('.view'), {quality: 0.1, style: {
          transform: "scale(" + 0.8 + ")", transformOrigin: "center center",
          fontFamily: 'efy_avatars', aspectRatio: 1
      }}).then(function (dataUrl) {
          $('.human_preview').style.backgroundImage = 'url(' + dataUrl + ')';
          efy_sp.avatar_thumbnails[0] = dataUrl;
          $sp_save();
      }).catch(function (error){ console.error('avatars: error', error)});
    });
});

const controls2 = $$(controls_container, '[efy_content=poses]');

[
  'Default', 'Mountain', 'Side Stretch', 'Side Stretch Flip', 'Star',
  'Warrior 2', 'Handstand', 'Seated Wide-Legged Stretch', 'Downward Facing Dog', 'Triangle', 'Half Moon'
].map(name =>{
  const id = name.replaceAll(' ', '_').toLowerCase();
  $add('input', {type: 'radio', id: `ppt_${id}`, name: 'ppt_pose'}, [], controls2)
  $add('div', {class: 'pose'}, [
    ['label', {for: `ppt_${id}`}, name],
    ['div', {class: 'edit'}, [['i', {efy_icon: 'edit'}]]]
  ], controls2);
});

$('#ppt_default').checked = true;

$event(document, 'click', ()=>{ const x = event.target;
  if (x.matches('#ppt_default')){ updateTransform({})}
  else if (x.matches('#ppt_mountain')){
    updateTransform({arm1_z: -75, arm2_z: 75});
  }
  else if (x.matches('#ppt_side_stretch')){
    updateTransform({
      x: -40,
      arm1_z: -60, arm1_lower_z: -60,
      arm2_z: 60, arm2_lower_z: 60,
      leg2_x: -90, leg2_z: -90, leg2_lower2_x: -180
    });
  }
  else if (x.matches('#ppt_side_stretch_flip')){
    updateTransform({
      x: 40,
      arm1_z: -60, arm1_lower_z: -60,
      arm2_z: 60, arm2_lower_z: 60,
      leg1_x: 90, leg1_z: 90, leg1_lower2_x: 0
    });
  }
  else if (x.matches('#ppt_star')){
    updateTransform({y: 30,
      leg1_z: 35, leg1_lower2_x: 15, leg1_lower2_y: -30, leg1_lower2_z: -15,
      leg2_z: -35, leg2_lower2_x: 15, leg2_lower2_y: 30, leg2_lower2_z: 15,
    });
  }
  else if (x.matches('#ppt_warrior_2')){
    updateTransform({
      yRot: -15, x: -20, y: 70,
      leg1_z: 90, leg1_lower_x: -90, leg1_lower_z: -90,
      leg2_z: -60, leg2_lower2_y: 60, leg2_lower2_z: 10
    });
  }
  else if (x.matches('#ppt_handstand')){
    updateTransform({
      zRot: -180, x: 70, y: 290,
      arm1_z: 90, arm2_z: -90,
    });
  }
  else if (x.matches('#ppt_seated_wide-legged_stretch')){
    updateTransform({
      y: 135,
      leg1_z: 135, leg2_z: -135,
    });
  }
  else if (x.matches('#ppt_downward_facing_dog')){
    updateTransform({
      xRot: -90, yRot: 48, zRot: -90, x: -80, y: 290,
      arm1_x: 90, arm1_z: 90, arm1_lower2_z: 45,
      arm2_x: 90, arm2_z: -90, arm2_lower2_z: -45,
      leg1_x: 110, leg1_lower2_x: 20,
      leg2_x: 110, leg2_lower2_x: 20,
    });
  }
  else if (x.matches('#ppt_half_moon')){
    updateTransform({arm1_x: 45, leg2_z: 30});
  }
  else if (x.matches('[name=ppt_pose]')){
    $all('.human').forEach(a =>{ a.setAttribute('pose', x.id.replace('ppt_', '')) })
  }
});

['', 'img'].map(x =>{
  $add('div', {class: `scene container ${x}`}, [ ['div', {class: 'view'}, [
    ['div', {class: 'human girl'}, [
      ['div', {class: 'head'}, [
        ['div', {class: 'hair', efy_pose: 'hair_long_1'}],
        ['div', {class: 'eye1'}], ['div', {class: 'eye2'}],
        ['div', {class: 'mouth'}]
      ]],
      ['div', {class: 'neck'}],
      ['div', {class: 'body'}, [
        ['div', {class: 'arm_left'}, [
          ['div', {class: 'shirt_left'}],
          ['div', {class: 'arm_left2'}, [
            ['div', {class: 'arm_left3'}]
          ]]
        ]],
        ['div', {class: 'arm_right'}, [
          ['div', {class: 'shirt_right'}],
          ['div', {class: 'arm_right2'}, [
            ['div', {class: 'arm_right3'}]
          ]]
        ]],
        ['div', {class: 'leg_left'}, [
          ['div', {class: 'pants_left'}],
          ['div', {class: 'leg_left2'}, [
            ['div', {class: 'leg_left3'}]
          ]]
        ]],
        ['div', {class: 'leg_right'}, [
          ['div', {class: 'pants_right'}],
          ['div', {class: 'leg_right2'}, [
            ['div', {class: 'leg_right3'}]
          ]]
        ]],

        ['div', {class: 'boob_left'}],
        ['div', {class: 'boob_right'}],
        ['div', {class: 'shirt_chest'}],
        ['div', {class: 'shirt_neck'}],
        ['div', {class: 'underwear'}],
        ['div', {class: 'pants_base'}],
        ['div', {class: 'skirt'}],
      ]],
      ['div', {class: 'support'}]
    ]]
  ]]], controls_container);
});


let pointer_xy = [0,0], rotate_x = 0, rotate_y = 0;


$all('.shirt_chest').forEach(x =>{ // .body
  const count = 10, rotate_x = 0;

  for (let i = 0; i < count; i++) {
    $add('div', {class: 'part',
        style: `--rotate_x: ${rotate_x}; --rotate_y: ${(360 / count) * i};`
    }, null, x);
  }
});

$all('.arm_left, .arm_left2, .arm_right, .arm_right2, .leg_left, .leg_left2, .leg_right, .leg_right2, .neck, .shirt_left, .shirt_right, .pants_left, .pants_right').forEach(x =>{
  const count = 10, rotate_x = 0, radius = 25;

  for (let i = 0; i < count; i++) {
    $add('div', {class: 'part',
        style: `--rotate_x: ${rotate_x}; --rotate_y: ${(360 / count) * i};`
    }, null, x);
  }
});

$all('.skirt').forEach(x =>{
  const count = 4;
  for (let i = 0; i < count; i++) {
    $add('div', {class: `part p${i}`}, null, x);
  }
});

$all(':is(.arm, .leg) :is(.upper, .lower)').forEach(x =>{
  for (let i = 0; i < count; i++) {
    $add('div', {class: 'part', style:  `--rotate: ${(360 / count) * i}`}, null, x);
  }
});


let isTracking = false;
const container = $('.view'), scene = $('.scene'), /*viewToggle = $('#viewToggle'),*/
arm_1 = $('.arm_left'), arm_2 = $('.arm_right'),
arm_1_lower = $('.arm_left2'), arm_2_lower = $('.arm_right2'),
arm_1_lower2 = $('.arm_left3'), arm_2_lower2 = $('.arm_right3'),
leg_1 = $('.leg_left'), leg_2 = $('.leg_right'),
leg_1_lower = $('.leg_left2'), leg_2_lower = $('.leg_right2'),
leg_1_lower2 = $('.leg_left3'), leg_2_lower2 = $('.leg_right3');
const controls = {
  x: $('#xPos'), y: $('#yPos'), z: $('#zPos'),
  xRot: $('#xRot'), yRot: $('#yRot'), zRot: $('#zRot'),
  arm1_x: $('#arm1_xRot'), arm1_y: $('#arm1_yRot'), arm1_z: $('#arm1_zRot'),
  arm2_x: $('#arm2_xRot'), arm2_y: $('#arm2_yRot'), arm2_z: $('#arm2_zRot'),
  arm1_lower_x: $('#arm1_lower_xRot'), arm1_lower_y: $('#arm1_lower_yRot'), arm1_lower_z: $('#arm1_lower_zRot'),
  arm2_lower_x: $('#arm2_lower_xRot'), arm2_lower_y: $('#arm2_lower_yRot'), arm2_lower_z: $('#arm2_lower_zRot'),
  arm1_lower2_x: $('#arm1_lower2_xRot'), arm1_lower2_y: $('#arm1_lower2_yRot'), arm1_lower2_z: $('#arm1_lower2_zRot'),
  arm2_lower2_x: $('#arm2_lower2_xRot'), arm2_lower2_y: $('#arm2_lower2_yRot'), arm2_lower2_z: $('#arm2_lower2_zRot'),
  leg1_x: $('#leg1_xRot'), leg1_y: $('#leg1_yRot'), leg1_z: $('#leg1_zRot'),
  leg2_x: $('#leg2_xRot'), leg2_y: $('#leg2_yRot'), leg2_z: $('#leg2_zRot'),
  leg1_lower_x: $('#leg1_lower_xRot'), leg1_lower_y: $('#leg1_lower_yRot'), leg1_lower_z: $('#leg1_lower_zRot'),
  leg2_lower_x: $('#leg2_lower_xRot'), leg2_lower_y: $('#leg2_lower_yRot'), leg2_lower_z: $('#leg2_lower_zRot'),
  leg1_lower2_x: $('#leg1_lower2_xRot'), leg1_lower2_y: $('#leg1_lower2_yRot'), leg1_lower2_z: $('#leg1_lower2_zRot'),
  leg2_lower2_x: $('#leg2_lower2_xRot'), leg2_lower2_y: $('#leg2_lower2_yRot'), leg2_lower2_z: $('#leg2_lower2_zRot'),
  perspective: $('#perspective')
};

function updateTransform(param = 'input') {
    const getValue = (name, defaultValue = 0) => {
        if (param === 'input') {
            if (!controls || !controls[name]) return defaultValue;
            return controls[name].value;
        }
        return param?.[name] ?? defaultValue;
    };

    // Use 1000 as default perspective if not specified
    const perspective = getValue('perspective', 1000);
    container.style.perspective = `${perspective}rem`;

    container.style.transform = `
      translateX(${getValue('x')}rem)
      translateY(${getValue('y')}rem)
      translateZ(${Number(getValue('z')) + 100}rem)
      rotateX(${getValue('xRot')}deg)
      rotateY(${getValue('yRot')}deg)
      rotateZ(${getValue('zRot')}deg)
    `;

    const updateElementTransforms = (elements, prefix, options = {}) => {
        elements.forEach((element, i) => {
            const index = i + 1;
            const transformParams = [
                { axis: 'x', type: 'rotate' },
                { axis: 'y', type: 'rotate' },
                { axis: 'z', type: 'rotate' }
            ];

            const transform = transformParams.map(({ axis, type }) => {
                let controlName = `${prefix}${index}_${axis}`;

                if (options.lower === 2){
                  controlName = `${prefix}${index}_lower_${axis}`;
                }
                else if (options.lower === 3){
                  controlName = `${prefix}${index}_lower2_${axis}`;
                }

                let value = getValue(controlName), value2 = Number(value);
                if (axis === 'x' && prefix === 'leg' && options.lower === 3){
                  value2 += 90;
                }
                else if (axis === 'z' && index === 1 && prefix === 'leg' && options.lower === 3){
                  value2 += 10;
                }
                else if (axis === 'z' && index === 2 && prefix === 'leg' && options.lower === 3){
                  value2 -= 10;
                }

                if ((param === 'input' || param?.[controlName] !== undefined) &&
                    controls && controls[controlName]) {
                    controls[controlName].value = value;
                }

                return `${type}${axis.toUpperCase()}(${value2}deg)`;
            }).join(' ');

            let additionalTransform = '';
            if (prefix === 'arm' && options.lower === 2){
              additionalTransform = 'translateY(20rem) ';
            }
            element.style.transform = `${additionalTransform}${transform}`;
        });
    };

    updateElementTransforms([arm_1, arm_2], 'arm');
    updateElementTransforms([leg_1, leg_2], 'leg');
    updateElementTransforms([arm_1_lower, arm_2_lower], 'arm', {lower: 2});
    updateElementTransforms([leg_1_lower, leg_2_lower], 'leg', {lower: 2});
    updateElementTransforms([arm_1_lower2, arm_2_lower2], 'arm', {lower: 3});
    updateElementTransforms([leg_1_lower2, leg_2_lower2], 'leg', {lower: 3});
}

// Event listeners
Object.values(controls).forEach(control =>{
    $event(control, 'input', ()=> updateTransform());
});
updateTransform(); // Initialize

$event(controls_container, 'click', ()=>{
  const x = event.target;
  if (x.matches('[efy_content="avatar"] .back')){
    $('[efy_tab="avatars"]').click();
  }
  else if (x.matches('[efy_content="pose"] .back')){
    $('[efy_tab="poses"]').click();
  }
  else if (x.matches('[efy_content="avatars"] .avatar')){
    $('[efy_tab="avatar"]').click();
  }
  else if (x.matches('.pose .edit')){
    $$(x.closest('.pose'), 'label').click();
    $('[efy_tab="pose"]').click();
  }
});

// Generate Thumbnails
(async ()=>{ try {
  if (efy_sp.avatar_thumbnails[0]){
    $('.human_preview').style.backgroundImage = `url(${efy_sp.avatar_thumbnails[0]})`;
  }
} catch {
      $wait(1, ()=>{
      domtoimage.toJpeg($('.view'), {quality: 0.1, style: {
          transform: "scale(" + 0.8 + ")", transformOrigin: "center center",
          fontFamily: 'efy_avatars', aspectRatio: 1
      }}).then(function (dataUrl){
        $('.human_preview').style.backgroundImage = `url(${dataUrl})`;
        efy_sp.avatar_thumbnails = [];
        efy_sp.avatar_thumbnails.push(dataUrl);
        $sp_save();
      }).catch();
    });
}})();

// Mouse/touch tracking
// function trackPosition(e, pointer_xy) {
//     if (!viewToggle.checked || !isTracking) return;
//
//     rotate_x += (e.clientX - pointer_xy[0]) / 40;
//     rotate_y += (e.clientY - pointer_xy[1]) / 20;
//     if (rotate_x > 360) rotate_x = 360;
//     if (rotate_y > 360) rotate_y = 360;
//
//     controls.xRot.value = -rotate_y;
//     controls.yRot.value = rotate_x;
//     updateTransform();
// }
// scene.addEventListener('mousedown', (e)=>{
//     if (!isTracking) pointer_xy = [e.clientX, e.clientY];
//     isTracking = true;
// });
// scene.addEventListener('mouseup', ()=>{
//     isTracking = false;
// });
// scene.addEventListener('mousemove', (e)=>{ trackPosition(e, pointer_xy) });
// scene.addEventListener('touchmove', trackPosition);

}, 1);