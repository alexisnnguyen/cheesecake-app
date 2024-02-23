// Alexis Nguyen

$(document).ready(function() {

    // hides the thank you section
    $(".thanks").hide();

    // default selected month on start
    var selectedMonth = 'Jan';

    // update the order header with the selected month
    $('.orderHeaderDropdown').text(selectedMonth);

    // issue a POST request to the server to fetch orders for January on start
    $.post('/orders', { month: selectedMonth })
    .done(function(response) { // request successful
        $('#ordersList').empty(); // clear previous orders
        
        // loop through the response and append the orders to the orders list
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
            // Create the order object with the selected data
        const order = {
            notes: notes,
            topping: topping,
            quantity: quantity
        };

        // Send a POST request to the server to add the new order
        $.post('/neworder', order)
            .done(function(response) { // request successful
                // Show the order details and thank you section
                $("#details").text("Order: " + quantity + " " + topping + " cheesecake(s)");
                if (notes !== "") {
                    $("#detailsNotes").text("Notes: " + notes);
                }
                $(".order").hide();
                $(".thanks").show();
            })
            .fail(function(xhr, status, error) { // request failed
                console.error('Error:', error);
                alert('Failed to place the order. Please try again later.');
            });
        }
    }); // end of #button

    // on month click
    $('.months-content a').click(function(e) {
        e.preventDefault(); // prevents the browser from following the link
        var selectedMonth = $(this).text(); // puts selected month into variable

    // update the order header with the selected month
    $('.orderHeaderDropdown').text(selectedMonth);
        
        // issue a POST request to the server
        $.post('/orders', { month: selectedMonth })
            .done(function(response) { // request successful
                $('#ordersList').empty(); // clear previous orders

            // store orders with zero quantities for each topping
            var ordersMap = {
                'Cherry': 0,
                'Chocolate': 0,
                'Plain': 0
            };

            // update the quantities based on the response from the server
            response.forEach(function(order) {
                ordersMap[order.topping] = order.quantity;
            });

            // loop through the toppings and append them to the orders list
            Object.keys(ordersMap).forEach(function(topping) {
                var listItem = '<li>' +
                                '<span class="quantity">' + ordersMap[topping] + '</span> ' +
                                '<span class="topping">' + topping + '</span>' +
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

