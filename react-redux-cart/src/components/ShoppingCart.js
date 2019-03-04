import React, { Component } from 'react'
import { isCartEmpty, getTotal } from '../selectors/'
class ShoppingCart extends Component {
  render() {
    const {
      cart,
      products,
      checkoutCart,
      addToCart,
      subProductQuantity
    } = this.props
    // {pid:[],byid:{}}   [{},{},{}]
    // 计算衍生数据
    const cartContent = isCartEmpty(cart, products) ? (
      <ul>
        {cart.productId.map(e => {
          const product = products.find(product => product.id === e)
          return (
            <li key={e}>
              <span>{product.productName} </span>
              <span>{product.price} x </span>
              <button
                onClick={() => {
                  subProductQuantity(e, { inventory: product.inventory + 1 })
                }}
              >
                -
              </button>
              <span>{cart.quantityById[e]}</span>
              <button
                onClick={() => {
                  if (product.inventory > 0) {
                    addToCart(e, { inventory: product.inventory - 1 })
                  } else {
                    alert('你买不起了')
                  }
                }}
              >
                +
              </button>
            </li>
          )
        })}
      </ul>
    ) : (
      <div>Please add some products to cart.</div>
    )

    // const total = isCartEmpty(cart, products)
    //   ? cart.productId.reduce(
    //       (num, i) =>
    //         num + products.find(e => e.id === i).price * cart.quantityById[i],
    //       0
    //     )
    //   : 0
    return (
      <div>
        <h2>shopping-cart</h2>
        {cartContent}
        <span>$total {getTotal(cart, products)}</span>
        <br />
        <button
          onClick={() => {
            checkoutCart()
          }}
          disabled={cart.productId.length ? false : true}
        >
          Checkout
        </button>
      </div>
    )
  }
}

export default ShoppingCart
