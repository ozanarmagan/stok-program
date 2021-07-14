import '../css//login_page.css';
import { API_URL } from "../constants";
import { useState} from "react";
import axios from 'axios';
import {useDispatch } from 'react-redux';
import { log_in } from '../redux/reducers/user';
import { NotificationManager } from 'react-notifications';


export default function Login(props) {
    const [email,setEmail] = useState("");
    const [pw,setpw] = useState("");

    const dispatch = useDispatch();

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    } 

    const onChangePw = (event) => {
        setpw(event.target.value);
    } 

    const submit = (event) => {
        event.preventDefault();
        axios.post(API_URL + "/login",{email:email,password:pw})
            .then(res => {
                if(res.data.status === 200)
                {
					NotificationManager.success("Hoşgeldiniz " + res.data.name,"Başarılı");
                    dispatch(log_in({access_token:res.data.access_token,refresh_token:res.data.refresh_token,name:res.data.name,surname:res.data.surname,email:res.data.email,user_type:res.data.user_type}));
                }
				else
				{
					NotificationManager.error("Bilgiler Hatalı","Hata");
				}
            });
    }

    return (
	
        <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
				<form class="login100-form validate-form">
					<span class="login100-form-title p-b-33">
						Giriş
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Email gerekli: ex@abc.xyz">
						<input class="input100" value={email} onChange={onChangeEmail}  type="text" name="email" placeholder="Email"/>
						<span class="focus-input100-1"></span>
						<span class="focus-input100-2"></span>
					</div>

					<div class="wrap-input100 rs1 validate-input" data-validate="Password is required">
						<input class="input100" value={pw} onChange={onChangePw} type="password" name="pass" placeholder="Şifre"/>
						<span class="focus-input100-1"></span>
						<span class="focus-input100-2"></span>
					</div>

					<div class="container-login100-form-btn m-t-20">
						<button class="login100-form-btn" onClick={submit}>
							Giriş Yap
						</button>
					</div>

					<div class="text-center p-t-45 p-b-4">
						<a href="/" class="txt2 hov1">
							Şifremi Unuttum
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
    )
}