import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants: null,
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        },
        updateApplicationStatus: (state, action) => {
            if (state.applicants && state.applicants.applications) {
                const updatedApplication = state.applicants.applications.map(app => {
                    if (app._id === action.payload.id) {
                        return { ...app, status: action.payload.status.toLowerCase() };
                    }
                    return app;
                });
                state.applicants.applications = updatedApplication;
            }
        }
    }
});
export const { setAllApplicants, updateApplicationStatus } = applicationSlice.actions;
export default applicationSlice.reducer;
