import { MATCHED,
         EDIT_HEADER, 
         COLUMN_MATCHING,
         SLIDE_INDEX, 
         STORE_SUBMIT} from "../constants/action-types";

const matchList = [
                    "Subject", "VisitLabel", "VisitDate",
                    "CLINICAL_SYSTOLIC_BLOOD_PRESSURE", 
                    "CLINICAL_DIASTOLIC_BLOOD_PRESSURE",
                    //"CLINICAL_AMBULATORY_SYSTOLIC_BLOOD_PRESSURE_24_HOURS",
                    //"CLINICAL_AMBULATORY_DIASTOLIC_BLOOD_PRESSURE_24_HOURS",
                    "NEW_COLUMN",
                    "CLINICAL_AMBULATORY_SYSTOLIC_BLOOD_PRESSURE_AWAKE",
                    "CLINICAL_AMBULATORY_DIASTOLIC_BLOOD_PRESSURE_AWAKE",
                    "CLINICAL_AMBULATORY_SYSTOLIC_BLOOD_PRESSURE_ASLEEP",
                    "CLINICAL_AMBULATORY_DIASTOLIC_BLOOD_PRESSURE_ASLEEP",
                    "NEW_COLUMN"
                  ]

export function checkMatchMiddleware({ dispatch }) {
  return function(next){
    return function(action){
      if (action.type === EDIT_HEADER) {
        return dispatch( {type: COLUMN_MATCHING, payload: action.payload})
      }
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

