"use client";
import React from "react";
import CheckoutFlow from "../../components/hydration-ssr/checkout/CheckoutFlow";
import DATA from "../../components/hydration-ssr/checkout/data";
import reducer from "../../components/hydration-ssr/checkout/reducer";
import StoreItem from "../../components/hydration-ssr/checkout/StoreItem";

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(reducer, null);

  React.useEffect(() => {
    const savedItems = window.localStorage.getItem("cart-items");

    dispatch({
      type: "initialize",
      items: savedItems === null ? [] : JSON.parse(savedItems),
    });
  }, []);

  React.useEffect(() => {
    if (items !== null) {
      window.localStorage.setItem("cart-items", JSON.stringify(items));
    }
  }, [items]);

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className="items">
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({
                  type: "add-item",
                  item,
                });
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          taxRate={0.15}
          handleDeleteItem={(item) =>
            dispatch({
              type: "delete-item",
              item,
            })
          }
        />
      </main>
    </>
  );
}

export default CheckoutExercise;
