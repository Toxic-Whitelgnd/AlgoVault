import React, { useState } from 'react';
import "./login.css";
import img1 from "../../assets/image-4.png"
import img2 from "../../assets/image-3.png"
import { MdMail, MdPassword } from "react-icons/md";
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		try {
			const response = await axios.get('https://localhost:7250/api/LoginSignup/login', {
				params: {
					email: formData.email,
					password: formData.password,
				},
			});

			console.log('Data sent successfully:', response.data);

			var val = response.data

			setLoggedIn(true);

			// Store data in cookies
			Cookies.set('email', val.email);
			Cookies.set('loggedIn', true);
			Cookies.set('userid',val.id);

			console.log('Data stored in cookies:', Cookies.get());


			setFormData({
				email: '',
				password: '',

			});
			// Handle success or perform additional actions here

			window.location.href = '/';


		} catch (error) {
			console.error('Error sending data:', error);
			// Handle error or show a user-friendly message
		}
	};


	return (
		<div>
			<div class="wrapper">
				<div class="inner">
					<img src={img1} alt="" class="image-4" />
					<form action="" onSubmit={handleSubmit}>
						<h3>Already User?</h3>
						<div class="form-holder">
							<span class="lnr lnr-envelope"><MdMail /></span>
							<input type="text" name="email" value={formData.email} onChange={handleChange} class="form-control" placeholder="Mail" />
						</div>
						<div class="form-holder">
							<span class="lnr lnr-lock"><MdPassword /></span>
							<input type="password" name="password" value={formData.password} onChange={handleChange} class="form-control" placeholder="Password" />
						</div>
						<button className='btn1'>
							<span>Login</span>
						</button>
					</form>
					<img src={img2} alt="" class="image-3" />
				</div>
			</div>
		</div>

	);
}

export default Login;
