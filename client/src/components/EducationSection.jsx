import React from 'react';
import { IoIosCloseCircle, IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { addArrayElement, removeArrayElement, updateEducation, updateErrorMessages, updateState } from '../redux/resumeDataSlice';
import InputSection from './InputSection'
import TextareaSection from './TextareaSection';

const EducationSection = () => {
    const dataStore = useSelector(state => state.dataStore);
    const educationData = useSelector(state => state.dataStore.education);
    const dispatch = useDispatch();

    const onChangeHandler = (key, value, index, errorMessage = undefined) => {
        //this function is called each time when the user provides input to the targeted'TextField'
        dispatch(updateEducation({
            //this function updates the targeted key of the workEx element of dataStore in dataStoreSlice.js //
            key: key,
            value: value,
            index: index,
        }))
        if (errorMessage !== undefined) {
            dispatch(updateErrorMessages({
                // this function is called each time when there is a validation check applied on the 'TextField' component and it inserts án object {key: errorMessage} into the errorMessages of dataStoreSlice.
                key: key,
                value: errorMessage,
                index: index
            }))
        }
    }


    function AddEducation() {
        //this function is used to push a blank object in the workEx element of dataStoreSlice,
        //when the user clicks on the Add-new button to add more related details//
        dispatch(addArrayElement({
            key: 'education',
            element: {
                title: "",
                collegeName: "",
                city: "",
                startDate: "",
                endDate: "",
                eduDisc: "",
            },

        }))
    }

    function RemoveEducation() {
        //this function deletes the latest saved details in the workEx element, when the user clicks on the remove button.
        dispatch(removeArrayElement({ key: "education" }))
        //after deletion of workEx element , the errors associated with it also removed.
        dispatch(updateErrorMessages({
            key: 'title',
            value: "",
            index: educationData.length - 1
        }))

        dispatch(updateErrorMessages({
            key: 'collegeName',
            value: "",
            index: educationData.length - 1
        }))
    }

    return (
        <>
            {
                educationData.map((education, index) => {
                    return (
                        <div className='detail' key={index}>

                            <InputSection
                                label="Section Title"
                                placeholder="Enter section title"
                                value={dataStore.educationSectionTitle}
                                onChange={(value) => dispatch(updateState(
                                    {
                                        key: 'educationSectionTitle',
                                        value: value
                                    }
                                ))}
                                validation={{ required: true }}
                            />

                            <h5 className='bg-[#8910F1] text-white w-fit py-1 px-3 flex items-center rounded gap-x-2 cursor-pointer' onClick={RemoveEducation} >Education {index + 1} <IoIosCloseCircle className='w-6 h-6 text-black' /></h5>
                            <div className='row'>
                                <InputSection
                                    label="Title"
                                    placeholder="Enter title eg. BCA"
                                    value={education.title || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('title', value, index, errorMessage)}
                                    validation={{ required: true }}
                                />
                            </div>
                            <InputSection
                                label="College/School Name"
                                placeholder="Enter name of your college/school"
                                value={education.collegeName || ""}
                                onChange={(value, errorMessage) => onChangeHandler('collegeName', value, index, errorMessage)}
                                validation={{ required: true }}
                            />
                            <div className='row'>
                                <InputSection
                                    label="City"
                                    placeholder="Enter college city"
                                    value={education.city || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('city', value, index, errorMessage)}
                                    validation={{ required: true }}
                                />
                                <InputSection
                                    label="Start Year"
                                    type='date'
                                    placeholder="Enter start year of this education"
                                    value={education.startDate || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('startDate', value, index, errorMessage)}
                                    validation={{ required: true }}
                                />
                                <InputSection
                                    label="End Year"
                                    type='date'
                                    placeholder="Enter end year of this education"
                                    value={education.endDate || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('endDate', value, index, errorMessage)}
                                    validation={{ required: true }}
                                />
                            </div>
                            <div className='column'>
                                <label>Enter education description</label>
                                <TextareaSection
                                    placeholder='describe your education'
                                    value={education.eduDisc || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('eduDisc', value, index, errorMessage)}
                                />
                            </div>
                        </div>
                    )
                })
            }
            <button
                className='bg-[#8910F1] text-white w-fit py-1 px-3 my-5 flex items-center rounded gap-x-2 cursor-pointer'
                onClick={AddEducation}
            >
                Add new <IoMdAddCircle className='w-6 h-6 text-black' />
            </button>
        </>
    )
}

export default EducationSection