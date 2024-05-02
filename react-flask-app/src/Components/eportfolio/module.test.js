import React, { Component } from 'react'
import Module from './module'
import { shallow,mount } from 'enzyme'
import sinon from 'sinon'
import renderer from 'react-test-renderer';


const fakecontent = {
    section_id : "5",
    module_id : '1',
    title :'fake title',
    date : '00/00/0000',
    text : 'TEST',
    image_name : null,
    image_path : null,
    file_path : null, 
    file_name : null,
    audio_path : null,
    audio_name : null,
    video_path: null,
    video_name:null
}
const onMock = jest.fn() 
const wrapper = shallow(<Module content={fakecontent} parentSectionID={"5"} deleteHandler = {onMock}/>);
test('initial state is correct',()=>{
    const answer = {
        parentSection : '5',
        id :'1',
        title: 'fake title',  
        time : '00/00/0000',
        text : 'TEST',
        image : null,
        image_name : '',
        image_path : 'http://127.0.0.1:5000/showImage/',
        file : null,
        file_path : '' ,
        file_name :'',
        audio : null,
        audio_path :'http://127.0.0.1:5000/showAudio/' ,
        audio_name : '' ,
        video : null,
        video_path : 'http://127.0.0.1:5000/showVideo/' ,
        video_name : '',
        message : '',
        loading : true
    }
    expect(wrapper.state()).toEqual(answer)
    
})
test('click button and trigger corresponding methods', () => {
    const button = wrapper.find('button')
    expect(button.length).toBe(6);
    button.at(0).simulate('click')
    expect(onMock.mock.calls.length).toEqual(1);
});