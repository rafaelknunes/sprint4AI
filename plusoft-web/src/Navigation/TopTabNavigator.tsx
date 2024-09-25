import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet } from 'react-native';
import Home from '../Components/Home';
import Dashboard from '../Components/Dashboard';
import FeedbackScreen from '../Components/FeedbackScreen';
import styles from '../Styles/Index';
import Footer from '../Components/Footer'; 
const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  return (
    <View style={styles.footContainer}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.tabBarLabel,  
          tabBarStyle: styles.tabBar,  
          tabBarIndicatorStyle: styles.tabBarIndicator, 
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Feedbacks" component={FeedbackScreen} />
        
      </Tab.Navigator>

      <Footer />
    </View>
  );
}