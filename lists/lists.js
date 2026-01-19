const DB_NAME = 'efy_lists', DB_VERSION = 2, STORES = ['settings', 'data'];
let db = null;
const initDB = () => new Promise((resolve, reject) => {
  const req = indexedDB.open(DB_NAME, DB_VERSION);
  req.onupgradeneeded = e => {
    db = e.target.result;
    if (!db.objectStoreNames.contains('settings')) db.createObjectStore('settings');
    if (db.objectStoreNames.contains('data')) db.deleteObjectStore('data');
    db.createObjectStore('data', { keyPath: 'id' });
  };
  req.onsuccess = e => { db = e.target.result; resolve(db); };
  req.onerror = e => reject(e.target.error);
});
const dbOp = async (storeName, mode, action, key = null) => {
  if (!db) await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([storeName], mode);
    const store = tx.objectStore(storeName);
    const req = action(store, key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
};
const getFromDB = (store, key) => dbOp(store, 'readonly', (s) => s.get(key));
const getAllFromDB = (store) => dbOp(store, 'readonly', (s) => s.getAll());
const setInDB = (store, value, key = null) =>
  dbOp(store, 'readwrite', (s) => key ? s.put(value, key) : s.put(value));
const deleteFromDB = (store, key) => dbOp(store, 'readwrite', (s) => s.delete(key));
const clearDB = (store) => dbOp(store, 'readwrite', (s) => s.clear());
/* Helpers */
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);
const set_tag_colors = colors => {
  if (!colors) return;
  colors.replaceAll(', ', ',').split(',').forEach(a => {
    a = a.split(' ');
    const tag = [a[0], `${a[1]} ${a[2]} ${a[3]}`, a[4]];
    $root.style.setProperty(`--lt_tag_color_${tag[0]}`, `${tag[1]} / ${tag[2]}`);
    $root.style.setProperty(`--lt_tag_color_alpha_${tag[0]}`, `${tag[1]} / ${tag[2] / 4}`);
  });
};
const month_name = 'January February March April May June July August September October November December'
  .split(' ').reduce((a, n, i) => (a[String(i + 1).padStart(2, '0')] = n, a), {});
/* Storage */
let efy_lt = {
  currency: 'eur', view: 'cards', confirm_remove: true,
  tag_colors: 'low .7 .22 133 1, medium .8 .18 94 1, high .63 .26 29 1',
  compact: false, priority_match: true,
  add_fields_header: true, add_fields_text: true,
  add_fields_gap: true, add_fields_start_open: false,
  clock: false, // header: ['clock'], TODO: Switch to array for ordering header items
  groups_order: ['Personal', 'Work', 'Money'],
  items_order: [
      'mi6hhx84wtc1zfe9ama', 'mi6hhx84xgez9x3sv7h',
      'mi6hhx84zedsdxkeyta', 'mi6hhx8540u2dh24db4',
      'mi6hhx841t3ocjlel76'
  ]
};
const SETTINGS_KEY = 'efy_lt';
let currentEditIndex = null, item_id = 0;
const lt_defaults = [
  {
    name: 'Dance', date: '2026-01-01', info: "Let's move!",
    scores: [['Progress', 1, 3], ['Days', 5, 7]], timers: [['Session', 123]],
    group: 'Personal', priority: 'high', priority_full: true, id: 'mi6hhx84wtc1zfe9ama'
  },
  {name: 'Cook', date: '2026-01-01', timers: [['Timer', 3000]], group: 'Personal', id: 'mi6hhx84xgez9x3sv7h'},
  {name: 'Note', info: 'Some text..', date: '2026-01-01', group: 'Work', priority: 'medium', id: 'mi6hhx84zedsdxkeyta'},
  {name: 'Fake Person', date: '2026-01-01', group: 'Work', priority: 'low',
    links: [['efy', 'https://efy.ooo'], ['Home', '#']], dates: [['Birthday', '2000-01-01']],
    emails: [['Email', 'fake@email.com']], phones: [['Phone', '+0123456789']],
    colors: [['Fave Color', '#ff00ff']], id: 'mi6hhx8540u2dh24db4'
  },
  {name: 'List', date: '2026-01-01', group: 'Money', prices: [['Food', '100', '3'], ['Tools', '21', '1']], id: 'mi6hhx841t3ocjlel76'}
];
const saveItem = item => item?.id ? setInDB('data', item).catch(console.error) : goal.all.forEach(i => setInDB('data', i));
const lt_modal = {
  toggle() {
    $('.modal-overlay').classList.toggle('active');
    if ($('.modal-overlay').classList.contains('active')) {
      const sel = s => $(`.lt_goals_form ${s}`);
      const groups = getGroups();
      const groupDetails = sel('#group .options');
      if (groupDetails) {
        groupDetails.innerHTML = '';
        $add('button', {type: 'button', id: 'lt_add_new_group', class: 'efy_square_btn', title: 'Add New'}, [['i', {efy_icon: 'plus'}]], groupDetails);
        groups.forEach((g, i) => {
          const id = `group_${g}`, checked = i === 0 ? {checked: ''} : null;
          $add('input', {type: 'radio', id, name: 'add_group', ...checked}, null, groupDetails);
          $add('label', {for: id}, g, groupDetails);
          if (i === 0) sel('#group .preview').textContent = g;
        });
      }
      sel('#text')?.focus();
    }
  }
};
const format = {
  currency(v) {
    const isNeg = Number(v) < 0;
    const abs = Math.abs(Number(v));
    const fmt = abs.toLocaleString('en-GB', {style: 'currency', currency: efy_lt.currency, minimumFractionDigits: 2, maximumFractionDigits: 2});
    return isNeg ? '-' + fmt : fmt;
  }
};
const today = new Date(),
  date_today = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
/* Data Management */
const goal = {
  all: [],
  add(item) {
    if (!item.id) item.id = generateId();
    goal.all.push(item); saveItem(item);
    if (!efy_lt.items_order) { efy_lt.items_order = goal.all.map(i => i.id)}
    else { efy_lt.items_order.push(item.id)}
    $lt_save?.(); App_goals.reload();
  },
  duplicate(i) {
    const item = goal.all[i];
    goal.add({...item, name: `${item.name} - copy`, id: generateId()});
  },
  remove(i) {
    const item = goal.all[i];
    // Remove from items_order array
    if (item?.id && efy_lt.items_order) {
      const index = efy_lt.items_order.indexOf(item.id);
      if (index !== -1){ efy_lt.items_order.splice(index, 1); $lt_save?.()}
    }
    if (item?.id) deleteFromDB('data', item.id).catch(console.error);
    goal.all.splice(i, 1); /*App_goals.reload();*/
  }
};
const getGroups = () => [...new Set(goal.all.map(i => i.group || 'Items'))];
/* Form Functions */
const resetForm = () => {
  const sel = s => $(`.lt_goals_form ${s}`);
  sel('#text').value = ''; sel('#info').value = '';
  sel('#priority_none').checked = true;
  sel('#priority_full').checked = false;
  sel('#priority_tall').checked = false;
  sel('#priority_open').checked = false;
  try {
    ['task', 'score', 'link', 'timer', 'phone', 'email', 'price',
    'text', 'number', 'date', 'color'].forEach(c =>{
      $(`.lt_goals_form .lt_form_${c}s .items`).innerHTML = '';
    });
  } catch {};
    currentEditIndex = null;
};
const populateFormForEdit = index => {
  card_modal_title.textContent = 'Edit Card';
  const item = goal.all[index], sel = s => $(`.lt_goals_form ${s}`);
  resetForm();
  currentEditIndex = index;
  sel('#text').value = item.name || '';
  sel('#date').value = item.date || date_today;
  ['none', 'low', 'medium', 'high'].forEach(p => {
    const el = sel(`#priority_${p}`);
    if (el) el.checked = item.priority === p;
  });
  if (sel('#priority_full')) sel('#priority_full').checked = !!item.priority_full;
  if (sel('#priority_tall')) sel('#priority_tall').checked = !!item.priority_tall;
  if (sel('#priority_open')) sel('#priority_open').checked = !!item.priority_open;
  if (item.group) requestAnimationFrame(() => {
    const groupEl = document.getElementById(`group_${item.group.replaceAll(' ', '_')}`);
    if (groupEl) {
      groupEl.checked = true;
      $('#group .preview').textContent = item.group;
    }
  });
  sel('#info').value = item.info || '';
  const fieldTypes = [
    {key: 'scores', fields: ['name', 'min', 'max']},
    {key: 'links', fields: ['name', 'url']},
    {key: 'timers', fields: ['name', 'time']},
    {key: 'texts', fields: ['name', 'value']},
    {key: 'numbers', fields: ['name', 'value']},
    {key: 'prices', fields: ['name', 'price', 'quantity']},
    {key: 'dates', fields: ['name', 'value']},
    {key: 'phones', fields: ['name', 'value']},
    {key: 'emails', fields: ['name', 'value']},
    {key: 'colors', fields: ['name', 'value']}
  ];
  fieldTypes.forEach(type =>{
    if (Array.isArray(item[type.key])) {
      const container = $(`.lt_goals_form .lt_form_${type.key} .items`);
      item[type.key].forEach(values => {
        if (type.key === 'timers') {
          const seconds = Number(values[1]) || 0;
          const h = Math.floor(seconds / 3600);
          const m = Math.floor((seconds % 3600) / 60);
          const s = seconds % 60;
          addMultiField(container, type.key, [values[0], h.toString().padStart(2, '0'), m.toString().padStart(2, '0'), s.toString().padStart(2, '0'), values[2]]);
        } else if (type.key === 'prices') {
          addMultiField(container, type.key, [values[0], values[1] || '', values[2] || '1']);
        } else {
          addMultiField(container, type.key, values);
        }
      });
    }
  });
  if (Array.isArray(item.tasks)) {
    const tasksContainer = $(`.lt_goals_form .lt_form_tasks .items`);
    item.tasks.forEach(taskSet => {
      const [setName, tasks] = taskSet;
      addTaskSetField(tasksContainer, [setName, tasks]);
    });
  }
  lt_modal.toggle();
};
const fieldMap = {
  tasks: {name: 'Tasks', fields: [{type: 'text', name: 'form_add_tasks_name', placeholder: 'Name'}]},
  scores: {name: 'Scores', fields: [{type: 'text', name: 'form_add_scores_name', placeholder: 'Name'}, {type: 'number', name: 'form_add_scores_min', placeholder: 'Min'}, {type: 'number', name: 'form_add_scores_max', placeholder: 'Max'}]},
  links: {name: 'Links', fields: [{type: 'text', name: 'form_add_links_name', placeholder: 'Name'}, {type: 'text', name: 'form_add_links_url', placeholder: 'URL'}]},
  timers: {name: 'Timers', fields: [
    {type: 'text', name: 'form_add_timers_name', placeholder: 'Name'},
    {type: 'number', name: 'form_add_timers_hour', placeholder: 'HH', min: '0', max: '24', value: '00'},
    {name: 'form_add_timers_separator1', value: ':', disabled: true, readonly: true},
    {type: 'number', name: 'form_add_timers_minute', placeholder: 'MM', min: '0', max: '60', value: '00'},
    {name: 'form_add_timers_separator2', value: ':', disabled: true, readonly: true},
    {type: 'number', name: 'form_add_timers_second', placeholder: 'SS', min: '0', max: '60', value: '00'},
    {name: 'form_add_timers_reverse', type: 'checkbox'}
  ]},
  phones: {name: 'Phones', fields: [{type: 'text', name: 'form_add_phones_name', placeholder: 'Name'}, {type: 'text', name: 'form_add_phones_value', placeholder: 'Phone'}]},
  emails: {name: 'Emails', fields: [{type: 'text', name: 'form_add_emails_name', placeholder: 'Name'}, {type: 'text', name: 'form_add_emails_value', placeholder: 'Email'}]},
  dates: {name: 'Dates', fields: [{type: 'text', name: 'form_add_dates_name', placeholder: 'Name'}, {type: 'date', name: 'form_add_dates_value', placeholder: 'Date'}]},
  prices: {name: 'Prices', fields: [{type: 'text', name: 'form_add_prices_name', placeholder: 'Name'}, {type: 'number', step: '0.01', name: 'form_add_prices_price', placeholder: 'Price'}, {type: 'number', name: 'form_add_prices_quantity', placeholder: 'Quantity', value: '1'}]},
  texts: {name: 'Texts', fields: [{type: 'text', name: 'form_add_texts_name', placeholder: 'Name'}, {type: 'text', name: 'form_add_texts_value', placeholder: 'Text'}]},
  numbers: {name: 'Numbers', fields: [{type: 'text', name: 'form_add_numbers_name', placeholder: 'Name'}, {type: 'number', name: 'form_add_numbers_value', placeholder: 'Number'}]},
  colors: {name: 'Colors', fields: [{type: 'text', name: 'form_add_colors_name', placeholder: 'Name'}, {type: 'color', name: 'form_add_colors_value', placeholder: 'Color'}]}
};

