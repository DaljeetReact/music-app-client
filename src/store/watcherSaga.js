import { takeLatest } from "redux-saga/effects";
import {LoadAppData} from "./sagaHandler"

export function* watcherSaga() {
   yield takeLatest('music/setUserData',LoadAppData);  // the action  'saga/GetUser' bind with handler function
 }


// whenever 'GetUser' action is dispatched  dispatch(GetUser())  it will run the  handlGetUser  and that function call  fetchUsersApi 

  