import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 user:{},
 albums:[],
 artists:[],
 songs:[],
 users:[],
 loading:false
}

export const userDataSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setUserData: (state,action) => {
      state.user = action.payload
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
    setLoading: (state,action)=>{
        state.loading = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserData,setLoading } = userDataSlice.actions

export default userDataSlice.reducer