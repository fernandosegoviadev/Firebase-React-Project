import './style/popup.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { addDataBase } from './../application/api';
import {Name, CompanyName, Cuit, Address, Email} from '../application/constants';

export default function AddPopup(props) {
   
    const initialState = {
        name: "", companyName: "", cuit: "",
        address: "", email: ""
    };
    const [data, setData] = useState(initialState);

    useEffect(() => { 
        setData({ ...initialState, [props.type]: props.value }); 
    }, [props])

    const onChangeData = (e, input) => {
        let value = e.target.value;
        setData({...data, [input]: value });     
    }

    const addData = async (e) => {
        e.preventDefault();
        if (data.name && data.companyName && data.cuit) {
            await addDataBase(data);
            props.getData();
            window.alert("Registro creado");
            setData({
                name: "",
                companyName: "",
                cuit: "",
                address: "",
                email: ""
            });
        };
        if (!data.name || !data.companyName || !data.cuit) {
            window.confirm("Campos obligatorios incompletos");
            e.preventDefault();
        }
    }

    const closeForm = () => {
        document.getElementById("myFormAdd").style.display = "none";
        setData({
            name: "",
            companyName: "",
            cuit: "",
            address: "",
            email: ""
        });
    }


    return (
        <div className="form-popup" id={"myFormAdd"}>
            <form action="/action_page.php" className="form-container">
                <h1>Create</h1>

                <label htmlFor={Name} ><b>*Nombre</b></label>
                <input id="myName" type="text" placeholder="Nombre fantasia"
                    name={Name} required value={data.name}
                    onChange={(e) => onChangeData(e, Name)} />

                <label htmlFor={CompanyName}><b>*Razón social</b></label>
                <input type="text" placeholder="Nombre Legal"
                    name={CompanyName} required value={data.companyName}
                    onChange={(e) => onChangeData(e, CompanyName)} />

                <label htmlFor={Cuit}><b>*CUIT</b></label>
                <input type="text" placeholder="12-12345678-1"
                    name={Cuit} required value={data.cuit}
                    onChange={(e) => onChangeData(e, Cuit)} />

                <label htmlFor={Address}><b>Dirección</b></label>
                <input type="text" placeholder="Dirección 1234"
                    name={Address} required value={data.address}
                    onChange={(e) => onChangeData(e, Address)} />

                <label htmlFor={Email}><b>Email</b></label>
                <input type="text" placeholder="email@email.com"
                    name={Email} required value={data.email}
                    onChange={(e) => onChangeData(e, Email)} />

                <button type="submit" className="btn" onClick={(e) => addData(e)}>Create</button>
                <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
            </form>
        </div>
    )
}