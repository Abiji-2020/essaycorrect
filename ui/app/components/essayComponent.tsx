import {useState, useEffect, ChangeEvent} from "react";


interface EssayComponenetProps{
    onSubmitEssay: (essay: string) => void;
    onRealTimeFeedback:(essay: string)=>void;
}

const EssayComponent :React.FC<EssayComponenetProps> = ({onSubmitEssay, onRealTimeFeedback})=>{
    const [essay, setEssay] = useState<string>("");
    const [timer, setTimer] = useState<NodeJS.Timeout | null >(null);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEssay(e.target.value);
        if(timer) clearTimeout(timer);

        const newTimer = setTimeout(()=>{
            onSubmitEssay(essay);
        },5000);

        setTimer(newTimer);
        onRealTimeFeedback(e.target.value);
    }
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-semibold mb-4">Write Your Essay</h2>
          <textarea
            value={essay}
            onChange={handleChange}
            rows={10}
            cols={50}
            placeholder="Type your essay here..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      );
}

export default EssayComponent;