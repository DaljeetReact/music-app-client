import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  auth:false,
 user:{},
 albums:[],
 artists:[],
 songs:[],
 users:[],
 loading:false,
 filters:{
    Artist: "",
    Album: "",
    Language: "",
    Category: ""
  },
  isSongPlaying:true,
  songIndex:0,
  currentPlaylist:[]
}

export const userDataSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setAuth: (state,action) => {
      state.auth = action.payload
    },
    setUserData: (state,action) => {
      state.user = action.payload
    }, 
    setAllUserData: (state,action) => {
      state.users = action.payload
    }, 
    setSongs: (state,action) => {
      state.songs = action.payload
    },
    setArtists: (state,action) => {
      state.artists = action.payload
    },
    setAlbums: (state,action) => {
      state.albums = action.payload
    },
    setGlobalFilters: (state,action) => {
      let {name,val} = action.payload;
      let update = state.filters
          update = {...update,[name]:val};
      state.filters = update;
    },
    resetFilters:(state,action) => {
      state.filters = action.payload;
    },
    setLoading: (state,action)=>{
        state.loading = action.payload
    },
    setIsSongPlaying: (state,action)=>{
      state.isSongPlaying = action.payload
    },
    setSongIndex: (state,action)=>{
      state.songIndex = action.payload
    },
    AddSongToPlayList : (state,action)=>{
      state.currentPlaylist = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setAuth , setUserData,setLoading,setArtists,setSongs,setAlbums,setAllUserData,setGlobalFilters,setIsSongPlaying,setSongIndex,AddSongToPlayList,resetFilters } = userDataSlice.actions

export default userDataSlice.reducer