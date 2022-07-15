/**
 * File Name: jsfile.js
 *
 * Revision History:
 *       Baljeet Bilkhu: 07/15/2022 - code added and created
 *
 */


var errorMessages = "";


function ValidateInputs() {

    var f = $("#registrationForm");

    f.validate({
        rules: {
            numberOfCandies: {
                required: true
            },
            numberOfNickels: {
                required: true
            },
            numberOfDimes: {
                required: true
            }
        },
        messages: {
            numberOfCandies: {
                required: "A number greater than zero (0) is required"
            },
            numberOfNickels: {
                required: "A number zero (0) or greater is required"
            },
            numberOfDimes: {
                required: "A number zero (0) or greater is required"
            }
        }
    });

    return f.valid();

}

function Register() {
    if (ValidateInputs()) {

        var json = {};

        $(":input").each(function () {
            json[$(this).attr("id")] = $(this).val();
        });

        localStorage.setItem("registration", JSON.stringify(json));
        $(location).prop('href', 'viewResults.html');

    }
}

function LoadRegistrationData(id) {

    var json = JSON.parse(localStorage.getItem("registration"));

    $(":input").each(function () {
        $(this).val(json[$(this).attr("id")]);
    });

    console.log(json);

    CalculateTotal();

}

function CalculateTotal() {

    var json = JSON.parse(localStorage.getItem("registration"));
    var nickels = Number(json['numberOfNickels']);
    var dimes = Number(json['numberOfDimes']);
    var cost = 0.25;
    var quantity = 100;    
    
    var totalAmount = (nickels * 0.05) + (dimes * 0.10);


 
    const totalAmountDisplayed = new Intl.NumberFormat(`en-US`, {
        currency: `USD`,
        style: 'currency',
    }).format(totalAmount);


    var candiesDispensed = Math.trunc(totalAmount / cost);
    quantity = quantity - candiesDispensed;

    if(totalAmount > 25){
     candiesDispensed = 100;
     quantity = 0;   
    }

    const orderNumber = Math.floor(Math.random()*(9999-1000)) + 1000;
    
    console.log(orderNumber);
   
    $("#totalAmount").val(totalAmountDisplayed);
    $("#candiesDispensed").val(candiesDispensed);
    $("#cost").val("$" + cost);
    $("#quantity").val(quantity);
    $("#orderNumber").val(orderNumber);
    


}


