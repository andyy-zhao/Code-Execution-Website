import axios from 'axios';

interface TestCodeBtnProps {
    code: string;
    setOutput: (output: string) => void;
}
const TestCodeBtn: React.FC<TestCodeBtnProps> = ({ code, setOutput }) => {

    const testCode = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/test/', { code });
            setOutput(response.data.output);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <button 
                onClick={testCode}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">
                Test Code
            </button>
        </div>
    )
}

export default TestCodeBtn;
