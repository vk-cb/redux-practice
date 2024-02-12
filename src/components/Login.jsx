import React, { useState } from 'react'
import { connect } from 'react-redux'
import { onLogin } from '../store/auth/actions'

const Login = () => {
    
    const [state, setState] = useState({
        login: "",
        password: ""
    })

    const handleChange = (e) => {
        let _state = { ...state };
        _state[e.target.name] = e.target.value;
        setState(_state)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onLogin(state)
        alert("success")
    }

  return (
    <div>
        <input type="text" value={state.login}
                                    name='login'
                                    required
                                    onChange={(e)=>setState({...state, login : e.target.value})}/>
        <input type="password" 
        name='password'
        required
        onChange={(e)=>setState({...state, password : e.target.value})}
        />
        <button onSubmit={handleSubmit}>login</button>
    </div>
  )
}
const mapStateToProps = (state) => {
    return {
        auth: state.Auth,
    }
}


const mapDispatchToProps = { onLogin }

export default connect(mapStateToProps, mapDispatchToProps)(Login)