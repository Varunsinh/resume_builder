import { useSelector, useDispatch } from 'react-redux';
import { updateErrorMessages, updatePersonalInfo, updateState } from '../redux/resumeDataSlice';
import InputSection from './InputSection';


const PersonalInfo = () => {
    const dataStore = useSelector(state => state.dataStore);
    const personalInfoData = useSelector(state => state.dataStore.personalInfo); //this state is used to store personalInfo object of dataStoreSlice.
    const dispatch = useDispatch();

    const onChangeHandler = (key, value, errorMessage = undefined) => {
        //this function is called each time when the user provides input to the targeted'InputSection'
        dispatch(updatePersonalInfo({
            //this function updates the targeted key of the personalInfo element of dataStore in resumeDataSlice.js //
            key: key,
            value: value
        }))
        if (errorMessage !== undefined) {
            // this function is called each time when there is a validation check applied on the 'InputSection' component and it inserts án object {key: errorMessage} into the errorMessages of resumeDataSlice.
            dispatch(updateErrorMessages({
                key: key,
                value: errorMessage
            }))
        }
    }

    return (
        <div className='detail'>
            <InputSection
                label="Section Title"
                placeholder="Enter section title"
                value={dataStore.personalInfoSectionTitle}
                onChange={(value) => dispatch(updateState(
                    {
                        key: 'personalInfoSectionTitle',
                        value: value
                    }
                ))}
                validation={{ required: true }}
            />

            <div className='row'>
                <InputSection
                    label="Name"
                    placeholder="Enter your full name eg. Rahul"
                    value={personalInfoData.name || ""}
                    onChange={(value, errorMessage) => onChangeHandler('name', value, errorMessage)}
                    validation={{ required: true }} //this attribute is used to check whether there is any validation check on the 'InputSection' or not.
                />
                <InputSection
                    label="Title"
                    value={personalInfoData.title || ""}
                    placeholder="Enter your title eg. Frontend developer"
                    onChange={(value, errorMessage) => onChangeHandler('title', value, errorMessage)}
                    validation={{ required: true }}
                />
            </div>
            <div className='row flex-wrap gap-y-5'>
                <InputSection
                    label="Linkedin Link"
                    value={personalInfoData.linkedin || ""}
                    placeholder="Enter your linkedin profile link"
                    onChange={(value, errorMessage) => onChangeHandler('linkedin', value, errorMessage)}
                // validation={{ required: true }} 
                />
                <InputSection
                    label="Github Link"
                    value={personalInfoData.github || ""}
                    placeholder="Enter your github profile link"
                    onChange={(value, errorMessage) => onChangeHandler('github', value, errorMessage)}
                // validation={{ required: true }} 
                />
                <InputSection
                    label="Portfolio Link"
                    value={personalInfoData.portfolio || ""}
                    placeholder="Enter your  portfolio link"
                    onChange={(value, errorMessage) => onChangeHandler('portfolio', value, errorMessage)}
                // validation={{ required: true }} 
                />
            </div>
            <div className='row'>
                <InputSection
                    label="Email"
                    value={personalInfoData.email || ""}
                    placeholder="Enter your email"
                    onChange={(value, errorMessage) => onChangeHandler('email', value, errorMessage)}
                    validation={{ required: true }}
                />
                <InputSection
                    label="Enter phone"
                    value={personalInfoData.phone || ""}
                    placeholder="Enter your phone number"
                    onChange={(value, errorMessage) => onChangeHandler('phone', value, errorMessage)}
                    validation={{ required: true }}
                />
            </div>
            <div className='row'>
                <InputSection
                    label="City"
                    value={personalInfoData.city || ""}
                    placeholder="Enter your city"
                    onChange={(value, errorMessage) => onChangeHandler('city', value, errorMessage)}
                />
                <InputSection
                    label="State"
                    value={personalInfoData.state || ""}
                    placeholder="Enter your state"
                    onChange={(value, errorMessage) => onChangeHandler('state', value, errorMessage)}
                />
            </div>
        </div>
    )
}

export default PersonalInfo