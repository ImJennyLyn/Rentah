// AddFormScreen.tsx
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

type RootStackParamList = {
  Home: undefined;
  AddForm: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'AddForm'>;

const fetchWithTimeout = (url: string, options: any, timeout = 5000): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    ),
  ]);
};

const AddFormScreen: React.FC<Props> = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async () => {

    console.log('Submit button clicked');

    if (!title || !description || !location || !price || !contact) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const formData = {
      title,
      description,
      location,
      price,
      contact,
    };

    try {
      const response = await fetchWithTimeout('http://10.0.2.2/rentah/add_listing.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      

      const result = await response.json();
      if (result.message === 'Listing added successfully') {
        Alert.alert('Success', 'Your rent listing has been submitted.');
        console.log('Submitting:', formData);
        console.log('Response:', result);

      } else {
        Alert.alert('Error', result.message);
      }

      // Reset fields
      setTitle('');
      setDescription('');
      setLocation('');
      setPrice('');
      setContact('');
    } catch (error: any) {
      console.error('Submission error:', error.message);
  Alert.alert('Error', error.message || 'An unknown error occurred.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Rent Listing</Text>

      <TextInput
        style={styles.input}
        placeholder="Property Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Locatiodsadsan"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />

<Button title="Submit Listing" onPress={() => {
  console.log("Submit button clicked");
  handleSubmit();
}} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
    fontSize: 16,
  },
});

export default AddFormScreen;
