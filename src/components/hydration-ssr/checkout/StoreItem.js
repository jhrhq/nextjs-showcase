"use client";

import Image from "next/image";

function StoreItem({ item, handleAddToCart }) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(item.price);

  return (
    <article>
      <Image width={500} height={500} src={item.imageSrc} alt={item.imageAlt} />
      <h2>{item.title}</h2>
      <p>{price}</p>
      <button type="button" onClick={() => handleAddToCart(item)}>
        Add to Cart
      </button>
    </article>
  );
}

export default StoreItem;
