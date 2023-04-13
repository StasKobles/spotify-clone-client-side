import axios from "axios";
import { Dispatch } from "react";

import { TrackAction, TrackActionTypes } from "../../types/track";

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get("http://164.92.165.132:4200/tracks");
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: "Error while loading track ",
      });
    }
  };
};
