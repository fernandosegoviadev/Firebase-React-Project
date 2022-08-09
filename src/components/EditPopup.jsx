import './style/popup.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { updateDataBase } from './../application/api';
import {Name, CompanyName, Cuit, Address, Email} from '../application/constants';

export default function EditPopup(props) {

    let { name, companyName, cuit, address, email, id } = props;
    // console.log(props, 'las props en edit')
    const initialState = {
        name: "", companyName: "", cuit: "",
        address: "", email: ""
    };

    const [data, setData] = useState(initialState);
    const [uid, setUid] = useState("");

    useEffect(() => {
        setData({
            name: name,
            companyName: companyName,
            cuit: cuit,
            address: address,
            email: email
        });
        setUid(id);
    }, [props]);


    const onChangeData = (e, input) => {
        let value = e.target.value;
        setData({...data, [input]: value });
    }

    const updateData = async (e) => {
        if (data.name && data.companyName && data.cuit) {
            if (window.confirm("Confirma que desea editar el registro?")) {
                e.preventDefault();
                if (uid && data) {
                    await updateDataBase(uid, data);
                    props.getData();
                }
            }
        }
        if (!data.name || !data.companyName || !data.cuit) {
            window.confirm("Campos obligatorios incompletos");
            e.preventDefault();
        }
        e.preventDefault();
    }


    const closeForm = () => {
        document.getElementById(id).style.display = "none";
        setData({
            name: name,
            companyName: companyName,
            cuit: cuit,
            address: address,
            email: email
        });
    }


    return (
        <div className="form-popup" id={id}>
            <form action="/action_page.php" className="form-container">
                <h1>Edit</h1>

                <label htmlFor={Name} ><b>*Nombre</b></label>
                <input id="myName" type="text" placeholder="Nombre fantasia"
                    name={Name} required value={data.name}
                    onChange={(e) => onChangeData(e, Name)} />

                <label htmlFor={CompanyName}><b>*Razón Social</b></label>
                <input type="text" placeholder="Nombre Legal"
                    name={CompanyName} required value={data.companyName}
                    onChange={(e) => onChangeData(e, CompanyName)} />

                <label htmlFor={Cuit}><b>*CUIT</b></label>
                <input type="text" placeholder="12-12345678-1"
                    name={Cuit} required value={data.cuit}
                    onChange={(e) => onChangeData(e, Cuit)} />

                <label htmlFor={Address}><b>Dirección</b></label>
                <input type="text" placeholder="Dirección 123"
                    name={Address} required value={data.address}
                    onChange={(e) => onChangeData(e, Address)} />

                <label htmlFor={Email}><b>Email</b></label>
                <input type="text" placeholder="1234"
                    name={Email} required value={data.email}
                    onChange={(e) => onChangeData(e, Email)} />

                <button type="submit" className="btn" onClick={(e) => updateData(e)}>Edit</button>
                <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
            </form>
        </div>
    )
}