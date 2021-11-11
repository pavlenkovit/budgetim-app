import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import css from '@styled-system/css';

export const Container = styled(ScrollView)(css({
  px: 4,
  py: 8,
}));

export const ListWrapper = styled(ScrollView)(css({
  mb: 8,
}));