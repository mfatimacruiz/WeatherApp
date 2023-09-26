import React, { useState, useEffect } from "react";
import { CountryDropdown } from 'react-country-region-selector'; // Package that contains the list of countries
import cities from '../utilities/cities.json'; // a json file that stores all the cities -> Link github.com/lutangar/cities.json/blob/master/README.md
import { countryCodes } from '../utilities/countryCodes'; // a list containing the country codes mapping
import { API_KEY } from '../config';
export default function WeatherForm() {

    // Use States
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [weather, setWeather] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [filteredCities, setFilteredCities] = useState([]);

    // Use Effect - Will be triggered once we change the country in dropdown list
    useEffect(() => {
        if (selectedCountry) {
            // Matched the country code in Country Codes List
            const countryCode = Object.keys(countryCodes).find(code => countryCodes[code] === selectedCountry);
            // Get the Cities
            if (countryCode) {
                const sortedCities = cities
                    .filter(city => city.country === countryCode)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .reduce((acc, current) => {
                        const x = acc.find(item => item.name === current.name);
                        if (!x) {
                            return acc.concat([current]);
                        } else {
                            return acc;
                        }
                    }, []);

                setFilteredCities(sortedCities);
            }
        } else {
            setFilteredCities([]);
        }
    }, [selectedCountry]);

    // Get Weather API -> Calls the setupProxy.js -> /api/weatherforecast
    const getWeather = async () => {

        // Loading State - Start
        setIsLoading(true);
        const countryCode = countryCodes[selectedCountry];
        try {
            // Fetch the proxy /api/weatherforecast
            const response = await fetch(`/api/weatherforecast/${selectedCity}/${countryCode}`, {
                // Sets API Key
                headers: {
                    "X-API-KEY": API_KEY
                }
            });
            // Handles for Invalid API Key Input
            if (response.status === 401) {
                setModalMessage("Invalid API Key");
                setShowModal(true);
            } else if (response.status === 429) {
                // Handles for Rate limit exceeded on APIkey
                setModalMessage("Rate limit exceeded");
                setShowModal(true);
            } else if (response.status === 404) {
                // Handles Not Found Error
                setModalMessage("City not supported.");
                setShowModal(true);
                setWeather("");
            } else if (!response.ok) {
                // Handles Unknown Error from API
                setModalMessage("An unknown error occurred");
                setShowModal(true);
                setWeather("");
            } else {
                const data = await response.json();
                const capitalizeFirstLetterOfEachWord = (str) => {
                    return str.replace(/\w\S*/g, function (txt) {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    });
                };
                setWeather(capitalizeFirstLetterOfEachWord(data.description) || "Description not available");
            }
        } catch (error) {
            // Generic Error Catch
            setModalMessage("Unable to fetch weather data");
            setShowModal(true);
        } finally {
            // Loading State - End
            setIsLoading(false);
        }
    };

    return (

        <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: "30rem" }}>
                <div className="card-body">
                    <h5 className="card-title text-center">Current Weather </h5>
                    <div className="mb-3">
                        <CountryDropdown value={selectedCountry} onChange={(val) => setSelectedCountry(val)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <select className="form-control" onChange={(e) => setSelectedCity(e.target.value)}>
                            <option>Select City</option>
                            {filteredCities.map((city, index) => (
                                <option key={index} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="d-grid gap-2 justify-content-center">
                        <button className="btn btn-primary" onClick={getWeather} >Get Weather</button>
                    </div>
                    <div className="mt-4">
                        <h6 className="text-center">Weather Description: </h6>
                        {isLoading ? <p className="text-center">Loading...</p> : <p className="text-center" style={{ color: '#0a58ca' }}>{weather}</p>}
                    </div>
                </div>
            </div>

            <div className={`modal ${showModal ? 'd-block' : ''}`} tabIndex="-1" style={{ position: "fixed", top: 0, left: 0 }}>
                <div className="modal-dialog modal-sm" style={{ margin: 'auto' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" style={{ fontSize: '16px' }}>Notification</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body" style={{ 'padding-bottom': '0px' }}>
                            <p style={{ fontSize: '14px' }}>{modalMessage}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
