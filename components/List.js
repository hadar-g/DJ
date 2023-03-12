import { StyleSheet, Text, View, Button, ScrollView, Pressable, Image, FlatList} from 'react-native';
import { useState, useEffect, useRef} from 'react';
import ListItem from './listItem';


const List = (props) => {
    const [inputValue, setInputValue] = useState(' ')
    const [isFirstRun, setIsFirstRun] = useState(true)
    const[songsArray, setSongsArray] = useState([props.inputValue])

    const onUpvotePressedHandler = (index) => {
        console.log("Button pressed for item of index", index)
        console.log(songsArray[index].title)
        console.log(songsArray[index].votes)
        setSongsArray(songsArray => songsArray.slice(0, index).concat({title: songsArray[index].title, votes: (songsArray[index].votes + 1)}).concat(songsArray.slice(index + 1, songsArray.length)))
    }
    const onDownvotePressedHandler = (index) => {
        if(songsArray[index].votes > 0){
            setSongsArray(songsArray => songsArray.slice(0, index).concat({title: songsArray[index].title, votes: (songsArray[index].votes - 1)}).concat(songsArray.slice(index + 1, songsArray.length)))
        }
        
    }

    useEffect(() => {
        if(isFirstRun){
            setIsFirstRun(false)
            setSongsArray(songsArray.slice(1))
            return
        }
        setSongsArray(songsArray => [...songsArray, {title : props.inputValue, votes: 10}])
        console.log(songsArray)
    }, [props.inputValue])


    return(
        <View style = {styles.listContainer}>
            <FlatList 
            data = {songsArray}
            renderItem = {({item, index}) => (
                // <Text>{item}</Text>
                <ListItem 
                    songTitle = {item.title} 
                    numVotes = {item.votes} 
                    upvotePressed = {() => onUpvotePressedHandler(index)} 
                    downvotePressed = {() => onDownvotePressedHandler(index)}/>
            )}/>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
       // flex: 1,
     //   backgroundColor: 'blue',
        height: '75%',
        width: '95%',
        //marginBottom: 200
    },

    flatList: {
      //  backgroundColor: 'green'
    }

  });

export default List