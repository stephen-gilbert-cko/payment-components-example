const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.post("/create-payment-sessions", async (req, res) => {
  // Create a PaymentSession with the order amount and currency
  const paymentSession = await fetch("https://api.sandbox.checkout.com/payment-sessions", {
    method: 'POST',
    headers: {
      Authorization: 'sk_sbox_ew34y3miywb5svk4mdt5xfwrrm7',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "amount": 6540,
      "currency": "GBP",
      "reference": "ORD-5023-4E89",
      "description": "Set of 3 masks",
      "billing_descriptor": {
        "name": "SUPERHEROES.COM",
        "city": "GOTHAM"
      },
      "customer": {
        "email": "panda@panda.com",
        "name": "Queen Elizabeth II"
      },
      "shipping": {
        "address": {
          "address_line1": "Checkout.com",
          "address_line2": "90 Tottenham Court Road",
          "city": "London",
          "state": "London",
          "zip": "W1T 4TJ",
          "country": "GB"
        },
        "phone": {
          "country_code": "+1",
          "number": "415 555 2671"
        }
      },
      "billing": {
        "address": {
          "address_line1": "Checkout.com",
          "address_line2": "90 Tottenham Court Road",
          "city": "London",
          "state": "London",
          "zip": "W1T 4TJ",
          "country": "GB"
        },
        "phone": {
          "country_code": "+1",
          "number": "415 555 2671"
        }
      },
      "success_url": "http://localhost:3000/index.html?status=succeeded",
      "failure_url": "http://localhost:3000/index.html?status=failed",
      "recipient": {
        "dob": "1985-05-15",
        "account_number": "5555554444",
        "zip": "W1T",
        "last_name": "Jones"
      },
      "metadata": {
        "coupon_code": "NY2018",
        "partner_id": 123989
      },
      "items": [
        {
          "name": "Guitar",
          "quantity": 1,
          "unit_price": 1635
        },
        {
          "name": "Amp",
          "quantity": 3,
          "unit_price": 1635
        }
      ]
    }),
  })
  .then(response => response.json())
  .catch(error => console.log('error', error));


  console.log(paymentSession);

  res.send(paymentSession);
});

app.listen(3000, () =>
  console.log(`
Node server listening on port 3000!
http://localhost:3000/
`)
);
