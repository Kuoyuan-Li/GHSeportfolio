import React from 'react'
import Login from './login'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';

describe ('login page test', () => {
    

    const historyMock = { push: jest.fn() }
    const onMock = jest.fn();

    let wrapper;

    beforeAll(() => {
        global.fetch = jest.fn();
    });

    test('redirect to index page when click : Back to Index Page', () => {
        wrapper = shallow(<Login history = {historyMock} onSubmit={onMock}/>); 
        wrapper.find('button').at(2).simulate('click');       
        expect(historyMock.push.mock.calls[0]).toEqual(['/']);
    });

    test('redirect to forget password page when click :forget password', () => {
        wrapper = shallow(<Login history = {historyMock} onSubmit={onMock}/>); 
        wrapper.find('button').at(1).simulate('click');       
        expect(historyMock.push.mock.calls[1]).toEqual(['/forgetPassword']);
    });

    test('Input incomplete login Info, miss username and password' , ()=>{
        wrapper = shallow(<Login history = {historyMock} onSubmit={onMock}/>); 
        const form = wrapper.find('form.loginForm');
        form.simulate('submit', {
            preventDefault: () => {},
            target: {
                elements: {
                    username: { value: '' },
                    password: { value: '' }
                } 
            }
        });
        expect(wrapper.state('message')).toEqual('Please enter all required information');      
    });

    test('Input incomplete login Info, miss username' , ()=>{
        wrapper = shallow(<Login history = {historyMock} onSubmit={onMock}/>); 
        const form = wrapper.find('form.loginForm');
        form.simulate('submit', {
            preventDefault: () => {},
            target: {
                elements: {
                    username: { value: '' },
                    password: { value: '1' }
                } 
            }
        });
        expect(wrapper.state('message')).toEqual('Please enter all required information');      
    });

    test('Input incomplete login Info, miss password' , ()=>{
        wrapper = shallow(<Login history = {historyMock} onSubmit={onMock}/>); 
        const form = wrapper.find('form.loginForm');
        form.simulate('submit', {
            preventDefault: () => {},
            target: {
                elements: {
                    username: { value: '1' },
                    password: { value: '' }
                } 
            }
        });
        expect(wrapper.state('message')).toEqual('Please enter all required information');      
    });
    /*
    test('renders correctly', () => {
        const tree = renderer.create(<Login />).toJSON();
        expect(tree).toMatchSnapshot();
      });*/
});
