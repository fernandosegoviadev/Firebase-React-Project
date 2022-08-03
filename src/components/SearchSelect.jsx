import React, { Fragment, useState, useEffect } from 'react';
import { searchDataBase } from '../application/api';
import AddPopup from './AddPopup';
import Cards from './Cards';
import { paginated } from '../application/paginated';
import CreatableSelect from 'react-select/creatable';

export default function SearchSelect(props) {
    const initialState = [{ value: 'agregar', label: 'Agregar' }];

    const [companies, setCompanies] = useState([]);
    const [typeSearch, setTypeSearch] = useState("name");
    const [valueSearch, setValueSearch] = useState("");
    const [options, setOptions] = useState(initialState);
    const [query, setQuery] = useState({});

    // ------------ Paginado ----------------------------------------
    const [companiesPerPage, setCompaniesPerPage] = useState([]);
    const [actualPage, setActualPage] = useState(1);
    const cardsPerPage = 20;

    const nextPage = () => {
        console.log('nextPage recibe el llamado');
        if (companies.length && actualPage) {           
            let nextData = paginated(companies, cardsPerPage, actualPage);            
            if (nextData.cards) {
                setCompaniesPerPage(companiesPerPage.concat(nextData.cards));
                setActualPage(nextData.nextPage);
            }
        }
    }

    useEffect(() => {        
        if (companies.length && actualPage) {
            nextPage();
        }
    }, [companies])

    // --------------------------------------------------------------



    useEffect(() => {
        setCompanies(props.companies);
        if (options.length === 0 && typeSearch && props.companies.length) {
            let optionsByFilter = props.companies.map((u) => u.data()[typeSearch])
            const mySetOptions = [...new Set(optionsByFilter)];
            let newOptions = mySetOptions.map((o) => (
                { value: o, label: o }
            ))
            setOptions(initialState.concat(newOptions));
        }
        if (companies.length) {
            if (actualPage === 1) {
                nextPage();
            }
            setActualPage(1);
            setCompaniesPerPage([]);
        }
    }, [props.companies])

    useEffect(() => {
        if (typeSearch && companies.length) {
            let optionsByFilter = companies.map((u) => u.data()[typeSearch])
            const mySetOptions = [...new Set(optionsByFilter)];
            let newOptions = mySetOptions.map((o) => (
                { value: o, label: o }
            ));
            setOptions(initialState.concat(newOptions));
        }
    }, [typeSearch])


    const updateSearchValue = (value) => {

        if (value) {
            setValueSearch(value);
        }
    }

    const createSearch = (e) => {      
        if (e && e.value === "agregar") {
            openForm(valueSearch);
        }
        if (e && e.__isNew__) {
            openForm(valueSearch);
        }
        else if (e && e.value && typeSearch) {
            setQuery({ [typeSearch]: e.value });
        }
    }

    const onSearch = async () => {
        if (Object.entries(query).length === 1) {
            let resulSearch = await searchDataBase(query);
            setCompanies(resulSearch.docs);
            setActualPage(1);
            setCompaniesPerPage([]);

            console.log(resulSearch.docs, 'luego de la búsqueda')
        }
    }

    const openForm = () => {
        document.getElementById("myFormAdd").style.display = "block";
    }
  

    return (
        <div style={{ color: 'black', width: "400px" }}>
            <Fragment>
                <div>                    
                    <CreatableSelect
                        isClearable
                        onChange={(e) => createSearch(e)}
                        onInputChange={(e) => updateSearchValue(e)}                        
                        options={options}
                    />
                </div>
                <div
                    style={{
                        color: 'hsl(0, 0%, 40%)',
                        display: 'inline-block',
                        fontSize: 12,
                        fontStyle: 'italic',
                        marginTop: '1em',
                    }}
                >
                    <input type="radio" id="Name" name="fav_language" value="name"
                        onClick={(e) => setTypeSearch(e.target.value)} />
                    <label htmlFor="Name">Nombre</label>

                    <input type="radio" id="CompanyName" name="fav_language" value="companyName"
                        onClick={(e) => setTypeSearch(e.target.value)} />
                    <label htmlFor="CompanyName">Razón social</label>

                    <input type="radio" id="Nit" name="fav_language" value="nit"
                        onClick={(e) => setTypeSearch(e.target.value)} />
                    <label htmlFor="Nit">NIT</label>

                    <input type="radio" id="Phone" name="fav_language" value="phone"
                        onClick={(e) => setTypeSearch(e.target.value)} />
                    <label htmlFor="Phone">Teléfono</label>

                    <input type="radio" id="Code" name="fav_language" value="code"
                        onClick={(e) => setTypeSearch(e.target.value)} />
                    <label htmlFor="Code">Código</label>

                    <h3>Criterio de búsqueda: {typeSearch}</h3>
                </div>
            </Fragment>
            <button onClick={onSearch}>Buscar</button>
            <div>
                <AddPopup value={valueSearch} type={typeSearch} getData={props.getData} />
            </div>
            <div>
                <Cards companies={companiesPerPage} getData={props.getData} nextPage={nextPage}/>
            </div>        
        </div>
    );
} 