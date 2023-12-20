import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';

interface Album {
  id: number;
  title: string;
}

interface AlbumState {
  albums: Album[];
}

const initialState: AlbumState = {
  albums: [],
};

const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setAlbums: (state, action: PayloadAction<Album[]>) => {
      state.albums = action.payload;
    },
    deleteAlbum: (state, action: PayloadAction<number>) => {
      state.albums = state.albums.filter((album) => album.id !== action.payload);
    },
  },
});

export const { setAlbums, deleteAlbum } = albumSlice.actions;
export default albumSlice.reducer;

// Async Thunk Action
export const fetchAlbums = (): AppThunk => async (dispatch) => {
  try {
    // Make API call to JSON Placeholder
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    const albums = await response.json();
    dispatch(setAlbums(albums));
  } catch (error) {
    console.error('Error fetching albums:', error);
  }
};
