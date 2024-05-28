// screens/HomeScreen.tsx
import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Header from '../../index';
import ProductList from '../../ProductList';
import { useLocalSearchParams } from 'expo-router';
import { Link } from 'expo-router';

export default function Homescreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link
        href={{
          pathname: '/user/[id]',
          params: { id: 'bacon' },
        }}>
        View user details
      </Link>
    </View>
  );
}

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/200' },
  { id: 2, name: 'Product 2', price: 49.99, image: 'https://via.placeholder.com/200' },
  { id: 3, name: 'Product 3', price: 19.99, image: 'https://via.placeholder.com/200' },
];

const HomeScreen: React.FC = ({ navigation }: any) => {
  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <ProductList products={products} onPress={handleProductPress} />
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});


