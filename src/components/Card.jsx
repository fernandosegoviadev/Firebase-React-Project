import './style/card.css';
import EditPopup from './EditPopup';
import { deleteDataBase } from '../application/api';

export default function Card(props) {

    let { name, companyName, cuit, address, email, id } = props;

    function openEditForm(uid) {
        if (uid) {
            document.getElementById(uid).style.display = "block";
        }
    }

    const deleteData = async (uid) => {
        if (window.confirm("El desrrollador ha desactivado esta función")) {
            // if (uid) {
            //     await deleteDataBase(uid);
            //     props.getData();
            // }
        }
    }

    return (
        <div className='main-card-box'>
            <div className='card-box'>
                <p>Nombre {name} -
                    Razón social {companyName} -
                    CUIT {cuit} -
                    Dirección {address} -
                    Email {email}</p>
                <div>
                    <EditPopup key={id}
                        id={id}
                        name={name}
                        companyName={companyName}
                        cuit={cuit}
                        address={address}
                        email={email}
                        getData={props.getData}
                    />
                </div>
            </div>
            <div className='card-box-2'>
                <button onClick={() => openEditForm(id)}>Editar</button>
                <button onClick={() => deleteData(id)}>Eliminar</button>
            </div>
        </div>
    )
}