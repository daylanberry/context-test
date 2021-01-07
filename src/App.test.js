import React from 'react';
import { mount, shallow } from 'enzyme';
import { findByTestAttr } from '../test/testUtils'
import App from './App';

import hookActions from './actions/hookActions';

const mockGetSecretWord = jest.fn();

const setup = (secretWord='party') => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUserReducer = jest.fn()
    .mockReturnValue([
      { secretWord: 'something' },
      jest.fn()
    ]);

    React.useReducer = mockUserReducer;

  // use mount because useEffect is not called on shallow
    return mount(<App secretWord={'secretWord'}/>)
}

test('App renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app')
  console.log(component.props())

  expect(component.length).toBe(1)
});

describe('getSecretWord calls', () => {
  test('getSecretWord gets called on app mount', () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();

  })

  test('secretWord does not update on App update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    wrapper.setProps();
    expect(mockGetSecretWord).not.toHaveBeenCalled()
  })
})

describe('secretWord is not null', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup()
  });

  test('renders app when secretWord is not null', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.length).toBe(1);
  });
  test('does not render spinner when secretWord is not null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner')
    expect(spinnerComponent.length).toBe(0)
  })
});


describe('secretWord is null', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(null)
  });

  test('does not render app when secretWord is null', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.length).toBe(0);
  });
  test('renders spinner when secretWord is null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner')
    expect(spinnerComponent.length).toBe(1)
  })
})