import React from 'react'
import ForgetPassword from './forgetPassword'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';

describe ('forget password test', () => {

    test('send captcha (verification code)',()=>{




    });

    test('back login',()=>{
        const historyMock = { push: jest.fn() }
        wrapper = shallow(<ForgetPassword history = {historyMock} onSubmit={onMock}/>); 
        wrapper.find('button').at(1).simulate('click');       
        expect(historyMock.push.mock.calls[0]).toEqual(['/forgetPassword']);
    });


});