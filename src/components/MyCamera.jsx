import { Camera, CameraType } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const MyCamera = () => {

    const [type, setType] = useState(CameraType.back);
    const [photo, setPhoto] = useState();
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

    const cameraRef = useRef();

    useEffect(() => {
        // requestPermission();
        requestMediaPermission();
    }, [])

    if (!permission) return <Text> No Permission to Access Camera! </Text>

    if (!permission.granted) {
        return <View>
            {/* <Text style={{ marginBottom: 30 }}> We need your permission to access camera... </Text> */}
            <Button onPress={requestPermission} title='Open Camera' />
        </View>
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const capturePhoto = async () => {
        const image = await cameraRef.current.takePictureAsync()
        setPhoto(image);
    }

    const savePhoto = async () => {
        if (mediaPermission.granted) {
            await MediaLibrary.saveToLibraryAsync(photo.uri);
            // console.log(uri);
            alert('saved to gallery!');
            setPhoto(null);
        } else {
            requestMediaPermission();
        }
    }


    return (
        <>
            <View style={styles.container}>
                {
                    photo ?

                        <View>
                            <View style={{ height: '90%', display: 'flex' }}>
                                <Image style={{ width: '100%', height: '100%' }} source={{ uri: photo.uri }} />
                            </View>

                            <View style={{ height: '10%', display: 'flex', flexDirection: 'row', gap: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }} >

                                {/* Back to Camera */}
                                <TouchableOpacity activeOpacity={1} onPress={() => setPhoto(null)}>
                                    <Image style={{ width: 25, height: 25 }} source={require('../../assets/back-icon.png')} />
                                </TouchableOpacity>

                                {/* Image Save & Back to Camera */}
                                <TouchableOpacity activeOpacity={1} onPress={savePhoto}>
                                    <Image style={{ width: 25, height: 25 }} source={require('../../assets/save-icon.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        :

                        <Camera style={styles.camera} type={type} ref={cameraRef}>

                            <View style={styles.buttonContainer}>

                                {/* Gallery Button */}
                                <View>
                                    <TouchableOpacity style={styles.button}>
                                        <Image style={{ width: 50, height: 50 }} source={require('../../assets/gallery-icon.png')} />
                                    </TouchableOpacity>
                                </View>

                                {/* Capture Button */}
                                <View>
                                    <TouchableOpacity style={styles.button} onPress={capturePhoto}>
                                        <Image style={{ width: 100, height: 100 }} source={require('../../assets/capture-icon.png')} />
                                    </TouchableOpacity>
                                </View>

                                {/* FLip Button */}
                                <View>
                                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                                        <Image style={{ width: 50, height: 50 }} source={require('../../assets/flip-icon.png')} />
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </Camera>

                }



            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    buttonContainer: {
        flex: 1,
        paddingVertical: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'black',
    },
    button: {
        // flex: 1,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    }
});


export default MyCamera
