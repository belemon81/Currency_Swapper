import React, {useEffect, useState} from "react";
import {Currency, swapCurrency} from "./CurrencyResourceControl";
import axios from "axios";
import {Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";

export const CurrencySwapForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
    const [toCurrency, setToCurrency] = useState<Currency | null>(null);
    const [fromAmount, setFromAmount] = useState<number>(0);
    const [toAmount, setToAmount] = useState<number>(0);

    const onSubmitForm = () => {
        setLoading(true);

        setLoading(false);
    }

    useEffect(() => {
        const fetchCurrencies = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://interview.switcheo.com/prices.json');
                console.log(response.data)
                setCurrencies(response.data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };
        fetchCurrencies();
    }, []);

    const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFromAmount(parseFloat(value));
        if (fromCurrency && toCurrency) {
            const convertedAmount = swapCurrency({currencyType: fromCurrency, amount: fromAmount}, toCurrency)
            setToAmount(parseFloat(convertedAmount.toFixed(4))); //
        }
    };

    const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setToAmount(parseFloat(value));
        if (fromCurrency && toCurrency) {
            const convertedAmount = swapCurrency({currencyType: fromCurrency, amount: toAmount}, fromCurrency)
            setFromAmount(parseFloat(convertedAmount.toFixed(4)));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {setLoading(false);}, 2000);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h2>Currency Swap Form</h2>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>From Currency</Form.Label>
                            <Form.Select
                                value={fromCurrency?.currency}
                                onChange={(e) =>
                                    setFromCurrency(currencies.find((c) => c.currency === e.target.value) || null)
                                }
                            >
                                {currencies.map((currency) => (
                                    <option key={currency.currency} value={currency.currency}>
                                        {currency.currency}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>To Currency</Form.Label>
                            <Form.Select
                                value={toCurrency?.currency}
                                onChange={(e) =>
                                    setToCurrency(currencies.find((c) => c.currency === e.target.value) || null)
                                }
                            >
                                {currencies.map((currency) => (
                                    <option key={currency.currency} value={currency.currency}>
                                        {currency.currency}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Amount to Send</Form.Label>
                            <Form.Control
                                type="number"
                                value={fromAmount}
                                onChange={handleFromAmountChange}
                                placeholder="Enter amount"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Amount to Receive</Form.Label>
                            <Form.Control
                                type="number"
                                value={toAmount}
                                onChange={handleToAmountChange}
                                placeholder="Enter amount"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center">
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Swapping...
                            </>
                        ) : (
                            "Confirm Swap"
                        )}
                    </Button>
                </div>
            </Form>
        </Container>
    );
// return (
    //     <form onSubmit={onSubmitForm}>
    //         <h5>Swap</h5>
    //         <label htmlFor="input-amount">Amount to send</label>
    //         <input id="input-amount"/>
    //
    //         <label htmlFor="output-amount">Amount to receive</label>
    //         <input id="output-amount"/>
    //
    //         <button>CONFIRM SWAP</button>
    //     </form>
    // );
}