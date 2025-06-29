$ready('#efy_sbtheme', ()=>{

$add('div', {id: 'mn_body', efy_search: '#data_table tr:not(.efy_ignore_search)'}, [
    ['div', {id: 'balance'}, [
        ['div', {efy_card: ''}, [
            ['h6', {efy_lang: 'total'}],
            ['h4', {id: 'totalDisplay'}, '$0,00']
        ]],
        ['div', {efy_card: ''}, [
            ['h6', {efy_lang: 'income'}],
            ['h4', {id: 'incomeDisplay'}, '$0,00']
        ]],
        ['div', {efy_card: ''}, [
            ['h6', {efy_lang: 'expenses'}],
            ['h4', {id: 'expenseDisplay'}, '$0,00']
        ]],
        ['div', {efy_card: '', class: 'percentageDisplay'}, [
            ['div', [
                ['h6', {efy_lang: 'left_'}],
                ['h6', {id: 'percentageDisplay'}, '0%']
            ]],
            ['progress', {value: 100, max: 100}]
        ]]
    ]],

    ['div', {class: 'mn_nav'}, [
        ['div', {style: 'display: flex; gap: var(---gap-x);'}, [
            ['button', {class: 'button new efy_square_btn'}, [['i', {efy_icon: 'plus'}]]],
            ['input', {id: 'mn_search', type: 'text', placeholder: 'Search...', efy_search_input:'', name: 'mn_search_input'}]
        ]],
        ['button', {efy_sidebar_btn: '', class: 'efy_square_btn'}, [['i', {efy_icon: 'menu'}]]]
    ]],

    ['div', {class: 'modal_overlay'}, [
        ['div', {class: 'modal', efy_card: ''}, [
            ['div', {class: 'form'}, [
                ['form', {action: '#'}, [
                    ['div', {class: 'input_group actions'}, [
                        ['h6', {efy_lang: 'transaction'}],
                        ['div', {class: 'buttons'}, [
                            ['button', {efy_lang: 'save'}],
                            ['button', {href: '#', class: 'button cancel efy_square_btn'}, [['i', {efy_icon: 'remove'}]]]
                        ]]
                    ]],
                    ['div', {class: 'modal_grid'}, [
                        ['div', {class: 'input_group'}, [
                            ['label', {for: 'description', efy_lang: 'description', class: 'efy_trans_filter'}],
                            ['input', {type: 'text', id: 'description', name: 'description'}]
                        ]],
                        ['div', {class: 'input_group'}, [
                            ['label', {for: 'quantity', efy_lang: 'quantity', class: 'efy_trans_filter'}],
                            ['input', {type: 'number', step: 'any', id: 'quantity', name: 'quantity', placeholder: 1, value: 1}]
                        ]],
                        ['div', {class: 'input_group'}, [
                            ['label', {for: 'price', efy_lang: 'price', class: 'efy_trans_filter'}],
                            ['input', {type: 'number', step: 'any', id: 'price', name: 'price', placeholder: '0.00'}]
                        ]],
                        ['div', {class: 'input_group'}, [
                            ['label', {for: 'date', efy_lang: 'date', class: 'efy_trans_filter'}],
                            ['input', {type: 'date', id: 'date', name: 'date'}]
                        ]],
                        ['div', {class: 'input_group'}, [
                            ['label', {for: 'category', efy_lang: 'tags', class: 'efy_trans_filter'}],
                            ['input', {type: 'text', id: 'category', name: 'category', placeholder: 'coming soon...', disabled: ''}]
                        ]]
                    ]]
                ]]
            ]]
        ]]
    ]],

    ['table', {id: 'data_table', class: 'mn_table efy-glass'}, [
        ['thead', [
            ['tr', {class: 'mn_row efy_ignore_search'}, [
                ['td', {class: 'description', efy_lang: 'description'}],
                ['td', {class: 'quantity', efy_lang: 'quantity'}],
                ['td', {class: 'income', efy_lang: 'price'}],
                ['td', {class: 'date', efy_lang: 'date'}],
                ['td']
            ]]
        ]],
        ['tbody']
    ]],
]);

$add('details', {id: 'mn_settings', class: 'eos_menu'}, [
    ['summary', [['i', {efy_icon: 'group'}], ['p', {efy_lang: 'money'}], ['mark', {efy_lang: 'beta'}]]],
    ['div', {efy_tabs: 'mn_menu', efy_select: ''}, [
        ['div', {class: 'efy_tabs'}, [
            ['input', {type:'radio', id: 'mn_tab_backup', efy_tab: 'backup', efy_active: ''}],
            ['label', {for: 'mn_tab_backup', efy_lang: 'backup'}],
            ['input', {type:'radio', id: 'mn_tab_grid', efy_tab: 'grid'}],
            ['label', {for: 'mn_tab_grid', efy_lang: 'grid'}],
            ['input', {type:'radio', id: 'mn_tab_tags', efy_tab: 'tags'}],
            ['label', {for: 'mn_tab_tags', efy_lang: 'tags'}]
        ]],
        ['div', {efy_content: 'backup', efy_select: '', id: 'mn_backup', efy_active: ''}, [
            ['a', {role: 'button', class: 'mn_localstorage_export', efy_lang: 'save'}, [['i', {efy_icon: 'arrow_down'}]]],
            ['label', {efy_upload: 'mn_localstorage_import, .json'}],
            ['button', {class: 'mn_localstorage_reset', efy_lang: 'reset'}, [['i', {efy_icon: 'reload'}]]]
        ]],
        ['div', {efy_content: 'grid', efy_select: '', id: 'mn_grid'}, [
            ['div', {efy_lang: 'coming_soon'}]
        ]],
        ['div', {efy_content: 'tags', efy_select: '', id: 'mn_tags'}, [
            ['div', {efy_lang: 'coming_soon'}]
        ]],
    ]]
], $('#efy_sbtheme'), 'beforebegin');

/*default data*/ if (localStorage.efy_mn === undefined){
    localStorage.efy_mn = '[{"description": "Test Income","quantity":"1","price":100000,"date":"25/04/2023"}, {"description":"Test Expense","quantity":"1","price":-50000,"date":"25/04/2023"}]'
};

/*Variables*/ const mn_modal = { toggle(){ $('.modal_overlay').classList.toggle('active'); $('.modal_grid #description').focus() } },

mn_storage = {
    get(){ return JSON.parse(localStorage.efy_mn) || []},
    set(transactions){ localStorage.efy_mn = JSON.stringify(transactions) }
},

Transaction = { all: mn_storage.get(),
    add(transaction){ Transaction.all.push(transaction); App.reload()},
    remove(index){ Transaction.all.splice(index, 1); App.reload() },
    incomes(){ let income = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.price > 0) {income += transaction.price}
        })
        return income;
    },
    expenses(){ let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.price < 0){ expense += transaction.price}
        })
        return expense;
    },
    total(){ return Transaction.incomes() + Transaction.expenses()}
},

