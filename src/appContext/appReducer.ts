import { AppContextState, AppDispatchAction } from './types';
import compareDesc from 'date-fns/compareDesc';

export const appReducer = (state: AppContextState, action: AppDispatchAction) => {
  switch (action.type) {
    case 'setTransactions': {
      const { data } = action.payload;
      return {
        ...state,
        transactions: data,
        isLoadingTransactions: false,
        errorTransactions: null,
      };
    }

    case 'deleteTransaction': {
      const { id } = action.payload;
      return {
        ...state,
        transactions: state.transactions.filter(item => item.id !== id),
      };
    }

    case 'editTransaction': {
      const transaction = action.payload;
      return {
        ...state,
        transactions: state.transactions.map(item => {
          if (item.id === transaction.id) {
            return transaction;
          }
          return item;
        }),
      };
    }

    case 'addTransaction': {
      const transaction = action.payload;
      return {
        ...state,
        transactions: [...state.transactions, transaction].sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))),
      };
    }

    case 'setErrorTransactions': {
      const { error } = action.payload;
      return {
        ...state,
        isLoadingTransactions: false,
        errorTransactions: error,
      };
    }

    case 'setCategories': {
      const { data } = action.payload;
      return {
        ...state,
        categories: data,
        isLoadingCategories: false,
        errorCategories: null,
      };
    }

    case 'setErrorCategories': {
      const { error } = action.payload;
      return {
        ...state,
        isLoadingCategories: false,
        errorCategories: error,
      };
    }

    case 'deleteCategory': {
      const { id } = action.payload;
      return {
        ...state,
        categories: state.categories.filter(item => item.id !== id),
      };
    }

    case 'editCategory': {
      const category = action.payload;
      return {
        ...state,
        categories: state.categories.map(item => {
          if (item.id === category.id) {
            return category;
          }
          return item;
        }),
      };
    }

    case 'addCategory': {
      const category = action.payload;
      return {
        ...state,
        categories: [...state.categories, category],
      };
    }


    default: {
      throw new Error('Unhandled action type');
    }
  }
};