const addMultiField = (container, type, values = []) => {
  const config = fieldMap[type];
  if (!config) return;

  const card = $add('div', {class: 'card'}, [
    ['button', {
      class: 'remove efy_square_btn', type: 'button',
      title: 'Remove', 'data-type': type
    }, [['i', {efy_icon: 'remove'}]]]
  ], container);

  if (type === 'scores') {
    const name = values[0] || '',
    min = values[1] || '0', max = values[2] || '10';

    $$(card, '.remove').remove();

    $add('div', {class: 'score'}, [
      ['div', {class: 'top'}, [
        ['input', {type: 'text', class: 'name', placeholder: 'Name', value: name}],
        ['div', {class: 'buttons'}, [
          ['div', {class: 'numbers'}, [
            ['input', {type: 'number', class: 'min', value: min, min: '0'}],
            ['span', '/'],
            ['input', {type: 'number', class: 'max', value: max, min: '1'}]
          ]],
          ['button', {
            class: 'remove efy_square_btn', type: 'button',
            title: 'Remove', 'data-type': type
          }, [['i', {efy_icon: 'remove'}]]]
        ]]
      ]],
      ['progress', {value: min, max: max}]
    ], card);
  } else {
    // Existing code for other field types
    config.fields.forEach((field, i) => {
      let fieldValue = '';
      const position = field.name.includes('_name') ? 'afterbegin' : 'beforeend';
      if (type === 'timers') {
        if (field.name === 'form_add_timers_name' && values[0] !== undefined) fieldValue = values[0];
        if (field.name === 'form_add_timers_hour' && values[1] !== undefined) fieldValue = values[1];
        if (field.name === 'form_add_timers_minute' && values[2] !== undefined) fieldValue = values[2];
        if (field.name === 'form_add_timers_second' && values[3] !== undefined) fieldValue = values[3];
        if (field.name === 'form_add_timers_reverse' && values[4] !== undefined) fieldValue = values[4];
      } else if (values[i] !== undefined) {
        fieldValue = values[i];
      }
      $add('input', {
        type: field.type,
        name: field.name,
        placeholder: field.placeholder,
        ...(field.step && {step: field.step}),
        ...(field.min && {min: field.min}),
        ...(field.max && {max: field.max}),
        ...(field.readonly && {readonly: true}),
        ...(field.value !== undefined && {value: field.value}),
        ...(fieldValue !== '' && {value: fieldValue})
      }, null, card, position);
    });
  }
};

const addTaskSetField = (container, values = []) => {
  const setName = values[0] || '';
  const tasks = values[1] || [];

  const card = $add('div', {class: 'card task-set'}, [
    ['div', {class: 'top'}, [
      ['input', {type: 'text', class: 'task-set-name', placeholder: 'Name', value: setName}],
      ['div', {class: 'buttons'}, [
        ['div', {class: 'numbers'}, [
          ['span', {class: 'current'}, tasks.filter(t => t[1]).length.toString()],
          ['span', '/'],
          ['span', {class: 'max'}, tasks.length.toString()]
        ]],
        ['button', {class: 'add-task efy_square_btn', type: 'button', title: 'Add Task'}, [['i', {efy_icon: 'plus'}]]],
        ['button', {class: 'remove efy_square_btn', type: 'button', title: 'Remove', 'data-type': 'tasks'}, [['i', {efy_icon: 'remove'}]]]
      ]]
    ]],
    ['progress', {value: tasks.filter(t => t[1]).length, max: tasks.length}],
    ['div', {class: 'tasks-container'}]
  ], container);

  const tasksContainer = $$(card, '.tasks-container');

  tasks.forEach(task => {
    addTaskField(tasksContainer, task);
  });

  // Add event listeners for dynamic updates
  card.querySelector('.add-task').addEventListener('click', () => {
    addTaskField(tasksContainer);
    updateTaskSetPreview(card);
  });

  tasksContainer.addEventListener('change', e => {
    if (e.target.matches('.task-done')) {
      updateTaskSetPreview(card);
    }
  });

  tasksContainer.addEventListener('input', e => {
    if (e.target.matches('.task-name')) {
      updateTaskSetPreview(card);
    }
  });

  tasksContainer.addEventListener('click', e => {
    if (e.target.matches('.remove')) {
      e.target.closest('.task-item')?.remove();
      updateTaskSetPreview(card);
    }
  });

  return card;
};

const updateTaskSetPreview = (taskSetEl) => {
  const tasksContainer = $$(taskSetEl, '.tasks-container');
  const taskItems = $$all(tasksContainer, '.task-item');
  const doneCount = Array.from(taskItems).filter(item => $$(item, '.task-done')?.checked).length;
  const progress = $$(taskSetEl, 'progress');
  const currentNum = $$(taskSetEl, '.numbers .current');
  const maxNum = $$(taskSetEl, '.numbers .max');
  if (progress) {
    progress.value = doneCount;
    progress.max = taskItems.length;
  }
  if (currentNum) currentNum.textContent = doneCount;
  if (maxNum) maxNum.textContent = taskItems.length;
};

const updateTasksProgress = (card, item, setIndex) => {
  if (!item.tasks || setIndex < 0 || setIndex >= item.tasks.length) return;
  const tasks = item.tasks[setIndex][1], total = tasks.length,
  done = tasks.filter(t => t[1]).length;

  // Update progress bar
  const progress = $$(card, `.tasks[data-set-index="${setIndex}"] progress`);
  if (progress) {
    progress.value = done;
    progress.max = total;
    if (progress.value === progress.max) {
      const confetti = $('#lt_confetti');
      if (confetti) { confetti.currentTime = 0; confetti.play(); }
    }
  }
  // Update min/max numbers
  const currentNum = $$(card, `.tasks[data-set-index="${setIndex}"] .numbers .current`);
  const maxNum = $$(card, `.tasks[data-set-index="${setIndex}"] .numbers .max`);
  if (currentNum) currentNum.textContent = done;
  if (maxNum) maxNum.textContent = total;
};

