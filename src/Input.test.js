import React from 'react'
import { shallow } from "enzyme";
import { italics } from "prop-types/lib/ReactPropTypesSecret";
import { findByTestAttr, checkProps } from '../test/testUtils'
import Input from './Input'

const setup = (secretWord='party') => {
  return shallow(<Input secretWord={secretWord}/>)
}

it('should render the input component', () => {
  const wrapper = setup();
  const inputComponent = findByTestAttr(wrapper, 'component-input')
  expect(inputComponent.length).toBe(1)
})

it('does not throw warning with expected props', () => {
  checkProps(Input, { secretWord: 'party'});
});

describe('state controlled input filed', () => {
  let mockSetCurrentguess = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentguess.mockClear()
    React.useState = jest.fn(() => ["", mockSetCurrentguess])
    wrapper = setup();
  });

  it('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: { value: 'train'}}
    inputBox.simulate('change', mockEvent)
    expect(mockSetCurrentguess).toHaveBeenCalledWith('train')
  })

  it('currentGuess gets set to an empty string when a user submits a guess', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    submitButton.simulate('click', {
      preventDefault: () => {
        
      }
    })
    expect(mockSetCurrentguess).toHaveBeenCalledWith('')
  })
})