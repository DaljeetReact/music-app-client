
import {call,put} from 'redux-saga/effects';
import { AllAlbums, AllArtists, AllSongs, AllUsers } from '../apis';

export function* LoadAppData(){
    console.log("called");
    try {
        // adding song to Storage
        const SongRes = yield call(AllSongs);
        yield put({type:"music/setSongs",payload:SongRes.data.data});

        // adding  Albums to Storage
        const AlbumRes = yield call(AllAlbums);
        yield put({type:"music/setAlbums",payload:AlbumRes.data.data})  

        // adding  Artist to Storage
        const ArtistRes = yield call(AllArtists);
        yield put({type:"music/setArtists",payload:ArtistRes.data.data})  

        // adding  Users to Storage
        const UsersRes = yield call(AllUsers);
        yield put({type:"music/setAllUserData",payload:UsersRes.data.data})  

 
    } catch (error) {
        console.log('catch error'.error);
    }
}
