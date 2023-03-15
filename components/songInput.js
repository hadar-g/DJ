import { StyleSheet, Text, View, Button, ScrollView, Pressable, Image, TextInput, FlatList} from 'react-native';
import { useState, useEffect} from 'react';
import DropdownItem from './dropdownItem';
import SearchableDropdown from 'react-native-searchable-dropdown';


const SongInput = (props) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        if (searchTerm.length > 0) {
          const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}&entity=song&limit=5`);
          const data = await response.json();
          //setSearchResults(data.results);
          const tempArray =[]
          data.results.map(song => {
            tempArray.push({name: song.trackName, artist: song.artistName})
          })
       //   console.log(tempArray)
          setSearchResults(tempArray)
          setShowDropdown(true);
        } else {
          setSearchResults([]);
          setShowDropdown(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMusicData();
  }, [searchTerm]);

  // async function fetchMusicData(searchTerm) {
  //   try {
  //     const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}&entity=song&limit=5`);
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  //  async function textChangeHandler(text){
  //   const tempArray = []
  //   const data = await fetchMusicData(text)
  //   data.results.map(song => {
  //     tempArray.push(song.artistName)
  //   })
  //   console.log(tempArray)
  //   setSearchResults(tempArray)
  // }

    const songSubmitHandler = (index) => {
       props.onInputSubmit(searchResults[index])
        setSearchTerm('')
        setSearchResults([]);
        setShowDropdown(false);
    }
    //const items = [{id: 1, name: "one"}, {id: 2, name: "two"},{id: 3, name: "three"},{id: 4, name: "four"},{id: 5, name: "five"},{id: 6, name: "six"},{id: 7, name: "seven"},{id: 8, name: "eight"},{id: 9, name: "nine"},]

    return(
        <View style = {showDropdown ? {...styles.input, zIndex: 1} : styles.input }>
        <TextInput
        onChangeText={setSearchTerm}
        style={styles.inputText}
        value={searchTerm}
        placeholder="Enter Song Name"
      />

      {showDropdown && (

        <FlatList
         style = {styles.dropdown}
          data={searchResults}
          renderItem = {({item, index}) => (
            <DropdownItem 
              item = {item}
              onPress = {() => songSubmitHandler(index)}
              />)}
        />
      )}
     
  
       {/* <SearchableDropdown
            onTextChange = {(text) => {textChangeHandler(text)}}
            onItemSelect={(item) => {
                songSubmitHandler(item)
            }}
            //   const items = this.state.selectedItems;
            //   items.push(item)
            //   this.setState({ selectedItems: items });
            // }}
             containerStyle={{ padding: 5, height: 300,  }}
            // onRemoveItem={(item, index) => {
            //   const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
            //   this.setState({ selectedItems: items });
            // }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 500 }}
            items={items}
            //defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                style:styles.inputText,
                placeholder:"Enter Song Name"
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        /> */}

        {/* <Button title ="submit" onPress={songSubmitHandler}/> */}
        </View>

    )
}


const styles = StyleSheet.create({
    input: {
     //   flex: 1,

        flexDirection: 'column',
        marginTop: '25%',
     //  backgroundColor: 'green',
        height: 300,
        margin: 50,
    //    zIndex: 1
    },
    inputText: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: '70%',
        height: '5%',
        paddingLeft: 10,
   //     backgroundColor: 'yellow',
        height: 35,
        width: 250,
        marginLeft: 25
    
    },
    dropdown: {
      height: '100%',
      width: 300,
      marginRight: 25,
      backgroundColor: 'white',
      borderColor: 'black',
      borderBottomRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderWidth: 1
    }
  });

export default SongInput