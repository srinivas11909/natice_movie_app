import { View, StyleSheet, Text, TextInput, Pressable, Image, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
//import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { posterImgBig, searchMovies, fallbackMoviePoster } from '../api/db'
import { debounce } from 'lodash'
import Loader from '../components/Loader'
import { Icon } from 'react-native-paper';


const {width, height} =  Dimensions.get('window');


export default function SearchScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([])

    const handleSearch = search=>{
        if(search && search.length>2){
            setLoading(true);
            searchMovies({
                query: search,
                include_adult: false,
                language: 'en-US',
                page: '1'
            }).then(data=>{
                console.log('got search results');
                setLoading(false);
                if(data && data.results) setResults(data.results);
            })
        }else{
            setLoading(false);
            setResults([])
        }
      }
    
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);    

  return (
    <SafeAreaView style={{backgroundColor: '#171717', flex: 1}}>

        {/* search input */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center',backgroundColor: '#fff', color: '#000'}}>
            <TextInput 
                onChangeText={handleTextDebounce} 
                placeholder="Search Movie" 
                placeholderTextColor={'lightgray'} 
                style={{fontSize: 18, padding: 10, width:' calc(100% - 10%)'}}
            />
            <Pressable  
                onPress={()=> navigation.navigate('Home')}
                className="rounded-full p-3 m-1 bg-neutral-500" 
            >
              <Icon size={30} source="close" strokeWidth={2}  color="tomato" style={style.menuImages} allowFontScaling={true}/>
                
            </Pressable>
        </View>

        {/* search results */}
        {
            loading? (
                <Loader />
            ): 
            results.length>0? (
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{paddingHorizontal:15,paddingTop: 15}}
                >
                    <Text style={{color: '#fff',fontWeight: 'bold',fontSize: 18,marginBottom: 12}}>Results ({results.length})</Text>
                    <View style={style.resultsContainer}>
                        {
                            results.map((item, index)=>{
                                return (
                                    <TouchableWithoutFeedback 
                                        key={index} 
                                        onPress={()=> navigation.push('Movie', item)}>
                                        <View style={style.card}>
                                            <Image 
                                                source={{uri: posterImgBig(item.poster_path) || fallbackMoviePoster}} 
                                                // source={require('../assets/images/moviePoster2.png')}
                                                style={{ width: width*0.44, height: height*0.3,borderRadius: 5}} 
                                            />
                                            <Text style={{color: '#fff',fontWeight: 'bold',fontSize: 18}}>
                                                {
                                                    item.title.length>15? item.title.slice(0,15)+'...': item.title
                                                }
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </View>
                    
                </ScrollView>
            ):(
                <View>
                   <Text style={{color: '#fff',fontWeight: 'bold',fontSize: 18}}>No Results Found </Text>
                </View>
            )
        }
    </SafeAreaView>
  )
}


const style = StyleSheet.create({
  resultsContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    marginBottom: 10
  },
  menuImages:{
    paddingRight: 10
  }
})