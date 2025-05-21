import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown, Layout, SlideInRight } from 'react-native-reanimated';
import { useAnimation } from '../context/AnimationContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootNavigator';
import AnimatedHeader from '../components/AnimatedHeader';
import HealthCard from '../components/HealthCard';
import HealthChart from '../components/HealthChart';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';

type HealthDashboardScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HealthDashboard'>;
};

const HealthDashboardScreen: React.FC<HealthDashboardScreenProps> = ({ navigation }) => {
  const { animationsEnabled } = useAnimation();
  
  // Dummy data for heart rate chart
  const heartRateData = [72, 75, 68, 80, 73, 78, 75];
  const heartRateLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Dummy data for sleep quality
  const sleepData = [6.5, 7.2, 8, 6.8, 7.5, 8.2, 7.8];
  const sleepLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const navigateToActivityTracking = () => {
    navigation.navigate('ActivityTracking');
  };
  
  return (
    <LinearGradient colors={['#2E3C58', '#1B2A41']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <AnimatedHeader title="Health Dashboard" showBackButton />
        
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Health Stats Cards */}
          <View style={styles.cardsContainer}>
            <HealthCard 
              title="Heart Rate" 
              value="78" 
              unit="bpm" 
              current={78} 
              max={120} 
              color="#FF5E3A"
              onPress={() => {}}
            />
            
            <HealthCard 
              title="Steps Today" 
              value="8,754" 
              current={8754} 
              max={10000} 
              color="#4CD964"
              onPress={() => {}}
            />
            
            <HealthCard 
              title="Sleep" 
              value="7.5" 
              unit="hours" 
              current={7.5} 
              max={9} 
              color="#5AC8FA"
              onPress={() => {}}
            />
            
            <HealthCard 
              title="Calories" 
              value="1,756" 
              unit="kcal" 
              current={1756} 
              max={2500} 
              color="#FFCC00"
              onPress={() => {}}
            />
          </View>
          
          {/* Health Charts */}
          {/* <HealthChart 
            title="Heart Rate (Weekly)" 
            data={heartRateData} 
            labels={heartRateLabels} 
            unit="bpm"
            color="#FF5E3A" 
            minValue={60}
          />
          
          <HealthChart 
            title="Sleep Duration (Weekly)" 
            data={sleepData} 
            labels={sleepLabels} 
            unit="h"
            color="#5AC8FA" 
            minValue={5}
          /> */}
          
          {/* Activity Button */}
          <Animated.View 
            entering={animationsEnabled ? SlideInRight.duration(1000).delay(500) : undefined}
            style={styles.activityButtonContainer}
          >
            <TouchableOpacity 
              style={styles.activityButton} 
              onPress={navigateToActivityTracking}
              activeOpacity={animationsEnabled ? 0.8 : 1}
            >
              <Ionicons name="fitness-outline" size={RFValue(24)} color="#FFFFFF" />
              <View style={styles.activityButtonTextContainer}>
                <Animated.Text 
                  entering={animationsEnabled ? FadeInDown.duration(500).delay(1000) : undefined}
                  style={styles.activityButtonText}
                >
                  View Activity Tracking
                </Animated.Text>
                <Animated.Text 
                  entering={animationsEnabled ? FadeInDown.duration(500).delay(1200) : undefined}
                  style={styles.activityButtonSubText}
                >
                  Track your workouts and progress
                </Animated.Text>
              </View>
              <Ionicons name="chevron-forward" size={RFValue(24)} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
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
  },
  scrollViewContent: {
    padding: RFValue(15),
  },
  cardsContainer: {
    marginBottom: RFValue(20),
  },
  activityButtonContainer: {
    marginBottom: RFValue(20),
  },
  activityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(97, 218, 251, 0.2)',
    borderRadius: RFValue(15),
    padding: RFValue(20),
    borderWidth: 1,
    borderColor: 'rgba(97, 218, 251, 0.3)',
  },
  activityButtonTextContainer: {
    flex: 1,
    marginLeft: RFValue(15),
  },
  activityButtonText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  activityButtonSubText: {
    fontSize: RFValue(14),
    color: '#E0E0E0',
    marginTop: RFValue(5),
  },
});

export default HealthDashboardScreen; 