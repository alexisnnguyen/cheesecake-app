// Alexis Nguyen

$(document).ready(function() {

    // hides the thank you section
    $(".thanks").hide();

    // on order click
    $("#button").click(function() {

        // defines the selection values
        let notes = $("textarea").val();
        let topping = $('input[name="topping"]:checked').val();
        let quantity = $("#dropdown").val();

        if (topping == null){ // alert if no cheesecake was selected
            alert("Warning: No cheesecake was selected.");
        } else if (notes.includes("vegan")) { // alert if vegan is mentioned in notes
            alert("Warning: The cheesecakes contain dairy.");
        } else { // else print order
            document.getElementById("details").innerHTML = "Order: " + 
            quantity + " " + topping + " cheesecake(s)"; 
            // do not print notes if no notes were made
            if (notes != "") {
                document.getElementById("detailsNotes").innerHTML = "Notes: " 
                + notes;
            }
            // hides selection section and shows thank you section
            $(".order").hide();
            $(".thanks").show();
        }
    }); // end of #button

    // on month click
    $('.months-content a').click(function(e) {
        e.preventDefault(); // prevents the browser from following the link
        var selectedMonth = $(this).text(); // puts selected month into variable
        
        // issue a POST request to the server
        $.post('/orders', { month: selectedMonth })
            .done(function(response) { // request successful
                $('#ordersList').empty(); // clear previous orders

                // loop through the orders and append them to the orders list
                $.each(response, function(index, order) {
                    var listItem = '<li>' +
                                '<span class="quantity">' + order.quantity + '</span> ' +
                                '<span class="topping">' + order.topping + '</span>' +
                                '</li>';
                    $('#ordersList').append(listItem);
                });
            })
            .fail(function(xhr, status, error) { // request failed
                console.error('Error:', error);
            });
    }); // end of month selector

    eventHandler = function( event ) {
        /* do stuff */
    }
    $(function() {
        $(".foo").click(eventHandler);
    }); // end of event

}); // end of doc

