import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withSequence,
  withDelay,
  FadeIn,
  FadeInUp,
  SlideInRight,
  SlideInLeft,
  Layout
} from 'react-native-reanimated';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useAnimation } from '../context/AnimationContext';
import AnimatedHeader from '../components/AnimatedHeader';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

const activityData = [
  { id: '1', name: 'Running', duration: '30 mins', calories: 320, progress: 75, color: '#FF5E3A' },
  { id: '2', name: 'Cycling', duration: '45 mins', calories: 410, progress: 90, color: '#4CD964' },
  { id: '3', name: 'Swimming', duration: '60 mins', calories: 550, progress: 100, color: '#5AC8FA' },
  { id: '4', name: 'Gym Workout', duration: '50 mins', calories: 480, progress: 85, color: '#FFCC00' },
];

interface ActivityItemProps {
  id: string;
  name: string;
  duration: string;
  calories: number;
  progress: number;
  color: string;
  index: number;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ id, name, duration, calories, progress, color, index }) => {
  const { animationsEnabled } = useAnimation();
  const [itemTargetProgress, setItemTargetProgress] = useState(0);
  const scale = useSharedValue(1);
  
  useEffect(() => {
    setItemTargetProgress(progress);
  }, [progress]);
  
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
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));
  
  const ItemContainer = animationsEnabled ? Animated.View : View;
  const containerProps = animationsEnabled ? {
    entering: index % 2 === 0 
      ? SlideInLeft.duration(500).delay(index * 200)
      : SlideInRight.duration(500).delay(index * 200),
    layout: Layout.springify(),
    style: [styles.activityItem, animatedStyle, { borderLeftColor: color, borderLeftWidth: 5 }]
  } : {
    style: [styles.activityItem, { borderLeftColor: color, borderLeftWidth: 5 }]
  };
  
  return (
    <TouchableOpacity
      activeOpacity={animationsEnabled ? 0.8 : 1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {/* @ts-ignore - Type issues with conditional component */}
      <ItemContainer {...containerProps}>
        <View style={styles.activityInfo}>
          <Text style={styles.activityName}>{name}</Text>
          <Text style={styles.activityDetail}>{duration} • {calories} kcal</Text>
        </View>
        
        <View style={styles.progressContainer}>
          <AnimatedCircularProgress
            size={RFValue(50)}
            width={RFValue(4)}
            fill={itemTargetProgress}
            tintColor={color}
            backgroundColor="rgba(255, 255, 255, 0.2)"
            rotation={0}
            lineCap="round"
            duration={animationsEnabled ? 1500 : 0}
          >
            {() => (
              <Text style={styles.progressText}>{progress}%</Text>
            )}
          </AnimatedCircularProgress>
        </View>
      </ItemContainer>
    </TouchableOpacity>
  );
};

const ActivityTrackingScreen: React.FC = () => {
  const { animationsEnabled } = useAnimation();
  const [goalTargetProgress, setGoalTargetProgress] = useState(0);
  
  useEffect(() => {
    setGoalTargetProgress(78);
  }, []);
  
  const GoalContainer = animationsEnabled ? Animated.View : View;
  const goalContainerProps = animationsEnabled ? {
    entering: FadeInUp.duration(1000),
    style: styles.goalContainer
  } : {
    style: styles.goalContainer
  };
  
  return (
    <LinearGradient colors={['#4A00E0', '#8E2DE2']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <AnimatedHeader title="Activity Tracking" showBackButton />
        
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Daily Goal Section */}
          {/* @ts-ignore - Type issues with conditional component */}
          <GoalContainer {...goalContainerProps}>
            <View style={styles.goalTextContainer}>
              <Text style={styles.goalTitle}>Daily Goal</Text>
              <Text style={styles.goalSubtitle}>78% completed</Text>
              <Text style={styles.goalCalories}>1,765 / 2,200 kcal</Text>
            </View>
            
            <AnimatedCircularProgress
              size={RFValue(120)}
              width={RFValue(12)}
              fill={goalTargetProgress}
              tintColor="#61dafb"
              backgroundColor="rgba(255, 255, 255, 0.2)"
              rotation={0}
              lineCap="round"
              duration={animationsEnabled ? 1500 : 0}
            >
              {() => (
                <View style={styles.goalProgressContent}>
                  <Ionicons name="flame-outline" size={RFValue(24)} color="#FFFFFF" />
                  <Text style={styles.goalProgressText}>78%</Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </GoalContainer>
          
          {/* Activities Heading */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
          </View>
          
          {/* Activity List */}
          {activityData.map((activity, index) => (
            <ActivityItem
              key={activity.id}
              id={activity.id}
              name={activity.name}
              duration={activity.duration}
              calories={activity.calories}
              progress={activity.progress}
              color={activity.color}
              index={index}
            />
          ))}
          
          {/* Add Activity Button */}
          <Animated.View 
            entering={animationsEnabled ? FadeIn.duration(800).delay(800) : undefined}
            style={styles.addButtonContainer}
          >
            <TouchableOpacity style={styles.addButton} activeOpacity={animationsEnabled ? 0.8 : 1}>
              <Ionicons name="add" size={RFValue(24)} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add New Activity</Text>
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
  scrollContent: {
    padding: RFValue(20),
  },
  goalContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: RFValue(20),
    padding: RFValue(20),
    marginBottom: RFValue(20),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  goalTextContainer: {
    flex: 1,
  },
  goalTitle: {
    fontSize: RFValue(22),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: RFValue(5),
  },
  goalSubtitle: {
    fontSize: RFValue(16),
    color: '#E0E0E0',
    marginBottom: RFValue(10),
  },
  goalCalories: {
    fontSize: RFValue(18),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  goalProgressContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalProgressText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: RFValue(5),
  },
  sectionHeader: {
    marginBottom: RFValue(15),
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: RFValue(15),
    padding: RFValue(15),
    marginBottom: RFValue(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 5,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: RFValue(5),
  },
  activityDetail: {
    fontSize: RFValue(14),
    color: '#E0E0E0',
  },
  progressContainer: {
    marginLeft: RFValue(10),
  },
  progressText: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButtonContainer: {
    marginTop: RFValue(10),
    marginBottom: RFValue(20),
  },
  addButton: {
    backgroundColor: 'rgba(97, 218, 251, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: RFValue(15),
    borderRadius: RFValue(15),
  },
  addButtonText: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: RFValue(10),
  },
});

export default ActivityTrackingScreen; 