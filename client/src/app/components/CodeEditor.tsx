import { useRef } from "react";
interface CodeEditorProps {
    onChange: (newCode: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    };
    const handleTabKey = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            const { selectionStart, selectionEnd } = event.currentTarget;
            const value = textareaRef.current!.value;
            const newValue =
                value.substring(0, selectionStart) +
                '\t' +
                value.substring(selectionEnd);
            textareaRef.current!.value = newValue;
            textareaRef.current!.setSelectionRange(selectionStart + 1, selectionStart + 1);
            onChange(newValue);
        }
    };
    return (
        <textarea 
            ref={textareaRef}
            className="w-full h-48 border border-gray-300 rounded p-2 mb-4" 
            placeholder="Write your Python code here..."
            onChange={handleCodeChange}
            onKeyDown={handleTabKey}>
        </textarea>
    );
};

export default CodeEditor;