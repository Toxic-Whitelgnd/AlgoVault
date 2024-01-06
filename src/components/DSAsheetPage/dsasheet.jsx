import React, { useEffect, useState } from 'react';
import "./dsasheet.css"
import Cookies from 'js-cookie';
import axios from 'axios';

const Dsasheet = () => {

    const [data, setData] = useState([]);

    /**
     * {
  "id": 0,
  "uId": 0,
  "dsaName": "string",
  "dsaQuestion": "string",
  "dsaAnswer": "string",
  "dsaFrom": "string",
  "dsaLevel": "string",
  "dsaIntuition": "string",
  "dsaLanguage": "string"
}
     */
    useEffect(() => {
        console.log(Cookies.get('ext_name'));
        var isCooks = Cookies.get('ext_name');
        console.log(Cookies.get('userid'));
        const userId = Cookies.get('userid');
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7250/dsa/DSA/getall?userId=${userId}`);
                console.log("fetched data");
                console.log(response.data);
                setData(response.data); // Assuming the response is an array, adjust as needed
                displaydata();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (isCooks) {
            var email = Cookies.get('email');
            console.log("Make a get Request:" + email);
            var userid = Cookies.get('userid');
            console.log(userid);
            // Call the fetchData function
            fetchData();
        }

    }, []);

    function displaydata() {
        console.log("testing over here");
        console.log(data);
    }

    return (
        <div>
            <h1 className='d-flex justify-content-center'>DSA Sheet</h1>
            <div>
                <div className="container-dsa">
                    <a href="#" className="button3 type--C">
                        <div className="button__line"></div>
                        <div className="button__line"></div>
                        <span className="button__text">Add DSA question</span>
                        <div className="button__drow1"></div>
                        <div className="button__drow2"></div>
                    </a>

                </div>
            </div>
            <div>
                {
                    data.length > 0 ? <>
                        <div>
                            <ul>
                                {data.map(item => (
                                    <li key={item.id}>{item.dsaName}</li>
                                ))}
                            </ul>
                        </div>
                    </> :
                        <>
                            <div>
                                <br></br>
                                <p id='dsa-msg'>You don't have any DSA Sheet to Display </p>
                                <br></br>
                                <p id='dsa-msg'> Try adding new DSA sheet</p>
                            </div>
                        </>
                }
            </div>
        </div>
    );
}

export default Dsasheet;
