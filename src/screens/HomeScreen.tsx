import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootNavigator';
import { useAnimation } from '../context/AnimationContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';

// Define navigation prop type
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { animationsEnabled, toggleAnimations } = useAnimation();
  const scale = useSharedValue(1);

  const handleNavigateToDashboard = () => {
    navigation.navigate('HealthDashboard');
  };
  
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

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <Animated.View 
          entering={animationsEnabled ? FadeInUp.duration(1000).delay(300) : undefined} 
          style={styles.headerContainer}
        >
          <Text style={styles.title}>✨ Animation Showcase ✨</Text>
          <Text style={styles.subtitle}>Experience the power of animations</Text>
        </Animated.View>

        <Animated.View 
          entering={animationsEnabled ? FadeInDown.duration(1000).delay(800) : undefined} 
          style={styles.contentContainer}
        >
          <View style={styles.animationToggleContainer}>
            <Text style={styles.toggleLabel}>Global Animations:</Text>
            <TouchableOpacity 
              onPress={toggleAnimations}
              style={[
                styles.toggleButton, 
                { backgroundColor: animationsEnabled ? '#4CD964' : '#FF3B30' }
              ]}
            >
              <View style={[
                styles.toggleHandle, 
                { transform: [{ translateX: animationsEnabled ? RFValue(26) : 0 }] }
              ]} />
              <Text style={styles.toggleText}>
                {animationsEnabled ? 'ON' : 'OFF'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.description}>
            Toggle the switch above to turn animations on/off globally throughout the app.
            This showcase demonstrates how animations enhance the user experience.
          </Text>
          <Text style={styles.description}>
            Explore our health dashboard and activity tracking screens to see the difference
            between animated and static UI elements.
          </Text>
        </Animated.View>

        <Animated.View 
          entering={animationsEnabled ? FadeInDown.duration(1000).delay(1200) : undefined}
          style={[styles.featureContainer, animatedStyle]}
        >
          <TouchableOpacity 
            style={styles.featureButton}
            onPress={handleNavigateToDashboard}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="heart" size={RFValue(28)} color="#fff" style={styles.featureIcon} />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Health Dashboard</Text>
              <Text style={styles.featureDescription}>
                Interactive health stats and charts with beautiful animations
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={RFValue(24)} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: RFValue(20),
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: RFValue(20),
  },
  title: {
    fontSize: RFValue(32),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: RFValue(18),
    color: '#E0E0E0',
    marginTop: RFValue(10),
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: RFValue(20),
    paddingHorizontal: RFValue(10),
  },
  animationToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(20),
  },
  toggleLabel: {
    fontSize: RFValue(18),
    fontWeight: '600',
    color: '#fff',
    marginRight: RFValue(15),
  },
  toggleButton: {
    width: RFValue(60),
    height: RFValue(34),
    borderRadius: RFValue(17),
    padding: RFValue(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleHandle: {
    width: RFValue(26),
    height: RFValue(26),
    borderRadius: RFValue(13),
    backgroundColor: '#fff',
  },
  toggleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RFValue(12),
    paddingHorizontal: RFValue(6),
  },
  description: {
    fontSize: RFValue(16),
    color: '#f0f0f0',
    textAlign: 'center',
    marginBottom: RFValue(15),
    lineHeight: RFValue(22),
  },
  featureContainer: {
    width: '100%',
    marginBottom: RFValue(30),
  },
  featureButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: RFValue(15),
    padding: RFValue(20),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureIcon: {
    marginRight: RFValue(15),
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: RFValue(5),
  },
  featureDescription: {
    fontSize: RFValue(14),
    color: '#E0E0E0',
  },
});

export default HomeScreen; 