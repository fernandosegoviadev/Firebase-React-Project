import Card from './Card';
import { useState, useEffect } from 'react';



export default function Cards(props) {
    // console.log(props.companies, "las props en Cards");
    const [progress, setProgress] = useState(0);
    
    const scrollHandler = (event) => {
        // console.log('se dispara', event)
        const containerHeight = event.currentTarget.clientHeight;
        const scrollHeight = event.currentTarget.scrollHeight;
        const scrollTop = event.currentTarget.scrollTop;
        setProgress(((scrollTop + containerHeight) / scrollHeight) * 100);
    };
    

    useEffect(()=> {
        if(progress > 94 ) {
            props.nextPage();
        }
    },[progress])

    return (
        <div>
            <p>La lista de Cards - progreso {progress} %</p>
            <div onScroll={scrollHandler}
                style={{ overflowY: "scroll", maxHeight: "400px", minWidth: "440px" }}>
                {props.companies.length ? props.companies.map(e =>
                    <Card
                        key={e.id}
                        id={e.id}
                        name={e.data().name}
                        companyName={e.data().companyName}
                        nit={e.data().nit}
                        phone={e.data().phone}
                        code={e.data().code}
                        getData={props.getData}
                    />
                ) : null}
            </div>

        </div>
    )
}