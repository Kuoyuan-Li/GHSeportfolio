import axios from 'axios'

export const register = newUser => {
    /*return axios
        .post("users/register", {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        })

        .then(response => {
            console.log("Registered")
        })*/


    return fetch ('http://localhost:5000/register',{
            mode: 'cors',
            method : 'POST',
            headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                password2: newUser. password2
            })
        }).then(res => res.json())
        .catch(error => console.error('Error:', error));
        
}





export const login = user => {
    return axios
        .post("users/login", {
            username: user.username,
            password: user.password
        })

        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            return response.data.token
        })

        .catch(err => {
            console.log(err)
        })

}