mn_table = {

    add_transaction(transaction, index){ const CSSClass = transaction.price > 0 ? 'income' : 'expense', price = format.currency(transaction.price);
        $add('tr', {class: 'mn_row', efy_searchable: ''}, [
            ['td', {class: 'description'}, transaction.description],
            ['td', {class: 'quantity'}, transaction.quantity],
            ['td', {class: CSSClass}, price],
            ['td', {class: 'date'}, transaction.date],
            ['td', [['button', {class: 'efy_square_btn', onClick: `Transaction.remove(${index})`}, [['i', {efy_icon: 'remove'}]]]]]
        ], $('.mn_table tbody'));
    },
    update_balance() { let perc = ((Transaction.incomes() + Transaction.expenses()) / Transaction.incomes() * 100).toFixed(2);
        $('#incomeDisplay').innerHTML = format.currency(Transaction.incomes());
        $('#expenseDisplay').innerHTML = format.currency(Transaction.expenses());
        $('#totalDisplay').innerHTML = format.currency(Transaction.total());
        $('#percentageDisplay').innerHTML = perc + '%'; $('.percentageDisplay progress').value = perc;
    },
    clear_transactions(){ $('.mn_table tbody').innerHTML = ''}
},

format = { price(value){ return Number(value) * 100 },
    date(date){ const split_date = date.split('-');
        return `${split_date[2]}/${split_date[1]}/${split_date[0]}`;
    },
    currency(value){ const signal = Number(value) < 0 ? "-" : "";
        value = String(value).replace(/\D/g, "");
        value = value / 100;
        value = value.toLocaleString("en-GB", {style: 'currency', currency: 'eur'})
        return signal + value;
    }
},

