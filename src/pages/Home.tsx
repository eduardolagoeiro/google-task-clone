import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, Platform } from 'react-native';

export default function Home() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Todo List Title</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    paddingLeft: 64,
    paddingTop: 14,
  },
  headerText: {
    fontSize: 32,
  },
});
