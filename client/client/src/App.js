import { useState } from "react";
import "./App.css";
import Stripeckeckout from "react-stripe-checkout";
import { Button } from "@mui/base";

function App() {
  const [product, setProduct] = useState({
    name: "react from FB",
    price: 1,
    productBy: "facebook",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const header = {
      "Content-Type": "application/json",
    };
    return fetch(`http://localhost:8000/payments`, {
      method: "POST",
      header,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("response", response);
        console.log("body", body);
        const { status } = response;
        console.log("Status", status);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Stripeckeckout
        stripeKey="pk_test_51NI5owSJAIh7rfxIAlLxANU4oZAjRfqV6QtELcURkSVQv8qQMBMeN3YLTTO1Qa6yUwnNiqnB3h7nN0Z07DMqdqmI00ACleEGFa"
        token={makePayment}
        name="Buy React"
        amount={product.price * 100}
      >
        <Button style={{ background: "#DAF7A6" }}>
          {" "}
          Buy react is just {product.price}$
        </Button>
      </Stripeckeckout>
    </>
  );
}

export default App;
