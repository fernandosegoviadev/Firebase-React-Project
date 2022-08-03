import Card from './Card';
import { useState, useEffect } from 'react';



export default function Cards(props) {
    const [progress, setProgress] = useState(0);
    
    const scrollHandler = (event) => {
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
            <div onScroll={scrollHandler}
                style={{ overflowY: "scroll", maxHeight: "600px", minHeight: "550px",
                 minWidth: "500px" }}>
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