// import React from "react";
// import PaypalExpressBtn from "react-paypal-express-checkout";

// export default class PaypalButton extends React.Component {
//   render() {
//     const onSuccess = (payment) => {
//       console.log("The payment was succeeded!", payment);
//       this.props.tranSuccess(payment);
//     };

//     const onCancel = (data) => {
//       console.log("The payment was cancelled!", data);
//     };

//     const onError = (err) => {
//       console.log("Error!", err);
//     };

//     let env = "sandbox"; // you can set here to 'production' for production
//     let currency = "USD"; // or you can set this value from your props or state
//     let total = this.props.total; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout

//     const client = {
//         sandbox: 'ASZ1M0OkoDWkcf3aBXSSXk4_989hpCmk7UNH1iA3fxWOl_ZUEf06No3EAv7ynr0AOxKT-3lejQd2rSht',
//     };
    
    
//     let style = {
//       size: "small",
//       color: "blue",
//       shape: "rect",
//       label: "checkout",
//       tagline: false,
//     };

//     return (
//       <PaypalExpressBtn
//         env={env}
//         client={client}
//         currency={currency}
//         total={total}
//         onError={onError}
//         onSuccess={onSuccess}
//         onCancel={onCancel}
//         style={style}
//       />
//     );
//   }
// }


import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

class PaypalButton extends React.Component {
  onSuccess = (details, data) => {
    console.log("The payment was succeeded!", details);
    this.props.tranSuccess(details);
  };

  onCancel = (data) => {
    console.log("The payment was cancelled!", data);
  };

  onError = (err) => {
    console.error("Error!", err);
  };

  render() {
    const paypalOptions = {
      clientId: 'AeQVRSyoUo6RUeSi3RS4sFWDi7LCw4QkNv5A7zjeTzsxh8TwDarWW3ju2AfUV0hqh-n041RdA3VS1jHO',
      currency: 'USD',
    };

    const buttonStyles = {
      layout: 'vertical',
      shape: 'rect',
    };

    return (
      <PayPalButton
        amount={this.props.total}
        onSuccess={this.onSuccess}
        onCancel={this.onCancel}
        onError={this.onError}
        options={paypalOptions}
        style={buttonStyles}
      />
    );
  }
}

export default PaypalButton;
