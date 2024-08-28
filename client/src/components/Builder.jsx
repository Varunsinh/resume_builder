import React, { useState } from "react";
import { PiUserListFill } from "react-icons/pi";
import { IoIosSchool, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineWork } from "react-icons/md";
import { RiProjectorFill } from "react-icons/ri";
import { LiaCertificateSolid } from "react-icons/lia";
import { GiAchievement } from "react-icons/gi";
import { LuGoal } from "react-icons/lu";
import PersonalInfo from "./PersonalInfo";
import WorkHistory from "./WorkHistory";
import ProjectsSection from "./ProjectsSection";
import EducationSection from "./EducationSection";
import Objective from "./Objective";
import SkillsSection from "./SkillsSection";
import Certificates from "./Certificates";
import { updateState } from "../redux/resumeDataSlice";
import { useDispatch, useSelector } from "react-redux";
import OtherSection from "./OtherSection";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook from react-router-dom

function Builder() {
    const errorMessages = useSelector(state => state.dataStore.errorMessages);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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


    const [savedSections, setSavedSections] = useState([]);

    const icons = [
        <PiUserListFill />,
        <MdOutlineWork />,
        <RiProjectorFill />,
        <GiAchievement />,
        <IoIosSchool />,
        <LuGoal />,
        <LiaCertificateSolid />
    ];

    const [activeSectionKey, setActiveSectionKey] = useState(
        Object.keys(sections)[0]
    );

    const generateBody = () => {
        switch (sections[activeSectionKey]) {
            case sections.basicInfo:
                return <PersonalInfo />;
            case sections.workExp:
                return <WorkHistory />;
            case sections.project:
                return <ProjectsSection />;
            case sections.education:
                return <EducationSection />;
            case sections.certificates:
                return <Certificates />;
            case sections.summary:
                return <Objective />;
            case sections.skills:
                return <SkillsSection />;
            case sections.other:
                return <OtherSection />;
            default:
                return null;
        }
    };

    let isFormValid = true
    //this 'for loop' checks whether there is any error Message in the errorMessages or not and if it finds any ,it will return the value of 'isFormValid' as 'false' otherwise it will not show any warning message.//
    for (let key in errorMessages) {
        if (errorMessages[key] !== "") {
            isFormValid = false
            break
        }
    }


    const handleSubmission = () => {
        const sectionKeys = Object.keys(sections);
        const currentIndex = sectionKeys.indexOf(activeSectionKey);
        if (currentIndex < sectionKeys.length - 1) {
            const nextSectionKey = sectionKeys[currentIndex + 1];
            if (isFormValid) {
                setActiveSectionKey(nextSectionKey);
                setSavedSections([...savedSections, activeSectionKey]);
                dispatch(updateState({
                    key: 'showErrorMessages',
                    value: false
                }));
            } else {
                setSavedSections([...savedSections, activeSectionKey]);
                dispatch(updateState({
                    key: 'showErrorMessages',
                    value: true
                }));
            }
        } else if (currentIndex === sectionKeys.length - 1) {
            // Handle the case when the current section is the last section
            if (isFormValid) {
                setSavedSections([...savedSections, activeSectionKey]);
                dispatch(updateState({
                    key: 'showErrorMessages',
                    value: false
                }));
                // Redirect to the DownloadPage component
                navigate('/download');
            } else {
                setSavedSections([...savedSections, activeSectionKey]);
                dispatch(updateState({
                    key: 'showErrorMessages',
                    value: true
                }));
            }
        }
    };

    const handleBack = () => {
        const sectionKeys = Object.keys(sections);
        console.log('sectionKeys', sectionKeys);
        const currentIndex = sectionKeys.indexOf(activeSectionKey);
        console.log('currentIndex', currentIndex)
        if (currentIndex > -1) {
            const previousSectionKey = sectionKeys[currentIndex - 1];
            console.log('previousSectionKey=>', previousSectionKey);
            setActiveSectionKey(previousSectionKey);
        }
    };




    return (
        <div className='flex items-center gap-x-3 w-full'>
            <div className="grid grid-cols-12 gap-x-5 mx-auto">

                <div className='col-span-3 h-auto flex flex-col gap-y-6 bg-white  overflow-x-auto shadow-light header p-5 rounded-lg'>
                    {Object.keys(sections)?.map((key, i) => (
                        <div
                            className={`p-3 flex items-center justify-center font-medium text-base whitespace-nowrap cursor-pointer w-full border gap-y-5  shadow-light 
                            ${activeSectionKey === key ? 'text-[#8910F1] border-[#8910F1]' : ""} 
                            section 
                            ${savedSections.includes(key) ? "bg-[#8910f1] text-white " : ""}
                            `}
                            key={key}
                        >
                            <span className="w-6 h-6 mt-2 bg-transparent">{icons[i]}</span>
                            {sections[key]}
                        </div>
                    ))}
                </div>

                <div className='col-span-9 h-auto p-5 flex flex-col gap-5 shadow-light rounded-lg bg-white'>

                    <div className="min-h-auto flex flex-col flex-1">
                        {generateBody()}
                    </div>

                    <div className="flex items-center justify-between">
                        <button onClick={handleBack}>
                            <IoIosArrowBack className="w-5 h-5" />
                        </button>
                        <button
                            className="flex items-center w-fit py-2 px-4 rounded-md bg-[#8910F1] text-white outline-none border-none font-medium text-base tracking-wide  gap-1  cursor-pointer transition duration-200 active:transform active:translate-y-[2px]"
                            onClick={handleSubmission}
                        >
                            Next session <IoIosArrowForward />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Builder;
