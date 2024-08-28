import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from '../redux/resumeDataSlice';
import InputSection from './InputSection'

const Objective = () => {
  const dataStore = useSelector(state => state.dataStore);
  const objectiveData = useSelector(state => state.dataStore.objective) //this state is used to store personalInfo object of dataStoreSlice.
  const dispatch = useDispatch();



  return (
    <div className='detail'>

      <InputSection
        label="Section Title"
        placeholder="Enter section title"
        value={dataStore.objectiveSectionTitle}
        onChange={(value) => dispatch(updateState(
          {
            key: 'objectiveSectionTitle',
            value: value
          }
        ))}
      />

      <InputSection
        label="Objective"
        placeholder="Enter your objective/summary"
        value={objectiveData.objective || ""}
        onChange={(value) => dispatch(updateState({
          key: 'objective',
          value: value
        }))}
        // validation={{ required: true }}
      />
    </div>
  )
}

export default Objective