import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const jsonData = JSON.parse(input);
            const res = await axios.post('https://your-backend-api.vercel.app/bfhl', jsonData);
            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON or API Error');
        }
    };

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedOptions(
            selectedOptions.includes(value)
                ? selectedOptions.filter(opt => opt !== value)
                : [...selectedOptions, value]
        );
    };

    const renderResponse = () => {
        if (!response) return null;
        const output = [];
        if (selectedOptions.includes('Alphabets')) output.push(<div>Alphabets: {response.alphabets.join(', ')}</div>);
        if (selectedOptions.includes('Numbers')) output.push(<div>Numbers: {response.numbers.join(', ')}</div>);
        if (selectedOptions.includes('Highest Lowercase Alphabet')) output.push(<div>Highest Lowercase Alphabet: {response.highestLowerCase}</div>);
        return output;
    };

    return (
        <div>
            <h1>Your Roll Number</h1>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter JSON here" />
            <button onClick={handleSubmit}>Submit</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                <h3>Select Options:</h3>
                <label>
                    <input type="checkbox" value="Alphabets" onChange={handleOptionChange} />
                    Alphabets
                </label>
                <label>
                    <input type="checkbox" value="Numbers" onChange={handleOptionChange} />
                    Numbers
                </label>
                <label>
                    <input type="checkbox" value="Highest Lowercase Alphabet" onChange={handleOptionChange} />
                    Highest Lowercase Alphabet
                </label>
            </div>
            <div>{renderResponse()}</div>
        </div>
    );
}

export default App;
