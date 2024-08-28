import React from 'react';
import { IoIosCloseCircle, IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { addArrayElement, removeArrayElement, updateCertificates, updateErrorMessages, updateState } from '../redux/resumeDataSlice';
import InputSection from './InputSection';

const Certificates = () => {
    const dataStore = useSelector(state => state.dataStore);
    const certificatesData = useSelector(state => state.dataStore.certificates);
    const dispatch = useDispatch();

    const onChangeHandler = (key, value, index, errorMessage = undefined) => {
        //this function is called each time when the user provides input to the targeted'inputSection'
        dispatch(updateCertificates({
            //this function updates the targeted key of the inputSection element of dataStore in resumeDataSlice.js //
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

    function AddCertificate() {
        //this function is used to push a blank object in the workEx element of dataStoreSlice,
        //when the user clicks on the Add-new button to add more related details//
        dispatch(addArrayElement({
            key: 'certificates',
            element: {
                title: "",
                certificateLink: "",
                discription: "",
            },

        }))
    }
    function RemoveCertificate() {
        //this function deletes the latest saved details in the certificate element, when the user clicks on the remove button.
        dispatch(removeArrayElement({ key: "certificates" }))
        //after deletion of certificate element , the errors associated with it also removed.
        dispatch(updateErrorMessages({
            key: 'title',
            value: "",
            index: certificatesData.length - 1
        }))

        dispatch(updateErrorMessages({
            key: 'certificateLink',
            value: "",
            index: certificatesData.length - 1
        }))
    }

    return (
        <div className='detail'>
            <InputSection
                label="Section Title"
                placeholder="Enter section title"
                value={dataStore.certificatesSectionTitle}
                onChange={(value) => dispatch(updateState(
                  {
                    key: 'certificatesSectionTitle',
                    value: value
                  }
                ))}
                validation={{ required: true }}
              />
            <h2 className='text-lg font-medium'>List your Certificates</h2>
            {
                certificatesData.map((item, index) => {
                    return (
                        <div key={index} className='flex flex-col gap-4'>
                            <h5 className='bg-[#8910F1] text-white w-fit py-1 px-3 flex items-center rounded gap-x-2 cursor-pointer' onClick={RemoveCertificate} >Certificate {index + 1} <IoIosCloseCircle className='w-6 h-6 text-black' /></h5>
                            <div className='row'>
                                <InputSection
                                    label='Certificate title'
                                    placeholder="describe your certificates"
                                    value={item.title || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('title', value, index, errorMessage)}
                                />
                                <InputSection
                                    label='Certificate link'
                                    placeholder="describe your certificates"
                                    value={item.certificateLink || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('certificateLink', value, index, errorMessage)}
                                />
                            </div>
                            <div className='row'>
                                <InputSection
                                    label='Certificate discription'
                                    placeholder="describe your certificates"
                                    value={item.discription || ""}
                                    onChange={(value, errorMessage) => onChangeHandler('discription', value, index, errorMessage)}
                                />
                            </div>
                        </div>
                    )
                })
            }

            <button
                className='bg-[#8910F1] text-white w-fit py-1 px-3 my-5 flex items-center rounded gap-x-2 cursor-pointer'
                onClick={AddCertificate}
            >
                Add new <IoMdAddCircle className='w-6 h-6 text-black' />
            </button>

        </div >
    );
}

export default Certificates