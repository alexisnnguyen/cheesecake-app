// Alexis Nguyen

var express = require('express');
var router = express.Router();

// POST
router.post('/', function(req, res, next) {
  // receive month data
  const { month } = req.body;

  // Placeholder logic to fetch orders data for the specified month
  const ordersForMonth = [
    { topping: 'Cherry',
      quantity: 0 
    },
    { topping: 'Chocolate', 
      quantity: 0 
    },
    { topping: 'Plain', 
      quantity: 0 
    }
  ];

  // Sending the fetched orders data as a JSON response
  res.json(ordersForMonth);
});


module.exports = router;
