import { INPUT_FILE , EDIT_CELL, EDIT_HEADER} from "../constants/action-types";


export function inputFile(payload) {
  return { type: INPUT_FILE, payload } 
}

export function editCell(payload){
  return { type: EDIT_CELL, payload }
}

export function editHeader(payload) {
  return { type: EDIT_HEADER, payload }
}