import React, {useEffect, useState} from "react";
import {Currency} from "./CurrencyResourceControl";
import axios from "axios";

export const CurrencySwapForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [currencies, setCurrencies] = useState<Currency[]>(null);

    const onSubmitForm = () => {
        setLoading(true);

        setLoading(false);
    }

    useEffect(() => {
        const fetchCurrencies = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://api.example.com/data');
                console.log(response.data)
                setCurrencies(response.data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };
    }, []);

    return (
        <form onSubmit={onSubmitForm}>
            <h5>Swap</h5>
            <label htmlFor="input-amount">Amount to send</label>
            <input id="input-amount"/>

            <label htmlFor="output-amount">Amount to receive</label>
            <input id="output-amount"/>

            <button>CONFIRM SWAP</button>
        </form>
    );
}