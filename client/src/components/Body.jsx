import React, { useRef, useState } from "react";
import Builder from "./Builder";
import ResumePreview from "./ResumePreview";
import { BsFiletypePdf } from "react-icons/bs";
import { ReactToPrint } from 'react-to-print';

const Body = () => {
    const [colors, setColors] = useState('#000000');
    const resumeRef = useRef(null);

    const sections = {
        basicInfo: "Personal Info",
        summary: "Objective",
        workExp: "Experience",
        project: "Projects",
        education: "Education",
        skills: "Skills",
        certificates: "Certificates",
        other: "other"
    };


    const [activeColor, setActiveColor] = useState(colors[0]);


    const handleColorOnChange = (e) => {
        setColors(e.target.value);
        setActiveColor(e.target.value)
    }

    const handlePrint = () => useReactToPrint({
        content: () => resumeRef.current
    });


    return (
        <div className='p-7 flex justify-start items-center gap-7 pt-0 m-5'>


            <ReactToPrint
                trigger={() => {
                    return (
                        <button
                            className="py-2 px-4 my-5 rounded-md bg-[#8910F1] hover:bg-purple-700 text-white outline-none border-none font-medium text-base tracking-wide flex gap-1 items-center mx-auto cursor-pointer"
                            onClick={handlePrint}
                        >
                            Download PDF
                            <BsFiletypePdf className='w-5 h-5 bg-[#8910F1]' />
                        </button>
                    )
                }}
                content={() => resumeRef.current}
                pageStyle='print'
            />




            <div className='w-full flex flex-col justify-center items-center'>
                <Builder />

                {/* <div className='w-full flex gap-10 justify-between items-center'> */}
                <div className='flex items-center mt-20 py-0 px-7'>
                    <label className="font-semibold">Select Color:</label>
                    <input type="color"
                        value={colors}
                        onChange={handleColorOnChange}
                        className='border-none outline-none p-0 cursor-pointer'
                    />
                </div>

                <ResumePreview activeColor={activeColor} sections={sections} ref={resumeRef} />
            </div>
        </div>
        // </div>
    );
}

export default Body;
