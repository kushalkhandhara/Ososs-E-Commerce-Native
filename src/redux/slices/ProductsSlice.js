const {createSlice} = require("@reduxjs/toolkit");
const ProductSlice = createSlice({
    name : 'products',
    initialState : {
        data : null,
        isLoading : true,
    },
    reducers :{
        addProducts(state,action){
            state.data = action.payload;
        },
    }
});

export const {addProducts} = ProductSlice.actions;
export default ProductSlice.reducer;