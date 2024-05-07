import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import ReactCodeMirror from "@uiw/react-codemirror";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [textColor,setTextColor] = useState<string>();
  const [pythonText, setPythonText] = useState<string>('');
  const [result,setResult] = useState<string>("");
  const handleCompile = useCallback(async () => {
    try {
      await axios.post("http://localhost:3000/api/python/compile", { code: pythonText })
      .then((res)=>{
        setTextColor("text-green-800")
        setResult(res.data.result);
      })
      .catch((error)=>{
        setTextColor("text-red-800");
        setResult(error.response.data.result);
      })
    } catch (err) {
      console.error(err);
    }
  }, [pythonText]);

  const onChange = useCallback((val: string, _change: unknown, _value: unknown) => {
    setPythonText(val);
  }, []);

  useEffect(() => {
    setPythonText('');
  }, []);

  return (
    <>
    
    <div className="w-screen h-screen bg-[#c0c0c0] flex flex-col justify-center items-center">
      <div className="absolute top-0 font-extralight text-blue-900 text-4xl mt-2">Python Compiler</div>
      <div className="flex flex-col gap-3 w-[90%] h-[90%] justify-evenly items-center">
        <ReactCodeMirror
          value={pythonText}
          onChange={onChange}
          options={{
            mode: 'python',
            theme: vscodeDark,
            lineNumbers: true
          }}
          height="50dvh"
          width="75vw"
        />
          <div className="w-[83%] h-[30%] bg-white flex-col flex justify-between items-start">
            <span className="h-[10%] w-[100%] bg-[#4d4c4c] text-white text-xl text-center">Result</span>
            <div className="h-[90%] w-[100%] flex justify-start items-start">
            <span className={` ${textColor} font-bold text-lg`}>{result}</span>
            </div>
          </div>
        <div className="flex justify-start items-center">
          <button className="py-2 px-7 hover:bg-[black] transition-colors duration-150 rounded-lg bg-[#1f1e1e] text-white" onClick={handleCompile}>Run</button>
        </div>
      </div>
    </div>
    
    </>
   
  );
}

export default App;
