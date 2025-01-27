$add('div', {class: 'container'}, [
    ['div', {class: 'efy_flex fifth'}, [
        ['button', {id: 'copy', class: 'efy_square_btn', title: 'copy'}, [['i', {efy_icon: 'paste'}]]],
        ['input', {type: 'number', id: 'value1', placeholder: 'Number', oninput: 'convert()'}],
        ['button', {id: 'copy', class: 'efy_square_btn', title: 'copy'}, [['i', {efy_icon: 'chevron'}]]],
        ['input', {type: 'text', id: 'result', placeholder: 'Result'}],
        ['button', {id: 'copy', class: 'efy_square_btn', title: 'copy'}, [['i', {efy_icon: 'copy'}]]],
    ]],
    ['div', {class: 'efy_flex third'}, [
        ['select', {id: 'unit1', onchange: 'updateUnitOptions(); convert();'}, [
            ['option', {value: 'm'}, 'Meters'],
            ['option', {value: 'km'}, 'Kilometers'],
            ['option', {value: 'cm'}, 'Centimeters'],
            ['option', {value: 'dm'}, 'Decimeters'],
            ['option', {value: 'g'}, 'Grams'],
            ['option', {value: 'kg'}, 'Kilograms'],
            ['option', {value: 'l'}, 'Liters'],
            ['option', {value: 'ml'}, 'Milliliters'],
            ['option', {value: 'c'}, 'Celsius'],
            ['option', {value: 'f'}, 'Fahrenheit'],
            ['option', {value: 'k'}, 'Kelvin'],
            ['option', {value: 'psi'}, 'Pounds per Square Inch'],
            ['option', {value: 'bar'}, 'Bar'],
            ['option', {value: 'ft'}, 'Feet'],
            ['option', {value: 'in'}, 'Inches'],
            ['option', {value: 'mi'}, 'Miles'],
            ['option', {value: 'kmh'}, 'Kilometers per Hour'],
            ['option', {value: 'sqm'}, 'Square Meters'],
            ['option', {value: 'cbm'}, 'Cubic Meters']
        ]],
        ['button', {id: 'invert_units', class: 'efy_square_btn', onclick: 'invertUnits()', title: 'invert units'}, [
            ['i', {efy_icon: 'chevron_left'}], ['i', {efy_icon: 'chevron'}]
        ]],
        ['select', {id: 'unit2', onchange: 'convert();'}, [
            ['option', {value: 'km'}, 'Kilometers'],
            ['option', {value: 'm'}, 'Meters'],
            ['option', {value: 'cm'}, 'Centimeters'],
            ['option', {value: 'dm'}, 'Decimeters'],
            ['option', {value: 'kg'}, 'Kilograms'],
            ['option', {value: 'g'}, 'Grams'],
            ['option', {value: 'l'}, 'Liters'],
            ['option', {value: 'ml'}, 'Milliliters'],
            ['option', {value: 'f'}, 'Fahrenheit'],
            ['option', {value: 'c'}, 'Celsius'],
            ['option', {value: 'k'}, 'Kelvin'],
            ['option', {value: 'psi'}, 'Pounds per Square Inch'],
            ['option', {value: 'bar'}, 'Bar'],
            ['option', {value: 'ft'}, 'Feet'],
            ['option', {value: 'in'}, 'Inches'],
            ['option', {value: 'mi'}, 'Miles'],
            ['option', {value: 'kmh'}, 'Kilometers per Hour'],
            ['option', {value: 'sqm'}, 'Square Meters'],
            ['option', {value: 'cbm'}, 'Cubic Meters']
        ]],
    ]]
]);


////


