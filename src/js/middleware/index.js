import { 
         EDIT_HEADER, 
         COLUMN_MATCHING,
         EDIT_DATATYPE} from "../constants/action-types";

export function checkMatchMiddleware({ dispatch }) {
  return function(next){
    return function(action){
      if (action.type === EDIT_HEADER) {
        return dispatch( {type: COLUMN_MATCHING, payload: action.payload})
      }
      // if (action.type === EDIT_DATATYPE && action.payload === "multiple") {
      //   return dispatch( {type: COLUMN_MATCHING, payload: action.payload})
      // }
      return next(action);
    }
  }
}

// export function initialCheckMiddleware({ dispatch }) {
//   return function(next){
//     return function(action){
//       if (action.type === INPUT_FILE) {
//         const match = action.payload.columns.filter(key => 
//           matchList.includes(key)
//         );
//         return dispatch( {type: MATCHED, payload: match})
//       }
//       return next(action);
//     }
//   }
// }

