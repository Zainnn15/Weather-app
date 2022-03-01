import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';

function Search() {
    let [cityname, setN] = useState('');
    let navigate = useNavigate();   
    const search = () => {
        if(!cityname){
            document.getElementById('noCity').style.visibility = "visible";
            if(cityname.includes(',')) {
                cityname = cityname.split(',');
                cityname = cityname.map(k => k.trim()).join(','); 
            }
        } 
        else{
            navigate(`../?name=${cityname}`, { replace: true });
        }
        
        $(function(){
            $('form').each(function () {
                $(this).find('input').key(function (e) {
                    if(e.keyCode==13)
                    this.form.submit();
                })
            
            });
        });

    }
    return (
        <>
        <div className="row">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Weather Updates</a>
                <button className="navbar-toggler" type="button" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul>
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link" >Home</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <form><div className="body">
            <div className="card" class='bi'>
                <h3>enter a city or you can enter it with a country code with it to get the weather data</h3>
                <div className="row">
                    <div>
                        <input type="search" id="city" value={cityname} onChange={event => setN(event.target.value)} />
                    </div>
                    <div class="tb">
                    <div class="td"></div>
                    <div className="col-2">
                        <button onClick={search} className='searchBtn'>
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="5em" xmlns="http://www.w3.org/2000/svg"><g fill="#616161"><rect x="34.6" y="28.1" transform="matrix(.707 -.707 .707 .707 -15.154 36.586)" width="7" height="17"></rect><circle cx="20" cy="20" r="16"></circle></g><rect x="36.2" y="32.1" transform="matrix(.707 -.707 .707 .707 -15.839 38.239)" fill="#37474F" width="7" height="12.3"></rect><circle fill="#64B5F6" cx="20" cy="20" r="13"></circle><path fill="#BBDEFB" d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1 C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"></path></svg></button>
                    </div>
                    <div class="alert alert-warning" id='noCity' role="alert" style={{ visibility: "hidden" }}>
                            Write something...
                        </div>
                </div>
                </div>
            </div>
        </div></form>
        </>
    );
}
export default Search;