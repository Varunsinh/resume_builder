import React from 'react';
import { IoIosCloseCircle, IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { addArrayElement, removeArrayElement, updateErrorMessages, updateProjects, updateState } from '../redux/resumeDataSlice'
import InputSection from './InputSection'
import TextareaSection from './TextareaSection'

const ProjectsSection = () => {
    const dataStore = useSelector(state => state.dataStore);
    const projectsData = useSelector(state => state.dataStore.projects);
    const dispatch = useDispatch();

    const onChangeHandler = (key, value, index, errorMessage = undefined) => {
        //this function is called each time when the user provides input to the targeted'TextField'
        dispatch(updateProjects({
            //this function updates the targeted key of education element of dataStore in dataStoreSlice.js //
            key: key,
            value: value,
            index: index,
        }))
        if (errorMessage !== undefined) {
            dispatch(updateErrorMessages({
                // this function is called each time when there is a validation check applied on the 'TextField' component and it inserts án object {key: errorMessage} into the errorMessages of dataStoreSlice.
                key: key,
                value: errorMessage,
                index: index,
            }))
        }
    }



    function AddProject() {
        //this function is used to push a blank object in the workEx element of dataStoreSlice,
        //when the user clicks on the Add-new button to add more related details//
        dispatch(addArrayElement({
            key: 'projects',
            element: {
                title: "",
                tech: "",
                liveLink: "",
                githubLink: "",
                projectDescription: "",
            },

        }))
    }
    function RemoveProject() {
        //this function deletes the latest saved details in the workEx element, when the user clicks on the remove button.
        dispatch(removeArrayElement({ key: "projects" }))
        //after deletion of workEx element , the errors associated with it also removed.
        dispatch(updateErrorMessages({
            key: 'title',
            value: "",
            index: projectsData.length - 1
        }))

        dispatch(updateErrorMessages({
            key: 'orgName',
            value: "",
            index: projectsData.length - 1
        }))
    }

    return (
        <>
            {
                projectsData.map((project, index) => {
                    return (
                        <div className='detail' key={index}>

                            <InputSection
                                label="Section Title"
                                placeholder="Enter section title"
                                value={dataStore.projectsSectionTitle}
                                onChange={(value) => dispatch(updateState(
                                    {
                                        key: 'projectsSectionTitle',
                                        value: value
                                    }
                                ))}
                                // validation={{ required: true }}
                            />

                            <h5 className='bg-[#8910F1] text-white w-fit py-1 px-3 flex items-center rounded gap-x-2 cursor-pointer' onClick={RemoveProject} >Project {index + 1} <IoIosCloseCircle className='w-6 h-6 text-black' /></h5>
                            <div className='row'>
                                <InputSection
                                    label="Title"
                                    placeholder="Enter title eg. Chat app"
                                    value={project.title || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('title', value, index, errorMessage)}
                                />
                            </div>
                            <InputSection
                                label="Tech"
                                placeholder="Enter used technologies eg.ReactJs, NodeJs"
                                value={project.tech || ""}
                                onChange={(value, errorMessage) => onChangeHandler('tech', value, index, errorMessage)}
                            />
                            <div className='row'>
                                <InputSection
                                    label="Deployed Link"
                                    placeholder="Enter deployed link of project"
                                    value={project.liveLink || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('liveLink', value, index, errorMessage)}
                                />
                                <InputSection
                                    label="Github Link"
                                    placeholder="Enter github link of project"
                                    value={project.githubLink || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('githubLink', value, index, errorMessage)}
                                />
                            </div>
                            <div className='column'>
                                <label>Enter project description</label>
                                <TextareaSection
                                    value={project.projectDescription  || ""}
                                    placeholder='enter your project discription'
                                    onChange={(value, errorMessage) => onChangeHandler('projectDescription', value, index, errorMessage)}
                                    // validation={{ required: true }}
                                />
                            </div>
                        </div>
                    )
                })
            }


            <button
                className='bg-[#8910F1] text-white w-fit py-1 px-3 flex items-center rounded gap-x-2 cursor-pointer my-5'
                onClick={AddProject}
            >
                Add new <IoMdAddCircle className='w-6 h-6 text-black' />
            </button>
        </>
    )
}

export default ProjectsSection