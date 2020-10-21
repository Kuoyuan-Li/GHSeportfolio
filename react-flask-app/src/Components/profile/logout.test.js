import React from 'react'
import Logout from './logout'
import { shallow } from 'enzyme'

describe ('Logout functionality test', () => {
    it('ComponentDidMount', () => {
        const historyMock = { push: jest.fn() }
        const wrapper = shallow(<Logout history = {historyMock}/>)
        expect(historyMock.push.mock.calls[0]).toEqual(['/login']);
      });
});