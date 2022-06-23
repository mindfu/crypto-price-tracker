import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import io from 'socket.io-client'


const socket = io('http://192.168.1.216:3000')
socket.on('connected', () => {
  console.log('Client socket connected.')
})
// socket.on('error', console.error)
// socket.on('connect_error', console.error)

const Item = ({ name, price, id }) => (
  <View style={styles.item} key={id}>
    <Text style={styles.icon}><i className={`cf cf-${name}`}></i></Text>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.name}>${price}</Text>
  </View>
);

const App = () => {
  const [data, setData] = useState()

  useEffect(() => {
    socket.on('crypto', cryptoData => {
      setData(cryptoData)
    })
  }, [])

  const renderItem = ({ item }) => (
    <Item name={item.name} price={item.price.toFixed(2)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#121212',
  },
  icon: {
    
  },
  item: {
    backgroundColor: '#f6f6f6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 25,
    fontWeight: '600',
  },
});

export default App;