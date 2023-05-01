export const Actiontypes = {
    ADD_ITEMS : "ADD_ITEMS",
    UPDATE_CONTACT:"UPDATE_CONTACT",
    DELETE_CONTACT:"DELETE_CONTACT", 
    ADD_MOVIES:"ADD_MOVIES",
    FETCH_CONTACTS_SUCCESS:"FETCH_CONTACTS_SUCCESS",
    FETCH_DATA_SUCCESS:"FETCH_DATA_SUCCESS",
    AUTH_ITEMS:"AUTH_ITEMS"
    //FETCH_CONTACTS_FAILURE:"FETCH_CONTACTS_FAILURE"
};
  export const fetchItem = (items) =>{
      return {
        type: Actiontypes.ADD_MOVIES,
        payload: items,
      }
    };

  
