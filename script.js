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
    });
});

