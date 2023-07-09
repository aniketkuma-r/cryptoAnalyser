import { useState } from 'react';
import './CurrencyConverter.css';
import ExchangeRate from './ExchangeRate';
import axios from 'axios';

const CurrencyConverter = () => {
    const currencies = ['BTC', 'ETH', 'USD', 'INR', 'LTC', 'ADA'];
    const [chosenPrimaryCurrency, SetChosenPrimaryCurrency] = useState(currencies[0]);
    const [chosenSecondaryCurrency, SetChosenSecondaryCurrency] = useState(currencies[2]);
    const [amount, setAmount] = useState(1);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [result, setResult] = useState(0);

    const convert = () => {

        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {
                from_currency: chosenPrimaryCurrency,
                function: 'CURRENCY_EXCHANGE_RATE',
                to_currency: chosenSecondaryCurrency
            },
            headers: {
                'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
            }
        };

        axios.request(options).then((response) => {
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);

            setResult(amount * exchangeRate);

        }).catch((error) => {
            // console.error(error);
            alert(error);
        })
    }
    // console.log(amount);


    return (
        <div>
            <div className="currency-converter">
                <h2>CurrencyConverter</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Primary Currency</td>
                            <td>
                                <input
                                    type='number'
                                    name="currency-amount-1"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </td>
                            <td>
                                <select
                                    value={chosenPrimaryCurrency}
                                    name="currency-option-1"
                                    className="currency-options"
                                    onChange={(e) => SetChosenPrimaryCurrency(e.target.value)}
                                >
                                    {currencies.map(
                                        (currency, _index) =>
                                            (<option key={_index}>{currency}</option>)
                                    )};
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Secondary Currency</td>
                            <td>
                                <input
                                    type='number'
                                    name="currency-amount-2"
                                    value={result}
                                    disabled={true}
                                />
                            </td>
                            <td>
                                <select
                                    value={chosenSecondaryCurrency}
                                    name="currency-option-2"
                                    className="currency-options"
                                    onChange={(e) => SetChosenSecondaryCurrency(e.target.value)}
                                >
                                    {currencies.map(
                                        (currency, _index) =>
                                            (<option key={_index}>{currency}</option>)
                                    )};
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button id="convert-button" onClick={convert}>Convert</button>
            </div>
            <ExchangeRate exchangeRate={exchangeRate} chosenPrimaryCurrency={chosenPrimaryCurrency} chosenSecondaryCurrency={chosenSecondaryCurrency} />
        </div>
    );
}
export default CurrencyConverter;