const addTaskField = (container, values = []) => {
  const card = $add('div', {class: 'task-item'}, [
    ['button', {
      class: 'remove efy_square_btn', type: 'button', title: 'Remove'
    }, [['i', {efy_icon: 'remove'}]]],
    ['input', {
      type: 'checkbox',
      class: 'task-done',
      ...(values[1] ? {checked: true} : {})
    }],
    ['input', {
      type: 'text',
      class: 'task-name',
      placeholder: 'Task',
      value: values[0] || ''
    }]
  ], container);

  // Focus the input if it's a new task
  if (!values[0]) {
    card.querySelector('.task-name')?.focus();
  }

  return card;
};

const lt_form_goals = () => {
  const sel = s => $(`.lt_goals_form ${s}`);
  const name = sel('#text').value.trim();
  const date = sel('#date').value;
  if (!name || date === 'undefined/undefined/') return $notify('short', 'Missed Required Fields', 'Fill in the rest');
  const id = (currentEditIndex !== null && goal.all[currentEditIndex]) ? goal.all[currentEditIndex].id : generateId();
  const newItem = {
    id,
    name,
    priority: sel('#priority input:checked')?.id?.replace('priority_', '') || 'none',
    priority_full: sel('#priority_full')?.checked || false,
    priority_tall: sel('#priority_tall')?.checked || false,
    priority_open: sel('#priority_open')?.checked || false,
    date,
    group: sel('#group input:checked')?.id?.replace('group_', '') || 'Items'
  };
  if (sel('#info').value.trim()) newItem.info = sel('#info').value;
  const fieldTypes = [
    {key: 'tasks', container: '.lt_form_tasks'},
    {key: 'scores', container: '.lt_form_scores'},
    {key: 'links', container: '.lt_form_links'},
    {key: 'timers', container: '.lt_form_timers'},
    {key: 'phones', container: '.lt_form_phones'},
    {key: 'emails', container: '.lt_form_emails'},
    {key: 'dates', container: '.lt_form_dates'},
    {key: 'prices', container: '.lt_form_prices'},
    {key: 'texts', container: '.lt_form_texts'},
    {key: 'numbers', container: '.lt_form_numbers'},
    {key: 'colors', container: '.lt_form_colors'}
  ];
  fieldTypes.forEach(type => {
    const container = $(`.lt_goals_form ${type.container} .items`);
    if (container.children.length > 0) {
      newItem[type.key] = [];
      Array.from(container.children).forEach(card => {
        if (type.key === 'timers') {
          const name = card.querySelector('[name="form_add_timers_name"]')?.value || '';
          const hour = Number(card.querySelector('[name="form_add_timers_hour"]')?.value) || 0;
          const minute = Number(card.querySelector('[name="form_add_timers_minute"]')?.value) || 0;
          const second = Number(card.querySelector('[name="form_add_timers_second"]')?.value) || 0;
          const reverse = Number(card.querySelector('[name="form_add_timers_reverse"]')?.checked) || false;
          newItem.timers.push([name, hour * 3600 + minute * 60 + second, reverse]);
        } else if (type.key === 'prices') {
          const name = card.querySelector('[name="form_add_prices_name"]')?.value || '';
          const price = card.querySelector('[name="form_add_prices_price"]')?.value || '';
          const quantity = card.querySelector('[name="form_add_prices_quantity"]')?.value || '1';
          newItem.prices.push([name, price, quantity]);
        } else if (type.key === 'tasks') {
          newItem.tasks = [];
          Array.from(container.children).forEach(setCard => {
            const setName = setCard.querySelector('.task-set-name')?.value || 'Tasks';
            const tasks = [];

            $$all(setCard, '.task-item').forEach(taskItem => {
              const name = taskItem.querySelector('.task-name')?.value || '';
              const done = taskItem.querySelector('.task-done')?.checked || false;
              if (name) tasks.push([name, done]);
            });

            if (tasks.length > 0) {
              newItem.tasks.push([setName, tasks]);
            }
          });
        } else if (type.key === 'scores') {
          const name = card.querySelector('.score .name')?.value || '';
          const min = card.querySelector('.score .min')?.value || '0';
          const max = card.querySelector('.score .max')?.value || '100';
          newItem.scores.push([name, min, max]);
        } else {
          const inputs = card.querySelectorAll('input');
          newItem[type.key].push(Array.from(inputs).map(input => input.value));
        }
      });
    }
  });
  if (currentEditIndex !== null && goal.all[currentEditIndex]) {
    // If editing, update the items_order array if needed
    if (!efy_lt.items_order.includes(id)) {
      efy_lt.items_order.push(id); $lt_save?.();
    }
    goal.all[currentEditIndex] = newItem;
    saveItem(newItem); App_goals.reload();
  }
  else { goal.add(newItem)}
  resetForm(); lt_modal.toggle();
};
/* DOM Setup */
$body.setAttribute('id', 'lt_body');
$add('div', {class: 'lt_nav'}, [
  ['div', {class: 'lt_left', style: 'display: flex; gap: var(---gap-x)'}, [
    ['button', {class: 'button new efy_square_btn', title: 'Add'}, [['i', {efy_icon: 'plus'}]]],
    ['div', {efy_select: 'margin0', class: 'lt_toggles'}, [
      ['input', {type: 'checkbox', id: 'lt_drag_toggle'}],
      ['label', {for: 'lt_drag_toggle', title: 'Move'}, [['i', {efy_icon: 'move'}], ['p', {efy_lang: 'move'}]]],
      ['input', {type: 'checkbox', id: 'lt_views_toggle', name: 'lt_views_toggle'}],
      ['label', {for: 'lt_views_toggle', title: 'Views'}, [['i', {efy_icon: 'dots'}], ['p', {efy_lang: 'views'}]]]
    ]]
  ]],
  ['div', {class: 'lt_toggles lt_right'}, [
    ['button', {efy_sidebar_btn: '', class: 'efy_square_btn', title: 'Menu'}, [['i', {efy_icon: 'menu'}]]]
  ]]
]);
$add('div', {class: 'lt_move_info efy-glass'}, [['i', {efy_icon: 'help'}], ['p', 'Select the item you wanna move, then where to move it']]);
$add('div', {class: 'lt_views', efy_select: ''},
  [['cards', 'menu'], ['masonry', 'group'], ['table', 'dots'], ['nodes', 'group'], ['calendar', 'calendar']].flatMap(([name, icon]) => {
    const id = `lt_views_${name}`, checked = name === efy_lt.view ? {checked: true} : null;
    return [
      ['input', {type: 'radio', id, name: 'lt_views', ...checked}],
      ['label', {for: id, title: name}, [['i', {efy_icon: icon}], ['p', {efy_lang: name}]]]
    ];
  })
);
const split_container = $add('div', {class: 'lt_split_container'});
let form_new_items = [], form_new_buttons = [];
const form_new_icons = ['check', '%', 'globe', 'clock', 'A', '3', 'calendar', '$', 'phone', 'email', 'rain'];
['task', 'score', 'link', 'timer', 'text', 'number', 'date', 'price', 'phone', 'email', 'color'].forEach((x, i) =>{
  const y = x + 's',
  icon = ['score', 'text', 'number', 'price'].includes(x) ?
    ['p', {class: 'lt_icon'}, form_new_icons[i]] : ['i', {efy_icon: form_new_icons[i]}];
  form_new_buttons.push(
    ['button', {id: `lt_add_${y}`, type: 'button'}, [
      icon, ['p', {efy_lang: x}]
    ]]
  );
  form_new_items.push(
    ['div', {class: `lt_form_${y}`}, [
      ['div', {class: 'title'}, [['p', {efy_lang: y}], ['hr']]],
      ['div', {class: 'items'}]
    ]]
  );
});

