import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Pressable,ScrollView  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/db';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';
import { Icon, MD3Colors } from 'react-native-paper';
import MovieList from '../components/MovieList';



const HomeScreen = () => {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(()=>{
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    },[])

    const getTrendingMovies = async ()=>{
        const data = await fetchTrendingMovies();
        console.log('got trending', data.results.length)
        if(data && data.results) setTrending(data.results);
        setLoading(false)
      }
      const getUpcomingMovies = async ()=>{
        const data = await fetchUpcomingMovies();
        console.log('got upcoming', data.results.length)
        if(data && data.results) setUpcoming(data.results);
      }
      const getTopRatedMovies = async ()=>{
        const data = await fetchTopRatedMovies();
        console.log('got top rated', data.results.length)
        if(data && data.results) setTopRated(data.results);
      }
    

    return(
        <View style={{backgroundColor: '#171717', flex: 1}}>
            <SafeAreaView>
                <StatusBar style="dark" />
                <View style={style.menuContainer}>
                    <Icon size={30} source="menu" strokeWidth={2} color="tomato" style={style.menuImages} allowFontScaling={true}/>
                    <Text style={{color: '#fff',fontSize: 18}}> 
                        <Text style={style.text}>M</Text>ovies
                    </Text>
                    <Pressable  onPress={()=> navigation.navigate('Search')}>
                        <Icon size={30} source="magnify" strokeWidth={2} color="tomato" allowFontScaling={true}/>
                    </Pressable>
                    </View>
            </SafeAreaView>
            <>
            {
                loading ? <Loader /> : (
                    <ScrollView  showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{paddingBottom: 100}}>
                        {trending.length > 0 && <MovieList movieData={trending} title="Trending Movies"/>}
                        {upcoming.length > 0 && <MovieList movieData={upcoming}  title="Upcoming Movies"/>}
                        {topRated.length > 0 && <MovieList movieData={topRated} title="TopRated Movies"/>}
                    </ScrollView>
                )
            }
            </>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        justifyContent: 'space-between',
        alignContent:'center',
        alignItems: 'center',
      },
      menuContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
      } , 
    text:{
        fontWeight: 'bold',
        color: 'tomato'
    },
    menuImages:{
        fontSize: 40   
    } 
})

export default HomeScreen;