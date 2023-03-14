import { StyleSheet, Text, View, Button, ScrollView, Pressable, Image, FlatList} from 'react-native';
import { useState, useEffect, useRef} from 'react';
import ListItem from './listItem';


const List = (props) => {
    const [inputValue, setInputValue] = useState(' ')
    const [isFirstRun, setIsFirstRun] = useState(true)
    const[songsArray, setSongsArray] = useState([props.inputValue])

    const DEFAULT_VOTES_AMOUNT = 10

    const reOrderArrayForUpvotes = (array, indexOfItemToBeMoved, indexForItemToBePlaced, object) => {

        const start = array.slice(0, indexForItemToBePlaced,)
        const end = array.slice(indexForItemToBePlaced, array.length)
        const newArrayWithObject = start.concat(object).concat(end)
        const newStart = newArrayWithObject.slice(0,indexOfItemToBeMoved + 1)
        const newEnd = newArrayWithObject.slice(indexOfItemToBeMoved + 2, array.length + 1)
        const finalArray = newStart.concat(newEnd)

        return finalArray
    }
    const noReOrder = (array, index, object) => {
        const start = array.slice(0, index)
        const end = array.slice(index + 1, array.length)
        const finalArray = start.concat(object).concat(end)

        return finalArray
    }
    const reOrderArrayForDownvotes = (array, indexForItemToBePlaced, indexOfItemToBeMoved, object) => {
        const start = array.slice(0, indexForItemToBePlaced + 1)
        const end = array.slice(indexForItemToBePlaced + 1, array.length)
        const arrayWith = start.concat(object).concat(end)
        const newStart = arrayWith.slice(0, indexOfItemToBeMoved)
        const newEnd = arrayWith.slice(indexOfItemToBeMoved + 1, array.length + 1)
        const finalArray = newStart.concat(newEnd)

        return finalArray
        

    }

    const onUpvotePressedHandler = (index) => {
        const currentVotes = songsArray[index].votes + 1
        const currentTitle = songsArray[index].title
        const currentArtist = songsArray[index].artist
        let notFound = true
        let loopValue = 0
        while(notFound){   
            if( currentVotes > songsArray[loopValue].votes){
                notFound = false
                continue
            }
            loopValue += 1
        }
        if(loopValue == index){
            setSongsArray(songsArray => noReOrder(songsArray, index, {title: currentTitle, artist: currentArtist, votes: currentVotes}))
       //     console.log("not moving up")
            return false
        }else{
           // console.log("moving up")
            setSongsArray(songsArray => reOrderArrayForUpvotes(songsArray, index, loopValue, {title: currentTitle, artist: currentArtist, votes: currentVotes}))
            return true
        }
    }
    const onDownvotePressedHandler = (index) => {
        const currentVotes = songsArray[index].votes - 1
        const currentTitle = songsArray[index].title
        const currentArtist = songsArray[index].artist
        let downLoopValue = songsArray.length
        
        while(downLoopValue != 0){  
            downLoopValue -= 1 
            if( currentVotes < songsArray[downLoopValue].votes){
                break
            }
        }

        if(downLoopValue == index){
            setSongsArray(songsArray => noReOrder(songsArray, index, {title: currentTitle, artist: currentArtist, votes: currentVotes}))
          //  console.log("not moving down")
        }else{
          //  console.log("moving down")
            setSongsArray(songsArray => reOrderArrayForDownvotes(songsArray, downLoopValue, index, {title: currentTitle, artist: currentArtist,  votes: currentVotes}))
        }
        
    }

    props.onAddSong = (song) => {
        console.log("recieved a ssong")
    }

    useEffect(() => {
        if(isFirstRun){
            setIsFirstRun(false)
            setSongsArray(songsArray.slice(1))
            return
        }

        // if(songsArray.length > 1){
            let loopVal = 0

            while(loopVal != songsArray.length){
                console.log("while loop: ", loopVal)
                console.log(songsArray[loopVal].votes)
                if(songsArray[loopVal].votes < DEFAULT_VOTES_AMOUNT){
                    break
                }
                    loopVal += 1
                
            }
            const start = songsArray.slice(0, loopVal)
            const end = songsArray.slice(loopVal, songsArray.length)
            setSongsArray(start.concat({title : props.inputValue.name, artist: props.inputValue.artist, votes: DEFAULT_VOTES_AMOUNT}).concat(end))
        // }else{
        //     setSongsArray(songsArray => [...songsArray, {title : props.inputValue.name, artist: props.inputValue.artist, votes: DEFAULT_VOTES_AMOUNT}])
        // }
       
     //   console.log(songsArray)
    }, [props.inputValue])

    return(
        <View style = {styles.listContainer}>
            <FlatList 
            data = {songsArray}
            renderItem = {({item, index}) => (
                // <Text>{item}</Text>
                <ListItem 
                    songTitle = {item.title} 
                    artistName = {item.artist}
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
      //  backgroundColor: 'blue',
        marginTop: -200,
        height: '75%',
        width: '95%',
        
        //marginBottom: 200
    },

    flatList: {
      //  backgroundColor: 'green'
    }

  });

export default List