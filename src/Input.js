import React from 'react';
import PropTypes from 'prop-types'

const Input = ({ secretWord }) => {

  const [currentGuess, setCurrentGuess] = React.useState('');
  
  return (
    <div data-test='component-input'>
      <form className='form-inline'>
        <input
          data-test='input-box'
          className='mb-2 mx-sm-3'
          type='text'
          placeholder='enter guess'
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
        <button
          data-test='submit-button'
          onClick={(e) =>{
            e.preventDefault()
            setCurrentGuess('')
          }}
          className='btn btn-primary'
        >
          Submit
        </button>
      </form>
    </div>
  )

};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
}

export default Input