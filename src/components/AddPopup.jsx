import './style/popup.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { addDataBase } from './../application/api';

export default function AddPopup(props) { 
    const initialState = {
        name: "", companyName: "", nit: "",
        phone: "", code: ""
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
        if (data.name && data.companyName && data.nit) {
            await addDataBase(data);
            props.getData();
            window.alert("Registro creado");
            setData({
                name: "",
                companyName: "",
                nit: "",
                phone: "",
                code: ""
            });
        };
        if (!data.name || !data.companyName || !data.nit) {
            window.confirm("Campos obligatorios incompletos");
            e.preventDefault();
        }
    }

    const closeForm = () => {
        document.getElementById("myFormAdd").style.display = "none";
        setData({
            name: "",
            companyName: "",
            nit: "",
            phone: "",
            code: ""
        });
    }


    return (
        <div className="form-popup" id={"myFormAdd"}>
            <form action="/action_page.php" className="form-container">
                <h1>Create</h1>

                <label htmlFor="name" ><b>*Nombre</b></label>
                <input id="myName" type="text" placeholder="Nombre fantasia"
                    name="name" required value={data.name}
                    onChange={(e) => onChangeData(e, "name")} />

                <label htmlFor="companyName"><b>*Razón social</b></label>
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

                <button type="submit" className="btn" onClick={(e) => addData(e)}>Create</button>
                <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
            </form>
        </div>
    )
}