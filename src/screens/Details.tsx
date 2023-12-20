import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, ScrollView, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

interface Photo {
  id: number;
  title: string;
  thumbnailUrl: string;
}

interface DetailsProps {
  route: {
    params: {
      albumId: number;
    };
  };
}

const Details = (props: { route: { params: { albumId: any; }; }; }) => {
  const [data, setData] = useState<Photo[]>([]);
  const navigation = useNavigation();
  const uid = props.route.params.albumId;

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${uid}/photos`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteItem = (photoId: number) => {
    setData(data.filter((item) => item.id !== photoId));
    axios
      .delete(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
      .then((res) => console.log(JSON.stringify(res.data)))
      .catch((err) => console.log(err));
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.button as StyleProp<ViewStyle>} onPress={goBack}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>
      <ScrollView>
        {data.map((photo) => (
          <Card key={photo.id} style={styles.card}>
            <Card.Cover source={{ uri: photo.thumbnailUrl }} />
            <Card.Content>
              <Title>{photo.title}</Title>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(photo.id)}>
                <Text style={styles.deleteButtonText as StyleProp<ViewStyle>}>Delete</Text>
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
