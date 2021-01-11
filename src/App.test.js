import React from 'react';
import App from './App';
import { mount } from 'enzyme';
import { findByTestAttr } from "../test/testUtils";
import hookAction from './action/hookAction';

const mockGetSecretWord = jest.fn();

const setup = (secretWord="party") => {
  mockGetSecretWord.mockClear();
  hookAction.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn()
  .mockReturnValue([
    {secretWord},
    jest.fn()
  ])
  React.useReducer = mockUseReducer

  // use mount, because useEffect not called on shallow
  return mount(<App />)
}


test('app render without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1)
});

describe('getSecretWord calls', () => {
  test('getSecretWord call get call on App mount', () => {
    setup();

    // check to see if secret word was updated
    expect(mockGetSecretWord).toHaveBeenCalled();
  })

  test('secret word does not update on app update', ()=>{
        const wrapper = setup();
        mockGetSecretWord.mockClear();
        // wrapper.update() does not trigger
        wrapper.setProps();
        expect(mockGetSecretWord).not.toHaveBeenCalled()
  })
})

describe("secretWord is not null", ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = setup("party")
  })
  test("render app when secret word is not null", ()=>{
       const appComponent = findByTestAttr(wrapper, 'component-app');
       expect(appComponent.exists()).toBe(true);
  })

  test("doesnot render spinner when secret word is not null", ()=>{
       const spinnerComponent = findByTestAttr(wrapper, "spinner")
       expect(spinnerComponent.exists()).toBe(false)
  })
})

describe("secretWord is null", ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = setup(null)
  })
  test("does not render app when secret word is null", ()=>{
       const appComponent = findByTestAttr(wrapper, 'component-app');
       expect(appComponent.exists()).toBe(false);
  })

  test("render spinner when secret word is null", ()=>{
       const spinnerComponent = findByTestAttr(wrapper, "spinner")
       expect(spinnerComponent.exists()).toBe(true)
  })
})
