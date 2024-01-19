import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DsaviewSolution = () => {
    const { problemid } = useParams();

    const [solution, SetSolution] = useState();

    const getSolution = () => {
        axios.get(`https://localhost:7250/dsa/DSA/getsolutionwithid?id=${problemid}`)
            .then(response => {
                SetSolution(response.data)
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getSolution();
    }, []);

    const Deletebyid = () => {
        try {
            axios.delete(`https://localhost:7250/dsa/DSA/deletebyid?id=${problemid}`)
            .then(response => {
                if(response.data == "Deleted"){
                    toast.success("Deleted successfully");
                    setTimeout(() => {
                        window.location.href = "/#/dsasheet";
                    },1000)
                    
                }
            });
        } catch (error) {
            
        }
    }

    return (
        <div>
            <h1>Solution for the Problem id:{problemid}</h1>
            
            <ul>
                { solution && solution.map(item => (
                    <>
                     <button className='btn btn-primary ms-3' onClick={()=>window.location.href = `/#/editdsa/${item.id}`}>Edit</button>
                     <button className='btn btn-secondary ms-3' onClick={Deletebyid}>Delete</button>
                    <li key={item.id}>
                        <div className='sol-head'>dsaname:</div > <span className='sol-cont'> {item.dsaName} </span> <br />
                        <div className='sol-head'>dsaquetion:</div > <span className='sol-cont'> {item.dsaQuestion}</span> <br />
                        <div className='sol-head'>promblefrom:</div > <span className='sol-cont'> {item.dsaFrom}</span> <br />
                        <div className='sol-head'>level:</div > <span className='sol-cont'> {item.dsaLevel}</span> <br />
                        <div className='sol-head'>intituion:</div > <span className='sol-cont'> {item.dsaIntuition}</span> <br />
                        <div className='sol-head'>language:</div > <span className='sol-cont'> {item.dsaLanguage}</span> <br />
                        <div className='sol-head'>mysolution:</div > <span className='sol-cont'> {item.dsaAnswer}</span> <br />
                        
                    </li>
                   
                    </>
                ))}
            </ul>
        </div>
    );
}

export default DsaviewSolution;
