import React from 'react'
import { Text, SafeAreaView, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { List } from 'react-native-paper';

const Home = () => {
  const [data, setData] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  const move = (albumId) => {
    navigation.navigate('Details', { albumId })
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <List.Section>
          {data.map(album => (
            <List.Item
              key={album.id}
              title={album.title}
              onPress={() => move(album.id)}
              left={props => <List.Icon {...props} icon="album" />}
            />
          ))}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home