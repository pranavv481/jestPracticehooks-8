import React from 'react';
import hookAction from './action/hookAction';
import './App.css';
import Input from './Input';

function reducer(state, action) {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload }
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function App(props) {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null }
  )

  const setSecretWord = (secretWord) => 
  dispatch({ type: "setSecretWord", payload: secretWord });

  React.useEffect(
    ()=>{hookAction.getSecretWord(setSecretWord)},
    []
  )

  if(!state.secretWord){
    return(
      <div className="container" data-test="spinner"> 
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading....</span>
          </div>
          <p>Loading Secret Word</p>
      </div>
    )
  }

  return (
    <div className="container" data-test="component-app">
       <Input secretWord={state.secretWord}/>
    </div>
  )
}

export default App;
