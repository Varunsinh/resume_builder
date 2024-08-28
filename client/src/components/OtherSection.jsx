import { IoIosCloseCircle, IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { addArrayElement, removeArrayElement, updateErrorMessages, updateOther, updateState } from '../redux/resumeDataSlice'
import InputSection from './InputSection'
import TextareaSection from './TextareaSection'

const OtherSection = () => {
  const dataStore = useSelector(state => state.dataStore);
  const otherData = useSelector(state => state.dataStore.other);
  const dispatch = useDispatch();

  const onChangeHandler = (key, value, index, errorMessage = undefined) => {
    //this function is called each time when the user provides input to the targeted'TextField'
    dispatch(updateOther({
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



  function AddOther() {
    //this function is used to push a blank object in the workEx element of dataStoreSlice,
    //when the user clicks on the Add-new button to add more related details//
    dispatch(addArrayElement({
      key: 'other',
      element: {
        otherTitle: "",
        otherCertificate: "",
        otherInfo: "",
      },

    }))
  }
  function RemoveOther() {
    //this function deletes the latest saved details in the workEx element, when the user clicks on the remove button.
    dispatch(removeArrayElement({ key: "other" }))
    //after deletion of workEx element , the errors associated with it also removed.
    dispatch(updateErrorMessages({
      key: 'otherTitle',
      value: "",
      index: otherData.length - 1
    }))

    dispatch(updateErrorMessages({
      key: 'discription',
      value: "",
      index: otherData.length - 1
    }))
  }

  return (
    <div>

      <InputSection
        label="Section Title"
        placeholder="Enter section title"
        value={dataStore.otherSectionTitle}
        onChange={(value) => dispatch(updateState(
          {
            key: 'otherSectionTitle',
            value: value
          }
        ))}
      // validation={{ required: true }}
      />


      {
        otherData?.map((other, index) => {
          return (
            <div className='detail' key={index}>
              <h5 className='bg-[#8910F1] text-white w-fit py-1 px-3 flex items-center rounded gap-x-2 cursor-pointer my-2' onClick={RemoveOther}>{dataStore.otherSectionTitle} {index + 1} <IoIosCloseCircle className='w-6 h-6 text-black' /></h5>
              <div className='row'>
                <InputSection
                  label="Title"
                  placeholder={`Enter ${dataStore.otherSectionTitle.toLowerCase()} title`}
                  value={other.otherTitle || ""}
                  onChange={(value, errorMessage) => onChangeHandler('otherTitle', value, index, errorMessage)}
                />
              </div>
              <InputSection
                label="Certificate Link"
                placeholder={`enter ${dataStore.otherSectionTitle.toLowerCase()} certificate link`}
                value={other.otherCertificate || ""}
                onChange={(value, errorMessage) => onChangeHandler('otherCertificate', value, index, errorMessage)}
              />

              <div className='column'>
                <label>Enter description</label>
                <TextareaSection
                  value={other.otherInfo || ""}
                  placeholder={`enter ${dataStore.otherSectionTitle.toLowerCase()} discription`}
                  onChange={(value, errorMessage) => onChangeHandler('otherInfo', value, index, errorMessage)}
                // validation={{ required: true }}
                />
              </div>
            </div>
          )
        })
      }


      <button
        className='bg-[#8910F1] text-white w-fit py-1 px-3 flex items-center rounded gap-x-2 cursor-pointer my-5'
        onClick={AddOther}
      >
        Add new <IoMdAddCircle className='w-6 h-6 text-black' />
      </button>
    </div>
  )
}

export default OtherSection