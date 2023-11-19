import React, {useState,useEffect} from "react";
import { Text, View,Button,ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Icon } from 'react-native-paper';
import { fallbackMoviePoster, fetchMovieDetails, fetchSimilarMovies,fetchCastDetails, posterImgBig } from "../api/db";
import { LinearGradient } from 'expo-linear-gradient'
import Loader from "../components/Loader";
import Cast from "../components/Cast";
let {width, height} = Dimensions.get('window');
import MovieList from "../components/MovieList";

const MovieDetail = (props) => {
    const navigation = useNavigation()
    const {params: item} = useRoute();
    const [loading, setLoading] = useState(false);
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [movie, setMovie] = useState({});

    
  useEffect(()=>{
    setLoading(true);
    getMovieDetials(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  },[item]);

    const getMovieDetials = async id=>{
        const data = await fetchMovieDetails(id);
        console.log('got movie details');
        setLoading(false);
        if(data) {
            setMovie({...movie, ...data});
        }
      }
      const getMovieCredits = async id=>{
        const data = await fetchCastDetails(id);
        console.log('got movie credits')
        if(data && data.cast){
            setCast(data.cast);
        }
    
      }
      const getSimilarMovies = async id=>{
        const data = await fetchSimilarMovies(id);
        console.log('got similar movies');
        if(data && data.results){
            setSimilarMovies(data.results);
        }
    
      }
    return(
        <ScrollView style={{flex: 1, backgroundColor: "#171717"}} contentContainerStyle={{paddingBottom: 20}} 
        >
            <View style={{width: '100%'}}>
            <SafeAreaView style={style.movieDetailContainer}>
                <TouchableOpacity style={style.background} onPress={()=> navigation.goBack()}>
                    <Icon source="chevron-left" size={30} strokeWidth={2} color="white" allowFontScaling={true} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon source="heart" size={30} strokeWidth={2} color={'red'} allowFontScaling={true}/>
                </TouchableOpacity>
            </SafeAreaView>
             {
                loading ? (<Loader />) : (
                    <View>
                        <Image source={{uri : posterImgBig(movie.poster_path) || fallbackMoviePoster}} style={{width,height: height * 0.40}}/>
                        <LinearGradient 
                        colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']} 
                        style={{width, height: height*0.40,position: 'absolute',bottom: 0}}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        
                    />
                    </View>
                )
             }
             </View>
             <View  style={{marginTop: -(height*0.09)}} >
                <Text style={{color: '#fff', textAlign: 'center', fontWeight: 'bold',fontSize: 30}}>{movie?.title}</Text>
                {
            movie?.id? (
                <Text style={{textAlign: 'center', color: '#fff'}}>
                    {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
                </Text>
            ):null
        }
         <View style={{flexDirection: 'row', justifyContent: 'center', marginLeft: 8,marginTop: 8}}>
            {
                movie?.genres?.map((genre,index)=>{
                    let showDot = index+1 != movie.genres.length;
                    return (
                        <Text key={index} style={{color: 'lightgrey', textAlign: 'center', fontWeight: '500'}}>
                            {genre?.name} {showDot? "•" :null}
                        </Text>
                    )
                })
            }
        </View>
        <Text style={{color: 'lightgrey',paddingHorizontal: 12,marginTop: 40}}>
            {
                movie?.overview
            }
        </Text>
    </View>
     {
        movie?.id && cast.length > 0 && <Cast navigation={navigation} cast={cast}/>
     }
      {
        movie?.id && similarMovies.length>0 && <MovieList title={'Similar Movies'}  movieData={similarMovies} />
      }

            
        </ScrollView>
    )
}

export default MovieDetail

const style = StyleSheet.create({
    movieDetailContainer: {
        position: 'absolute',
        width: '100%',
        zIndex: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '1rem',
        marginTop: 30
    },
    background: {
        backgroundColor: "#eab308"
    }
})