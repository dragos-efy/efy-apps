/*default data*/ if (localStorage.efy_mn === undefined){ localStorage.efy_mn = '[{"description": "Test Income","quantity":"1","amount":100000,"date":"25/04/2023"}, {"description":"Test Expense","quantity":"1","amount":-50000,"date":"25/04/2023"}]'};

/*Variables*/ const mn_modal = { toggle(){ $('.modal-overlay').classList.toggle('active')} },

mn_storage = {
    get(){ return JSON.parse(localStorage.efy_mn) || []},
    set(transactions){ localStorage.efy_mn = JSON.stringify(transactions) }
},

Transaction = { all: mn_storage.get(),
    add(transaction){ Transaction.all.push(transaction); App.reload()},
    remove(index){ Transaction.all.splice(index, 1); App.reload() },
    incomes(){ let income = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {income += transaction.amount}
        })
        return income;
    },
    expenses(){ let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0){ expense += transaction.amount}
        })
        return expense;
    },
    total(){ return Transaction.incomes() + Transaction.expenses()}
},

mn_table = {

    add_transaction(transaction, index){ const CSSClass = transaction.amount > 0 ? 'income' : 'expense', amount = format.currency(transaction.amount);
        $add('tr', {class: 'mn_row', efy_searchable: ''}, [
            $add('td', {class: 'description'}, [transaction.description]),
            $add('td', {class: 'quantity'}, [transaction.quantity]),
            $add('td', {class: CSSClass}, [amount]),
            $add('td', {class: 'date'}, [transaction.date]),
            $add('td', {}, [ $add('button', {class: 'efy_square_btn', onClick: `Transaction.remove(${index})`}, [ $add('i', {efy_icon: 'remove'}) ]) ])
        ], $('.mn_table tbody'));
    },
    updateBalance() { let perc = ((Transaction.incomes() + Transaction.expenses()) / Transaction.incomes() * 100).toFixed(2);
        $('#incomeDisplay').innerHTML = format.currency(Transaction.incomes());
        $('#expenseDisplay').innerHTML = format.currency(Transaction.expenses());
        $('#totalDisplay').innerHTML = format.currency(Transaction.total());
        $('#percentageDisplay').innerHTML = perc + '%'; $('.percentageDisplay progress').value = perc;
    },
    clear_transactions(){ $('.mn_table tbody').innerHTML = ''}
},

format = { amount(value){ return Number(value) * 100 },
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

mn_form = { description: $('#description'), quantity: $('#quantity'), amount: $('#amount'), date: $('#date'),

    get_values(){ return { description: mn_form.description.value, quantity: mn_form.quantity.value, amount: mn_form.amount.value, date: mn_form.date.value }},

    validateFields(){ const { description, quantity, amount, date } = mn_form.get_values();
        if (description.trim() === '' || quantity.trim() === '' || amount.trim() === '' || date.trim() === ''){
            throw new Error('Fill in the required fields');
        }
    },
    data(){ let { description, quantity, amount, date } = mn_form.get_values();
        amount = format.amount(amount);
        date = format.date(date);
        return ({description, quantity, amount, date})
    },
    save_transaction(transaction){ Transaction.add(transaction)},
    clear_fields(){ mn_form.description.value = ''; mn_form.quantity.value = '1'; mn_form.amount.value = ''; mn_form.date.value = ''},
    submit(event){ event.preventDefault();
        try {
            mn_form.validateFields();
            const transaction = mn_form.data(); console.log(transaction);
            mn_form.save_transaction(transaction);
            mn_form.clear_fields();
            mn_modal.toggle();
        } catch (error){ console.log(error.message)}
    }
},

App = {
    start(){ Transaction.all.forEach(mn_table.add_transaction); mn_table.updateBalance(); mn_storage.set(Transaction.all) },
    reload(){ mn_table.clear_transactions(); App.start()}
}; App.start();



/*Add menu when ready*/ $ready('#efy_sbtheme', ()=>{

$add('details', {id: 'mn_settings'}, [
  $add('summary', {}, [$add('i', {efy_icon: 'group'}), $add('p', {efy_lang: 'money'}), $add('mark', {efy_lang: 'alpha'})]),
        $add('div', {efy_tabs: 'mn_menu', efy_select: ''}, [
            /*Tabs*/
            $add('button', {efy_tab: 'backup', efy_lang: 'backup', efy_active: ''}),
            $add('button', {efy_tab: 'grid', efy_lang: 'grid'}),
            $add('button', {efy_tab: 'tags', efy_lang: 'tags'}),
            /*Content*/
            $add('div', {efy_content: 'backup', efy_select: '', id: 'mn_backup', efy_active: ''}, [
                $add('a', {role: 'button', class: 'mn_localstorage_export', efy_lang: 'save'}, [$add('i', {efy_icon: 'arrow_down'})]),
                $add('label', {efy_upload: 'mn_localstorage_import, .json'}),
                $add('button', {class: 'mn_localstorage_reset', efy_lang: 'reset'}, [$add('i', {efy_icon: 'reload'})])
            ]),
            $add('div', {efy_content: 'grid', efy_select: '', id: 'mn_grid'}, [
                $add('div', {}, ['Coming soon...'])
            ]),
            $add('div', {efy_content: 'tags', efy_select: '', id: 'mn_tags'}, [
                $add('div', {}, ['Coming soon...'])
            ]),
        ])
], $('#efy_sbtheme'), 'beforebegin');


$wait(2, ()=>{
    /*Export Settings*/ $event($('.mn_localstorage_export'), 'click', ()=>{ let e = $('.mn_localstorage_export'), f = localStorage.efy_mn.replaceAll('  ', '').replaceAll(',"', ', "').replaceAll('"},', '"},\n').replaceAll('":', '": ');
    e.href = URL.createObjectURL(new Blob([f], {type: 'application/json'})); e.setAttribute('download', 'efy_money.json'); console.log('hi') });

    /*Import Settings*/ let efy_ls_import = $('#mn_localstorage_import'); $event(efy_ls_import, 'change', ()=>{ let file = efy_ls_import.files[0], read = new FileReader();
	read.onload =()=>{localStorage.efy_mn = read.result; location.reload()}; read.readAsText(file)});

    /*Reset Settings*/ $all(".mn_localstorage_reset").forEach(x =>{ x.onclick =()=>{ Object.entries(localStorage).forEach(([k])=>{ if (k.includes('efy_mn')){ localStorage.removeItem(k)}}); location.reload()}});
});

/*Search Transactions*/ $add('input', {id: 'mn_search', type: 'text', placeholder: 'Search...', efy_search_input:''}, [], $('.mn_nav div'), 'beforeend');
$body.setAttribute('efy_search','#data-table tr:not(.efy_ignore_search)');

/*Alpha*/for (let a =['#mn_settings > summary'], i=0; i<a.length; i++){ }

});