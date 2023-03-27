import { createSlice } from "@reduxjs/toolkit";
import postsSlice from "../posts/postsSlice";

const initialState = [
    {id:'1',title:'Learning Redux Toolkit',content:"I have heard good things"},
    {id :'2',title:'Slice....',content:"The more I slice the more I want pizza"}
]

const postSlice = createSlice({
    name:'post',
    initialState,
    reducers: {
        //payload will have all the data which is in form
        postAdded(state,action){
            state.push(action.payload)
        }
    }
})

export const selectAllPosts = (state) =>state.post;

export const { postAdded } = postsSlice.actions

export default postSlice.reducer
// export const counterSlice = createSlice({
//     name: 'counter',
//     initialState,
//     reducers: {
//         increment: (state) => {
//             state.count += 1;
//         },
//         decrement: (state) => {
//             state.count -= 1;
//         },
//         reset: (state) => {
//             state.count = 0;
//         },
//         incrementByAmount: (state, action) => {
//             state.count += action.payload;
//         }
//     }
// });

// export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;

// export default counterSlice.reducer;