$add('div', {class: 'modal-overlay'}, [
  ['div', {class: 'modal efy-glass'}, [
    ['div', {class: 'input-group actions'}, [
      ['h6', 'Add Card'],
      ['div', {class: 'buttons'}, [
        ['button', {class: 'lt_submit', title: 'Save'}, [['i', {efy_icon: 'check'}], ['p', 'Save']]],
        ['button', {class: 'cancel efy_square_btn', title: 'Close'}, [['i', {efy_icon: 'remove'}]]]
      ]]
    ]],
    ['div', {class: 'content efy_card_filter_off_all'}, [
      ['div', {efy_content: 'goals', efy_active: '', class: 'form lt_goals_form efy_shadow_card_off efy_card_filter_off'}, [
        ['form', {action: '#'}, [
          ['div', {class: 'modal_grid'}, [
            ['div', {class: 'grid'}, [
              ['div', {class: 'input-group'}, [
                ['label', {for: 'text', efy_lang: 'name'}],
                ['input', {type: 'text', id: 'text', name: 'text'}]
              ]],
              ['div', {class: 'input-group'}, [
                ['label', {for: 'date', efy_lang: 'date'}],
                ['input', {type: 'date', id: 'date', name: 'date', value: date_today}]
              ]],
              ['div', {class: 'input-group'}, [
                ['details', {efy_select: '', id: 'priority', name: 'priority', class: 'efy-glass-off'}, [
                  ['summary', {efy_lang: 'priority'}, [
                    ['div', {class: 'preview'}, [
                      ['i', {efy_icon: 'rain'}],
                      ['i', {efy_icon: 'arrow_up'}],
                      ['i', {efy_icon: 'square'}],
                    ]]
                  ]],
                  ['div', [
                    ...[['none', 'normal', true], ['low', 'low'], ['medium', 'medium'], ['high', 'high']].flatMap(([id, langKey, checked]) => [
                      ['input', {id: `priority_${id}`, name: 'add_priority', type: 'radio', ...(checked ? {checked: ''} : {})}],
                      ['label', {for: `priority_${id}`, efy_lang: langKey}]
                    ]),
                    ['input', {id: 'priority_full', name: 'add_priority_full', type: 'checkbox'}],
                    ['label', {for: 'priority_full', efy_lang: 'full'}],
                    ['input', {id: 'priority_tall', name: 'add_priority_tall', type: 'checkbox'}],
                    ['label', {for: 'priority_tall', efy_lang: 'tall'}],
                    ['input', {id: 'priority_open', name: 'add_priority_open', type: 'checkbox'}],
                    ['label', {for: 'priority_open', efy_lang: 'start_open'}]
                  ]]
                ]]
              ]],
              ['div', {class: 'input-group'}, [
                ['details', {efy_select: '', id: 'group', name: 'group', class: 'efy-glass-off'}, [
                  ['summary', {efy_lang: 'group'}, [['div', {class: 'preview'}]]],
                  ['div', {class: 'options'}]
                ]]
              ]],
              ['textarea', {id: 'info', name: 'info', placeholder: 'Info'}],
              ['details', {efy_select: '', id: 'lt_add_form', class: 'efy-glass-off'}, [
                ['summary', {efy_lang: 'add_field'}],
                ['div', {class: 'buttons efy_flex'}, form_new_buttons]
              ]],
              ...form_new_items
            ]]
          ]]
        ]]
      ]]
    ]]
  ]]
], split_container);
$add('div', {class: 'calendar efy_card_filter efy_shadow_card efy-glass'}, null, split_container);
$add('div', {lt_planner: ''}, null, split_container);
$add('video', {id: 'lt_confetti', src: './assets/confetti.webm'});
const add_group_fn = name => {
  const id = 'lt_' + name.replaceAll(' ', '_');
  const groupEl = $add('div', {id, class: 'lt_group', lt_group: name}, [
    ['div', {class: 'header'}, [
      ['h5', {class: 'title', contenteditable: 'true'}, name],
      ['mark', {class: 'efy_card_filter efy_shadow_card'}, '0'],
      ['div', {class: 'move_group efy_card_filter efy_shadow_card'}, [
        ['mark', {class: 'lt_move_group_before efy_card_filter_off', title: 'Move Before'}, [['i', {efy_icon: 'arrow_left'}]]],
        ['mark', {class: 'lt_move_group_after efy_card_filter_off', title: 'Move After'}, [['i', {efy_icon: 'arrow'}]]]
      ]],
      ['mark', {class: 'efy_card_filter lt_full efy_shadow_card', efy_toggle: `[lt_planner] > div:not(#${id})`, title: 'Full Size'}, [['i', {efy_icon: 'fullscreen'}]]],
      ['mark', {class: 'efy_card_filter lt_remove_group efy_shadow_card', title: 'Remove Group'}, [['i', {efy_icon: 'trash'}]]]
    ]],
    ['div', {class: 'lt_cards'}]
  ], $('[lt_planner]'));
  return groupEl;
};

const card_modal_title = $('.modal-overlay .actions h6');

