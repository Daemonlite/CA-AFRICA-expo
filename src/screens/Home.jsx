import React from 'react'
import { Text,SafeAreaView, View,ScrollView } from 'react-native'
import { useEffect,useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
const Home = () => {
    const [data,setData] = useState([])
    const navigation = useNavigation()
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/albums')
        .then(res => setData(res.data))
        .catch(err=>console.log(err))
    },[])
    const move = (albumId) => {
        navigation.navigate('Details',{albumId})
        //alert(albumId)

    }
  return (
    <SafeAreaView>
    <ScrollView>
      <View>
        {data.map(album => <Text key={album.id} onPress={() => move(album.id)}>{album.title}</Text>)}
      </View>
    </ScrollView>
    </SafeAreaView>
    
  )
}

const styles = {
    cont:{
        flex:10
    }
}
export default Home