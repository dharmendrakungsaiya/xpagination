import React, { useEffect, useState } from 'react';
import Styles from '../Components/Employeedata.module.css';


const Empdata = ({id, name, email, role}) => {

    const API_URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
    const [emp, setEmp] = useState([]);
    const [currentPage, setCurrentPage] = useState('1');
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(API_URL);
            const data = await res.json();
            setEmp(data);
            console.log(data);
        }
        fetchData();
    },[])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = emp.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(emp.length / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };


    return (
        <div className={Styles.wrapper}>
            <h2>Employee Data Table</h2>
            <table>
                <thead>
                    <tr className={Styles.tablerow}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                {currentItems.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div className={Styles.buttons}>
                <button onClick={handlePrevious} disabled={currentPage === 1} className={Styles.button}>Previous</button>
                <span>{currentPage}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages} className={Styles.button}>Next</button>
            </div>
            </div>
    )
}

export default Empdata;