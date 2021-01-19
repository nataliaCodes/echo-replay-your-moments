import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {

    setMode(mode);

    //either replace the last element of histroy or append to it - used by the back() function
    setHistory(prev =>
      replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]
    );
  };

  const back = () => {

    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory((prev) => [...prev].slice(0, history.length - 1));
    }
  };

  return { mode, transition, back }
}