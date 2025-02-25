// cartSlice.tsx
import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@states/store';
import {v4 as uuid} from 'uuid';

interface CartItem {
  isVeg: boolean;
  id: string;
  name: string;
  price: number;
  quantity: number;
  cartPrice?: number;
  isCustomizable?: boolean;
  customization?: any[];
}

interface RestaurantDetails {
  id: string;
  name: string;
  discount: string;
  discountAmount: string;
  time: string;
  distance: string;
  rating: number;
  imageUrl: string;
}

interface RestaurantCart {
  restaurant: RestaurantDetails;
  items: CartItem[];
}

interface CartState {
  carts: RestaurantCart[];
}

const initialState: CartState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (
      state,
      action: PayloadAction<{
        restaurant: RestaurantDetails;
        item: CartItem;
      }>,
    ) => {
      const {restaurant, item} = action.payload;
      const existingRestaurantCart = state.carts.find(
        cart => cart.restaurant.id === restaurant.id,
      );

      if (existingRestaurantCart) {
        const existingItem = existingRestaurantCart.items.find(
          cartItem => cartItem.id === item.id,
        );

        if (existingItem) {
          existingItem.quantity += 1;
          existingItem.cartPrice =
            (existingItem.cartPrice || 0) + existingItem.price;
        } else {
          existingRestaurantCart.items.push({
            ...item,
            quantity: 1,
            cartPrice: item.price,
          });
        }
      } else {
        state.carts.push({
          restaurant,
          items: [{...item, quantity: 1, cartPrice: item.price}],
        });
      }
    },

    removeItemFromCart: (
      state,
      action: PayloadAction<{
        restaurant_id: string;
        itemId: string;
      }>,
    ) => {
      const {itemId, restaurant_id} = action.payload;
      const restaurantCart = state.carts.find(
        cart => cart.restaurant.id === restaurant_id,
      );

      if (!restaurantCart) return;
      const itemIndex = restaurantCart.items.findIndex(
        item => item.id === itemId,
      );

      if (itemIndex !== -1) {
        const item = restaurantCart.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.cartPrice = (item.cartPrice || 0) - item.price;
        } else {
          restaurantCart.items.splice(itemIndex, 1);
        }
      }

      if (restaurantCart.items.length === 0) {
        state.carts = state.carts.filter(
          cart => cart.restaurant.id !== restaurant_id,
        );
      }
    },

    addCustomizableItem: (
      state,
      action: PayloadAction<{
        restaurant: RestaurantDetails;
        item: CartItem;
        customization: {
          quantity: number;
          price: number;
          customizationOptions: any[];
        };
      }>,
    ) => {
      const {restaurant, item, customization} = action.payload;
      const existingRestaurantCart = state.carts.find(
        cart => cart.restaurant.id === restaurant.id,
      );

      if (existingRestaurantCart) {
        const existingItem = existingRestaurantCart.items.find(
          cartItem => cartItem.id === item.id,
        ) as CartItem & {customization?: any[]};

        if (existingItem) {
          const existingCustomizationIndex =
            existingItem.customization?.findIndex(
              (cust: any) =>
                JSON.stringify(cust.customizationOptions) ===
                JSON.stringify(customization.customizationOptions),
            );

          if (
            existingCustomizationIndex !== undefined &&
            existingCustomizationIndex !== -1
          ) {
            const existingCustomization =
              existingItem?.customization?.[existingCustomizationIndex];
            existingCustomization.quantity += customization.quantity;
            existingCustomization.cartPrice += customization.price;

            // Update overall item quantity and price
            existingItem.quantity += customization.quantity;
            existingItem.cartPrice =
              (existingItem.cartPrice || 0) + customization.price;
          } else {
            const newCustomizationId = `c${
              (existingItem?.customization?.length || 0) + 1
            }`;

            if (!existingItem.customization) {
              existingItem.customization = [];
            }

            existingItem.customization.push({
              id: newCustomizationId,
              ...customization,
              quantity: customization.quantity,
              cartPrice: customization.price,
              price: customization.price / customization.quantity,
            });

            // Update overall item quantity and price
            existingItem.quantity += customization.quantity;
            existingItem.cartPrice =
              (existingItem.cartPrice || 0) + customization.price;
          }
        } else {
          const newCustomizationId = 'c1';
          existingRestaurantCart.items.push({
            ...item,
            quantity: customization.quantity,
            cartPrice: customization.price,
            customization: [
              {
                id: newCustomizationId,
                ...customization,
                quantity: customization.quantity,
                cartPrice: customization.price,
                price: customization.price / customization.quantity,
              },
            ],
          });
        }
      } else {
        const newCustomizationId = 'c1';
        state.carts.push({
          restaurant,
          items: [
            {
              ...item,
              quantity: customization.quantity,
              cartPrice: customization.price,
              customization: [
                {
                  id: newCustomizationId,
                  ...customization,
                  quantity: customization.quantity,
                  cartPrice: customization.price,
                  price: customization.price / customization.quantity,
                },
              ],
            },
          ],
        });
      }
    },

    removeCustomizableItem: (
      state,
      action: PayloadAction<{
        restaurant_id: string;
        itemId: string;
        customizationId: string;
      }>,
    ) => {
      const {restaurant_id, itemId, customizationId} = action.payload;
      const restaurantCart = state.carts.find(
        cart => cart.restaurant.id === restaurant_id,
      );
      if (!restaurantCart) return;

      const item = restaurantCart.items.find(
        cartItem => cartItem.id === itemId,
      );
      if (!item) return;

      const customizationIndex = item.customization?.findIndex(
        cust => cust.id === customizationId,
      );

      if (
        customizationIndex !== undefined &&
        customizationIndex !== -1 &&
        item.customization
      ) {
        const customization = item.customization[customizationIndex];

        // Update overall item quantity and price before modifying customization
        item.quantity -= 1;
        item.cartPrice = (item.cartPrice || 0) - customization.price;

        if (customization.quantity > 1) {
          customization.quantity -= 1;
          customization.cartPrice -= customization.price;
        } else {
          item.customization.splice(customizationIndex, 1);
        }

        // Remove item if no customizations left
        if (item.customization.length === 0) {
          restaurantCart.items = restaurantCart.items.filter(
            cartItem => cartItem.id !== itemId,
          );
        }

        // Remove restaurant cart if no items left
        if (restaurantCart.items.length === 0) {
          state.carts = state.carts.filter(
            cart => cart.restaurant.id !== restaurant_id,
          );
        }
      }
    },

    updateCustomizableItem: (
      state,
      action: PayloadAction<{
        restaurant_id: string;
        itemId: string;
        customizationId: string;
        newCustomization: {
          quantity: number;
          price: number;
          customizationOptions: any[];
        };
      }>,
    ) => {
      const {restaurant_id, itemId, customizationId, newCustomization} =
        action.payload;
      const restaurantCart = state.carts.find(
        cart => cart.restaurant.id === restaurant_id,
      );

      if (!restaurantCart) return;

      const item = restaurantCart.items.find(
        cartItem => cartItem.id === itemId,
      );

      if (!item || !item.customization) return;

      const matchingCustomizationIndex = item.customization.findIndex(
        (cust: any) =>
          cust.id !== customizationId &&
          JSON.stringify(cust.customizationOptions) ===
            JSON.stringify(newCustomization.customizationOptions),
      );

      const targetCustomizationIndex = item.customization.findIndex(
        cust => cust.id === customizationId,
      );

      if (targetCustomizationIndex === -1) return;

      const targetCustomization = item.customization[targetCustomizationIndex];

      if (matchingCustomizationIndex !== -1) {
        const matchingCustomization =
          item.customization[matchingCustomizationIndex];
        matchingCustomization.quantity += newCustomization.quantity;
        matchingCustomization.cartPrice += newCustomization.price;

        item.customization.splice(targetCustomizationIndex, 1);
      } else {
        targetCustomization.quantity = newCustomization.quantity;
        targetCustomization.cartPrice = newCustomization.price;
        targetCustomization.price =
          newCustomization.price / newCustomization.quantity;
        targetCustomization.customizationOptions =
          newCustomization.customizationOptions;
      }

      // Update overall item quantity and price
      item.quantity = item.customization.reduce(
        (sum, cust) => sum + cust.quantity,
        0,
      );
      item.cartPrice = item.customization.reduce(
        (sum, cust) => sum + cust.cartPrice,
        0,
      );
    },

    clearAllCarts: state => {
      state.carts = [];
    },

    clearRestaurantCart: (
      state,
      action: PayloadAction<{restaurant_id: string}>,
    ) => {
      const {restaurant_id} = action.payload;
      state.carts = state.carts.filter(
        cart => cart.restaurant.id !== restaurant_id,
      );
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  addCustomizableItem,
  removeCustomizableItem,
  updateCustomizableItem,
  clearAllCarts,
  clearRestaurantCart,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export const selectRestaurantCart = (restaurantId: string) =>
  createSelector([(state: RootState) => state.cart.carts], carts => {
    const restaurantCart = carts.find(
      cart => cart.restaurant.id === restaurantId,
    );
    return restaurantCart ? [...restaurantCart.items] : [];
  });

export const selectRestaurantCartItem = (
  restaurantId: string,
  itemId: string,
) =>
  createSelector([(state: RootState) => state.cart.carts], carts => {
    const restaurantCart = carts.find(
      cart => cart.restaurant.id === restaurantId,
    );
    const foundItem = restaurantCart?.items.find(item => item.id === itemId);
    return foundItem ? {...foundItem} : null;
  });

export default cartSlice.reducer;