/* Main App Rendering */
const App_goals = {
  start() {
    // Create a copy of goal.all sorted by the order in efy_lt.items_order
    const orderedItems = [...goal.all];
    if (efy_lt.items_order && efy_lt.items_order.length > 0) {
      orderedItems.sort((a, b) => {
        const aIndex = efy_lt.items_order.indexOf(a.id);
        const bIndex = efy_lt.items_order.indexOf(b.id);
        // If an item is not in the order array, put it at the end
        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });
    }

    orderedItems.forEach((item, index) => {
      item_id++;
      const where = item.group ? `#lt_${item.group.replaceAll(' ', '_')}` : '#lt_no_group';
      const priority = item.priority || 'none';
      const priority_full = item.priority_full || false;
      const priority_tall = item.priority_tall || false;
      const priority_open = item.priority_open || false;
      const lt_group = item.group || 'Items';

      open_check = priority_open ? {checked: true} : null;

      if (!$(where)) add_group_fn(item.group || 'Items');
      const now = 'lt_goal_' + item_id;
      const contentChildren = [];
      const tagChildren = [];
      if (item.date) {
        const date = item.date.split('-');
        const month = month_name[date[1]];
        tagChildren.push(['div', {class: 'date efy_shadow_card'}, `${month}, ${date[2]}`]);
      }
      if (item.info) {
        contentChildren.push(['p', {class: 'info efy_card_filter_off efy_shadow_card_off', contenteditable: 'plaintext-only'}, item.info]);
      }
      // Render field types
      const renderField = (type, items, renderer) => {
        if (Array.isArray(items) && items.length) {
          contentChildren.push(['div', {class: type}, items.map(renderer)]);
        }
      };
      // Timers
      renderField('timers', item.timers, (timer, i) => {
        const [name, time] = timer, reverse = (timer[2]) ? '' : ',reverse';
        tagChildren.push(['div', {class: 'time'}, $sec_time(time)]);
        return ['div', {class: 'timer'}, [
          ['p', {class: 'name'}, name],
          ['div', {efy_timer: `${now}_${i},${time}${reverse}`, class: 'efy_card_filter_off'}]
        ]];
      });
      // Tasks
      if (Array.isArray(item.tasks) && item.tasks.length) {
        item.tasks.forEach((taskSet, setIndex) => {
          const [setName, tasks] = taskSet;
          if (!tasks || !tasks.length) return;

          const totalTasks = tasks.length;
          const doneTasks = tasks.filter(t => t[1]).length;
          const taskList = tasks.map((task, i) => {
            const [name, done] = task;
            return ['div', {class: 'task-item'}, [
              ['input', {type: 'checkbox', class: 'task-done', ...(done ? {checked: true} : {}), 'data-set-index': setIndex, 'data-task-index': i}],
              ['span', {contenteditable: 'true', class: 'task-name'}, name],
              ['button', {class: 'remove-task efy_square_btn', 'data-set-index': setIndex, 'data-task-index': i}, [['i', {efy_icon: 'remove'}]]]
            ]];
          });

          contentChildren.push(['div', {class: 'tasks', 'data-set-index': setIndex}, [
            ['div', {class: 'top'}, [
              ['p', {class: 'name', contenteditable: 'true'}, setName],
              ['div', {class: 'buttons'}, [
                ['div', {class: 'numbers'}, [
                  ['span', {class: 'current'}, doneTasks.toString()],
                  ['span', '/'],
                  ['span', {class: 'max'}, totalTasks.toString()]
                ]],
                ['button', {class: 'add-task efy_square_btn', title: 'Add Task', 'data-set-index': setIndex}, [['i', {efy_icon: 'plus'}]]],
                ['button', {class: 'remove-task-set efy_square_btn', 'data-set-index': setIndex}, [['i', {efy_icon: 'remove'}]]]
              ]]
            ]],
            ['progress', {value: doneTasks, max: totalTasks}],
            ['div', {class: 'task-list'}, taskList]
          ]]);
        });
      }
      // Scores
      renderField('scores', item.scores, (score, i) => {
        const [name, min, max] = score;
        return ['div', {class: 'score', 'data-score-index': i}, [
          ['div', {class: 'top'}, [
            ['p', {class: 'name', contenteditable: 'true'}, name],
            ['div', {class: 'buttons'}, [
              ['div', {class: 'numbers'}, [
                ['input', {type: 'number', class: 'min', value: min}],
                ['p', '/'],
                ['input', {type: 'number', class: 'max', value: max}]
              ]],
              ['button', {class: 'efy_square_btn remove', 'data-action': 'remove-score', 'data-index': i}, [['i', {efy_icon: 'remove'}]]]
            ]]
          ]],
          ['progress', {value: min, max: max}]
        ]];
      });
      // Links
      renderField('links', item.links, link => {
        const [name, url] = link;
        return ['div', {class: 'link'}, [
          ['a', {href: url, target: '_blank'}],
          ['i', {efy_icon: 'globe'}],
          ['span', name]
        ]];
      });
      // Phones
      renderField('phones', item.phones, phone => {
        const [name, value] = phone;
        return ['p', {class: 'phone efy_card_filter_off efy_shadow_card_off'}, [
          ['p', name], ['a', {href: `tel:${value}`, class: 'phone_value'}, value]
        ]];
      });
      // Emails
      renderField('emails', item.emails, email => {
        const [name, value] = email;
        return ['p', {class: 'email efy_card_filter_off efy_shadow_card_off'}, [
          ['p', name], ['a', {href: `mailto:${value}`, class: 'email_value'}, value]
        ]];
      });
      // Prices
      if (Array.isArray(item.prices) && item.prices.length) {
        const pricesContainer = ['div', {class: 'prices'}];
        const pricesContent = [];
        if (item.prices.length > 1) {
          const totalPrice = item.prices.reduce((sum, price) => {
            const value = Number(price[1]) || 0;
            const quantity = Number(price[2]) || 1;
            return sum + (value * quantity);
          }, 0);
          pricesContent.push(['p', {class: 'total_prices efy_card_filter_off efy_shadow_card_off'}, [
            ['strong', 'Total Prices: '], ['span', format.currency(totalPrice)]
          ]]);
        }
        item.prices.forEach((price, i) => {
          const [name, value, quantity = 1] = price;
          const numValue = Number(value) || 0;
          const numQuantity = Number(quantity) || 1;
          const total = numValue * numQuantity;
          pricesContent.push(['p', {class: 'price efy_card_filter_off efy_shadow_card_off', 'data-price-index': i}, [
            ['input', {type: 'text', class: 'name', value: name, contenteditable: 'true'}],
            ['span', {class: 'price_value'}, [
              ['input', {type: 'number', step: '0.01', class: 'price_input', value: numValue}],
              ['span', 'x'],
              ['input', {type: 'number', class: 'quantity_input', value: numQuantity}],
              ['span', {class: 'total_price'}, `= ${format.currency(total)}`]
            ]]
          ]]);
        });
        pricesContainer[2] = pricesContent;
        contentChildren.push(pricesContainer);
      }
      // Other field types
      const otherFields = [
        {key: 'texts', className: 'text', valueField: 'text_value'},
        {key: 'numbers', className: 'number', valueField: 'number_value'},
        {key: 'dates', className: 'custom_date', valueField: 'date_value'},
        {key: 'colors', className: 'color', valueField: 'color_value'}
      ];
      otherFields.forEach(field => {
        const tag = field.key === 'colors' ? 'label' : 'p';
        renderField(field.key, item[field.key], (data, i) => {
          const [name, value] = data;
          return [tag, {class: `${field.className} efy_card_filter_off efy_shadow_card_off`, [`data-${field.key}-index`]: i}, [
            ['span', {class: 'name'}, name],
            ['input', {type: field.key === 'numbers' ? 'number' : (field.key === 'dates' ? 'date' : (field.key === 'colors' ? 'color' : 'text')), class: field.valueField, value}]
          ]];
        });
      });
      // Card actions
      const done_btn = item.group === 'Goals' ?
        ['button', {class: 'done_btn efy_square_btn', efy_audio_mute: 'ok'}, [['i', {efy_icon: 'check'}]]] : null;
      // Priorities
      const priorities = ['None', 'Low', 'Medium', 'High', 'Full', 'Tall', 'Open'].flatMap(item => {
        let check = null, check_icon = 'check';
        const name = item.toLowerCase(), id = `priority_${name}_${now}`,
        lang = (name === 'open') ? 'start_open' : name,
        full = item === 'Full', tall = item === 'Tall', open = item === 'Open',
        checks = ['Full', 'Tall', 'Open'].includes(item),
        name_checkbox = '_' + name;

        if (item === 'Full') {check_icon = 'rain'}
        else if (item === 'Tall') {check_icon = 'arrow_up'}
        else if (item === 'Open') {check_icon = 'square'}

        if ((full && priority_full) || (!full && priority === name)){
          check = {checked: true};
        } else if ((tall && priority_tall) || (!tall && priority === name)){
          check = {checked: true};
        } else if ((open && priority_open) || (!open && priority === name)){
          check = {checked: true};
        }
        return [
          ['input', {type: checks ? 'checkbox' : 'radio', name: `priority_${now}${checks ? name_checkbox : ''}`, id, ...check}],
          ['label', {for: id, ...(checks ? {efy_lang: lang} : {title: item})}, [['i', {efy_icon: check_icon}]]],
        ];
      });
      // Create card
      $add('div', {efy_searchable: '', class: 'card efy_card_filter efy-glass',
        'data-id': item.id, id: now, ...(item.date && {lt_date: item.date}),
        lt_done: item.done || false, lt_group
      }, [
        ['label', {class: 'summary efy_card_filter_off_all', for: `lt_toggle_${now}`}, [
          ['input', {type: 'checkbox', id: `lt_toggle_${now}`, name: 'lt_cards', ...open_check}],
          ['button', {lt_priority: ''}],
          ['div', {class: 'title'}, item.name],
          tagChildren.find(el => el[1].class === 'time')
        ]],
        ['div', {class: 'content efy_card_filter_off_all'}, [
          ['div', {class: 'info'}, [
            ['div', {class: 'priority_picker efy_hide_i', efy_select: ''}, priorities],
            ...contentChildren
          ]],
          ['div', {class: 'lt_tags'}, [
            tagChildren.find(el => el[1].class?.includes('date')), done_btn,
            ['button', {class: 'edit efy_square_btn'}, [['i', {efy_icon: 'edit'}]]],
            ['button', {class: 'duplicate efy_square_btn'}, [['i', {efy_icon: 'copy'}]]],
            ['button', {class: 'lt_fs efy_square_btn', efy_audio_mute: 'ok'}, [['i', {efy_icon: 'enlarge'}]]],
            ['button', {class: 'remove efy_square_btn'}, [['i', {efy_icon: 'trash'}]]]
          ]]
        ]]
      ], $(`${where} .lt_cards`));
    });
    // Update item counts
    [...new Set(goal.all.map(i => (i.group || 'Items').replaceAll(' ', '_')))].forEach(group => {
      const el = $(`#lt_${group}`);
      if (el) $$(el, '.header mark').textContent = $all(`#lt_${group} .lt_cards > *`).length;
    });
  },
  reload() {
    item_id = 0;
    $all('[lt_planner] > .lt_group .lt_cards').forEach(x => {
      x.innerHTML = '';
      if (!x.children.length) x.closest('.lt_group')?.remove();
    });
    App_goals.start();
  }
};
$ready('#efy_sbtheme', () => {
  $add('details', {id: 'lt_settings', name: 'efy_sidebar_modules'}, [
    ['summary', [['i', {efy_icon: 'check'}], ['p', 'Lists'], ['mark', {efy_lang: 'alpha'}]]],
    ['div', {efy_tabs: 'lt_menu', efy_select: ''}, [
      ['div', {class: 'efy_tabs'}, [
        ['input', {type: 'radio', id: 'lt_tab_theme', efy_tab: 'theme', efy_active: ''}],
        ['label', {for: 'lt_tab_theme', efy_lang: 'theme'}],
        ['input', {type: 'radio', id: 'lt_tab_backup', efy_tab: 'backup'}],
        ['label', {for: 'lt_tab_backup', efy_lang: 'backup'}],
        ['input', {type: 'radio', id: 'lt_tab_tags', efy_tab: 'tags'}],
        ['label', {for: 'lt_tab_tags', efy_lang: 'tags'}]
      ]],
      ['div', {efy_content: 'backup', efy_select: '', id: 'lt_backup'}, [
        ['a', {role: 'button', class: 'lt_localstorage_export', efy_lang: 'export'}, [['i', {efy_icon: 'arrow_down'}]]],
        ['label', {for: 'efy_import_file', class: 'button', efy_lang: 'import'}, [['i', {efy_icon: 'arrow_up'}]]],
        ['input', {type: 'file', id: 'efy_import_file', accept: '.json', style: 'display: none'}],
        ['button', {class: 'lt_localstorage_reset', efy_lang: 'reset'}, [['i', {efy_icon: 'reload'}]]]
      ]],
      ['div', {efy_content: 'theme', efy_select: '', id: 'lt_theme', efy_active: ''}, [
        ['div', {class: 'efy_hr_div'}, [
          ['p', {class: 'lt_title', efy_lang: 'colors'}], ['hr']
        ]],
        ['input', {type: 'checkbox', name: 'lt_priority_custom', id: 'lt_priority_custom'}],
        ['label', {for: 'lt_priority_custom', efy_lang: 'card_accent'}],
        ['div', {class: 'efy_hr_div'}, [
          ['p', {class: 'lt_title'}, 'Confirm'], ['hr']
        ]],
        ['input', {type: 'checkbox', name: 'lt_confirm_remove', id: 'lt_confirm_remove'}],
        ['label', {for: 'lt_confirm_remove'}, 'Remove'],
        ['div', {class: 'efy_hr_div'}, [
          ['p', {class: 'lt_title'}, 'Layout'], ['hr']
        ]],
        ['input', {type: 'checkbox', name: 'lt_layout', id: 'lt_clock'}],
        ['label', {for: 'lt_clock'}, 'Clock'],
        ['input', {type: 'checkbox', name: 'lt_layout', id: 'lt_compact'}],
        ['label', {for: 'lt_compact'}, 'Compact'],
        ['div', {class: 'efy_hr_div'}, [
          ['p', {class: 'lt_title'}, 'Add Field Buttons'], ['hr']
        ]],
        ['input', {type: 'checkbox', name: 'lt_add_fields', id: 'lt_add_fields_text', checked: true}],
        ['label', {for: 'lt_add_fields_text', efy_lang: 'text'}],
        ['input', {type: 'checkbox', name: 'lt_add_fields', id: 'lt_add_fields_gap', checked: true}],
        ['label', {for: 'lt_add_fields_gap', efy_lang: 'gap'}],
        ['input', {type: 'checkbox', name: 'lt_add_fields', id: 'lt_add_fields_header', checked: true}],
        ['label', {for: 'lt_add_fields_header', efy_lang: 'header'}],
        ['input', {type: 'checkbox', name: 'lt_add_fields', id: 'lt_add_fields_start_open'}],
        ['label', {for: 'lt_add_fields_start_open', efy_lang: 'start_open'}],
        ['div', {efy_range_text: 'Progress Height'}, [
          ['input', {type: 'range', id: 'lt_progress_height', min: '2', max: '30', step: '1', value: '15'}]
        ]]
      ]],
      ['div', {efy_content: 'tags', efy_select: '', id: 'lt_tags_tab'}, [['div', {efy_lang: 'coming_soon'}]]]
    ]]
  ], $('#efy_sbtheme'), 'beforebegin');
  $event($('#lt_theme'), 'input', () => {
    let final = [], content = [];
    $all('#lt_theme [efy_content]').forEach(tag => {
      let values = [];
      $$all(tag, '[type=range]').forEach(v => values.push(v.value));
      content.push(`${values[2]} ${values[1]} ${values[0]} ${values[3]}`);
    });
    $all('#lt_theme [efy_tab] + label').forEach((tag, i) => {
      final.push(`${tag.textContent} ${content[i]}`);
    });
    efy_lt.tag_colors = String(final);
    $lt_save(); set_tag_colors(efy_lt.tag_colors);
  });
  $event($('#lt_priority_custom'), 'change', e => {
    $('[lt_planner]').classList.toggle('priority_color');
    efy_lt.priority_match = e.target.checked; $lt_save();
  });
  $event($('#lt_confirm_remove'), 'change', e => {
    efy_lt.confirm_remove = e.target.checked; $lt_save();
  });
  $event($('#lt_clock'), 'change', e => {
    efy_lt.clock = e.target.checked; $lt_save();
    if (efy_lt.clock === true){
      if (!$('.lt_nav .lt_left [efy_clock]')){
        $add('div', {efy_clock: ''}, null, $('.lt_nav .lt_left'), 'afterbegin');
      }
      else { $('.lt_nav .lt_left [efy_clock]').classList.remove('efy_hide_i')}
    }
    else { $('.lt_nav .lt_left [efy_clock]').classList.add('efy_hide_i')}
  });
  $event($('#lt_add_fields_text'), 'change', e =>{
    efy_lt.add_fields_text = e.target.checked; $lt_save();
    $('#lt_add_form').classList.toggle('lt_text');
  });
  $event($('#lt_add_fields_gap'), 'change', e =>{
    efy_lt.add_fields_gap = e.target.checked; $lt_save();
    $('#lt_add_form').classList.toggle('lt_gap');
  });
  $event($('#lt_add_fields_header'), 'change', e =>{
    const checked = e.target.checked;
    efy_lt.add_fields_header = checked; $lt_save();
    $('#lt_add_form').classList.toggle('lt_header');
    if (checked === false) $('#lt_add_form').open = true;
  });
  $event($('#lt_add_fields_start_open'), 'change', e =>{
    efy_lt.add_fields_start_open = e.target.checked; $lt_save();
    $('#lt_add_form').classList.toggle('lt_start_open');
  });
  $event($('#lt_progress_height'), 'input', e =>{
    efy_lt.progress_height = e.target.value; $lt_save();
    $root.style.setProperty(`---lt_progress_height`, efy_lt.progress_height + 'rem');
  });
  $event($('#lt_compact'), 'input', e =>{
    efy_lt.compact = e.target.checked; $lt_save();
    $('#lt_body').classList.toggle('lt_compact');
  });

  $event($('.lt_localstorage_export'), 'click', async e => {
    e.preventDefault();
    try {
      const settings = await getFromDB('settings', SETTINGS_KEY),
      data = await getAllFromDB('data'),
      blob = new Blob([JSON.stringify({settings, data}, null, 2)], {type: 'application/json'}),
      url = URL.createObjectURL(blob),
      a = $add('a', {href: url, download: 'efy_lists.json'});
      a.click();
      setTimeout(()=>{ a.remove(); URL.revokeObjectURL(url)}, 0);
    }
    catch (error){ $notify('short', 'Export failed', error)}
  });
  $event($('#efy_import_file'), 'change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const importData = JSON.parse(text);
      if (importData.settings) {
        await setInDB('settings', importData.settings, SETTINGS_KEY);
        efy_lt = importData.settings;
        if (!efy_lt.items_order && importData.data) {
          efy_lt.items_order = importData.data.map(item => item.id);
          await setInDB('settings', efy_lt, SETTINGS_KEY);
        }
      }
      if (importData.data && Array.isArray(importData.data)) {
        const tx = db.transaction(['data'], 'readwrite');
        const store = tx.objectStore('data');
        store.clear();
        importData.data.forEach(item => {
          if (!item.id) item.id = generateId();
          store.put(item);
        });
        goal.all = importData.data;
        tx.oncomplete =()=> location.reload();
      }
    } catch (error){ $notify('short', 'Import Failed', error)}
    finally { e.target.value = ''}
  });
  $event($('.lt_localstorage_reset'), 'click', async ()=>{
    if (!confirm('Reset all data?')) return;
    try { await clearDB('settings'); await clearDB('data'); location.reload()}
    catch (error){ $notify('short', 'Reset Failed', error)}
  });
});

