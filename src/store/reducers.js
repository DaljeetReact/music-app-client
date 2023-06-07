import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 user:{},
 loading:false
}

export const userDataSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setUserData: (state,action) => {
      state.user = action.payload
    }, 
    setLoading: (state,action)=>{
        state.loading = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserData,setLoading } = userDataSlice.actions

export default userDataSlice.reducer