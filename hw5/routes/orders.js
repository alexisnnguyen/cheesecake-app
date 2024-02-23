// Alexis Nguyen

var express = require('express');
var router = express.Router();
var dbms = require('./dbms_promise.js');

// POST
router.post('/', function(req, res, next) {
  // receive month data
  const { month } = req.body;

  // construct SQL query
  const query = `SELECT TOPPING, SUM(QUANTITY) AS TOTAL_QUANTITY
    FROM ORDERS
    WHERE MONTH = '${month}'
    GROUP BY TOPPING;
  `;

  // execute the SQL query using dbms_promise module
  dbms.dbquery(query)
    .then(rows => {

      // initialize an empty array to store the orders
      const ordersForMonth = [];

      // iterate over the result set and format each row
      rows.forEach(row => {

        // extract topping and quantity from the row
        const { TOPPING, TOTAL_QUANTITY } = row;

        // push a new object with the required format into the ordersForMonth array
        ordersForMonth.push({
          topping: TOPPING,
          quantity: TOTAL_QUANTITY
        });
      });

      // sending the formatted orders data as a JSON response
      res.json(ordersForMonth);
    }) // end of then
    .catch(error => {
      // handle errors
      console.error('Error fetching orders data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }); // end of catch

}); // end of post

module.exports = router;
