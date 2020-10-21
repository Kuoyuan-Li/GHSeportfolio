import React, { Component } from 'react'
import Section from './section'
import { shallow,mount } from 'enzyme'
import renderer from 'react-test-renderer';


const fakecontent = {
    sectionID : '1',
    sectionTitle :'fake title',
    modules : []
}
const onMock = jest.fn() 
const wrapper = shallow(<Section content={fakecontent} deleteHandler = {onMock}/>);
test('initial state is correct',()=>{
    const answer = {
        sectionID : '1',
        sectionTitle : 'fake title',
        modules : [],
        message : '',
        loading : true
    }
    expect(wrapper.state()).toEqual(answer)
    
})
