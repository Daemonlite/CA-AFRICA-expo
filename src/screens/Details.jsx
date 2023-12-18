import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
  }
  return (
    <SafeAreaView>
      <Text style={styles.cont} onPress={goBack}>Go back</Text>
      <ScrollView>
        <View>
          {data.map((album) => (
            <React.Fragment key={album.id}>
              <Text>{album.title}</Text>
              <Text onPress={() => deleteItem(album.id)}>delete</Text>
              <Image
                source={{ uri: album.thumbnailUrl }}
                style={{ width: 50, height: 50 }}
              />
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  cont: {
    margin: 20,
  },
};

export default Details;