/* Search */
$add('label', {class: 'lt_search', title: 'Search'}, [
  ['i', {efy_icon: 'search'}],
  ['input', {id: 'lt_search', type: 'text', placeholder: 'Search...', efy_search2: '[lt_planner] .lt_cards .card'}]
], $('.lt_nav .lt_toggles.lt_right'), 'afterbegin');

/* Event Listeners */
$event($('.lt_submit'), 'click', lt_form_goals);

$event($('.lt_nav .button.new'), 'click', () => {
  const modal = $('.modal-overlay');
  card_modal_title.textContent = 'Add Card';
  if (modal.classList.contains('active') && currentEditIndex === null){
    lt_modal.toggle();
  }
  else {
    resetForm();
    if (!modal.classList.contains('active')) lt_modal.toggle();
  }
});
$event($('.modal .cancel'), 'click', e => { e.preventDefault(); resetForm(); lt_modal.toggle(); });
$event(document.body, 'click', e => {
  const x = e.target;
  // Form field handling
  if (x.closest('.lt_goals_form')) {
    const fields = [
      'scores', 'links', 'timers', 'texts', 'numbers',
      'prices', 'dates', 'phones', 'emails','colors'
    ];
    for (const field of fields) {
      if (x.matches(`#lt_add_${field}`)) {
        const container = $(`.lt_goals_form .lt_form_${field} .items`);
        addMultiField(container, field);
        e.stopPropagation();
        return;
      }
    }
    if (x.matches('#lt_add_tasks')) {
      const container = $(`.lt_goals_form .lt_form_tasks .items`);
      addTaskSetField(container);
      e.stopPropagation();
      return;
    }
    if (x.matches('.add-task')) {
      const tasksContainer = x.parentElement.querySelector('.tasks-container');
      addTaskField(tasksContainer);
      e.stopPropagation();
      return;
    }
    if (x.matches('.lt_goals_form .task-item .remove')) {
      x.closest('.task-item')?.remove();
      e.stopPropagation();
      return;
    }
    if (x.matches('.lt_goals_form .task-set > .remove')) {
      x.closest('.task-set')?.remove();
      e.stopPropagation();
      return;
    }
    if (x.matches('.remove')) {
      x.closest('.card')?.remove();
      e.stopPropagation();
      return;
    }
    if (x.matches('#group [name=add_group]')) {
      $('#group .preview').textContent = $(`[for="${x.id}"]`).textContent;
    }
    if (x.matches('#lt_add_new_group')) {
      const groupName = prompt('Group Name');
      if (!groupName?.trim()) return;
      const cleanName = groupName.trim();
      const sel = s => $(`.lt_goals_form ${s}`);
      const groupDetails = sel('#group .options');
      if (groupDetails) {
        const id = `group_${cleanName}`;
        groupDetails.insertAdjacentHTML('beforeend', `
          <input type="radio" id="${id}" name="add_group">
          <label for="${id}">${cleanName}</label>
        `);
        $(`#${id}`).checked = true;
      }
      return;
    }
  }
  // Group removal
  if (x.matches('.lt_remove_group')) {
    if (!confirm('Remove This Group?')) return;
    const groupEl = x.closest('.lt_group');
    const groupName = $$(groupEl, '.title').textContent.trim();
    // Remove items from this group
    goal.all.filter(i => i.group === groupName).forEach(i => {
      if (i.id) deleteFromDB('data', i.id);
    });
    goal.all = goal.all.filter(i => i.group !== groupName);
    groupEl.remove();
    // Remove from modal
    const radio = $(`.lt_goals_form #group_${groupName.replaceAll(' ', '_')}`);
    if (radio) {
      const label = $(`.lt_goals_form label[for="group_${groupName.replaceAll(' ', '_')}"]`);
      radio?.remove(); label?.remove();
    }
    return;
  }
  if (x.matches('.lt_move_group_before')) {
    const group = x.closest('.lt_group');
    const group_name = $$(group, '.title').textContent.trim();
    let array = [], groups = $all('[lt_planner] .lt_group');

    groups.forEach((y, i)=>{
      if (y.matches(`[lt_group=${group_name}]`) && i > 0){
        $('[lt_planner]').moveBefore(group, groups[i - 1]);
      }
    });
    $all('[lt_planner] .lt_group').forEach((y, i)=>{
      array.push(y.getAttribute('lt_group'));
    });
    efy_lt.groups_order = array; $lt_save?.(); return;
  }
  if (x.matches('.lt_move_group_after')) {
    const group = x.closest('.lt_group');
    const group_name = $$(group, '.title').textContent.trim();
    let array = [], groups = $all('[lt_planner] .lt_group');

    groups.forEach((y, i)=>{
      if (y.matches(`[lt_group=${group_name}]`) && (i < groups.length - 1)){
        $('[lt_planner]').moveBefore(groups[i + 1], group);
      }
    });
    $all('[lt_planner] .lt_group').forEach((y, i)=>{
      array.push(y.getAttribute('lt_group'));
    });
    efy_lt.groups_order = array; $lt_save?.(); return;
  }
  // Card actions
  const card = x.closest('.card');
  if (!card) return;
  const itemId = card.dataset.id;
  const index = goal.all.findIndex(i => i.id === itemId);
  const item = goal.all[index];
  if (!item) return;
  if (x.matches('[data-action="remove-score"]')) {
    const scoreIndex = parseInt(x.closest('.score').dataset.scoreIndex, 10);
    if (item.scores?.length > scoreIndex) {
      item.scores.splice(scoreIndex, 1);
      saveItem(item);
      x.closest('.score')?.remove();
      $$all(card, '.score').forEach((el, idx) => {
        el.dataset.scoreIndex = idx;
        const btn = $$(el, '[data-action="remove-score"]');
        if (btn) btn.dataset.index = idx;
      });
    }
    return;
  }
  const actions = {
    '.date': () => { populateFormForEdit(index); $wait(.1, () => $('.lt_goals_form #date').focus()); },
    '.edit': () => { populateFormForEdit(index); },
    '.duplicate': () => { goal.duplicate(index); populateFormForEdit(goal.all.length - 1); $('.modal #text').select(); },
    '.remove': () => { if (!efy_lt.confirm_remove || confirm('Remove this item?')) {
      goal.remove(index); document.documentElement.classList.remove('lt_fs');
      const group = card.closest('.lt_group'); card.remove();
      $$(group, '.header mark').textContent = $$all(group, '.lt_cards > .card').length;
    } },
    '.done_btn': () => {
      const isDone = card.getAttribute('lt_done') === 'true';
      card.setAttribute('lt_done', isDone ? 'false' : 'true');
      goal.all[index].done = !isDone;
      if (!isDone) {
        const confetti = $('#lt_confetti');
        if (confetti) { confetti.currentTime = 0; confetti.play(); }
        $$all(card, '[efy_timer] [efy_start]').forEach(btn => btn?.click());
      }
      saveItem(goal.all[index]);
    },
    '.lt_fs': () => {
      card.classList.toggle('lt_fs');
      card.classList.toggle('efy_sidebar_width');
      document.documentElement.classList.toggle('lt_fs');
      window.scrollTo(0, 0);
      if (efy?.audio_status === 'on') $audio_play?.(efy_audio?.wind);
    },
    '.lt_full': () => {
      $all('[lt_planner] .lt_cards').forEach(b => b.classList.toggle('lt_full_on'))
    },
    '.add-task': () => {
      const setIndex = parseInt(x.dataset.setIndex, 10);
      if (setIndex < 0 || setIndex >= item.tasks.length) return;

      const taskList = $$(card, `.tasks[data-set-index="${setIndex}"] .task-list`);
      if (!taskList) return;

      const taskIndex = item.tasks[setIndex][1].length;
      const newItem = ['div', {class: 'task-item'}, [
        ['input', {type: 'checkbox', class: 'task-done', 'data-set-index': setIndex, 'data-task-index': taskIndex}],
        ['span', {contenteditable: 'true', class: 'task-name'}, ''],
        ['button', {class: 'remove-task efy_square_btn', 'data-set-index': setIndex, 'data-task-index': taskIndex}, [['i', {efy_icon: 'remove'}]]]
      ]];

      item.tasks[setIndex][1].push(['', false]);
      const newElement = $add(...newItem, taskList);
      const newInput = newElement.querySelector('.task-name');
      newInput.focus();

      // Setup blur handler to remove if empty
      newInput.addEventListener('blur', function() {
        const taskItem = this.closest('.task-item');
        if (!this.textContent.trim() && taskItem) {
          const taskIndex = parseInt(taskItem.querySelector('.task-done').dataset.taskIndex, 10);
          if (taskIndex >= 0 && taskIndex < item.tasks[setIndex][1].length) {
            item.tasks[setIndex][1].splice(taskIndex, 1);
            taskItem.remove();

            // Update indexes for remaining tasks
            $$all(card, `.tasks[data-set-index="${setIndex}"] .task-item`).forEach((el, idx) => {
              const doneInput = el.querySelector('.task-done');
              const removeBtn = el.querySelector('.remove-task');
              if (doneInput) doneInput.dataset.taskIndex = idx;
              if (removeBtn) removeBtn.dataset.taskIndex = idx;
            });

            updateTasksProgress(card, item, setIndex);
            saveItem(item);
          }
        }
      }, {once: true});

      updateTasksProgress(card, item, setIndex);
      saveItem(item);
    },
    '.remove-task': () => {
      const setIndex = parseInt(x.dataset.setIndex, 10);
      const taskIndex = parseInt(x.dataset.taskIndex, 10);

      if (setIndex >= 0 && setIndex < item.tasks.length &&
          taskIndex >= 0 && taskIndex < item.tasks[setIndex][1].length) {
        item.tasks[setIndex][1].splice(taskIndex, 1);
        x.closest('.task-item')?.remove();

        // Update indexes for remaining tasks in this set
        $$all(card, `.tasks[data-set-index="${setIndex}"] .task-item`).forEach((el, idx) => {
          const doneInput = el.querySelector('.task-done');
          const removeBtn = el.querySelector('.remove-task');
          if (doneInput) doneInput.dataset.taskIndex = idx;
          if (removeBtn) removeBtn.dataset.taskIndex = idx;
        });

        updateTasksProgress(card, item, setIndex);
        saveItem(item);
      }
    },
    '[type="checkbox"].task-done': () => {
      const setIndex = parseInt(x.dataset.setIndex, 10);
      const taskIndex = parseInt(x.dataset.taskIndex, 10);

      if (setIndex >= 0 && setIndex < item.tasks.length &&
          taskIndex >= 0 && taskIndex < item.tasks[setIndex][1].length) {
        item.tasks[setIndex][1][taskIndex][1] = x.checked;
        updateTasksProgress(card, item, setIndex);
        saveItem(item);
      }
    },
    '.remove-task-set': () => {
      const setIndex = parseInt(x.dataset.setIndex, 10);
      if (setIndex >= 0 && setIndex < item.tasks.length) {
        item.tasks.splice(setIndex, 1);
        x.closest('.tasks')?.remove();
        // Update indexes for remaining sets
        $$all(card, '.tasks').forEach((el, idx) => {
          el.dataset.setIndex = idx;
          $$all(el, '.add-task, .remove-task-set, .task-done, .remove-task').forEach(btn => {
            if (btn.dataset.setIndex) btn.dataset.setIndex = idx;
          });
        });
        saveItem(item);
      }
    }
  };
  for (const [selector, action] of Object.entries(actions)) {
    if (x.matches(selector)) {
      action();
      return;
    }
  }
  if (x.matches('.card button[lt_priority]')) {
    const open_toggle = $$(card, '[name="lt_cards"]'),
    picker = $$(card, '.priority_picker');
    if (open_toggle.checked === true){
      picker.classList.toggle('efy_hide_i');
    } else {
      open_toggle.click();
      if (picker.classList.contains('efy_hide_i')) picker.classList.remove('efy_hide_i');
    }
  }
});
$event($('#lt_drag_toggle'), 'change', e => {
  $('[lt_planner]').classList.toggle('lt_move');
});
/* Body Input Events */
$event(document.body, 'input', e => {
  const x = e.target;
  const parentCard = x.closest('.card');
  if (x.matches('.lt_views [name=lt_views]')) {
    efy_lt.view = x.id.replace('lt_views_', '');
    $lt_save(); return;
  }
  if (x.closest('.lt_goals_form .score')) {
    const scoreEl = x.closest('.score');
    const minInput = $$(scoreEl, '.min');
    const maxInput = $$(scoreEl, '.max');
    const progress = $$(scoreEl, 'progress');

    if (progress && minInput && maxInput) {
      // Parse values as numbers
      let min = parseFloat(minInput.value) || 0;
      let max = parseFloat(maxInput.value) || 1;

      // Ensure min doesn't exceed max
      if (min > max) {minInput.value = max; progress.value = max}
      else if (max < min) {progress.max = min}
      else {progress.value = min}
    }
  }
  // Move logic
  if (parentCard && parentCard.dataset.id) {
    if (x.matches('[lt_planner].lt_move .move_selected [name=lt_cards]')) {
      parentCard.classList.remove('move_selected');
    } else if (x.matches('[lt_planner].lt_move:not(:has(.move_selected)) [name=lt_cards]')) {
      parentCard.classList.add('move_selected');
    } else if (x.matches('[lt_planner].lt_move:has(.move_selected) .card:not(.move_selected) [name=lt_cards]')) {
      const selected = $('[lt_planner].lt_move .move_selected');
      const groupId = selected.closest('.lt_group').id.replace('lt_', '');
      const selectedId = selected.dataset.id;
      const targetId = parentCard.dataset.id;

      // Find the items in the goal.all array
      const selectedItem = goal.all.find(i => i.id === selectedId);
      const targetItem = goal.all.find(i => i.id === targetId);

      if (!selectedItem || !targetItem) return;

      // Find their positions in items_order array
      const selectedIndex = efy_lt.items_order.indexOf(selectedId);
      const targetIndex = efy_lt.items_order.indexOf(targetId);

      if (selectedIndex === -1 || targetIndex === -1) return;

      // Update items_order array
      efy_lt.items_order.splice(selectedIndex, 1);
      efy_lt.items_order.splice(targetIndex, 0, selectedId);

      // Update group if needed
      const newGroup = $$(parentCard.closest('.lt_group'), '.title').textContent;
      if (selectedItem.group !== newGroup) {
        selectedItem.group = newGroup;
        saveItem(selectedItem);
      }

      $lt_save(); App_goals.reload();
      $all(`#lt_${groupId} [name=lt_cards]`)[targetIndex]?.focus();
      return;
    }
  }
  // Editable group title
  if (x.matches('[lt_planner] .lt_group .header .title')) {
    const groupEl = x.closest('.lt_group');
    const oldName = groupEl.id.replace('lt_', '');
    const newName = x.textContent.trim();
    const newNameId = newName.replaceAll(' ', '_');
    if (newName && newNameId !== oldName) {
      const tx = db.transaction(['data'], 'readwrite');
      const store = tx.objectStore('data');
      goal.all.forEach(item => {
        if (item.group === oldName.replaceAll('_', ' ')) {
          item.group = newName;
          store.put(item);
        }
      });
      groupEl.id = 'lt_' + newNameId;
      $all(`label[for="group_${oldName}"]`).forEach(lbl => {
        lbl.setAttribute('for', 'group_' + newNameId);
        lbl.textContent = newName;
      });
      $all(`#group_${oldName}`).forEach(inp => {
        inp.id = 'group_' + newNameId;
      });
    }
    return;
  }
  if (parentCard?.dataset.id) {
    const itemId = parentCard.dataset.id;
    const index = goal.all.findIndex(i => i.id === itemId);
    const item = goal.all[index];
    if (!item) return;
    let changed = true;
    const updateItem = () => { if (changed) saveItem(item); };
    if (x.matches('.title')) {
      item.name = x.textContent;
    } else if (x.matches('.info .info')) {
      item.info = x.textContent;
    } else if (x.matches('.task-name')) {
      const container = x.closest('.task-item');
      const setIndex = parseInt(container.querySelector('.task-done')?.dataset.setIndex || '-1', 10);
      const taskIndex = parseInt(container.querySelector('.task-done')?.dataset.taskIndex || '-1', 10);

      if (setIndex >= 0 && setIndex < item.tasks.length &&
          taskIndex >= 0 && taskIndex < item.tasks[setIndex][1].length) {
        item.tasks[setIndex][1][taskIndex][0] = x.textContent.trim() || 'Unnamed Task';
        saveItem(item);
      }
    } else if (x.matches('.tasks .name')) {
      const setIndex = parseInt(x.closest('.tasks')?.dataset.setIndex || '-1', 10);
      if (setIndex >= 0 && setIndex < item.tasks.length) {
        item.tasks[setIndex][0] = x.textContent.trim() || 'Tasks';
        saveItem(item);
      }
    } else if (x.matches('.scores .min, .scores .max')) {
      const scoreEl = x.closest('.score');
      const progress = $$(scoreEl, 'progress');
      const scoreIndex = [...scoreEl.parentNode.children].indexOf(scoreEl);
      if (x.matches('.min')) {
        if (x.value > progress.max) x.value = progress.max;
        else if (x.value < 0) x.value = 0;
        progress.value = x.value;
        if (item.scores[scoreIndex]) item.scores[scoreIndex][1] = x.value;
      } else {
        if (x.value < progress.value) x.value = progress.value;
        progress.max = x.value;
        if (item.scores[scoreIndex]) item.scores[scoreIndex][2] = x.value;
      }
    } else if (x.matches('.scores .name')) {
      const scoreEl = x.closest('.score');
      const scoreIndex = [...scoreEl.parentNode.children].indexOf(scoreEl);
      if (item.scores[scoreIndex]) {
        item.scores[scoreIndex][0] = x.textContent.trim() || 'Unnamed';
      }
    } else if (x.matches('.phone_value, .email_value')) {
      const container = x.closest(x.matches('.phone_value') ? '.phone' : '.email');
      const label = $$(container, 'p:first-child').textContent;
      const field = x.matches('.phone_value') ? 'phones' : 'emails';
      const items = item[field] || [];
      const idx = items.findIndex(i => i[0] === label);
      if (idx !== -1) {
        items[idx][1] = x.textContent;
      }
    } else if (x.matches('.price_input, .quantity_input, .name')) {
      const priceEl = x.closest('.price');
      const priceIndex = priceEl.dataset.priceIndex;
      if (item.prices[priceIndex]) {
        if (x.matches('.price_input')) {
          item.prices[priceIndex][1] = x.value;
        } else if (x.matches('.quantity_input')) {
          item.prices[priceIndex][2] = x.value;
        } else if (x.matches('.name')) {
          item.prices[priceIndex][0] = x.value;
        }
        const priceValue = Number(item.prices[priceIndex][1]) || 0;
        const quantityValue = Number(item.prices[priceIndex][2]) || 1;
        const total = priceValue * quantityValue;
        $$(priceEl, '.total_price').textContent = `= ${format.currency(total)}`;
        const totalPricesEl = $$(parentCard, '.total_prices');
        if (totalPricesEl) {
          const totalPrice = item.prices.reduce((sum, price) => {
            const p = Number(price[1]) || 0;
            const q = Number(price[2]) || 1;
            return sum + (p * q);
          }, 0);
          $$(totalPricesEl, 'span').textContent = format.currency(totalPrice);
        }
        saveItem(item);
      }
    } else if (x.matches('.text_value, .number_value, .date_value, .color_value')) {
      const typeMap = {
        '.text_value': {field: 'texts', indexAttr: 'text-index'},
        '.number_value': {field: 'numbers', indexAttr: 'number-index'},
        '.date_value': {field: 'dates', indexAttr: 'date-index'},
        '.color_value': {field: 'colors', indexAttr: 'color-index'}
      };
      for (const [selector, config] of Object.entries(typeMap)) {
        if (x.matches(selector)) {
          const container = x.closest(`.${config.field.slice(0, -1)}`);
          const idx = container.dataset[config.indexAttr];
          if (item[config.field]?.[idx]) {
            item[config.field][idx][1] = x.value;
          }
          break;
        }
      }
    } else if (x.matches('.priority_picker input[type=radio]')) {
      item.priority = x.id.split('_')[1];
    } else if (x.matches('.priority_picker input[id*="priority_full_lt_"]')) {
      item.priority_full = x.checked;
    } else if (x.matches('.priority_picker input[id*="priority_tall_lt_"]')) {
      item.priority_tall = x.checked;
    } else if (x.matches('.priority_picker input[id*="priority_open_lt_"]')) {
      item.priority_open = x.checked;
    } else {
      changed = false;
    }
    updateItem();
  }
});
// Load data and initialize
const loadData = async () => {
  try {
    const data = await getAllFromDB('data');
    if (data?.length){ goal.all = data}
    else {
      goal.all = JSON.parse(JSON.stringify(lt_defaults));
      goal.all.forEach(item => item.id = item.id || generateId());
      const tx = db.transaction(['data'], 'readwrite');
      const store = tx.objectStore('data');
      goal.all.forEach(item => store.put(item));
    }
    const settings = await getFromDB('settings', SETTINGS_KEY);
    if (settings){
      efy_lt = { ...efy_lt, ...settings };
      // Initialize items_order if not exists
      if (!efy_lt.items_order) {
        efy_lt.items_order = goal.all.map(item => item.id);
        await setInDB('settings', efy_lt, SETTINGS_KEY);
      }
    } else { // First time setup
      efy_lt.items_order = goal.all.map(item => item.id);
      await setInDB('settings', efy_lt, SETTINGS_KEY);
    }
    // Apply tag colors
    if (efy_lt.tag_colors) {
      set_tag_colors(efy_lt.tag_colors);
      $add('div', {efy_color: efy_lt.tag_colors}, null, $('#lt_settings [efy_content=theme] .efy_hr_div'), 'afterend');
    }
    if (efy_lt.confirm_remove) $('#lt_confirm_remove').checked = true;
    if (efy_lt.clock){
      $('#lt_clock').checked = true;
      $add('div', {efy_clock: ''}, null, $('.lt_nav .lt_left'), 'afterbegin');
    }
    if (efy_lt.priority_match) {
      $('#lt_priority_custom').checked = true;
      $('[lt_planner]').classList.add('priority_color');
    }
    if (!efy_lt.add_fields_text) {
      $('#lt_add_fields_text').checked = false;
      $('#lt_add_form').classList.add('lt_text');
    }
    if (!efy_lt.add_fields_gap) {
      $('#lt_add_fields_gap').checked = false;
      $('#lt_add_form').classList.add('lt_gap');
    }
    if (!efy_lt.add_fields_header) {
      $('#lt_add_fields_header').checked = false;
      $('#lt_add_form').classList.add('lt_header');
    }
    if (efy_lt.add_fields_start_open) {
      $('#lt_add_fields_start_open').checked = true;
    }
    if (!efy_lt.add_fields_header || efy_lt.add_fields_start_open){
      $('#lt_add_form').open = true;
    }
    if (efy_lt.progress_height){
      $('#lt_progress_height').value = efy_lt.progress_height;
      $root.style.setProperty(`---lt_progress_height`, efy_lt.progress_height + 'rem');
    }
    if (efy_lt.compact){
      $('#lt_body').classList.add('lt_compact');
      $('#lt_compact').checked = true;
    }

    $lt_save =()=>{ setInDB('settings', efy_lt, SETTINGS_KEY).catch(console.error)};

    // Create groups in saved order
    const currentGroups = new Set(goal.all.map(i => i.group || 'Items'));
    let orderedGroups = [];
    if (efy_lt.groups_order && Array.isArray(efy_lt.groups_order)) {
      efy_lt.groups_order.forEach(group => {
        if (currentGroups.has(group) && !orderedGroups.includes(group)) {
          orderedGroups.push(group);
        }
      });
      currentGroups.forEach(group => {
        if (!orderedGroups.includes(group)) orderedGroups.push(group);
      });
    } else {
      orderedGroups = [...currentGroups];
      efy_lt.groups_order = orderedGroups;
      $lt_save();
    }
    orderedGroups.forEach(name => add_group_fn(name));

    App_goals.start();
  }
  catch (error) { $notify('short', 'Error Loading Data', error) }
};
initDB().then(loadData).catch(console.error);