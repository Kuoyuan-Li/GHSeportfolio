import React from 'react'
import Index from './index'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';

describe ('Index page test', () => {
    test('redirect to login page when click login', () => {
        const historyMock = { push: jest.fn() }
        const wrapper = shallow(<Index history = {historyMock}/>)
        wrapper.find('button').at(0).simulate('click');       
        expect(historyMock.push.mock.calls[0]).toEqual(['/login']);
    });

    test('redirect to register page when click register', () => {
        const historyMock = { push: jest.fn() }
        const wrapper = shallow(<Index history = {historyMock}/>)
        wrapper.find('button').at(1).simulate('click');       
        expect(historyMock.push.mock.calls[0]).toEqual(['/register']);
    });

    /*test('renders correctly', () => {
        const tree = renderer.create(<Index />).toJSON();
        expect(tree).toMatchSnapshot();
      });*/
    

});