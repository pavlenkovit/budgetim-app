import React, { FC, useState } from 'react';
import { TextInput } from 'react-native';

import { useAppDispatch } from '../../../../appContext';
import { addTransaction } from '../../../../api/transaction/addTransaction';

import { Card } from './styled';
import { useTheme } from 'styled-components/native';

export const FormForAdding: FC = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const { colors: { textPrimary } } = useTheme();

  const onAdd = () => {
    addTransaction(
      { title: text },
      (transaction) => {
        dispatch({ type: 'addTransaction', payload: transaction });
        setText('');
      },
    );
  };

  return (
    <Card>
      <TextInput
        placeholder="Добавить"
        onChangeText={setText}
        onEndEditing={onAdd}
        defaultValue={text}
        style={{ fontSize: 16, color: textPrimary }}
      />
    </Card>
  );
};
