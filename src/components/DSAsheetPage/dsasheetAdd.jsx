import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DsasheetAdd = () => {

    const { id } = useParams();

    const initialFormData = {
        uId: id,
        dsaName: '',
        dsaQuestion: '',
        dsaAnswer: '',
        dsaFrom: '',
        dsaLevel: '',
        dsaIntuition: '',
        dsaLanguage: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        // Replace 'https://localhost:7250/dsa/DSA/dsadetails' with your actual API endpoint
        axios.post('https://localhost:7250/dsa/DSA/dsadetails', formData)
            .then(response => {
                console.log('POST request successful:', response.data);
                // Optionally, you can reset the form after a successful submission
                setFormData(initialFormData);
                toast.success("DSA added successfully")
            })
            .catch(error => {
                console.error('Error making POST request:', error);
                toast.error("Error While sending the Post request:");
            });
    };
    return (
        <div>
            <h1 className='text-center '>DSA Form</h1>
            <div className="dsa-form-container">

                <form onSubmit={handleSubmit} className="dsa-form">
                    <label>
                        DSA Name:
                        <input type="text" name="dsaName" value={formData.dsaName} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        DSA Question:
                        <textarea className='tarea-cust' name="dsaQuestion" value={formData.dsaQuestion} onChange={handleChange} required />
                    </label>
                    <br />

                    <label>
                        Level:
                        <select name="dsaLevel" value={formData.dsaLevel} onChange={handleChange} required>
                            <option value="">select</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Problems From:
                        <select name="dsaFrom" value={formData.dsaFrom} onChange={handleChange} required>
                            <option value="">select</option>
                            <option value="leetcode">LeetCode</option>
                            <option value="geeksforgeeks">Geeks for Geeks</option>
                            <option value="hackerrank">HackerRank</option>
                            <option value="hackerearth">HackerEarth</option>
                            <option value="codingninjas">Coding Ninjas</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        DSA Intuition:
                        <textarea className='tarea-cust' type="text" name="dsaIntuition" value={formData.dsaIntuition} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        DSA Language:

                        <select name="dsaLanguage" value={formData.dsaLanguage} onChange={handleChange} required>
                            <option value="">select</option>
                            <option value="java">Java</option>
                            <option value="c">C</option>
                            <option value="python">python</option>
                            <option value="c++">C++</option>
                            <option value="javascript">JavaScript</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        DSA Answer:
                        <textarea className='tarea-cust' name="dsaAnswer" value={formData.dsaAnswer} onChange={handleChange} required />
                    </label>
                    <br />
                    <button className='' type="submit">Submit</button>
                </form>
            </div>
            <ToastContainer />


        </div>
    );
}

export default DsasheetAdd;
