import { Actiontypes } from "./action"
const initialState = {
    data: [],
    carts: [],
   
}


const contactReducer = (state = initialState, action) => {

    switch (action.type) {
        case Actiontypes.FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
      case Actiontypes.FETCH_DATA_SUCCESS:
        return {
          ...state,
          data: action.payload,
        };
        case Actiontypes.AUTH_ITEMS:

        return { ...state, data: [...state.data, action.payload] }
      
    //   case Actiontypes.FETCH_CONTACTS_FAILURE:
    //   return {
    //     ...state,
    //     data: [],
    //     error: action.payload,
    //   };
        case Actiontypes.ADD_ITEMS:

            return { ...state, data: [...state.data, action.payload] }

        case Actiontypes.UPDATE_CONTACT:
            return {
                ...state,
                data: state.data.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };

        case Actiontypes.DELETE_CONTACT:
            return {
                ...state,
                data: state.data.filter((contact) => contact.id !== action.payload),
            };
        case Actiontypes.ADD_MOVIES:

            return { ...state, carts: action.payload };

        default: return state;

    }

}

export default contactReducer;