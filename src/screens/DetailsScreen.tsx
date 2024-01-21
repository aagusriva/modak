import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getArticleById} from '../api/articles';
import RenderHTML from 'react-native-render-html';
import {Icon} from '@rneui/base';
import {COLORS} from '../constants/Colors';
import useAsyncStorage from '../hooks/useAsyncStorage';

const DEFAULT_IMAGE = require('../../assets/images/artic.png');

const DetailsScreen = () => {
  const route = useRoute();
  const id = (route.params as {id: number})?.id;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    img: string | null;
    title: string;
    author: string;
    description: string | undefined | null;
  } | null>(null);
  const {currentFavorites, addNewFavorite, deleteFavorite} = useAsyncStorage();
  const isFavorite = currentFavorites.includes(id);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id: number) => {
    setLoading(true);
    const resp = await getArticleById(id);
    setData({
      img: resp.thumbnail?.lqip || null,
      title: resp.title,
      author: resp.artist_title,
      description: resp.description,
    });
    setLoading(false);
  };

  if (loading) return <ActivityIndicator style={{marginTop: 20}} />;

  if (!data)
    return (
      <View>
        <Text>Something wen wrong!</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={
          data.img
            ? {
                uri: data.img,
              }
            : DEFAULT_IMAGE
        }
        style={styles.image}
      />
      <View
        style={{
          width: '100%',
        }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <Icon
            type="material"
            name={isFavorite ? 'star' : 'star-border'}
            color={COLORS.yellow}
            size={30}
            onPress={() =>
              !isFavorite
                ? addNewFavorite(id, currentFavorites)
                : deleteFavorite(id, currentFavorites)
            }
          />
        </View>
        <Text style={styles.subtitle}>{data.author}</Text>
        <View style={styles.descriptionContainer}>
          {data.description && (
            <RenderHTML
              contentWidth={Dimensions.get('window').width * 0.9}
              source={{html: data.description}}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: Dimensions.get('window').width * 0.9,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginVertical: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    maxWidth: '80%',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'left',
    marginTop: 10,
  },
  descriptionContainer: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
});

export default DetailsScreen;
