import axios from "axios";
import { useState, useEffect } from "react";
import React from 'react';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';

function Main() {
  
    let [data, setData] = useState([]);
    let [error, setError] = useState('');
    let [b, setBol] = useState(false);
    let [RecentlyViewed, setAllRecentlyViewed] = useState(JSON.parse(localStorage.getItem('allRecentlyViewed')) || []);

    const getCityloc = (city) => {
        let url = '';
        if(city.includes(',')) { 
            url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=03f9775e72f9111fb1193729306f3a4b`; 
        } else {    
            url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=03f9775e72f9111fb1193729306f3a4b";
        }
        axios.get(url).then((response) => {
                setData(response.data); 
                setInLocal(response.data); 
                setBol(true);   
            }, (error) => {
                setError(error);
                alert(error)
            });
    }


     useEffect(() => {
        if(window.location.href.includes('name=')) { 
            let name = window.location.href.split('name=').pop(); 
            getCityloc(name); 
        }
        else {
            $.ajax({ 
                url: "https://geolocation-db.com/jsonp/d802faa0-10bd-11ec-b2fe-47a0872c6708/192.82.150.223",
                jsonpCallback: "callback",
                dataType: "jsonp",
                success: function (location) {
                    getCityloc(location.city);   
                }
            });
        }
    }, [])

    const setInLocal = (obj) => { 
        if(RecentlyViewed.length > 5) RecentlyViewed.splice(RecentlyViewed.length-1, 1);
        let idx = RecentlyViewed.findIndex(elem => elem.name === obj.name);
        if(idx >= 0) RecentlyViewed = RecentlyViewed.filter(elem => elem.name !== obj.name);
        RecentlyViewed.splice(0, 0, obj);
        setAllRecentlyViewed(RecentlyViewed);
        localStorage.setItem('allRecentlyViewed', JSON.stringify(RecentlyViewed));
         
    }
 
    const show = () => {    
        let html = document.getElementById('toShow');
        if(html.style.display === 'none') html.style.display = 'block';
        else html.style.display = 'none';
    }

    const handleChange = () => {    
        let name = document.getElementById('ddl').value;
        let obj = RecentlyViewed.find(elem => elem.name === name);
        setData(obj);
    }



    return (
        <div className="mainBody">
            <div className="row">
                <nav className="navbar navbar-expand-lg bg-dark">
                    <a className="navbar-brand" href="#">Weather App_v2</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" aria-label="Toggle navigation"></button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link" href="#">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='search' className="nav-link" href="#">Search</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <select onChange={handleChange} id='ddl' className="nav-link" style={{backgroundColor: '#212529', border: 'none'}}>
                                    <option>Previously Viewed</option>
                                    {RecentlyViewed.map((elem,idx) => {
                                        return <option key={idx} value={elem.name}>{elem.name}</option>
                                    })}</select>
                            </li></ul>
                    </div>
                </nav>
            </div>

            <h2 className="mt-4" class='time'>{new Date().toLocaleDateString()}</h2>
            <div>
                {b && <div className="col-11 ml-5">
                    <h2>{data.name}, {data.sys.country}, <img style={{ width: '50px', height: '30px', objectFit: 'cover' }} src={`http://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png`} /></h2>
                    <p className='temperature'><strong>Temperature</strong>: {data.main.temp}&deg;C</p>
                    <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} />
                    <p className='city'>{data.weather[0].description}</p>
                
                    <span style={{border: '15px'}} id='toShow'>
                        <div class='bod'>
                        <h3><strong>Pressure</strong>:       {data.main.pressure}hPa</h3>
                        <h3><strong>Min Temperature</strong>: {data.main.temp_min}&deg;C</h3>
                        <h3><strong>Max Temperature</strong>: {data.main.temp_max}&deg;C</h3>
                        <h3><strong>Wind Speed</strong>:     {data.wind.speed}m/s</h3>
                        <h3><strong>Longitude</strong>: {data.coord.lon}</h3>
                        <h3><strong>Latitude</strong>: {data.coord.lat}</h3>
                        <h3><strong>Sunset</strong>: {(new Date(data.sys.sunset * 1000)).toLocaleTimeString()}</h3>
                        <h3><strong>Sunrise</strong>: {(new Date(data.sys.sunrise * 1000)).toLocaleTimeString()}</h3>
                        </div>
                    </span><br/>
                </div>}
                {}
                <div class="td" id="s-cover">
                    <button id="plus" className="plus" onClick={show}>Display more information</button>
                </div>
            </div>
        </div>
    );
}

export default Main;