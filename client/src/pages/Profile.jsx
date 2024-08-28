import { useDispatch, useSelector } from 'react-redux';
import { updateErrorMessages, updateProfileInfo, updateState } from '../redux/resumeDataSlice';
import InputSection from '../components/InputSection';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Profile = () => {
  const profileData = useSelector(state => state.dataStore.profile);
  const errorMessages = useSelector(state => state.dataStore.errorMessages)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandler = (key, value, errorMessage = undefined) => {
    //this function is called each time when the user provides input to the targeted'InputSection'
    dispatch(updateProfileInfo({
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

  let isFormValid = true
  //this 'for loop' checks whether there is any error Message in the errorMessages or not and if it finds any ,it will return the value of 'isFormValid' as 'false' otherwise it will not show any warning message.//
  for (let key in errorMessages) {
    if (errorMessages[key] !== "") {
      isFormValid = false
      break
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //this function stops the users from navigating to different page by accessing sideNavbar if they hadn't filled the details of existing page correctly//
    //if 'isFormValid' is true i.e when there is no messages in the 'errorMessages' then user can navigate to other page ,otherwise it will show alert and warningMessages on the screen// 
    if (!isFormValid) {
      toast.error('Please fill all the necessary details correctly!') //this alert is shown on the window when the 'isFormValid' is false.
      dispatch(updateState({    //this dispatch functions update the value of 'showErrorMessages' as true, which will be used by 'TextField' component to display warning Message beneath each of the 'TextField' where some kind of validation is required.
        key: 'showErrorMessages',
        value: true
      }))
    }
    else if (isFormValid) {
      dispatch(updateState({
        key: 'showErrorMessages',
        value: false
      }))
      navigate('/profile-card');
    }
  }




  return (
    <div className="max-w-md mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className='detail my-5'>
          <div className='flex flex-col gap-y-5'>
            <InputSection
              label="Name"
              placeholder="Enter your full name eg. Rahul"
              value={profileData.name}
              onChange={(value, errorMessage) => onChangeHandler('name', value, errorMessage)}
              validation={{ required: true }} //this attribute is used to check whether there is any validation check on the 'InputSection' or not.
            />
            <InputSection
              label="Title"
              value={profileData.title}
              placeholder="Enter your title eg. Frontend developer"
              onChange={(value, errorMessage) => onChangeHandler('title', value, errorMessage)}
              validation={{ required: true }}
            />
            <InputSection
              label="Linkedin Link"
              value={profileData.linkedin}
              placeholder="Enter your linkedin profile link"
              onChange={(value, errorMessage) => onChangeHandler('linkedin', value, errorMessage)}
            validation={{ required: true }} 
            />
            <InputSection
              label="Github Link"
              value={profileData.github}
              placeholder="Enter your github profile link"
              onChange={(value, errorMessage) => onChangeHandler('github', value, errorMessage)}
            validation={{ required: true }} 
            />
            <InputSection
              label="Portfolio Link"
              value={profileData.portfolio}
              placeholder="Enter your  portfolio link"
              onChange={(value, errorMessage) => onChangeHandler('portfolio', value, errorMessage)}
            // validation={{ required: true }} 
            />
            <InputSection
              label="Email"
              value={profileData.email}
              placeholder="Enter your email"
              onChange={(value, errorMessage) => onChangeHandler('email', value, errorMessage)}
              validation={{ required: true }}
            />
            <InputSection
              label="Enter phone"
              value={profileData.phone}
              placeholder="Enter your phone number"
              onChange={(value, errorMessage) => onChangeHandler('phone', value, errorMessage)}
              validation={{ required: true }}
            />
            <InputSection
              label="City"
              value={profileData.city}
              placeholder="Enter your city"
              onChange={(value, errorMessage) => onChangeHandler('city', value, errorMessage)}
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update Profile
        </button>
      </form>

    </div>
  );
};

export default Profile;