import React, { FC, useEffect, useState } from 'react';
import { TransactionModalContent } from '../TransactionModalContent';
import { useAddTransaction, useEditTransaction } from '../../../../hooks/transactions';
import { useGetCurrencies } from '../../../../hooks/currencies';
import { useGetCategories } from '../../../../hooks/categories';
import { Loader } from '../../../../components/Loader';
import { isString } from 'lodash';

interface ContentProps {
  categoryId: number | null;
  currencyId: number | null;
}

export const Content: FC<ContentProps> = props => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [categoryId, setCategoryId] = useState(props.categoryId);
  const [currencyId, setCurrencyId] = useState(props.currencyId);
  const [date, setDate] = useState(new Date());
  const { mutate: addTransaction, isSuccess, data: transactionId } = useAddTransaction();
  const editTransaction = useEditTransaction();

  useEffect(() => {
    if (isSuccess && transactionId) {
      editTransaction({
        id: transactionId,
        title,
        categoryId,
        price: isString(price) ? 0 : price,
        date,
        currencyId,
      });
    }
  }, [title, categoryId, price, date, currencyId, isSuccess]);

  useEffect(() => {
    addTransaction({ title, categoryId, price: 0, date, currencyId });
  }, []);

  return (
    <TransactionModalContent
      title={title}
      setTitle={setTitle}
      price={price}
      setPrice={setPrice}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      currencyId={currencyId}
      setCurrencyId={setCurrencyId}
      date={date}
      setDate={setDate}
    />
  );
};

export const EmptyTransactionFetcher = () => {
  const { data: currencies, isLoading: isLoadingCurrencies } = useGetCurrencies();
  const { data: categories, isLoading: isLoadingCategories } = useGetCategories();

  if (isLoadingCurrencies || isLoadingCategories) {
    return <Loader />;
  }

  return <Content categoryId={categories?.[0]?.id || null} currencyId={currencies?.[0]?.id || null} />;
};