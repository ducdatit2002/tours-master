import * as tourConstants from "../_constants/tour.module";
import {
   toastError,
   // toastSuccess,
   toastPatchSuccess,
   toastDeleteSuccess,
   toastCreateSuccess
} from "../_helper/toastify.helper";
const initialState = {
   listTour: [],
   listTourSearch: [],
   listTourByTime: [],
   listImageTour: [],
   tourById: {},
   delete: [],
   patch: [],
   create: []
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case tourConstants.FETCH_TOUR:
         return {
            ...state,
            listTour: [],
            listTourSearch: []
         };
      case tourConstants.FETCH_TOUR_SUCCESS: {
         const { data } = action.payload;
         return {
            ...state,
            listTour: data
         };
      }
      case tourConstants.FETCH_TOUR_FAILED: {
         const { error } = action.payload;
         toastError(error);
         return {
            ...state,
            listTour: []
         };
      }
      // List tour search
      case tourConstants.FETCH_TOUR_SEARCH_SUCCESS: {
         const { data } = action.payload;

         return {
            ...state,
            listTourSearch: data
         };
      }
      case tourConstants.FETCH_TOUR_SEARCH_FAILED: {
         const { error } = action.payload;
         toastError(error);
         return {
            ...state,
            listTourSearch: []
         };
      }

      //Get Schedule By  Id Tour
      case tourConstants.FETCH_TOUR_GET_BYID_SUCCESS: {
         const { data } = action.payload;
         // toastGetByIdSuccess(data);
         return {
            ...state,
            tourById: data
         };
      }
      case tourConstants.FETCH_TOUR_GET_BYID_FAILED: {
         const { error } = action.payload;
         toastError(error);
         return {
            ...state,
            tourById: {}
         };
      }

      //Get Tour By Time
      case tourConstants.FETCH_TOUR_GET_BYTIME_SUCCESS: {
         const { data } = action.payload;
         return {
            ...state,
            listTourByTime: data[0]
         };
      }
      case tourConstants.FETCH_TOUR_GET_BYTIME_FAILED: {
         const { error } = action.payload;
         toastError(error);
         return {
            ...state,
            listTourByTime: {}
         };
      }

      //Post - Create
      case tourConstants.FETCH_TOUR_CREATE_SUCCESS: {
         const { data } = action.payload;
         const { newRecord } = action.newRecord;
         toastCreateSuccess(newRecord);
         return {
            ...state,
            create: data
         };
      }
      case tourConstants.FETCH_TOUR_CREATE_FAILED: {
         const { error } = action.payload;
         toastError(error);
         return {
            ...state,
            create: error
         };
      }

      //Delete
      case tourConstants.FETCH_TOUR_DELETE_SUCCESS: {
         const { data } = action.payload;
         const { record } = action.record;
         toastDeleteSuccess(record);
         return {
            ...state,
            delete: data
         };
      }
      case tourConstants.FETCH_TOUR_DELETE_FAILED: {
         const { error } = action.payload;
         toastError(error);
         return {
            ...state,
            delete: error
         };
      }

      //Patch - update
      case tourConstants.FETCH_TOUR_PATCH_SUCCESS: {
         const { data } = action.payload;
         const { newRecord } = action.newRecord;
         toastPatchSuccess(newRecord);
         return {
            ...state,
            patch: data
         };
      }
      case tourConstants.FETCH_TOUR_PATCH_FAILED: {
         const { error } = action.payload;
         toastError(error);
         return {
            ...state,
            patch: error
         };
      }

      //Image Tour
      case tourConstants.FETCH_TOUR_IMAGE:
         return {
            ...state,
            listImageTour: []
         };
      case tourConstants.FETCH_TOUR_IMAGE_SUCCESS: {
         const { data } = action.payload;
         // toastSuccess(data);
         return {
            ...state,
            listImageTour: data
         };
      }
      case tourConstants.FETCH_TOUR_IMAGE_FAILED: {
         const { error } = action.payload;
         toastError(error);
         return {
            ...state,
            listImageTour: []
         };
      }
      default:
         return state;
   }
};

export default reducer;
