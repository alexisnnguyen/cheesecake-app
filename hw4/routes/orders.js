// Alexis Nguyen

var express = require('express');
var router = express.Router();

/* GET orders listing. */
router.get('/', function(req, res, next) {
  const orders = [
    { topping: 'cherry', 
      quantity: 0 
    },
    { topping: 'plain', 
      quantity: 0 
    },
    { topping: 'chocolate', 
      quantity: 0 
    }
  ];

  // Sending the array of objects as JSON response using res.json()
  res.json(orders);
});

module.exports = router;
