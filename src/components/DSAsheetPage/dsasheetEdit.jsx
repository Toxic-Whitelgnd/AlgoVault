import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const DsasheetEdit = () => {
    const { pid } = useParams();


    const initialFormData = {
        id: pid,
        uId: 0,
        dsaName: '',
        dsaQuestion: '',
        dsaAnswer: '',
        dsaFrom: '',
        dsaLevel: '',
        dsaIntuition: '',
        dsaLanguage: ''
    };

    const [formData, setFormData] = useState(initialFormData);



    useEffect(() => {
        // Fetch the data based on the ID from the URL params
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7250/dsa/DSA/getsolutionwithid?id=${pid}`);
                if (Array.isArray(response.data) && response.data.length > 0) {
                    // Assuming response.data is an array and taking the first element
                    setFormData(response.data[0]);
                    console.log(formData);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Make a POST request to save the edited data
        axios.put('https://localhost:7250/dsa/DSA/updatedsa', formData)
            .then(response => {
                console.log('POST request successful:', response.data);
                // Optionally, you can redirect the user or perform other actions
                if(response.data == "Successful"){
                    
                    toast.success("Data updated successfully");
                    setTimeout(() => {
                        window.location.href = `/#/viewsolution/${pid}`;
                    },2000);
                   
                    
                }
                else {
                    toast.error("Error updating the data")
                }
            })
            .catch(error => {
                console.error('Error making POST request:', error);
            });
        console.log("updated form data" + formData);
    };

    return (
        <div>
            <h1 className='text-center mt-2 mb-2'>Edit DSA Details</h1>

            <div className="dsa-form-container">

                <form className="dsa-form">
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
                    <button type='sumbit' onClick={handleSave}>Save Changes</button>
                </form>
            </div>
            <ToastContainer />


        </div>
    );
}

export default DsasheetEdit;
