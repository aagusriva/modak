import {Icon} from '@rneui/base';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './CardItem.styles';

export type CardProps = {
  id: number;
  img: string | null;
  title: string;
  author: string;
  handlePress: () => void;
};

const CardItem = (props: CardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: props.img || 'https://api.artic.edu/docs/assets/logo.svg',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.dataContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            {props.author}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon type="material" name="star" color="#666666" size={30} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;
