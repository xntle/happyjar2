import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MagnifyingGlass, SlidersHorizontal } from 'phosphor-react-native';


const JarHeader = () => {
  const [activeTab, setActiveTab] = useState('Happy Jars');

  return (
    <View style={styles.container}>
        {/* Search Icon */}
        <TouchableOpacity style={styles.icon}>
            <MagnifyingGlass size={20} color="#000" />
        </TouchableOpacity>

        {/* Segmented Tabs Container */}
        <View style={styles.segmentContainer}>
            {['Happy Jars', 'Images', 'Notes'].map((tab) => {
            const isActive = activeTab === tab;
            return (
                <TouchableOpacity key={tab} style={[styles.tab, isActive && styles.activeTab]} onPress={() => setActiveTab(tab)} >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                    {tab}
                </Text>
                </TouchableOpacity>
            );
            })}
            
        </View>
        <TouchableOpacity style={styles.icon}>
            <SlidersHorizontal size={20} color="#000" />
        </TouchableOpacity>
    </View>
  );
};

export default JarHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    paddingTop: 150,
    paddingBottom: 16,
  },
  icon: {
    paddingHorizontal: 16,
  },
  // Outer oval container for the segmented tabs
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',   // Gray background for the "oval"
    borderRadius: 23,            // Make it sufficiently round
    padding: 4,                  // Space around individual tabs
    height: 46
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,            // Round each segment
    backgroundColor: 'transparent', 
    marginHorizontal: 2,         // Slight spacing between segments
  },
  tabText: {
    color: '#666',               // Gray text for inactive
    fontSize: 14,
  },
  // Active tab: white background + darker text
  activeTab: {
    backgroundColor: '#FFF',
    height: 38,
    borderRadius: 19,            // Round the active segment
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
});