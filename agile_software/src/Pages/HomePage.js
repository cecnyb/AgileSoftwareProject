 import React from "react";
import chapters from "../chapters";
import ChapterComponent from "../Components/ChapterComponent"; 


function HomePage (props) {
  const [completedChapters1, setCompletedChapters] = React.useState([]);
 React.useEffect(() => {
    const storedChapters = localStorage.getItem('completedChapters');
    if (storedChapters) {
      setCompletedChapters(JSON.parse(storedChapters));
    }
  }, []); 

function handleCompletion() {
  if (completedChapters1.includes(props.chapter.id)) {
    setCompletedChapters(completedChapters1.filter((item) => item.id !== props.chapterId));
    return;
  }
  else {
    setCompletedChapters([...completedChapters1, props.chapter.id]);
  }
  return;
}

  return (
    <div className="Lesson-Page">
    {chapters.map((chapter) => (
        <ChapterComponent chapter={chapter} key={chapter.id} />
      ))}
  </div>
  );
};

export default HomePage; 


/* import React, { createContext, useContext, useReducer } from 'react';
import chapters from '../chapters';

// Define an initial state for the app
const initialState = {
  completedChapters: []
};

// Define the reducer function to handle updates to the state
function reducer(state, action) {
  switch (action.type) {
    case 'COMPLETE_CHAPTER':
      return {
        ...state,
        completedChapters: [...state.completedChapters, action.payload.chapterId]
      };
    case 'UNCOMPLETE_CHAPTER':
      return {
        ...state,
        completedChapters: state.completedChapters.filter(id => id !== action.payload.chapterId)
      };
    default:
      return state;
  }
}

// Create a context object for the state and dispatch functions
const AppContext = createContext(null);

// Create a custom hook to simplify accessing the context values
function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}

// Define the component that will provide the context values to the app
function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Define the HomePage component
function HomePage() {
  const { state } = useAppContext();
  
  function isChapterCompleted(chapterId) {
    return state.completedChapters.includes(chapterId);
  }
  
  function handleCompletion(chapterId) {
    if (isChapterCompleted(chapterId)) {
      dispatch({ type: 'UNCOMPLETE_CHAPTER', payload: { chapterId }});
    } else {
      dispatch({ type: 'COMPLETE_CHAPTER', payload: { chapterId }});
    }
  }
  
  return (
    <div className="text-center pt-5">
      {chapters.map((chapter) => (
        <ChapterComponent
          chapter={chapter}
          key={chapter.id}
          isCompleted={isChapterCompleted(chapter.id)}
          onComplete={() => handleCompletion(chapter.id)}
        />
      ))}
    </div>
  );
}

export default function App() {
  return (
    <AppContextProvider>
      <HomePage />
    </AppContextProvider>
  );
} */