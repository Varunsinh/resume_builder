import React from 'react';
import { IoIosCloseCircle, IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { addArrayElement, removeArrayElement, updateSkills, updateState } from '../redux/resumeDataSlice';
import InputSection from './InputSection'

const SkillsSection = () => {
  const dataStore = useSelector(state => state.dataStore);
  const skillsData = useSelector(state => state.dataStore.skills);
  const dispatch = useDispatch();


  function AddSkill() {
    //this function is used to push a blank object {skillName:"",} in the skills element of dataStoreSlice,
    //when the user clicks on the Add-Skill button to add more related details//
    dispatch(addArrayElement({
      key: 'skills',
      element: { skillName: "", }
    })
    )
  }
  function RemoveSkill() {
    //this function deletes the latest saved details in the skills element, when the user clicks on the remove button.
    dispatch(removeArrayElement({ key: "skills" }))
  }

  return (
    <div className='detail'>
      <InputSection
        label="Section Title"
        placeholder="Enter section title"
        value={dataStore.skillsSectionTitle}
        onChange={(value) => dispatch(updateState(
          {
            key: 'skillsSectionTitle',
            value: value
          }
        ))}
        validation={{ required: true }}
      />
      {
        skillsData.map((skill, index) => {
          return (
            <div key={index}>
              <h5 className='bg-[#8910F1] text-white w-fit py-1 px-3 flex items-center rounded gap-x-2 cursor-pointer mb-3' onClick={RemoveSkill} >Skill {index + 1} <IoIosCloseCircle className='w-6 h-6 text-black' /></h5>
              <InputSection
                label=""
                placeholder="Enter skill eg. ReactJs"
                value={skillsData.skillName || ""}
                onChange={(value) => dispatch(updateSkills({
                  key: 'skillName',
                  value: value,
                  index: index
                }))}
              />
            </div>
          )
        })
      }

      <button
        className='bg-[#8910F1] text-white w-fit py-1 px-3 my-5 flex items-center rounded gap-x-2 cursor-pointer'
        onClick={AddSkill}
      >
        Add new <IoMdAddCircle className='w-6 h-6 text-black' />
      </button>
    </div>
  )
}

export default SkillsSection