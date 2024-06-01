"use client";
import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import SubmitButton from "./components/SubmitBtn";
import TestCodeBtn from "./components/TestCodeBtn";
import CodeOutput from "./components/CodeOutput";

export default function Home() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Code Execution Website - Python</h1>
        <CodeEditor onChange={handleCodeChange} />
        <div className="flex space-x-2 mt-4">
          <TestCodeBtn code={code} setOutput={setOutput} />
          <SubmitButton code={code} setOutput={setOutput} setError={setError} />
        </div>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        {output && <CodeOutput output={output} />}
      </div>
    </div>
  );
}
