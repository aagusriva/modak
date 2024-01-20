import {Icon} from '@rneui/base';
import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './CardItem.styles';

export type CardProps = {
  id: number;
  img: string;
  title: string;
  author: string;
};

const CardItem = (props: CardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: props.img,
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
    </View>
  );
};

export default CardItem;
