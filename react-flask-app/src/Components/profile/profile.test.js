import React, { Component } from 'react'
import Profile from './profile'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import { Button } from 'react-bootstrap';


describe ('profile page test', () => {
    const historyMock = { push: jest.fn() }
    const wrapper = shallow(<Profile history = {historyMock}/>); 
    
    test('go to different pages by clicking different buttons',()=>{     
        const button = wrapper.find(Button)   
        expect(button.length).toEqual(3);   
        button.at(0).simulate('click'); 
        expect(historyMock.push.mock.calls[0]).toEqual(['/eportfolioView']);
        button.at(1).simulate('click'); 
        expect(historyMock.push.mock.calls[1]).toEqual(['/eportfolioEdit']);
        button.at(2).simulate('click'); 
        expect(historyMock.push.mock.calls[2]).toEqual(['/otherEportfolio']);
    });

});