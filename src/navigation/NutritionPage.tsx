/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import { ListItem } from 'react-native-elements';
// import { material } from 'react-native-typography';
import { Appbar } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import { Button } from 'react-native-elements';

import LightFont from './CustomFonts/LightFont';
import RegularFont from './CustomFonts/RegularFont';

import { db } from '../config';
const itemsRef = db.ref('/foodRecords');

class ModalDetail extends Component {
  state = {
    isModalVisible: false,
    isDeleteModalVisible: false,
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  toggleDeleteModal = () => {
    this.setState({ isDeleteModalVisible: !this.state.isDeleteModalVisible });
  };

  confirmDelete = id => {
    console.log('trying to delete', id);

    itemsRef
      .orderByChild('id')
      .equalTo(id)
      .once('value')
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          //remove each child
          itemsRef.child(childSnapshot.key).remove();
        });
      });

    this.setState({
      isDeleteModalVisible: !this.state.isDeleteModalVisible,
    });

    //redirect to deleted page
    this.props.navigation.navigate('Delete');
  };

  render() {
    let item = this.props.item;
    let { Energy, Fat, Protein, Carbs, Fiber } = item.nutritionData;
    let subtitle = `Calories: ${Energy}`;

    return (
      <>
        <ListItem
          title={item.name}
          titleStyle={{ fontFamily: 'Montserrat-Regular' }}
          subtitle={subtitle}
          key={item}
          leftAvatar={{ source: { uri: item.image } }}
          bottomDivider
          topDivider
          chevron
          onPress={this.toggleModal}
          onLongPress={this.toggleDeleteModal}
        />
        <Modal
          animationType='slide'
          onRequestClose={() => {}}
          visible={this.state.isModalVisible}
        >
          <View style={styles.modalContainer}>
            <Appbar.Header>
              <Appbar.Content
                title={item.name}
                titleStyle={{
                  fontFamily: 'Montserrat-Regular',
                  alignSelf: 'center',
                }}
              />
            </Appbar.Header>

            <View style={styles.card}>
              <Image style={styles.image} source={{ uri: item.image }} />
            </View>
            <View
              style={{
                marginTop: -2,
                margin: 30,
                marginBottom: 6,
                alignSelf: 'center',
              }}
            >
              {/* <Text style={material.body2}>Details of food</Text> */}
              <RegularFont>Details of food</RegularFont>
            </View>
            <View
              style={{
                marginTop: 0,
                margin: 30,
                alignSelf: 'center',
                marginBottom: 15,
              }}
            >
              {Energy != '0.00' ? (
                <LightFont>Energy: {Energy} kcal</LightFont>
              ) : null}
              {Fat != '0.00' ? <LightFont>Fat: {Fat} g</LightFont> : null}
              {Protein != '0.00' ? (
                <LightFont>Protein: {Protein} g</LightFont>
              ) : null}
              {Carbs != '0.00' ? <LightFont>Carbs: {Carbs} g</LightFont> : null}
              {Fiber != '0.00' ? <LightFont>Fiber: {Fiber} g</LightFont> : null}

              {/* <Text style={material.body1}>Energy: {Energy} kcal</Text>
              <Text style={material.body1}>Fat: {Fat} g</Text>
              <Text style={material.body1}>Protein: {Protein} g</Text>
              <Text style={material.body1}>Carbs: {Carbs} g</Text>
              <Text style={material.body1}>Fiber: {Fiber} g</Text> */}
            </View>

            <TouchableOpacity onPress={this.toggleModal} style={styles.button}>
              <Text style={styles.buttonText}>back</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          animationType='slide'
          onRequestClose={() => {}}
          visible={this.state.isDeleteModalVisible}
        >
          <View style={styles.modalContainer}>
            <Appbar.Header>
              <Appbar.Content
                title='Confirm deletion'
                titleStyle={{
                  fontFamily: 'Montserrat-Regular',
                  alignSelf: 'center',
                }}
              />
            </Appbar.Header>

            <View style={styles.card}>
              <Image style={styles.image} source={{ uri: item.image }} />
            </View>

            <Button
              buttonStyle={styles.deleteButtons}
              title='Yes'
              onPress={() => this.confirmDelete(item.id)}
              type='solid'
            />

            <Button
              buttonStyle={styles.deleteButtons}
              title='No'
              onPress={this.toggleDeleteModal}
              type='outline'
            />

            {/* 
            <TouchableOpacity
              onPress={() => this.confirmDelete(item.id)}
              style={styles.deleteButtons}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.toggleDeleteModal}
              style={styles.deleteButtons}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity> */}
          </View>
        </Modal>
      </>
    );
  }
}