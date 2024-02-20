import { Currency } from '../types';
import { CurrencyModel } from '../db/currency';
import { db } from '../db';

export interface AddCurrencyParams {
  title: string;
  symbol: string;
}

const currencyModel = new CurrencyModel(db);

export const getCurrencies = async (): Promise<Currency[]> => {
  const currencies = await currencyModel.getCurrencies();
  return currencies;
};

export const getCurrency = async (id: number): Promise<Currency> => {
  const currency = await currencyModel.getCurrency(id);
  return currency;
};

export const getUsedCurrencies = async (): Promise<Currency[]> => {
  const result = await currencyModel.getUsedCurrencies();
  return result;
};

export const addCurrency = async (params: AddCurrencyParams): Promise<number> => {
  const id = await currencyModel.addCurrency(params);
  return id;
};

export const deleteCurrency = async (id: number) => {
  await currencyModel.deleteCurrency(id);
};

export interface EditCurrencyParams {
  id: number;
  title: string;
  symbol: string;
}

export const editCurrency = async (params: EditCurrencyParams): Promise<Currency> => {
  await currencyModel.editCurrency(params);
  const currency = await currencyModel.getCurrency(params.id);
  return currency;
};
