// Alexis Nguyen

const express = require('express');
const router = express.Router();
const dbms = require('./dbms_promise.js');

// POST route to handle new orders
router.post('/', function(req, res) {
    // extract order data from the request body
    const { notes, topping, quantity } = req.body;

    // hardcoded month and day
    const month = 'SEP';
    const day = 18;

    // Function to retrieve the maximum ORDERID from the database
    function getMaxOrderID() {
        return new Promise((resolve, reject) => {
            // Construct the SQL query to get the maximum ORDERID
            const query = 'SELECT MAX(ORDERID) AS MAX_ORDERID FROM ORDERS';
            // Execute the query using dbms_promise module
            dbms.dbquery(query)
                .then(rows => {
                    // Extract the maximum ORDERID from the result
                    const maxOrderID = rows[0].MAX_ORDERID || 0; // Default to 0 if no orders exist
                    resolve(maxOrderID);
                })
                .catch(error => {
                    reject(error); // Reject the promise if there's an error
                });
        });
    }

    // Get the maximum order ID
    getMaxOrderID()
        .then(maxOrderID => {
            // Increment the maxOrderID by 1 to generate the new order ID
            const orderID = maxOrderID + 1;

            // Construct the INSERT SQL statement with the data
            const insertQuery = `
                INSERT INTO ORDERS (ORDERID, MONTH, DAY, QUANTITY, TOPPING, NOTES)
                VALUES (${orderID}, '${month}', ${day}, ${quantity}, '${topping}', '${notes}')
            `;

            // execute the INSERT SQL statement
            dbms.dbquery(insertQuery)
                .then(() => {
                    // order successfully inserted into the database
                    res.status(201).json({ message: 'Order successfully added' });
                })
                .catch(error => {
                    // failed to insert order, handle the error
                    console.error('Error inserting order:', error);
                    res.status(500).json({ error: 'Failed to add order' });
                });
        })
        .catch(error => {
            // failed to get max order ID, handle the error
            console.error('Error getting max order ID:', error);
            res.status(500).json({ error: 'Failed to add order' });
        });
});

// export the router
module.exports = router;
