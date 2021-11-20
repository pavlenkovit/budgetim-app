import React, { FC, useEffect, useState } from 'react';
import i18n from 'i18n-js';
import { Pressable, ScrollView } from 'react-native';

import { TextVariant } from '../../../../components/TextVariant';
import { LineChart } from '../../../../charts/LineChart';

import {
  ButtonText,
  Content,
  Header,
  ModalContent,
  ModalWrapper,
} from './styled';

import { useUserState } from '../../../../contexts/user';
import { useErrorHandler } from '../../../../hooks/useErrorHandler';
import { Loader } from '../../../../components/Loader';

import { ModalProps } from './types';
import { getCategoryStatistics } from '../../../../api/categories/getCategoryStatistics';
import format from 'date-fns/format';

export const Modal: FC<ModalProps> = ({ visible, categoryId, onClose }) => {
  const [width, setWidth] = useState(0);
  const { token } = useUserState();
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useErrorHandler(error);

  const getData = async () => {
    setLoading(true);
    try {
      const result = await getCategoryStatistics({ categoryId }, token);
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (visible) {
      void getData();
    }
  }, [visible])

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ModalWrapper
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      avoidKeyboard
      propagateSwipe
    >
      <ModalContent>
        <Header>
          <TextVariant variant="bodyRegular">Category name</TextVariant>
          <Pressable
            style={{ display: 'flex', flexDirection: 'row' }}
            onPress={onClose}
          >
            <ButtonText variant="subheadlineBold">{i18n.t('common.action.cancel')}</ButtonText>
          </Pressable>
        </Header>
        <ScrollView>
          <Content onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
            {!!width && (
              <LineChart
                data={data.map(item => ({ value: +item.sum }))}
                categories={data.map(item => format(new Date(item.date), 'yyyy-MM-dd'))}
                height={220}
                width={width}
              />
            )}
          </Content>
        </ScrollView>
      </ModalContent>
    </ModalWrapper>
  );
}