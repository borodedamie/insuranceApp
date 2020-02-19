
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



