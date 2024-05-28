// components/Header.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>CeloSwap</Text> 

      <Link href="/ProductList">View details</Link>
      <Link href="/screens/CartScreen.tsx">View Cart</Link>


    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingTop: 15,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Header;
