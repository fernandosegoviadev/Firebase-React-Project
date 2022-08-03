import './style/popup.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { updateDataBase } from './../application/api';


export default function EditPopup(props) {
    // console.log(props, "las props en Edit Popup");

    let { name, companyName, nit, phone, code, id } = props;

    const initialState = {
        name: "", companyName: "", nit: "",
        phone: "", code: ""
    };

    const [data, setData] = useState(initialState);
    const [uid, setUid] = useState("");

    useEffect(() => {
        setData({
            name: name,
            companyName: companyName,
            nit: nit,
            phone: phone,
            code: code
        });
        setUid(id);
    }, [props]);


    const onChangeData = (e, input) => {
        let value = e.target.value;
        setData({...data, [input]: value });
    }

    const updateData = async (e) => {
        if (data.name && data.companyName && data.nit) {
            if (window.confirm("Confirma que desea editar el registro?")) {
                e.preventDefault();
                if (uid && data) {
                    await updateDataBase(uid, data);
                    props.getData();
                }
            }
        }
        if (!data.name || !data.companyName || !data.nit) {
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
            nit: nit,
            phone: phone,
            code: code
        });
    }


    return (
        <div className="form-popup" id={id}>
            <form action="/action_page.php" className="form-container">
                <h1>Edit</h1>

                <label htmlFor="name" ><b>*Nombre</b></label>
                <input id="myName" type="text" placeholder="Nombre fantasia"
                    name="name" required value={data.name}
                    onChange={(e) => onChangeData(e, "name")} />

                <label htmlFor="companyName"><b>*Razón Social</b></label>
                <input type="text" placeholder="Nombre Legal"
                    name="companyName" required value={data.companyName}
                    onChange={(e) => onChangeData(e, "companyName")} />

                <label htmlFor="nit"><b>*NIT</b></label>
                <input type="text" placeholder="123456789-5"
                    name="nit" required value={data.nit}
                    onChange={(e) => onChangeData(e, "nit")} />

                <label htmlFor="phone"><b>Teléfono</b></label>
                <input type="text" placeholder="0123-112-123-123"
                    name="phohe" required value={data.phone}
                    onChange={(e) => onChangeData(e, "phone")} />

                <label htmlFor="code"><b>Código</b></label>
                <input type="text" placeholder="1234"
                    name="code" required value={data.code}
                    onChange={(e) => onChangeData(e, "code")} />

                <button type="submit" className="btn" onClick={(e) => updateData(e)}>Edit</button>
                <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
            </form>
        </div>
    )
}