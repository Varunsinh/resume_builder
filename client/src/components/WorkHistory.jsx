import React from 'react';
import { IoIosCloseCircle, IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { addArrayElement, removeArrayElement, updateErrorMessages, updateState, updateWorkExp } from '../redux/resumeDataSlice';
import InputSection from './InputSection';
import TextareaSection from './TextareaSection';

const WorkHistory = () => {
    const dataStore = useSelector(state => state.dataStore); //this state is used to store workEx object of dataStoreSlice.
    const workExpData = useSelector(state => state.dataStore.workExp) //this state is used to store workEx object of dataStoreSlice.
    const dispatch = useDispatch();

    const onChangeHandler = (key, value, index, errorMessage = undefined) => {
        //this function is called each time when the user provides input to the targeted'TextField'
        dispatch(updateWorkExp({
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

    function AddWorkExp() {
        //this function is used to push a blank object in the workEx element of dataStoreSlice,
        //when the user clicks on the Add-new button to add more related details//
        dispatch(addArrayElement({
            key: 'workExp',
            element: {
                title: "",
                companyName: "",
                certificateLink: "",
                location: "",
                startDate: "",
                endDate: "",
                jobInfo: "",
            },

        }))
    }
    function RemoveWorkExp() {
        //this function deletes the latest saved details in the workEx element, when the user clicks on the remove button.
        dispatch(removeArrayElement({ key: "workExp" }))
        //after deletion of workExp element , the errors associated with it also removed.
        dispatch(updateErrorMessages({
            key: 'title',
            value: " ",
            index: workExpData.length - 1
        }))

        dispatch(updateErrorMessages({
            key: 'companyName',
            value: " ",
            index: workExpData.length - 1
        }))
    }

    return (
        <>
            {
                workExpData?.map((workExp, index) => {
                    return (
                        <div className='detail' key={index}>

                            <InputSection
                                label="Section Title"
                                placeholder="Enter section title"
                                value={dataStore.workExpSectionTitle}
                                onChange={(value) => dispatch(updateState(
                                    {
                                        key: 'workExpSectionTitle',
                                        value: value
                                    }
                                ))}
                            />

                            <h5 className='bg-[#8910F1] text-white w-fit py-1 px-3 flex items-center rounded gap-x-2 cursor-pointer' onClick={RemoveWorkExp} >Experience {index + 1} <IoIosCloseCircle className='w-6 h-6 text-black' /></h5>
                            <div className='row'>
                                <InputSection
                                    label="Title"
                                    placeholder="Enter title eg. Frontend developer"
                                    value={workExp.title || ""}
                                    //this function calls back onChangeHandler which will update targeted key of 'WorkExp' and 'errorMessages' in resumeDataSlice as per the value and errorMessage respectively.
                                    onChange={(value, errorMessage) => onChangeHandler('title', value, index, errorMessage)}
                                    // validation={{ required: true }}
                                />
                                <InputSection
                                    label="Company Name"
                                    placeholder="Enter company name eg. zidio development"
                                    value={workExp.companyName || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('companyName', value, index, errorMessage)}
                                    // validation={{ required: true }}
                                />
                            </div>
                            <div className='row'>
                                <InputSection
                                    label="Certificate Link"
                                    placeholder="Enter certificate link"
                                    value={workExp.certificationLink || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('certificationLink', value, index, errorMessage)}
                                    // validation={{ required: true }}
                                />
                                <InputSection
                                    label="Location"
                                    placeholder="Enter location eg. Remote"
                                    value={workExp.location || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('location', value, index, errorMessage)}
                                    // validation={{ required: true }}
                                />
                            </div>
                            <div className='row'>
                                <InputSection
                                    label="Start Date"
                                    type="date"
                                    placeholder="Enter start date of work"
                                    value={workExp.startDate || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('startDate', value, index, errorMessage)}
                                    // validation={{ required: true }}
                                />
                                <InputSection
                                    label="End Date"
                                    type="date"
                                    placeholder="Enter end date of work"
                                    value={workExp.endDate || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('endDate', value, index, errorMessage)}
                                    // validation={{ required: true }}
                                />
                            </div>

                            <div className='column'>
                                <label>Enter Work Description</label>
                                <TextareaSection
                                    placeholder='describe your work'
                                    value={workExp.jobInfo || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('jobInfo', value, index, errorMessage)}
                                    // validation={{ required: true }}
                                />
                            </div>
                        </div>
                    )
                }

                )}

            <button
                className='bg-[#8910F1] text-white w-fit py-1 px-3 my-5 flex items-center rounded gap-x-2 cursor-pointer'
                onClick={AddWorkExp}
            >
                Add new <IoMdAddCircle className='w-6 h-6 text-black' />
            </button>
        </>
    )
}

export default WorkHistory