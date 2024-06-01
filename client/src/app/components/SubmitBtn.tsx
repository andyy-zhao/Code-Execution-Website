import axios from 'axios';

interface SubmitCodeBtnProps {
    code: string;
    setOutput: (output: string) => void;
    setError: (error: string) => void;
}

const SubmitBtn: React.FC<SubmitCodeBtnProps> = ({ code, setOutput, setError }) => {
    const submitCode = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/submit/', { code });
            setOutput(response.data.output);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button 
            onClick={submitCode}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Submit
        </button>
    )
}

export default SubmitBtn
