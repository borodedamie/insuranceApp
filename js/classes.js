//Classes
class Insurance {
    
    constructor(make, year, level){

        this.make = make;
        this.year = year;
        this.level = level;
    }

        calculateQuotation(insurance) {
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
    
            getYearDifference (year) {
                return new Date().getFullYear() - year;
            }
            
            calculateLevel (price, level) {
                if(level === basic) {
                    price = price * 1.30;
                } else {
                    price = price * 1.50;
                }
            
                return price;
            }

}



class HTMLUI {
    
    displayYears() {

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
    
    displayError(message) {
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
    
    showResult(price, insurance) {
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
}

