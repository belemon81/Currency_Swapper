import React, {useEffect, useState} from "react";
import {Currency, CurrencyDropdown, swapCurrency} from "./CurrencyResourceControl";
import axios from "axios";
import {Button, Col, Container, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import './CurrencySwapForm.css'

export const CurrencySwapForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
    const [toCurrency, setToCurrency] = useState<Currency | null>(null);
    const [fromAmount, setFromAmount] = useState<string>('');
    const [toAmount, setToAmount] = useState<string>('');
    const [highlightEffect, setHighlightEffect] = useState(0);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const fetchCurrencies = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://interview.switcheo.com/prices.json');
                setCurrencies(response.data);
                setToCurrency(response.data[0]);
                setFromCurrency(response.data[0]);
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
        setFromAmount(value);
        setToAmount('')
        // if (fromCurrency && toCurrency && value) {
        //     setToAmount(swapCurrency(value, fromCurrency, toCurrency).toFixed(4));
        // }
    };

    const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setToAmount(value);
        setFromAmount('')
        // if (fromCurrency && toCurrency && value) {
        //     setFromAmount(swapCurrency(value, toCurrency, fromCurrency).toFixed(4));
        // }
    }

    const createSparkles = () => {
        const sparkles = [];
        for (let i = 0; i < 5; i++) {
            const style = {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.8}s`,
            };
            sparkles.push(<div key={i} className="sparkle" style={style} />);
        }
        return sparkles;
    };

    const handleSubmit = (event: { preventDefault: () => void; currentTarget: { checkValidity: () => any; }; }) => {
        event.preventDefault()
        if (!event.currentTarget.checkValidity()) {
            setValidated(true);
        } else {
            setValidated(false);
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                if (fromCurrency && toCurrency && fromAmount) {
                    setToAmount(swapCurrency(fromAmount, fromCurrency, toCurrency).toFixed(4));
                    setHighlightEffect(2); // toAmount field
                } else if (fromCurrency && toCurrency && toAmount) {
                    setFromAmount(swapCurrency(toAmount, toCurrency, fromCurrency).toFixed(4))
                    setHighlightEffect(1); // fromAmount field
                }
                setTimeout(() => {
                    setHighlightEffect(0); // disable
                }, 500);
            }, 2000);
        }
    };

    return (
        <Container className="swap-box" fluid>
            <Form noValidate validated={validated}  onSubmit={handleSubmit} className="swap-form">
                <h2 className="swap-title">Currency Swap Engine</h2>
                <Row>
                    <Col>
                        <CurrencyDropdown
                            currencies={currencies}
                            selectedCurrency={fromCurrency}
                            onSelect={setFromCurrency}
                            label="From Currency"
                        />
                    </Col>
                    <Col>
                        <CurrencyDropdown
                            currencies={currencies}
                            selectedCurrency={toCurrency}
                            onSelect={setToCurrency}
                            label="To Currency"
                        />
                    </Col>
                </Row>
                <Row>
                        <Form.Group as={Col} className={highlightEffect === 1 ? 'highlight-effect' : ''}>
                            <Form.Label className="swap-label">Amount to send</Form.Label>
                            <Form.Control
                                type="number"
                                value={fromAmount}
                                onChange={handleFromAmountChange}
                                placeholder="Enter amount"
                                step="any"
                                min="0.0001"
                            />
                            <Form.Control.Feedback type="invalid">Amount should be more than 0</Form.Control.Feedback>
                            {highlightEffect === 1 && createSparkles()}
                        </Form.Group>
                        <Form.Group as={Col} className={highlightEffect === 2 ? 'highlight-effect' : ''}>
                            <Form.Label className="swap-label">Amount to receive</Form.Label>
                            <InputGroup hasValidation>
                            <Form.Control
                                type="number"
                                value={toAmount}
                                onChange={handleToAmountChange}
                                placeholder="Enter amount"
                                step="any"
                                min="0.0001"
                            />
                            <Form.Control.Feedback type="invalid">Amount should be more than 0</Form.Control.Feedback>
                            </InputGroup>
                            {highlightEffect === 2 && createSparkles()}
                        </Form.Group>
                </Row>
                <div>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                        className="swap-btn"
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> Swapping...
                            </>
                        ) : (
                            "Confirm Swap"
                        )}
                    </Button>
                </div>
            </Form>
        </Container>
    );
}