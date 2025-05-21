import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  FadeIn,
  SlideInRight
} from 'react-native-reanimated';
import { useAnimation } from '../context/AnimationContext';
import { RFValue } from 'react-native-responsive-fontsize';

const { width: screenWidth } = Dimensions.get('window');

interface HealthChartProps {
  title: string;
  data: number[];
  labels: string[];
  color?: string;
  unit?: string;
  minValue?: number;
  maxValue?: number;
}

const HealthChart: React.FC<HealthChartProps> = ({
  title,
  data,
  labels,
  color = '#61dafb',
  unit = '',
  minValue,
  maxValue
}) => {
  const { animationsEnabled } = useAnimation();
  const [currentData, setCurrentData] = useState<number[]>(data.map(() => 0));
  const opacity = useSharedValue(0);
  
  useEffect(() => {
    if (animationsEnabled) {
      // Animate each data point one by one
      const animateData = async () => {
        const newData = [...currentData];
        for (let i = 0; i < data.length; i++) {
          newData[i] = data[i];
          setCurrentData([...newData]);
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      };
      
      animateData();
      opacity.value = withTiming(1, { duration: 800 });
    } else {
      // If animations are disabled, just set the data
      setCurrentData(data);
      opacity.value = 1;
    }
  }, [data, animationsEnabled]);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    };
  });
  
  const ChartContainer = animationsEnabled ? Animated.View : View;
  const containerProps = animationsEnabled ? {
    entering: FadeIn.duration(500).delay(300),
    style: [styles.container, animatedStyle]
  } : {
    style: styles.container
  };
  
  const chartConfig = {
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(${color.replace('#', '').match(/.{1,2}/g)?.map(hex => parseInt(hex, 16)).join(',') || '97,218,251'}, ${opacity})`,
    labelColor: () => 'rgba(255, 255, 255, 0.7)',
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#fff',
    },
  };
  
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: minValue !== undefined ? [minValue, ...currentData] : currentData,
        color: (opacity = 1) => `rgba(${color.replace('#', '').match(/.{1,2}/g)?.map(hex => parseInt(hex, 16)).join(',') || '97,218,251'}, ${opacity})`,
        strokeWidth: 3
      }
    ],
    legend: [title]
  };
  
  return (
    // @ts-ignore - Type issues with conditional component
    <ChartContainer {...containerProps}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={screenWidth - RFValue(40)}
          height={RFValue(220)}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withDots={true}
          withShadow={false}
          withVerticalLines={false}
          fromZero={minValue === undefined}
          yAxisSuffix={unit}
          yAxisInterval={1}
        />
      </View>
    </ChartContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: RFValue(20),
    padding: RFValue(20),
    marginBottom: RFValue(20),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: RFValue(15),
  },
  chartContainer: {
    alignItems: 'center',
  },
  chart: {
    borderRadius: RFValue(16),
    paddingRight: RFValue(20),
  }
});

export default HealthChart; 