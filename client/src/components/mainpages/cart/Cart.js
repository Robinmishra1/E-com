import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'

function Cart() {
  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const [token] = state.token
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      }, 0)

      setTotal(total)
    }

    getTotal()

  }, [cart])

  const addToCart = async (cart) => {
    await axios.patch('/user/addcart', { cart }, {
      headers: { Authorization: token }
    })
  }


  const increment = (id) => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity += 1
      }
    })

    setCart([...cart])
    addToCart(cart)
  }

  const decrement = (id) => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
      }
    })

    setCart([...cart])
    addToCart(cart)
  }

  const removeProduct = id => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1)
        }
      })

      setCart([...cart])
      addToCart(cart)
    }
  }
  {/**address_line_1
: 
"boston"
admin_area_1
: 
"VA"
admin_area_2
: 
"New York"
country_code
: 
"US"
postal_code
 */}
  const tranSuccess = async (payment) => {
      const addressLine=payment?.purchase_units[0]?.shipping
      ?.address.address_line_1;
      const adminArea=payment?.purchase_units[0]?.shipping
      ?.address?.admin_area_1
      const postalCode=payment?.purchase_units[0]?.shipping
      ?.address?.postal_code;
    const paymentID = payment.id;
    const payer = payment?.payer;
    const countryCode=payer?.address?.country_code;
    const address = {
      addressLine,adminArea,postalCode,countryCode
    }
    // const shipping = payment.purchase_units[0]?.shipping[0].address || {};
    // // const address = payment.payer.address;
    console.log( "______________", address);
    await axios.post('/api/payment', { cart, paymentID, address }, {
      headers: { Authorization: token }
    })

    setCart([])
    addToCart([])
    alert("You have successfully placed an order.")
  }


  if (cart.length === 0)
    return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>

  return (
    <div>
      {
        cart.map(product => (
          <div className="detail cart" key={product._id}>
            <img src={product.images.url} alt="" />

            <div className="box-detail">
              <h2>{product.title}</h2>

              <h3>$ {product.price * product.quantity}</h3>
              <p>{product.description}</p>
              <p>{product.content}</p>

              <div className="amount">
                <button onClick={() => decrement(product._id)}> - </button>
                <span>{product.quantity}</span>
                <button onClick={() => increment(product._id)}> + </button>
              </div>

              <div className="delete"
                onClick={() => removeProduct(product._id)}>
                X
              </div>
            </div>
          </div>
        ))
      }

      <div className="total">
        <h3>Total: $ {total}</h3>
        <PaypalButton
          total={total}
          tranSuccess={tranSuccess} />
      </div>
    </div>
  )
}

export default Cart