function convert() {
    const value = parseFloat(document.getElementById('value1').value);
    const unit1 = document.getElementById('unit1').value;
    const unit2 = document.getElementById('unit2').value;
    let result;

    if (isNaN(value)) {
        document.getElementById('result').value = 'Type a number...';
        return;
    }

    // Length conversions
    if (unit1 === 'm' && unit2 === 'km') result = value / 1000;
    else if (unit1 === 'm' && unit2 === 'cm') result = value * 100;
    else if (unit1 === 'm' && unit2 === 'dm') result = value * 10;
    else if (unit1 === 'km' && unit2 === 'm') result = value * 1000;
    else if (unit1 === 'cm' && unit2 === 'm') result = value / 100;
    else if (unit1 === 'dm' && unit2 === 'm') result = value / 10;
    else if (unit1 === 'ft' && unit2 === 'm') result = value * 0.3048;
    else if (unit1 === 'm' && unit2 === 'ft') result = value / 0.3048;
    else if (unit1 === 'in' && unit2 === 'm') result = value * 0.0254;
    else if (unit1 === 'm' && unit2 === 'in') result = value / 0.0254;
    else if (unit1 === 'mi' && unit2 === 'km') result = value * 1.60934;
    else if (unit1 === 'km' && unit2 === 'mi') result = value / 1.60934;
    else if (unit1 === 'cm' && unit2 === 'in') result = value / 2.54;
    else if (unit1 === 'in' && unit2 === 'cm') result = value * 2.54;

    // Area conversions
    else if (unit1 === 'sqm' && unit2 === 'cbm') result = value; // Assuming height of 1m for simplicity
    else if (unit1 === 'cbm' && unit2 === 'sqm') result = value; // Assuming height of 1m for simplicity

    // Weight conversions
    else if (unit1 === 'kg' && unit2 === 'g') result = value * 1000;
    else if (unit1 === 'g' && unit2 === 'kg') result = value / 1000;
    else if (unit1 === 'kg' && unit2 === 'lbs') result = value * 2.20462;
    else if (unit1 === 'lbs' && unit2 === 'kg') result = value / 2.20462;

    // Volume conversions
    else if (unit1 === 'l' && unit2 === 'ml') result = value * 1000;
    else if (unit1 === 'ml' && unit2 === 'l') result = value / 1000;

    // Temperature conversions
    else if (unit1 === 'c' && unit2 === 'f') result = (value * 9/5) + 32;
    else if (unit1 === 'f' && unit2 === 'c') result = (value - 32) * 5/9;
    else if (unit1 === 'c' && unit2 === 'k') result = value + 273.15;
    else if (unit1 === 'k' && unit2 === 'c') result = value - 273.15;
    else if (unit1 === 'f' && unit2 === 'k') result = (value - 32) * 5/9 + 273.15;
    else if (unit1 === 'k' && unit2 === 'f') result = (value - 273.15) * 9/5 + 32;

    // Pressure conversions
    else if (unit1 === 'psi' && unit2 === 'bar') result = value * 0.0689476;
    else if (unit1 === 'bar' && unit2 === 'psi') result = value / 0.0689476;

    document.getElementById('result').value = `${result.toFixed(2)} ${unit2}`;
}

function updateUnitOptions() {
    const unit1 = document.getElementById('unit1').value;
    const unit2 = document.getElementById('unit2');
    const options = unit2.options;

    // Show all options initially
    for (let i = 0; i < options.length; i++) {
        options[i].style.display = 'block'; // Show all options initially
    }

    // Hide options that cannot be converted from the selected unit
    for (let i = 0; i < options.length; i++) {
        options[i].style.display = 'none'; // Hide all options initially
    }

    // Define possible conversions
    const conversionMap = {
        'm': ['km', 'cm', 'dm', 'ft', 'in', 'sqm', 'cbm'],
        'km': ['m', 'mi', 'sqm', 'cbm'],
        'cm': ['m', 'in'],
        'dm': ['m'],
        'ft': ['m', 'in'],
        'in': ['m', 'cm'],
        'mi': ['km'],
        'g': ['kg'],
        'kg': ['g', 'lbs'],
        'l': ['ml'],
        'ml': ['l'],
        'c': ['f', 'k'],
        'f': ['c', 'k'],
        'k': ['c', 'f'],
        'psi': ['bar'],
        'bar': ['psi'],
        'sqm': ['cbm'],
        'cbm': ['sqm'],
        'kmh': ['m/s'], // Example for speed conversion
    };

    // Show only the options that can be converted from the selected unit
    if (conversionMap[unit1]) {
        conversionMap[unit1].forEach(unit => {
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === unit) {
                    options[i].style.display = 'block'; // Show valid options
                }
            }
        });
    }

    // Check if the currently selected unit2 is still valid
    const currentUnit2 = unit2.value;
    let validUnitFound = false;

    for (let i = 0; i < options.length; i++) {
        if (options[i].style.display === 'block') {
            if (currentUnit2 === options[i].value) {
                validUnitFound = true; // Current unit2 is valid
                break;
            }
        }
    }

    if (!validUnitFound) {
        // If the current unit2 is not valid, change it to the first available option
        for (let i = 0; i < options.length; i++) {
            if (options[i].style.display === 'block') {
                unit2.value = options[i].value; // Set to the first valid option
                break;
            }
        }
    }

    convert(); // Convert after updating options
}

function invertUnits() {
    const unit1 = document.getElementById('unit1');
    const unit2 = document.getElementById('unit2');
    const temp = unit1.value;
    unit1.value = unit2.value;
    unit2.value = temp;

    // Check for compatibility after inversion
    updateUnitOptions(); // Update options after inversion
    const currentUnit2 = unit2.value;
    let validUnitFound = false;

    for (let i = 0; i < unit2.options.length; i++) {
        if (unit2.options[i].style.display === 'block') {
            if (currentUnit2 === unit2.options[i].value) {
                validUnitFound = true; // Current unit2 is valid
                break;
            }
        }
    }

    if (!validUnitFound) {
        // If the current unit2 is not valid, change it to the first available option
        for (let i = 0; i < unit2.options.length; i++) {
            if (unit2.options[i].style.display === 'block') {
                unit2.value = unit2.options[i].value; // Set to the first valid option
                break;
            }
        }
    }

    convert(); // Convert after inversion
}