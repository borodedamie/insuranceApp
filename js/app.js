//Variables 
const form = document.getElementById('request-quote');
const html = new HTMLUI();


//Event Listeners
eventListeners();
function eventListeners() {

    document.addEventListener('DOMContentLoaded', function() {
        //create options
        
        html.displayYears();
    });
    
    form.addEventListener('submit', function(e){
        e.preventDefault();
    
        const make = document.getElementById('make').value;
        const year = document.getElementById('year').value;
        const level = document.querySelector('input[name="level"]:checked').value;

        if(make === '' || year === '' || level === '') {
            html.displayError('All fields are mandatory');
        } else {

            const prevResult = document.querySelector('#result div');
            if(prevResult != null) {
                prevResult.remove();
            }
            //make quotation
            const insurance = new Insurance(make, year, level);
            const price = insurance.calculateQuotation(insurance);

            html.showResult(price, insurance);
        }
    });
}



//Objects
function Insurance(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;

}

Insurance.prototype.calculateQuotation = function(insurance) {
    let price;
    const base = 2000;

    const make = insurance.make;

    /* 
        1 = american 15%
        2 = asian 05%
        3 = european 35%
    
    */

    switch(make) {
        case '1':
            price = base * 1.15;
        break;

        case '2':
            price = base * 1.05;
        break;

        case '3':
            price = base * 1.35;
        break;
    }

    const year = insurance.year;

    const difference = this.getYearDifference(year);

    price = price - ((difference * 3) * price) / 100;

    const level = insurance.level;

    price = this.calculateLevel(price, level);
}

Insurance.prototype.getYearDifference = function(year) {
    return new Date().getFullYear() - year;
}

Insurance.prototype.calculateLevel = function(price, level) {
    if(level === basic) {
        price = price * 1.30;
    } else {
        price = price * 1.50;
    }

    return price;
}

function HTMLUI() {}

HTMLUI.prototype.displayYears = function() {

    const max = new Date().getFullYear(),
          min = max - 20;

    const selectYear = document.getElementById('year');

    for(let i = max; i > min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);

    }
}

HTMLUI.prototype.displayError = function(message) {
    const div = document.createElement('div');
    div.classList = 'error';

    div.innerHTML = `
        <p>${message}</p>
    `;

    form.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function(){
        document.querySelector('.error').remove();
    }, 3000);
}

HTMLUI.prototype.showResult = function(price, insurance) {
    const result = document.getElementById('result');

    let make = insurance.make;
    switch(make) {
        case '1':
            make = 'American';
        break;

        case '2':
            make = 'Asian';
        break;

        case '3':
            make = 'European';
        break;
    }

    const div = document.createElement('div');

    div.innerHTML = `
        <p class=header>Summary</p>
        <p>Make: ${make}</p>
        <p>Year: ${insurance.year}</p>
        <p>Level: ${insurance.level}</p>
        <p class="total">Total: $ ${price}</p>
    
    `;

    const spinner = document.querySelector('#loading img');
    spinner.style.display = 'block';

    setTimeout(function (){
        spinner.style.display = 'none';

        result.appendChild(div);
    }, 3000);
    
}