import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Category({ title, onPress, active }) {
  return (
    <TouchableOpacity
      style={[styles.container, active ? styles.activeContainer : {}]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  activeContainer: {
    backgroundColor: '#dcdcdc',
  },
  title: {
    fontSize: 16,
  },
});