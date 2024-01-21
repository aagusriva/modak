import {Icon} from '@rneui/base';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './CardItem.styles';
import {COLORS} from '../../constants/Colors';

export type CardProps = {
  id: number;
  img: string | null;
  title: string;
  author: string;
  handlePress: () => void;
  isFavorite?: boolean;
  handleFavorite?: (isFavorite: boolean, id: number) => void;
};

const DEFAULT_IMAGE = require('../../../assets/images/artic.png');

const CardItem = (props: CardProps) => {
  const {
    id,
    img,
    title,
    author,
    handlePress,
    isFavorite,
    handleFavorite = () => {},
  } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={
            img
              ? {
                  uri: img,
                }
              : DEFAULT_IMAGE
          }
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.dataContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            {author}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          {isFavorite !== undefined && (
            <Icon
              type="material"
              name={isFavorite ? 'star' : 'star-border'}
              color={COLORS.yellow}
              size={30}
              onPress={() => handleFavorite(isFavorite, id)}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;
