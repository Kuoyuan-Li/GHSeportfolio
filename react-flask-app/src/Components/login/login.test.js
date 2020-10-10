import React from 'react'
import Login from './login'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';

describe ('login page test', () => {
    

    const historyMock = { push: jest.fn() }
    const onMock = jest.fn();

    let wrapper;

    beofreAll(() => {
        global.fetch = jest.fn();
    });

    beforeEach(() => {
        wrapper = shallow(<Login history = {historyMock} onSubmit={onMock}/>); 
    });

    test('redirect to index page when click : Back to Index Page', () => {
        wrapper.find('button.backToIndex').simulate('click');       
        expect(historyMock.push.mock.calls[0]).toEqual(['/']);
    });

    test('Input incomplete login Info, miss username and password' , ()=>{
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


    test('Input complete login Info' , () => {
        const form = wrapper.find('form.loginForm');
        form.simulate('submit', {
            preventDefault: () => {},
            target: {
                elements: {
                    username: { value: '1' },
                    password: { value: '1' }
                } 
            }
        });       
        expect(wrapper.state('message')).toEqual('');      

    });

    test ('Api fetch success, push to profile',()=>{
        const fakeApiResponse1 = {'validity':'True','message':''}
        const fakeApiResponse2 = {'validity':'False','message':'Invalid username or password'}
        var {getByTestLogin} = render(<Index />)
        var apiFunc = jest.spyOn(global, 'onSubmit').mockImplementationOnce(() => {
            return Promise.resolve({
              json: () => Promise.resolve(fakeApiResponse1)
            })
        })    
        const text = await getByTestId("ptag")
        expect(text).toHaveTextContent(fakeUserResponse['data'])

    })
    
    
    test('renders correctly', () => {
        const tree = renderer.create(<Login />).toJSON();
        expect(tree).toMatchSnapshot();
      });
});