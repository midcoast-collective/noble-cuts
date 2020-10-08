import React from "react";
import localForage from "localforage";

import { Product } from "./getProductsData";

const CART = "NOBLE_CART";

export function useCart() {
  const [cart, setCart] = React.useState<Product[]>([]);
  const [cartIsUpdating, setCartIsUpdating] = React.useState(false);

  React.useEffect(() => {
    localForage
      .getItem(CART)
      .then((value: unknown) => value && setCart(value as Product[]));
  }, []);

  function addProduct(product: Product): void {
    setCartIsUpdating(true);

    setTimeout(() => {
      if (cart.some((productInCart) => productInCart.title === product.title)) {
        const existingProduct = cart.filter(
          (productInCart) => productInCart.title === product.title
        )[0];
        existingProduct.quantity += 1;

        localForage
          .setItem(CART, [
            ...cart.filter(
              (productInCart) => productInCart.title !== existingProduct.title
            ),
            existingProduct,
          ])
          .then((value: unknown) => {
            setCart(value as Product[]);
          });
      } else {
        product.quantity = 1;
        localForage.setItem(CART, [...cart, product]).then((value: unknown) => {
          setCart(value as Product[]);
        });
      }

      setCartIsUpdating(false);
    }, 200);
  }

  function removeProduct(product: Product): void {
    setCartIsUpdating(true);

    setTimeout(() => {
      const existingProduct = cart.filter(
        (productInCart) => productInCart.title === product.title
      )[0];

      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;

        localForage
          .setItem(CART, [
            ...cart.filter(
              (productInCart) => productInCart.title !== existingProduct.title
            ),
            existingProduct,
          ])
          .then((value: unknown) => {
            setCart(value as Product[]);
          });
      } else {
        localForage
          .setItem(CART, [
            ...cart.filter(
              (productInCart) => productInCart.title !== existingProduct.title
            ),
          ])
          .then((value: unknown) => {
            setCart(value as Product[]);
          });
      }

      setCartIsUpdating(false);
    }, 200);
  }

  function removeAllProduct(product: Product): void {
    setCartIsUpdating(true);

    setTimeout(() => {
      const existingProduct = cart.filter(
        (productInCart) => productInCart.title === product.title
      )[0];

      localForage
        .setItem(CART, [
          ...cart.filter(
            (productInCart) => productInCart.title !== existingProduct.title
          ),
        ])
        .then((value: unknown) => {
          setCart(value as Product[]);
        });

      setCartIsUpdating(false);
    }, 200);
  }

  return [
    cart,
    cartIsUpdating,
    addProduct,
    removeProduct,
    removeAllProduct,
  ] as const;
}
