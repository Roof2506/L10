import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet} from 'react-native';

let originalData = [];

const styles = StyleSheet.create({
    Parent:{
        flexDirection:'column',
        backgroundColor:'#FCFAEE',
        borderColor:'gold',
        borderWidth:3
    },
    Child:{
        textAlign:'center',
    }
})

const App = () => {
  const [mydata, setMyData] = useState([]);
  useEffect(() => {

    fetch('https://mysafeinfo.com/api/data?list=nobelwinners&format=json&case=default')
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          if(originalData.length<1){
            setMyData(myJson);
            originalData=myJson;
          }
        });
  },[]);

    const FIlterData = (text) => {
        if (text !== '') {
            const lowerCaseText = text.toLowerCase();
            const MyFilterData = originalData.filter(
                (item) =>
                    item.FullName.toLowerCase().includes(lowerCaseText) ||
                    item.AwardName.toLowerCase().includes(lowerCaseText) ||
                    item.Year.toString().includes(lowerCaseText) ||
                    item.Country.toLowerCase().includes(lowerCaseText)
            );
            setMyData(MyFilterData);
        } else {
            setMyData(originalData);
        }
    };


  const renderItem = ({item, index}) => {
    return (
        <View style={[styles.Parent,{margin:5}]}>
          <Text style={[styles.Child,{fontWeight:"bold",fontSize: 20,}]}>Name:{item.FullName}</Text>
          <Text style={styles.Child}>Award:{item.AwardName}</Text>
          <Text style={styles.Child}>Year:{item.Year}</Text>
          <Text style={styles.Child}>Country:{item.Country}</Text>
        </View>
    );
  };

  return (
      <View style={{backgroundColor:'yellow'}}>
        <Text style={[styles.Child,{fontWeight:"bold",fontSize: 40, marginBottom:10}]} >Nobel Prize Winners</Text>
        <StatusBar/>
        <Text>Search:</Text>
        <TextInput style={{borderWidth:1,backgroundColor:'white'}} onChangeText={(text)=>{FIlterData(text)}} />
        <FlatList data={mydata} renderItem={renderItem} />
      </View>
  );
}

export default App;
