import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import format from 'date-fns/format';
import { getLocale } from '../../utils/getLocale';

import { StackParamList } from '../types';
import { TransactionsProvider } from '../../contexts/transactions';
import { TransactionsList } from '../../components/TransactionsList';
import { CategoriesProvider } from '../../contexts/categories';
import { EditTransactionModal } from '../../components/EditTransactionModal';
import { ModalsProvider } from '../../contexts/modals';

export const TransactionsByCategory: FC<NativeStackScreenProps<StackParamList, 'TransactionsByCategory'>> = ({
  route,
  navigation,
}) => {
  const { category, month, year, categoryTitle } = route.params;
  const locale = getLocale();

  const date = format(new Date(year, month - 1, 1), 'LLLL', { locale });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${categoryTitle} (${date})`,
    });
  }, [navigation]);

  return (
    <TransactionsProvider>
      <CategoriesProvider>
        <ModalsProvider>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
            <TransactionsList category={category} month={month} year={year} />
          </ScrollView>
          <EditTransactionModal />
        </ModalsProvider>
      </CategoriesProvider>
    </TransactionsProvider>
  );
};
