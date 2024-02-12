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
