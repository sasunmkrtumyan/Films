import * as React from "react";
const MovieContext = React.createContext();
function movieReducer(state, action) {
  switch (action.type) {
    case "SET_SELECTED_MOVIE": {
      return { ...state, selectedMovie: action.payload };
    }
    case "SET_MOVIES": {
      return { ...state, movies: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const initialState = { selectedMovie: null, movies: null };

function MovieProvider({ children }) {
  const [state, dispatch] = React.useReducer(movieReducer, initialState);
  const value = { state, dispatch };
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

function useMovie() {
  const context = React.useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { useMovie, MovieProvider };
