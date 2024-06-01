interface CodeOutputProps {
    output: string;
}

const CodeOutput: React.FC<CodeOutputProps> = ({ output }) => {
    return (
        <pre className="mt-4 bg-gray-100 p-4 rounded border overflow-auto">
            {output}
        </pre>
    );
};

export default CodeOutput;