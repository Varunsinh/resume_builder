import { createSlice } from "@reduxjs/toolkit";

export const resumeDataSlice = createSlice({
  name: "dataStore",
  initialState: {
    profile: {
      title: "",
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      portfolio: "",
      city: "",
    },
    personalInfo: {
      title: "",
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      portfolio: "",
      city: "",
      state: "",
    },
    workExp: [
      {
        title: "",
        companyName: "",
        certificateLink: "",
        location: "",
        startDate: "",
        endDate: "",
        jobInfo: "",
      },
    ],
    projects: [
      {
        title: "",
        tech: "",
        liveLink: "",
        githubLink: "",
        projectDescription: "",
      },
    ],
    education: [
      {
        title: "",
        collegeName: "",
        city: "",
        startDate: "",
        endDate: "",
        eduDisc: "",
      },
    ],
    skills: [
      {
        skillName: "",
      },
    ],
    certificates: [
      {
        title: "",
        certificateLink: "",
        discription: "",
      },
    ],
    other:[
      {
        otherTitle: "",
        otherCertificate: "",
        otherInfo:"",
      },
    ],
    objective: " ",
    personalInfoSectionTitle: "Personal Info",
    objectiveSectionTitle: "Objective",
    workExpSectionTitle: "Work Experience",
    projectsSectionTitle: "Projects",
    educationSectionTitle: "Education",
    skillsSectionTitle: "Skills",
    certificatesSectionTitle: "Certificates",
    otherSectionTitle: "course",
    selectedTemplate: "",
    imageFile: null,
    errorMessages: {},
    showErrorMessages: false,
  },

  reducers: {
    updateProfileInfo: (state, action) => {
      //this function updates the targeted key of the personalInfo element of dataStore //
      state.profile[action.payload.key] = action.payload.value;
    },

    updatePersonalInfo: (state, action) => {
      //this function updates the targeted key of the personalInfo element of dataStore //
      state.personalInfo[action.payload.key] = action.payload.value;
    },

    updateWorkExp: (state, action) => {
      state.workExp[action.payload.index][action.payload.key] =
        action.payload.value;
    },
    updateEducation: (state, action) => {
      //this function updates the targeted key of the education element of dataStore //
      state.education[action.payload.index][action.payload.key] =
        action.payload.value;
    },
    updateCertificates: (state, action) => {
      //this function updates the targeted key of the education element of dataStore //
      state.certificates[action.payload.index][action.payload.key] =
        action.payload.value;
    },
    updateProjects: (state, action) => {
      //this function updates the targeted key of the education element of dataStore //
      state.projects[action.payload.index][action.payload.key] =
        action.payload.value;
    },
    updateSkills: (state, action) => {
      //this function updates the targeted key of the keySkills element of dataStore //
      state.skills[action.payload.index][action.payload.key] =
        action.payload.value;
    },
    updateOther: (state,action) =>  {
      state.other[action.payload.index][action.payload.key] =
      action.payload.value;
    },
    updateState: (state, action) => {
      //this function can be called to update any targeted element of dataStore //
      state[action.payload.key] = action.payload.value;
    },
    updateErrorMessages: (state, action) => {
      //this function updates errorMessages element of dataStore //
      let key = action.payload.key;
      if (action.payload.index) {
        key += "_" + action.payload.index;
      }
      state.errorMessages[key] = action.payload.value;
    },
    addArrayElement: (state, action) => {
      //this function is used to push a blank object in the array of elements(workExp, Education & Skills, Projects)
      //when the user clicks on the Add-new button to add more related details//
      state[action.payload.key].push(action.payload.element);
    },
    removeArrayElement: (state, action) => {
      //this function deletes the latest saved details in the array of elements (workExp, Education & Skills, Projects), when the user clicks on the remove button//
      state[action.payload.key].pop();
    },
  },
});

export const {
  updateProfileInfo,
  updatePersonalInfo,
  updateWorkExp,
  updateEducation,
  updateProjects,
  updateSkills,
  updateCertificates,
  updateObjective,
  updateOther,
  updateErrorMessages,
  updateState,
  addArrayElement,
  removeArrayElement,
} = resumeDataSlice.actions;

export default resumeDataSlice.reducer;
