import * as actionTypes from "../action/actionType";

const initialState = {
  trash:[],
  productData:[
    {
        "id":1,
        "title":"pendrive",
        "price":500,
        "category":"Electronics",
        "inStock":true,
        "description":"storage device"
    },
    {
        "id":2,
        "title":"headphone",
        "price":1500,
        "category":"Electronics",
        "inStock":true,
        "description":"audio device"
    },
    {
        "id":3,
        "title":"denim",
        "price":500,
        "category":"Clothes",
        "inStock":false,
        "description":"a single for demo"
    },
    {
        "id":4,
        "title":"laptop",
        "price":50000,
        "category":"Electronics",
        "inStock":false,
        "description":"personal portable computer"
    }
]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MOVE_TO_TRASH:
      state.trash.push(action.payload)
      return {
        ...state,
    };

    case actionTypes.RESTORE_ITEM:
      let updated_list = [];
      updated_list = state.trash.filter(function( obj ) { return obj.id !== action.payload.id; });
      return {
        ...state,
        trash : [...updated_list]
    };

    case actionTypes.ADD_NEW_ITEM:
      state.productData.push(action.payload)
      return {
        ...state,
    };

    default:  
      return state;
  }
};

export default reducer;