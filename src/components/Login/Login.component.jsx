import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { TailSpin } from 'react-loader-spinner'
import styled from "styled-components";
import UserContextHook from "../../hooks/CitiesContext.Hook";
import axios  from 'axios'


export default function LoginPage(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const {setUser} = UserContextHook()
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [btnClicked, setBtnClicked] = useState (false)
   

    


    function login(e){
     
       if( emailRegex.test(email)){
        e.preventDefault()
        setBtnClicked(true)
        
        const URL = `${process.env.REACT_APP_RENDER_URL}/sign-in`
        const body ={email,password}
        const promise= axios.post(URL , body)
        promise.then(res=>{
            console.log(res.data)
           
            const {user_id , username, user_photo, user_token} = res.data
            localStorage.setItem("user" , JSON.stringify({user_id:user_id , username:username, user_photo:user_photo, user_token:user_token}))
            const lsUser = JSON.parse(localStorage.getItem("user"))
            console.log("userInLocal", lsUser)
            navigate("/timeline")
        })

        promise.catch(err=>{
            alert(err.response.data.message)
            window.location.reload(true)
        })
        
        }else{
            alert('formato de email inválido!')
            setEmail("")
            setPassword("")
        }


    }

   return (


    <LoginContainer>
    
         <Form>
         <input 
                        type="email" 
                        value={email}
                        placeholder="Email"
                        disabled={btnClicked}
                        required
                        onChange={e=>setEmail(e.target.value)}
         ></input>
         <input 
                       
                        type="password"
                        value={password}
                        placeholder="Senha"
                        disabled={btnClicked}
                        required
                        onChange={e=>setPassword(e.target.value)}
         ></input>
        <StyledButton onClick= {(e)=>login(e)} type="submit">{
                                    btnClicked ? 
                                    (<TailSpin
                                        height="50"
                                        width="50"
                                        color="#FFFFFF"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={btnClicked}
                                />):('Entrar')
                         }</StyledButton>
      </Form>
    </LoginContainer>
   )




}

const LoginContainer = styled.div `
    display:flex;
    flex-direction: column;
    background-color: #333333;

`
const StyledButton = styled.button`
    display:flex;
    flex-direction: column;
    align-items:center;
    position:relative;
    width: 80%;
    height: 65px;
    font-size:42px;
    font-weight:bold;
    color:white;
    background: #1877F2;
    border-radius:5px;


`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 13px;
    input {
        width: 80%;
        height: 65px;  
        border-radius: 6px;
        box-sizing: border-box;
        padding: 10px;
        font-size: 27px;
    }
    input::placeholder{
        color: #ebebeb;
        font-size: 27px;
        font-weight: 700;
    }
`