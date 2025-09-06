import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import slices from features
import authReducer from '../features/auth/authSlice';
import layoutReducer from '../features/layout/layoutSlice';
import counterReducer from '../features/counter/counterSlice';
import themeReducer from '../features/theme/themeSlice';
import blogReducer from '../features/blog/blogSlice';

// Define the persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme'], // Only persist auth and theme state
};

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  counter: counterReducer,
  theme: themeReducer,
  blog: blogReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;