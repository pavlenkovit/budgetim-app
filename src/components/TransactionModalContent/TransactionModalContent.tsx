import React, { FC, useState } from 'react';
import { Pressable, ScrollView, Keyboard, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import i18n from 'i18n-js';

import { Input } from '../Input';
import { formatNumberWithSign } from '../../utils/formatNumberWithSign';

import { Header, Content, Section, SectionGroup, ModalContent, ButtonText, ModalWrapper, NameSection } from './styled';
import { TransactionModalContentProps } from './types';
import { CategoriesList } from './components/CategoriesList';
import { PopularNames } from './components/PopularNames';

export const TransactionModalContent: FC<TransactionModalContentProps> = (props) => {
  const {
    title,
    setTitle,
    price,
    setPrice,
    categoryId,
    setCategoryId,
    date,
    setDate,
    visible,
    onClose,
    onSave,
    isLoading,
  } = props;
  const [focusedTitle, setFocusedTitle] = useState(false);

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
          <Pressable onPress={onClose}>
            <ButtonText variant="subheadlineRegular">{i18n.t('common.action.cancel')}</ButtonText>
          </Pressable>
          <Pressable
            style={{ display: 'flex', flexDirection: 'row' }}
            onPress={onSave}
          >
            {isLoading ? <ActivityIndicator /> : <ButtonText variant="subheadlineBold">{i18n.t('common.action.done')}</ButtonText>}
          </Pressable>
        </Header>
        <ScrollView>
          <Content>
            <SectionGroup>
              <NameSection>
                <Input
                  variant="subheadlineRegular"
                  defaultValue={title}
                  onChangeText={setTitle}
                  placeholder={i18n.t('transactions.form.title')}
                  onFocus={() => setFocusedTitle(true)}
                  onBlur={() => setFocusedTitle(false)}
                />
              </NameSection>
              <Section style={{ width: 120 }}>
                <Input
                  variant="subheadlineRegular"
                  onChangeText={p => {
                    if (p === '' || /^((\d|\s)+),?(\d{1,2})?$/.test(p)) {
                      setPrice(formatNumberWithSign(p));
                    }
                  }}
                  value={formatNumberWithSign(price)}
                  placeholder={i18n.t('transactions.form.price')}
                  keyboardType="numeric"
                  autoFocus
                />
              </Section>
            </SectionGroup>
            <Section>
              <CategoriesList
                activeCategoryId={categoryId}
                setCategoryId={setCategoryId}
              />
            </Section>
            <Section>
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || date;
                  setDate(currentDate);
                }}
                maximumDate={new Date()}
              />
            </Section>
          </Content>
        </ScrollView>
        {focusedTitle && (
          <PopularNames
            str={title}
            selectTitle={(name) => {
              setTitle(name);
              Keyboard.dismiss();
            }}
          />
        )}
      </ModalContent>
    </ModalWrapper>
  );
};