mn_form = { description: $('#description'), quantity: $('#quantity'), price: $('#price'), date: $('#date'),

    get_values(){ return {
        description: mn_form.description.value,
        quantity: mn_form.quantity.value,
        price: mn_form.price.value,
        date: mn_form.date.value
    }},

    validateFields(){ const { description, quantity, price, date } = mn_form.get_values();
        if (description.trim() === '' || quantity.trim() === '' || price.trim() === '' || date.trim() === ''){
            $notify(5, 'Keep going', 'Fill in the required fields'); throw new Error('Fill in the required fields');
        }
    },
    data(){ let { description, quantity, price, date } = mn_form.get_values();
        price = format.price(price);
        date = format.date(date);
        return ({description, quantity, price, date})
    },
    save_transaction(transaction){ Transaction.add(transaction)},
    clear_fields(){ mn_form.description.value = ''; mn_form.quantity.value = '1'; mn_form.price.value = ''; mn_form.date.value = ''},
    submit(event){ event.preventDefault();
        // try {
            console.log(mn_form.validateFields());
            mn_form.validateFields();
            const transaction = mn_form.data(); console.log(transaction);
            mn_form.save_transaction(transaction);
            mn_form.clear_fields();
            mn_modal.toggle();
        // } catch (error){ console.log(error.message)}
    }
},

App = {
    start(){ Transaction.all.forEach(mn_table.add_transaction); mn_table.update_balance(); mn_storage.set(Transaction.all) },
    reload(){ mn_table.clear_transactions(); App.start()}
};

App.start();

$all('.mn_nav .new, .form .actions .cancel').forEach(x =>{
    $event(x, 'click', ()=>{
        event.preventDefault();
        mn_modal.toggle();
    })
});

$event($('.modal .form form'), 'submit', ()=>{ mn_form.submit(event) });

$ready('.mn_localstorage_reset', ()=>{
    /*Export Settings*/ $event($('.mn_localstorage_export'), 'click', ()=>{ let e = $('.mn_localstorage_export'), f = localStorage.efy_mn.replaceAll('  ', '').replaceAll(',"', ', "').replaceAll('"},', '"},\n').replaceAll('":', '": ');
    e.href = URL.createObjectURL(new Blob([f], {type: 'application/json'})); e.setAttribute('download', 'efy_money.json'); console.log('hi') });

    /*Import Settings*/ let efy_ls_import = $('#mn_localstorage_import'); $event(efy_ls_import, 'change', ()=>{ let file = efy_ls_import.files[0], read = new FileReader();
	read.onload =()=>{localStorage.efy_mn = read.result; location.reload()}; read.readAsText(file)});

    /*Reset Settings*/ $all(".mn_localstorage_reset").forEach(x =>{ x.onclick =()=>{ Object.entries(localStorage).forEach(([k])=>{ if (k.includes('efy_mn')){ localStorage.removeItem(k)}}); location.reload()}});
}, 1);

/*2 Decimals & Remove final 0 digits on Blur*/ $all('#price, #quantity').forEach(a=>{ $event(a, 'blur', ()=>{
    let b = parseFloat(a.value); if (!isNaN(b)){ a.value = b.toFixed(2).replace(/(?<=\d[1-9])0(?=\d)|\.0+$/g, '').replace(/(\.\d*?[1-9])0+$/g, '\$1');}
})});

}, 1);