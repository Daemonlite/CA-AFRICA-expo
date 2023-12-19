import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

const Details = (props) => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const uid = props.route.params.albumId;

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${uid}/photos`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteItem = (albumId) => {
    setData(data.filter((item) => item.id !== albumId));
    axios
      .delete(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
      .then((res) => console.log(JSON.stringify(res.data)))
      .catch((err) => console.log(err));
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.button} onPress={goBack}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>
      <ScrollView>
        {data.map((album) => (
          <Card key={album.id} style={styles.card}>
            <Card.Cover source={{ uri: album.thumbnailUrl }} />
            <Card.Content>
              <Title>{album.title}</Title>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(album.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    margin: 10,
  },
};

export default Details;