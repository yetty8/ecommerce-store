// src/contexts/CartContext.jsx
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id
              ? { ...item, qty: item.qty + (action.payload.qty || 1) }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { 
          ...action.payload, 
          qty: action.payload.qty || 1 
        }],
      };
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== action.payload),
      };
    
    case 'UPDATE_QTY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload.id
            ? { ...item, qty: Math.max(1, action.payload.qty) } // Ensure qty is never less than 1
            : item
        ),
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };
    
    case 'LOAD_CART':
      return {
        ...state,
        cartItems: Array.isArray(action.payload) ? action.payload : [],
      };
    
    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};

const initialState = {
  cartItems: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          dispatch({ type: 'LOAD_CART', payload: parsedCart });
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      // Clear invalid cart data
      localStorage.removeItem('cartItems');
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [state.cartItems]);

  const addToCart = useCallback((product, qty = 1) => {
    if (!product || !product._id) {
      console.error('Invalid product provided to addToCart');
      return;
    }
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { 
        ...product, 
        qty: Math.max(1, Number(qty) || 1) 
      } 
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    if (!id) {
      console.error('No ID provided to removeFromCart');
      return;
    }
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (!id) {
      console.error('No ID provided to updateQty');
      return;
    }
    const quantity = Number(qty);
    if (isNaN(quantity) || quantity < 1) {
      removeFromCart(id);
    } else {
      dispatch({ type: 'UPDATE_QTY', payload: { id, qty: quantity } });
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const getCartTotal = useCallback(() => {
    return state.cartItems.reduce(
      (total, item) => total + (Number(item.price) || 0) * (Number(item.qty) || 0),
      0
    );
  }, [state.cartItems]);

  const getCartCount = useCallback(() => {
    return state.cartItems.reduce((total, item) => total + (Number(item.qty) || 0), 0);
  }, [state.cartItems]);

  const value = {
    cartItems: state.cartItems,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Add display name for better debugging in React DevTools
CartContext.displayName = 'CartContext';