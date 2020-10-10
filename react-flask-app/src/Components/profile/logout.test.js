import React from 'react'
import Logout from './logout'
import { shallow } from 'enzyme'
describe ('Logout functionality test', () => {
    test('redirect to index page when click Log out', () => {
        const historyMock = { push: jest.fn() }
        const wrapper = shallow(<Logout history = {historyMock}/>)
        wrapper.find('button').at(0).simulate('click');       
        expect(historyMock.push.mock.calls[0]).toEqual(['/']);
    });
});