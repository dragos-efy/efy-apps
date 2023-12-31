$ready('#efy_sbtheme', ()=>{

$add('div', {id: 'builder'}, [
    ['div', {id: 'sidebar'}, [
        ['div', {id: 'nav'}, [
            ['button', {efy_sidebar_btn: '', class: 'efy_square_btn'}, [['i', {efy_icon: 'menu'}]] ],
            ['button', {id: 'search', class: 'efy_square_btn'}, [['i', {efy_icon: 'search'}]] ],
            ['button', {id: 'editToggle', class: 'efy_square_btn'}, [['i', {efy_icon: 'edit'}]] ],
            ['button', {id: 'search', class: 'efy_square_btn'}, [['i', {efy_icon: 'move'}]] ],
            ['button', {id: 'search', class: 'efy_square_btn'}, [['i', {efy_icon: 'fullscreen'}]] ]
        ]],
        ['div', {efy_tabs: 'components'}, [
            ['div', {class: 'efy_tabs'}, [
                ['button', {efy_tab: 'basic', efy_active: ''}, [['i', {efy_icon: 'dots'}], ['p', {}, 'Basic']] ],
                ['button', {efy_tab: 'extra'}, [['i', {efy_icon: 'star'}], ['p', {}, 'Extra']] ],
                ['button', {efy_tab: 'custom'}, [['i', {efy_icon: 'heart'}], ['p', {}, 'Custom']] ]
            ]],
            ['div', {efy_content: 'basic', efy_active: ''}, [
                ['button', {id: 'clockButton'}, [['i', {efy_icon: 'globe'}], ['p', {}, 'Clock']] ],
                ['button', {id: 'rectangleButton'}, [['i', {efy_icon: 'play'}], ['p', {}, 'Button']] ],
                ['button', {id: 'image'}, [['i', {efy_icon: 'audio'}], ['p', {}, 'Audio']] ],
                ['button', {id: 'calendar'}, [['i', {efy_icon: 'dots'}], ['p', {}, 'Calendar']] ],
                ['button', {id: 'image'}, [['i', {efy_icon: 'menu'}], ['p', {}, 'Text']] ],
                ['button', {id: 'calendar'}, [['i', {efy_icon: 'circle'}], ['p', {}, 'Color Picker']] ]
            ]]
        ]]
    ]],
    ['div', {id: 'preview'}]
]);

var components = [];
var editMode = false;
const preview = $('#preview'), add_clock = $('#clockButton'), add_rectangle = $('#rectangleButton');

function addComponent(component) {
    components.push(component);
  // Add delete button to component
  var deleteButton = $add('button', {class: 'delete-button'}, 'Delete', component);
  $event(deleteButton, 'click', ()=> deleteComponent(component.id));
  // Hide delete button if not in edit mode
  if (!editMode) deleteButton.style.display = 'none';
}
function deleteComponent(id) {
  var index = components.findIndex(component => component.id === id);
    if (index !== -1) {
      components[index].remove();
      components.splice(index, 1);
    }
}

$event(add_clock, 'click', ()=>{
    const clock = $add('div', {efy_clock: ''}, [], preview);
    addComponent(clock);
});

$event(add_rectangle, 'click', ()=>{
    const clock = $add('div', {id: 'rectangle'}, [['p', {}, 'Button']], preview);
    addComponent(rectangle);
});

components.forEach((component, index) => {
 var deleteButton = document.createElement('button');
 deleteButton.className = 'delete-button';
 deleteButton.innerText = 'Delete';
 deleteButton.addEventListener('click', function() {
  deleteComponent(component.id);
 });
 component.appendChild(deleteButton);
});

$('#editToggle').addEventListener('click', function(){ editMode = !editMode;
 components.forEach((component, index) => {
 var deleteButton = component.querySelector('.delete-button');
 if (editMode) {deleteButton.style.display = 'block'} else {deleteButton.style.display = 'none'}
 });
});


});