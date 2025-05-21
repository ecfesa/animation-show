import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  FadeIn,
  SlideInDown,
  SlideInRight,
  SlideInLeft,
} from 'react-native-reanimated';
import { useAnimation } from '../context/AnimationContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface AnimatedHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  title,
  showBackButton = false,
  rightComponent
}) => {
  const { animationsEnabled, toggleAnimations } = useAnimation();
  const navigation = useNavigation();
  const scale = useSharedValue(1);
  
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
  
  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });
  
  const HeaderContainer = animationsEnabled ? Animated.View : View;
  const headerProps = animationsEnabled ? {
    entering: SlideInLeft.duration(500).springify(),
    style: styles.header
  } : {
    style: styles.header
  };
  
  return (
    // @ts-ignore - Type issues with conditional component
    <HeaderContainer {...headerProps}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={RFValue(22)} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <View style={styles.rightContainer}>
        {rightComponent || (
          <Animated.View style={[styles.animationToggleContainer, animatedButtonStyle]}>
            <TouchableOpacity 
              onPress={toggleAnimations}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.toggleButton}
            >
              <Text style={styles.toggleButtonText}>
                {animationsEnabled ? 'ON' : 'OFF'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </HeaderContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: RFValue(20),
    paddingTop: RFValue(20),
    paddingBottom: RFValue(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {},
  backButton: {
    marginRight: RFValue(10),
  },
  headerTitle: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  animationToggleContainer: {},
  toggleButton: {
    backgroundColor: '#61dafb',
    paddingVertical: RFValue(8),
    paddingHorizontal: RFValue(12),
    borderRadius: RFValue(20),
  },
  toggleButtonText: {
    color: '#192f6a',
    fontWeight: '600',
    fontSize: RFValue(14),
  },
});

export default AnimatedHeader; 