// components/ProductList.tsx
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type ProductListProps = {
  products: Product[];
  onPress: (product: Product) => void;
};

const ProductList: React.FC<ProductListProps> = ({ products, onPress }) => {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductCard product={item} onPress={onPress} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
});

export default ProductList;
