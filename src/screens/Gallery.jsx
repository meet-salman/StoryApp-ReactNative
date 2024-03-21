import { Button, Text, SafeAreaView, ScrollView, StyleSheet, Image, View, Platform, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';

const Gallery = () => {


    const [albums, setAlbums] = useState(null);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    async function getAlbums() {
        if (permissionResponse.status !== 'granted') {
            await requestPermission();
        }
        const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
            includeSmartAlbums: true,
        });
        setAlbums(fetchedAlbums);
    }


    return (
        <SafeAreaView style={styles.container}>
            {!albums ?
                <Button onPress={getAlbums} title="Open Albums" />
                :
                <ScrollView>
                    {albums && albums.map((album, i) => <AlbumEntry key={i} album={album} />)}
                </ScrollView>
            }

        </SafeAreaView>
    );


}


function AlbumEntry({ album }) {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        async function getAlbumAssets() {
            const albumAssets = await MediaLibrary.getAssetsAsync({ album });
            setAssets(albumAssets.assets);
        }
        getAlbumAssets();
    }, [album]);



    return (
        <>
            <View key={album.id} style={styles.albumContainer}>
                <Text>
                    {album.title} - {album.assetCount ?? 'no'} assets
                </Text>
                <View style={styles.albumAssetsContainer}>
                    {assets && assets.map((asset, i) => (
                        <Image key={i} source={{ uri: asset.uri }} width={140} height={140} />
                    ))}
                </View>
            </View>

        </>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    albumAssetsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default Gallery
