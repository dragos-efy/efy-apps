$ready('#efy_sbtheme', ()=>{

$add('div', {id: 'cc_calculator', class: 'efy_trans_filter'}, [
    ['input', {type: 'text', id: 'display', readonly: '', placeholder: 'efy calculator'}],
    ['div', {id: 'buttons', class: 'cc_buttons'}]
]);

for (let a = '% / * - + 7 8 9 ( ) 4 5 6 x² √ 1 2 3 π CE . 0 = C'.split(' '), b = 'pct div mul sub add 7 8 9 ptleft ptright 4 5 6 exp sqrt 1 2 3 pi bksp period 0 equal del'.split(' '), i = 0; i < a.length; i++){
    $add('button', {id: b[i]}, [a[i]], $('#cc_calculator .cc_buttons'));
} $add('button', {id: 'expand'}, [['i', {efy_icon: 'arrow_down'}]], $('#cc_calculator .cc_buttons #equal'), 'beforebegin');


const display = $('#display'),

is_operator =(value)=>{ return ['+', '-', '*', '/'].includes(value)},

precedence =(a)=>{ switch (a){ case '+': ; case '-': return 1; case '*': ; case '/': return 2; default: return 0 }},

calculate =(a, b, c)=>{ let result; switch (c){
    case '+': result = a + b; break; case '-': result = a - b; break; case '*': result = a * b; break; case '/': result = a / b; break; default: throw new Error('Invalid operator')}; return result
},

evaluate =(a)=>{ const regex = /(\d+(\.\d*)?|\.\d+|[+\-*/()]|-?\d+(\.\d*)?|-?\.\d+)/g, tokens = a.match(regex); let op_stack = [], op_and_stack = [];

  tokens.forEach((token, index) => {
    if (is_operator(token)){
      // Handle negative numbers
      if (token === '-' && (index === 0 || is_operator(tokens[index - 1]) || tokens[index - 1] === '(')){
        op_and_stack.push('-1');
        op_stack.push('*');
      } else {
        while (op_stack.length > 0 && precedence(token) <= precedence(op_stack[op_stack.length - 1])){
          const op = op_stack.pop(), op2 = parseFloat(op_and_stack.pop()), op1 = parseFloat(op_and_stack.pop());
          op_and_stack.push(calculate(op1, op2, op));
        }
        op_stack.push(token);
      }
    } else if (token === '('){ op_stack.push(token)}
    else if (token === ')'){
      while (op_stack.length > 0 && op_stack[op_stack.length - 1] !== '('){
        const op = op_stack.pop(), op2 = parseFloat(op_and_stack.pop()), op1 = parseFloat(op_and_stack.pop());
        op_and_stack.push(calculate(op1, op2, op));
      }
      op_stack.pop(); // Remove the '('
    } else { op_and_stack.push(token)}
  });

  while (op_stack.length > 0){
    const op = op_stack.pop(), op2 = parseFloat(op_and_stack.pop()), op1 = parseFloat(op_and_stack.pop());
    op_and_stack.push(calculate(op1, op2, op));
  }

  return op_and_stack[0];
};


/*Button Actions*/ $('#buttons').addEventListener('click', (event)=>{ const target = event.target;
  if (target.tagName === 'BUTTON'){ const value = target.textContent;
    if (value === 'C'){ display.value = ''} else if (value === '='){ display.value = evaluate(display.value)}
    else if (value === 'π'){ display.value += 3.14159} else if (value === '√'){ display.value = Math.sqrt(display.value)} else if (value === 'x²'){ display.value = display.value ** 2}
    else if (value === 'CE'){ display.value = display.value.slice(0, -1)} else if (value === '%'){ display.value *= 0.01;}
    else {display.value += value}
  }
});


/*Keyboard Keys*/ $event(document, 'keydown', (event)=>{ switch (event.key){
  /*Numbers*/ case '1': display.value += 1; break; case '2': display.value += 2; break; case '3': display.value += 3; break; case '4': display.value += 4; break; case '5': display.value += 5; break; case '6': display.value += 6; break; case '7': display.value += 7; break; case '8': display.value += 8; break; case '9': display.value += 9; break; case '0': display.value += 0; break;
  /*Symbols*/ case '+': display.value += '+'; break; case '-': display.value += '-'; break; case '*': display.value += '*'; break; case '/': display.value += '/'; break; case '%': display.value *= 0.01; break; case '(': display.value += '('; break; case ')': display.value += ')'; break; case '.': display.value += '.'; break; case ',': display.value += '.'; break;
  /*Actions*/ case 'Enter': display.value = evaluate(display.value); break; case 'Delete': display.value = ''; break; case 'Backspace': display.value = display.value.slice(0, -1); break;
  /*Do nothing for other keys*/ default:
}});


}, 1);