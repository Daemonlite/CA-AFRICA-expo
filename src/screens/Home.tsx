import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

interface Album {
  id: number;
  title: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<Album[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const move = (albumId: number) => {
    navigation.navigate('Details', { albumId });
  };

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>Albums</Text>
      <ScrollView>
        <List.Section>
          {data.map(album => (
            <List.Item
              key={album.id}
              title={album.title}
              onPress={() => move(album.id)}
              left={props => <List.Icon {...props} icon="album" />}
              titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
              descriptionStyle={{ fontSize: 14 }}
              descriptionNumberOfLines={2}
              style={{ marginBottom: 8, borderRadius: 8, backgroundColor: '#f0f0f0' }}
            />
          ))}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
