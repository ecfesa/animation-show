import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  FadeIn,
  FadeOut,
  Layout,
  interpolate,
  Extrapolate 
} from 'react-native-reanimated';
import { useAnimation } from '../context/AnimationContext';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { RFValue } from 'react-native-responsive-fontsize';

interface HealthCardProps {
  title: string;
  value: string;
  max?: number;
  current?: number;
  unit?: string;
  icon?: React.ReactNode;
  color?: string;
  onPress?: () => void;
}

const HealthCard: React.FC<HealthCardProps> = ({
  title,
  value,
  max = 100,
  current = 70,
  unit = '',
  icon,
  color = '#61dafb',
  onPress
}) => {
  const { animationsEnabled } = useAnimation();
  const scale = useSharedValue(1);
  const [targetProgress, setTargetProgress] = useState(0);
  
  useEffect(() => {
    const newTarget = max > 0 ? (current / max) * 100 : 0;
    setTargetProgress(newTarget);
  }, [current, max]);
  
  const handlePressIn = () => {
    if (animationsEnabled) {
      scale.value = withSpring(0.95);
    }
  };
  
  const handlePressOut = () => {
    if (animationsEnabled) {
      scale.value = withSpring(1);
    }
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });
  
  const CardComponent = animationsEnabled ? Animated.View : View;
  const cardProps = animationsEnabled ? {
    entering: FadeIn.duration(500),
    exiting: FadeOut.duration(300),
    layout: Layout.springify(),
    style: [styles.card, animatedStyle]
  } : {
    style: styles.card
  };
  
  return (
    <TouchableOpacity
      activeOpacity={animationsEnabled ? 0.9 : 1}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <CardComponent {...cardProps}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value} <Text style={styles.unit}>{unit}</Text></Text>
          </View>
          
          {(max !== undefined && current !== undefined) && (
            <View style={styles.progressContainer}>
              <AnimatedCircularProgress
                size={RFValue(60)}
                width={RFValue(5)}
                fill={targetProgress}
                tintColor={color}
                backgroundColor="rgba(255, 255, 255, 0.2)"
                arcSweepAngle={240}
                rotation={240}
                lineCap="round"
                duration={animationsEnabled ? 1500 : 0}
              />
            </View>
          )}
        </View>
      </CardComponent>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: RFValue(20),
    padding: RFValue(20),
    marginBottom: RFValue(15),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: '#E0E0E0',
    marginBottom: RFValue(8),
  },
  value: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  unit: {
    fontSize: RFValue(14),
    fontWeight: 'normal',
    color: '#E0E0E0',
  },
  progressContainer: {
    marginLeft: RFValue(10),
  }
});

export default HealthCard; 