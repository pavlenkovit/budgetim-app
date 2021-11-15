import { Transaction } from '../../types';
import { authHeader } from '../../helpers/authHeader';
import { serialize } from '../../utils/serialize';

interface GetTransactionsParams {
  year?: number;
  month?: number;
  category?: number;
}

export const getTransactions = async (params: GetTransactionsParams, token: string | null): Promise<Transaction[]> => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch(`https://api.budgetim.ru/transaction?${serialize(params)}`, {
      headers: authHeader(token),
    });
    const transactions = await response.json() as Transaction[];
    return transactions;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
