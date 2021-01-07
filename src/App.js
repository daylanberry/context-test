import React, { useReducer } from 'react';
import logo from './logo.svg';
import Input from './Input'
import './App.css';
import hookActions from './actions/hookActions';


function reducer(state, action) {
  switch(action.type) {
    case 'setSecretWord':
      return {
        ...state,
        secretWord: action.paylod
      }

    default:
      throw new Error(`Invalid action type ${action.type}`)
  }
}

function App() {

  const [state, dispatch] = useReducer(
    reducer,
    { secretWord: null} 
  );


  const setSecretWord = (secretWord) => {
    dispatch({
      type: 'setSecretWord',
      paylod: secretWord
    })
  };

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord)
  }, [])


  if (!state.secretWord) {
    return (
      <div className='container' data-test='spinner'>
        <div className='spinner-border' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    )
  }
  
  return (
    <div data-test='component-app'>
      <Input
        secretWord={state.secretWord} 
      />
    </div>
  )
}

export default App;
