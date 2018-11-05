import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Login from '../components/Login';
import {MemoryRouter} from 'react-router-dom'

jest.mock("../services/loginService");

import {getCurrentUser} from "../services/loginService"


describe("Login page structure", () => {
    
    let mountedLogin;
    beforeEach(() => {
        getCurrentUser.__setValue("userNotPresent");
        mountedLogin = shallow(<Login />);
    })

    it('should be rendered with two input fields', () => {
        
        const inputs = mountedLogin.find('Input')
        expect(inputs.length).toBe(2)
      });

    it("should be rendered with one button", () => 
    {
        
        const button = mountedLogin.find("button")
        expect(button.length).toBe(1)
        
        
    })
    it("should be rendered with one h2", () => 
    {
        
        const h2 = mountedLogin.find("h2")
        expect(h2.length).toEqual(1)
        expect(h2.first().text()).toContain("Please Sign in")
        
    })
    it("should match the snapshot", () => {
        expect(mountedLogin).toMatchSnapshot();
    })
      
})

describe("When user tries to input data", () => {

    let mountedLoginPage;
    
    beforeEach(() => {
        getCurrentUser.__setValue("userNotPresent");
        mountedLoginPage = shallow(<Login />);
        
        })

    
    it("should call handleChnage when input is changed", () => {
        const spy = jest.spyOn(mountedLoginPage.instance(), 'handleChange');
        mountedLoginPage.find("#email").simulate('change', {currentTarget : {name: "email", value : "anc"}})
        expect(spy).toHaveBeenCalled();            
        })

    it("should correctly update the email value in the state", () => {
        let expected =   "sh@gmail.com"
         let Input =  {name: "email", "value": expected };
         let mockEvent = {currentTarget: Input}
         mountedLoginPage.instance().handleChange(mockEvent);
      
       expect(mountedLoginPage.instance().state.data.email).toEqual(expected)
        
    })

    it("should correctly update the error if the email is not in correct format", () => { 
        let expected =   "sh";            
        let Input =  {name: "email", "value": expected};
        let mockEvent = {currentTarget: Input}
        mountedLoginPage.instance().handleChange(mockEvent);     
      expect(mountedLoginPage.instance().state.errors["email"]).toEqual('"Email" must be a valid email');
   })


   it("should correctly update the password value in the state", () => {
    let expected =   "trapp"
     let Input =  {name: "password", "value": expected };
     let mockEvent = {currentTarget: Input}
     mountedLoginPage.instance().handleChange(mockEvent);
  
   expect(mountedLoginPage.instance().state.data.password).toEqual(expected)
    
})

it("should correctly update the errors object if the password is empty", () => { 
    let expected =   "";            
    let Input =  {name: "password", "value": expected};
    let mockEvent = {currentTarget: Input}
    mountedLoginPage.instance().handleChange(mockEvent); 
    expect(mountedLoginPage.instance().state.errors["password"]).toEqual('"Password" is not allowed to be empty');     
 
})

it("should have disabled submit button if form is invalid", () => { 
    const button = mountedLoginPage.find("button")       
    expect(button.props()).toHaveProperty("disabled");  
})

it("form can be submitted", () => {
    const callback = jest.fn();
    let mountedLoginPagewithCallBack = shallow(<form onSubmit = {callback}/>)     
     mountedLoginPagewithCallBack.find("form").simulate("submit");
    expect(callback).toHaveBeenCalled()

})

it("onSubmit login method is called", async()=> {

    const loginService = require("../services/loginService")
    let syplogin = jest.spyOn(loginService, 'login');    
    await mountedLoginPage.instance().doSubmit();
    expect(syplogin).toHaveBeenCalled();

})

})


describe("Login behavior", ()=> {

    it("should have redirection set to homepage ", ()=>
{
    
    getCurrentUser.__setValue("userPresent");
    const wrapper = mount(<MemoryRouter>
        <Login />
    </MemoryRouter>);
    
    const redirect =  wrapper.find("Redirect");
    expect(redirect.props()).toHaveProperty("to", "/")

})


xit("should perform correct redirection if user was redirected to login page from some other location", async() => 
{
    getCurrentUser.__setValue("userPresent");
        
    let somepath = "/profile/1234"
    let location =  {state: {from :{pathname: somepath}}};
    const wrapper = shallow(<MemoryRouter><Login location = {location}/></MemoryRouter> );
    expect (wrapper.instance().props.location.state.from.pathname).toEqual(somepath)
     wrapper.instance().doSubmit();
     console.log(`Location is : ${global.location.pathname}`)
     expect(window.location.pathname).toEqual(somepath);

}
)

it("should populate errors if login fails", async ()=> {

   const errorMessage = "Invalid email and/ or password.";

let loginService = require("../services/loginService");
   loginService.login = jest.fn(()=> {
    throw ({response: {status: 403, data: errorMessage }})
   })

    const mountedLoginPage = shallow(<Login/>)
    await mountedLoginPage.instance().doSubmit();
    expect(mountedLoginPage.instance().state.errors["email"]).toEqual(errorMessage);
    

})



})
