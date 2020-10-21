import React, { Component } from 'react'
import ForgetPassword from './forgetPassword'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';

describe ('forget password test', () => {
    const historyMock = { push: jest.fn() }
    const onMock = jest.fn();
    const wrapper = shallow(<ForgetPassword history = {historyMock} onSubmit={onMock}/>); 
    
    test('back login',()=>{     
        wrapper.find('button').at(2).simulate('click');       
        expect(historyMock.push.mock.calls[0]).toEqual(['/login']);
    });

});