import React from 'react'
import Register from './register'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';

describe ('login page test', () => {
    

    const historyMock = { push: jest.fn() }
    const onMock = jest.fn();

    let wrapper;

    beforeAll(() => {
        global.fetch = jest.fn();
    });

    beforeEach(() => {
        wrapper = shallow(<Register history = {historyMock} onSubmit={onMock}/>); 
    });

    test('redirect to index page when click : Back to Index Page', () => {
        wrapper.find('button').at('1').simulate('click');       
        expect(historyMock.push.mock.calls[0]).toEqual(['/']);
    });

    test('Input incomplete register Info, miss password 2' , ()=>{
        const form = wrapper.find('form.registerForm');
        form.simulate('submit', {
            preventDefault: () => {},
            target: {
                elements: {
                    username: { value: '1' },
                    email : { value : '1'},
                    password: { value: '1' },
                    password2: { value: '' },
                } 
            }
        });
        expect(wrapper.state('message')).toEqual('Please enter all required information');      
    });

    test('Input incomplete register Info, miss password ' , ()=>{
        const form = wrapper.find('form.registerForm');
        form.simulate('submit', {
            preventDefault: () => {},
            target: {
                elements: {
                    username: { value: '1' },
                    email : { value : '1'},
                    password: { value: '' },
                    password2: { value: '1' },
                } 
            }
        });
        expect(wrapper.state('message')).toEqual('Please enter all required information');      
    });

    test('Input incomplete register Info, miss email' , ()=>{
        const form = wrapper.find('form.registerForm');
        form.simulate('submit', {
            preventDefault: () => {},
            target: {
                elements: {
                    username: { value: '1' },
                    email : { value : ''},
                    password: { value: '1' },
                    password2: { value: '1' },
                } 
            }
        });
        expect(wrapper.state('message')).toEqual('Please enter all required information');      
    });

    test('Input incomplete register Info, miss username' , ()=>{
        const form = wrapper.find('form.registerForm');
        form.simulate('submit', {
            preventDefault: () => {},
            target: {
                elements: {
                    username: { value: '' },
                    email : { value : '1'},
                    password: { value: '1' },
                    password2: { value: '1' },
                } 
            }
        });
        expect(wrapper.state('message')).toEqual('Please enter all required information');      
    });
   
    test('renders correctly', () => {
        const tree = renderer.create(<Register />).toJSON();
        expect(tree).toMatchSnapshot();
      });
});