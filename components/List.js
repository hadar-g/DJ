import { StyleSheet, Text, View, Button, ScrollView, Pressable, Image, FlatList} from 'react-native';
import { useState, useEffect, useRef} from 'react';
import ListItem from './listItem';


const List = (props) => {
    const [inputValue, setInputValue] = useState(' ')
    const [isFirstRun, setIsFirstRun] = useState(true)
    const[songsArray, setSongsArray] = useState([props.inputValue])

    const reOrderArrayForUpvotes = (array, indexOf, indexIn, object) => {

        const firstArray = array.slice(0, indexIn)
        const secondArray = array.slice(indexIn, array.length)
        const lastArray = firstArray.concat(object).concat(secondArray)
        const firstNextArray = lastArray.slice(0,indexOf + 1)
        const secondNextArray = lastArray.slice(indexOf + 2, array.length + 1)
        const finalLastArray = firstNextArray.concat(secondNextArray)

        return finalLastArray
    }

    const onUpvotePressedHandler = (index) => {
        const currentVotes = songsArray[index].votes + 1
        const currentTitle = songsArray[index].title
        let notFound = true
        let loopValue = 0
        while(notFound){   
            if( currentVotes > songsArray[loopValue].votes){
                notFound = false
                continue
            }
            loopValue += 1
        }
       // console.log(loopValue)
            setSongsArray(songsArray => reOrderArrayForUpvotes(songsArray, index, loopValue, {title: currentTitle, votes: currentVotes}))
           // songsArray.splice(loopValue, 0, {title: currentTitle, votes: currentVotes})
        
        console.log(loopValue)
     //   setSongsArray(songsArray => songsArray.slice(0, loopValue).concat({title: currentTitle, votes: currentVotes}).concat(songsArray.slice(loopValue + 1, songsArray.length)))
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

        //setSongsArray(  songsArray.sort((a, b) => (a.votes > b.votes) ? 1 : -1))
    }, [props.inputValue])

    // useEffect(() => {
    //     console.log("seconds use effect baby ")

    //     setSongsArray(songsArray => songsArray.sort((a, b) => (a.votes > b.votes) ? -1 : 1))

    // }, [onDownvotePressedHandler, onUpvotePressedHandler])


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