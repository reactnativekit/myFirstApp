import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const HomeScreen = () => {
  const [cameraPhoto, setCameraPhoto] = useState();
  const [galleryPhoto, setGalleryPhoto] = useState();

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setCameraPhoto(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setGalleryPhoto(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.myFirstApp}>myFirstApp</Text>
      <Text style={styles.subText}>Image Picker</Text>
      <TouchableOpacity onPress={openCamera} style={styles.button}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      <Image style={styles.imageStyle} source={{uri: cameraPhoto}} />

      <TouchableOpacity onPress={openGallery} style={styles.button}>
        <Text style={styles.buttonText}>Open Gallery</Text>
      </TouchableOpacity>
      <Image style={styles.imageStyle} source={{uri: galleryPhoto}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9EFC0',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myFirstApp: {
    marginTop: -100,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3D8361',
  },
  subText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    backgroundColor: '#233f49',
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 50,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  imageStyle: {
    height: 150,
    width: 150,
    marginTop: 20,
    borderRadius: 5,
  },
});

export default HomeScreen;
