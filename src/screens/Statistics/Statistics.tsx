import React, { FC, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';
import { useUser } from '../../contexts/app';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getStatistics } from '../../api/category/getStatistics';
import { separateThousands } from '../../utils/separateThousands';
import { PieChartWrapper, ChartTitle, ChartSubtitle, NavigateButton } from './styled';
import { PieChart } from '../../components/PieChart';
import { useTheme } from 'styled-components/native';
import { TextVariant } from '../../components/TextVariant';
import { CategoryCard } from '../../components/CategoryCard';

export interface StatisticsItem {
  color: string;
  description: string;
  id: number;
  sum: string;
  title: string;
}

export const Statistics: FC<NativeStackScreenProps<StackParamList, 'Statistics'>> = ({ navigation}) => {
  const {token} = useUser();
  const [data, setData] = useState<StatisticsItem[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const DATES = [
    { month: 9, year: 2021, title: 'September' },
    { month: 10, year: 2021, title: 'October' },
    { month: 11, year: 2021, title: 'November' },
  ];

  const [indexDate, setIndexDate] = useState(1);
  const { colors: { textPrimary } } = useTheme();

  const getStatisticsInit = async () => {
    try {
      const categories = await getStatistics(DATES[indexDate], token);
      setData(categories)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    void getStatisticsInit();
  }, [indexDate]);

  if (isLoading) {
    return <TextVariant variant="subheadlineBold">Loading...</TextVariant>
  }

  if (error) {
    return <TextVariant variant="subheadlineBold">{error}</TextVariant>;
  }

  const setPrevMonth = () => {
    if (indexDate === 0) {
      return;
    }
    setIndexDate(indexDate - 1);
  };

  const setNextMonth = () => {
    if (indexDate === DATES.length - 1) {
      return;
    }
    setIndexDate(indexDate + 1);
  };

  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <PieChartWrapper>
        <NavigateButton onPress={setPrevMonth}>
          <MaterialIcons name="arrow-back-ios" color={textPrimary} size={24} />
        </NavigateButton>
        <PieChart
          data={data.map(item => {
            return {
              color: item.color,
              value: +item.sum,
              additionalValue: 1,
            };
          })}
          innerRadius={66}
          segmentWidth={6}
          outerSegmentWidth={24}
        >
          <ChartSubtitle variant="subheadlineBold">{DATES[indexDate].title}</ChartSubtitle>
          <ChartTitle variant="bodyBold">{separateThousands(data.reduce((sum, item) => sum + +item.sum, 0))} ₽</ChartTitle>
        </PieChart>
        <NavigateButton onPress={setNextMonth}>
          <MaterialIcons name="arrow-forward-ios" color={textPrimary} size={24} />
        </NavigateButton>
      </PieChartWrapper>
      <View>
        {data.map(item => {
          return (
            <CategoryCard
              key={item.id}
              onPress={() => navigation.navigate('TransactionsByCategory', {
                category: item.id,
              })}
              title={item.title}
              description={item.description}
              label={`${separateThousands(+item.sum)} ₽`}
              tagColor={item.color}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};