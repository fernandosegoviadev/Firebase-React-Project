import './style/card.css';
import EditPopup from './EditPopup';
import { deleteDataBase } from '../application/api';

export default function Card(props) {

    let { name, companyName, nit, phone, code, id } = props;

    function openEditForm(uid) {
        if (uid) {
            document.getElementById(uid).style.display = "block";
        }
    }

    const deleteData = async (uid) => {
        if (window.confirm("Está seguro que quiere eliminar el registro?")) {
            if (uid) {
                await deleteDataBase(uid);
                props.getData();
            }
        }
    }

    return (
        <div className='main-card-box'>
            <div className='card-box'>
                <p>Nombre {name} <br />
                    Razón social {companyName} <br />
                    NIT {nit} <br />
                    Teléfono {phone} <br /> 
                    Código {code}</p>
                <div>
                    <EditPopup key={id}
                        id={id}
                        name={name}
                        companyName={companyName}
                        nit={nit}
                        phone={phone}
                        code={code}
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