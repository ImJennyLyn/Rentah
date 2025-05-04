// HomeScreen.tsx
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { RootStackParamList } from '../App';
type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [listings, setListings] = useState<any[]>([]);

  const fetchListings = async () => {
    try {
      const response = await fetch('http://10.0.2.2/rentah/get_listing.php');
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Add New Listing" onPress={() => navigation.navigate('AddForm')} />
      <Text style={{ fontSize: 20, marginVertical: 10 }}>My Listings:</Text>

      <FlatList
        data={listings}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.location}</Text>
            <Text>{item.price}</Text>
            <Text>{item.contact}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
