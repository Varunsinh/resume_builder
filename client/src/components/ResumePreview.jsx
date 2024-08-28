import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
    AtSign,
    Calendar,
    GitHub,
    Linkedin,
    MapPin,
    Paperclip,
    Phone,
} from "react-feather";
import { IoGlobeOutline } from "react-icons/io5";
import { RiUserLocationFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const ResumePreview = forwardRef((props, ref) => {
    const dataStore = useSelector(state => state.dataStore);
    // console.log(dataStore);
    const containerRef = useRef();
    const sections = props.sections;

    const [columns, setColumns] = useState([[], []]);
    const [source, setSource] = useState("");
    const [target, seTarget] = useState("");

    const getFormattedDate = (value) => {
        if (!value) return "";
        const date = new Date(value);

        return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    };



    // State for drag-and-drop
    const [draggedSection, setDraggedSection] = useState(null);
    const [targetSection, setTargetSection] = useState(null);

    // Function to handle drag start
    const handleDragStart = (event, section) => {
        setDraggedSection(section);
        event.dataTransfer.effectAllowed = "move";
    };

    // Function to handle drag over
    const handleDragOver = (event, section) => {
        event.preventDefault();
        setTargetSection(section);
    };

    // Function to handle drop
    const handleDrop = () => {
        if (draggedSection !== targetSection) {
            // Swap the sections
            const newColumns = [...columns];
            const draggedSectionIndex = newColumns.flat().indexOf(draggedSection);
            const targetSectionIndex = newColumns.flat().indexOf(targetSection);

            newColumns.flat()[draggedSectionIndex] = targetSection;
            newColumns.flat()[targetSectionIndex] = draggedSection;

            setColumns(newColumns);
        }

        setDraggedSection(null);
        setTargetSection(null);
    };


    const sectionDiv = {
        [sections?.workExp]: (
            <div
                key={"workExp"}
                draggable
                onDragStart={(event) => handleDragStart(event, sections.workExp)}
                onDragOver={(event) => handleDragOver(event, sections.workExp)}
                onDrop={handleDrop}
                className={`section ${dataStore.workExpSectionTitle ? "" : 'hidden'
                    }`}
            >
                <div className='section-title'>{dataStore.workExpSectionTitle}</div>
                <div className='content'>
                    {dataStore?.workExp?.map((item, index) => (
                        <div className='item' key={index}>
                            {item.title ? (
                                <p className='title'>{item.title}</p>
                            ) : <span />}
                            <div className="flex justify-between">
                                {item.companyName ? (
                                    <p className='subtitle'>{item.companyName}</p>
                                ) : <span />}
                                {item.startDate && item.endDate ? (
                                    <div className='flex gap-1 items-center text-sm justify-end ml-24'>
                                        <Calendar className='w-3 h-3' /> {getFormattedDate(item.startDate)}{" "}-{" "}
                                        {getFormattedDate(item.endDate)}
                                    </div>
                                ) : <span />}
                            </div>
                            <div className="flex justify-between">
                                {item.certificationLink ? (
                                    <a className='link' href={item.certificationLink}>
                                        <Paperclip className='text-dynamic-color link-svg' />
                                        {item.certificationLink}
                                    </a>
                                ) : <span />}
                                {item.location ? (
                                    <p className='flex gap-1 items-center text-sm'>
                                        <MapPin className='w-3 h-3' /> {item.location}
                                    </p>
                                ) : <span />}
                            </div>
                            {item.jobInfo !== undefined ? (
                                <p className='flex gap-1 items-center text-sm'>
                                    {item.jobInfo}
                                </p>
                            ) : <span />}
                        </div>
                    ))}
                </div>
            </div>
        ),
        [sections?.project]: (
            <div
                key={"projects"}
                draggable
                onDragStart={(event) => handleDragStart(event, sections.project)}
                onDragOver={(event) => handleDragOver(event, sections.project)}
                onDrop={handleDrop}
                className={`section ${dataStore.projectsSectionTitle ? "" : 'hidden'
                    }`}
            >
                <div className='section-title'>{dataStore.projectsSectionTitle}</div>
                <div className='content'>
                    {dataStore.projects?.map((item, index) => (
                        <div className='item' key={index}>
                            <div className="flex items-center gap-x-2">
                                {item.title !== undefined && (
                                    <p className='title'>{item.title}</p>
                                )}
                                {item.tech ? (
                                    <p className='text-sm'>{`(${item.tech})`}</p>
                                ) : <span />}
                            </div>
                            {item.liveLink ? (
                                <a className='link' href={item.liveLink}>
                                    <IoGlobeOutline className='link-svg' /> {item?.liveLink}
                                </a>
                            ) : <span />}
                            {item.githubLink ? (
                                <a className='link' href={item.githubLink}>
                                    <GitHub className='link-svg' /> {item?.githubLink}
                                </a>
                            ) : <span />}
                            {item.projectDescription !== undefined && (
                                <div className="text-sm">
                                    {item.projectDescription}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ),
        [sections?.education]: (
            <div
                key={"education"}
                draggable
                onDragStart={(event) => handleDragStart(event, sections.education)}
                onDragOver={(event) => handleDragOver(event, sections.education)}
                onDrop={handleDrop}
                className={`section ${dataStore.educationSectionTitle ? "" : 'hidden'
                    }`}
            >
                <div className='section-title'>
                    {dataStore.educationSectionTitle}
                </div>
                <div className='content'>
                    {dataStore.education?.map((item, index) => (
                        <div className='item' key={index}>
                            <div className="flex items-center">
                                {item.title && (
                                    <p className='title text-dynamic-color'>{item.title}</p>
                                )}
                                {item.startDate && item.endDate && (
                                    <div className='date ml-64'>
                                        <Calendar className='date-svg' /> {getFormattedDate(item.startDate)} -
                                        {getFormattedDate(item.endDate)}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center">
                                {item.collegeName && (
                                    <p className='subtitle'>{item.collegeName}</p>
                                )}
                                {item.city && (
                                    <p className='flex gap-1 items-center text-sm ml-32'>
                                        <MapPin className='w-3 h-3' /> {item.city}
                                    </p>
                                )}
                            </div>
                            {item.eduDisc && (
                                <div className="points">
                                    {item.eduDisc}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ),
        [sections?.skills]: (
            <div
                key={"skills"}
                draggable
                onDragStart={(event) => handleDragStart(event, sections.skills)}
                onDragOver={(event) => handleDragOver(event, sections.skills)}
                onDrop={handleDrop}
                className={`section ${dataStore.skillsSectionTitle ? "" : 'hidden'
                    }`}
            >
                <div className='section-title'>
                    {dataStore.skillsSectionTitle}
                </div>
                <div className='content flex'>
                    {dataStore.skills?.map((item, index) => (
                        <div className='flex gap-x-2 flex-wrap' key={index}>
                            {item.skillName && (
                                <p className='border-[1px] border-black py-2 px-4 text-dynamic-color'>{item.skillName}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ),
        [sections?.certificates]: (
            <div
                key={"certificates"}
                draggable
                onDragStart={(event) => handleDragStart(event, sections.certificates)}
                onDragOver={(event) => handleDragOver(event, sections.certificates)}
                onDrop={handleDrop}
                className={`section ${dataStore.certificatesSectionTitle ? "" : 'hidden'
                    }`}
            >
                <div className='section-title'>
                    {dataStore.certificatesSectionTitle}
                </div>
                <div className='content'>
                    {dataStore.certificates?.length > 0 && (
                        dataStore.certificates?.map((item, index) => (
                            <div key={index}>
                                <h2 className="title">{item.title}</h2>
                                {
                                    item.certificateLink ? (
                                        <a className='link' href={item.certificateLink}>
                                            <Paperclip className='w-3 h-3 text-dynamic-color' />
                                            {item.certificateLink}
                                        </a>
                                    ) : <span />
                                }
                                <p className="text-sm">{item.discription}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        ),
        [sections?.summary]: (
            <div
                key={"summary"}
                draggable
                onDragStart={(event) => handleDragStart(event, sections.summary)}
                onDragOver={(event) => handleDragOver(event, sections.summary)}
                onDrop={handleDrop}
                className={`section ${dataStore.objectiveSectionTitle ? "" : 'hidden'
                    }`}
            >
                <div className='section-title'>{dataStore.objectiveSectionTitle}</div>
                <div className='content'>
                    <p className='overview'>{dataStore.objective}</p>
                </div>
            </div>
        ),
        [sections?.other]: (
            <div
                key={"other"}
                draggable
                onDragStart={(event) => handleDragStart(event, sections.other)}
                onDragOver={(event) => handleDragOver(event, sections.other)}
                onDrop={handleDrop}
                className={`section ${dataStore.otherSectionTitle ? "" : 'hidden'
                    }`}
            >
                <div className='section-title'>{dataStore.otherSectionTitle}</div>
                <div className='content'>
                    {dataStore.other?.length > 0 && (
                        dataStore.other?.map((item, index) => {
                            console.log(item)
                            return (
                                <div key={index}>
                                    <h2 className="title">{item?.otherTitle}</h2>
                                    {
                                        item.otherCertificate ? (
                                            <a className='link' href={item?.otherCertificate}>
                                                <Paperclip className='w-3 h-3 text-dynamic-color' />
                                                {item?.otherCertificate}
                                            </a>
                                        ) : <span />
                                    }
                                    <p className="text-sm">{item?.otherInfo}</p>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        ),
    };

    const swapSourceTarget = (source, target) => {
        if (!source || !target) return;
        const tempColumns = [[...columns[0]], [...columns[1]]];

        let sourceRowIndex = tempColumns[0].findIndex((item) => item === source);
        let sourceColumnIndex = 0;
        if (sourceRowIndex < 0) {
            sourceColumnIndex = 1;
            sourceRowIndex = tempColumns[1].findIndex((item) => item === source);
        }

        let targetRowIndex = tempColumns[0].findIndex((item) => item === target);
        let targetColumnIndex = 0;
        if (targetRowIndex < 0) {
            targetColumnIndex = 1;
            targetRowIndex = tempColumns[1].findIndex((item) => item === target);
        }

        const tempSource = tempColumns[sourceColumnIndex][sourceRowIndex];
        tempColumns[sourceColumnIndex][sourceRowIndex] =
            tempColumns[targetColumnIndex][targetRowIndex];

        tempColumns[targetColumnIndex][targetRowIndex] = tempSource;

        setColumns(tempColumns);
    };

    useEffect(() => {
        setColumns([
            [sections?.project, sections?.education, sections?.summary, sections?.other],
            [sections?.workExp, sections?.certificates, sections?.skills],
        ]);
    }, []);

    useEffect(() => {
        swapSourceTarget(source, target);
    }, [source]);

    useEffect(() => {
        const container = containerRef.current;
        if (!props.activeColor || !container) return;

        container.style.setProperty("--color", props.activeColor);
    }, [props.activeColor]);

    return (
        <div ref={ref}>
            <div ref={containerRef} className='min-w-[700px] max-w-[850px] bg-white mx-auto flex-[1.2] h-fit min-h-[900px] shadow-light flex flex-col gap-7 p-7 m-10'>
                <div className='flex flex-col'>
                    <p className='text-4xl font-medium capitalize'>{dataStore?.personalInfo?.name}</p>
                    <p className='text-dynamic-color font-medium text-lg'>{dataStore?.personalInfo?.title}</p>

                    <div className='mt-4 flex gap-7 flex-wrap gap-y-2'>
                        {dataStore?.personalInfo?.email && (
                            <a className='link' type="email" href={`mailto: ${dataStore.personalInfo.email}`}>
                                <AtSign className='link-svg' /> {dataStore.personalInfo.email}
                            </a>
                        )}
                        {dataStore?.personalInfo?.phone && (
                            <a className='link'>
                                <Phone className='link-svg' /> {dataStore?.personalInfo?.phone}
                            </a>
                        )}
                        {dataStore?.personalInfo?.linkedin && (
                            <a className='link'>
                                <Linkedin className='link-svg' /> {dataStore?.personalInfo?.linkedin}
                            </a>
                        )}
                        {dataStore?.personalInfo?.github && (
                            <a className='link'>
                                <GitHub className='link-svg' /> {dataStore?.personalInfo?.github}
                            </a>
                        )}
                        {dataStore?.personalInfo?.portfolio && (
                            <a className='link'>
                                <IoGlobeOutline className='link-svg' /> {dataStore?.personalInfo?.portfolio}
                            </a>
                        )}
                        {dataStore?.personalInfo?.city && dataStore?.personalInfo?.state && (
                            <p className='link'>
                                <RiUserLocationFill className='link-svg' />
                                {dataStore.personalInfo.city} {" "}
                                {dataStore.personalInfo.state}
                            </p>
                        )}
                    </div>
                </div>

                <div className='flex gap-7' onDrop={handleDrop}>
                    <div className='flex-[1.3] flex flex-col gap-5'>
                        {columns[0].map((item) => sectionDiv[item])}
                    </div>
                    <div className='flex flex-col flex-1 gap-5'>
                        {columns[1].map((item) => sectionDiv[item])}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ResumePreview;
