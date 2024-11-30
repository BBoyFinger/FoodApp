import React from "react";
import { useDispatch } from "react-redux";
import { AddToCart, DeleteQtyProduct, DeleteToCart } from "../../actions/CartAction";
import { formatPrice } from "../../unitls";

function ProductCart({ product }) {
    const dispatch = useDispatch();

    // Function to handle removing a product from the cart
    function handleDeleteProduct(product) {
        const action = DeleteToCart(product);
        dispatch(action);
    }

    // Function to handle adding a product to the cart
    function handleAddProduct(product) {
        // Check if the current quantity is less than the available stock
        if (product.qty < product.amount) {
            const action = AddToCart(product);
            dispatch(action);
        }
    }

    // Function to handle removing quantity of a product from the cart
    function handleProductOut(product) {
        const action = DeleteQtyProduct(product);
        dispatch(action);
    }

    return (
        <div className="shopping-cart-list-product">
            <div className="shopping-cart-list-product-block">
                <div className="shopping-cart-list-product-block-left">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="shopping-cart-list-product-block-right">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">{formatPrice(product.salePrice)}</p>
                </div>

                <div className="shopping-cart-list-product-bottom">
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            style={{
                                fill: "rgb(63 72 72)",
                            }}
                            onClick={() => handleProductOut(product)}
                        >
                            <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                            <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                        </svg>
                    </div>
                    <ul className="button-event">
                        <li onClick={() => handleDeleteProduct(product)}>-</li>
                        <li style={{ margin: "0 10px", backgroundColor: "#fff" }}>{product.qty}</li>
                        <li onClick={() => handleAddProduct(product)}>+</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProductCart;
