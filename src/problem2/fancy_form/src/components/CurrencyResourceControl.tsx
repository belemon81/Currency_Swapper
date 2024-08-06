import React, {useState} from "react";
import {Form} from "react-bootstrap";
import './CurrencySwapForm.css'

export interface Currency {
    currency: string,
    date: Date,
    price: number
}

export const swapCurrency = (amount: string, from: Currency, to: Currency): number => {
    return parseFloat(amount) / from.price * to.price
} 


export const CurrencyDropdown: React.FC<{
    currencies: Currency[];
    selectedCurrency: Currency | null;
    onSelect: (currency: Currency) => void;
    label: string;
}> = ({ currencies, selectedCurrency, onSelect, label }) => {
    const [isSelecting, setIsSelecting] = useState(false);

    return (
        <div className="currency-dropdown">
            <Form.Label className="swap-label">{label}</Form.Label>
            <div className={isSelecting? "currency-dropdown-header-focus currency-dropdown-header" : "currency-dropdown-header"} onClick={() => setIsSelecting(!isSelecting)}>
                {selectedCurrency ? (<>
                        <img
                            src={`/tokens/${selectedCurrency.currency}.svg`}
                            alt={selectedCurrency.currency}
                            className="currency-icon"
                        />
                        <span className="currency-name">{selectedCurrency.currency}</span>
                        <span className="currency-price">${selectedCurrency.price.toFixed(4)}</span>
                    </>
                ) : (
                    <span>Select a currency</span>
                )}
            </div>
            {isSelecting && (
                <div className="currency-dropdown-list">
                    {currencies.map((currency, index) => (
                        <div
                            key={currency.currency + index}
                            className="currency-option"
                            onClick={() => {
                                onSelect(currency);
                                setIsSelecting(false);
                            }}
                        >
                            <img
                                src={`/tokens/${currency.currency}.svg`}
                                alt={currency.currency}
                                className="currency-icon"
                            />
                            <span className="currency-name">{currency.currency}</span>
                            <span className="currency-price">${currency.price.toFixed(4)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
