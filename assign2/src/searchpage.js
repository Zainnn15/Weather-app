import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
    let [cityname, setN] = useState('');
    let navigate = useNavigate();   
    const search = () => {
        if(!cityname){
            alert("NIGGER")
            if(cityname.includes(',')) {
                cityname = cityname.split(',');
                cityname = cityname.map(k => k.trim()).join(','); 
            }
            
        } 
        else{
            navigate(`../?name=${cityname}`, { replace: true });
        }
        

    }
    return (
        <>
        <div className="row">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Weather Updates</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link" href="#">Home</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div className="body">
            <div className="card">

            <span id="error"></span>

                <h3>enter a city or a country to get the weather data</h3>
                <div className="row">
                    <div className="col-10 mt-2">
                        <input type="text" id="city" value={cityname} onChange={event => setN(event.target.value)} />
                    </div>



                    <div class="tb">

                    
                    <div class="td"></div>
                    <div className="col-2">
                        <button onClick={search} className='searchBtn'><i className="bi bi-search"></i>
                        <div id="s-circle"></div>
                        </button>
                        
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    );
}
export default Search;