const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51NI5owSJAIh7rfxIEAnvRPY0dRsb9P305IQIXMFOHby6xlBtJufhZBxd6eHGxqt5jUhhX8z5cGnhhyvhrTEo4XaM00QBZqhfDL"
);
const uuid = require("uuid");
const app = express();

//MIDDLEWARE
// app.use(express.json());
app.use(cors());

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routers
app.get("/", (req, res) => {
  res.send("get api working properly");
});

app.post("/payments", (req, res) => {
  console.log("req.body", req.body);
  const { product, token } = req.body;
  console.log("product", product);
  console.log("price", product.price);
  const idempontencykey = uuid();
  return stripe.customers.create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of product.name`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencykey }
      );
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/payment", (req, res) => {
  return res.send("success");
});

//listen
app.listen(8000, () => {
  console.log("server listening on port 8000");
});
