import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UpdateDataAction {
  key: string;
  value: any;
}

interface State {
  data: {
    [key: string]: any
  }
}

const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    data: {
      email: '',
      confirmed: false,
    }
  },
  reducers: {
    setSignUpData(state: State, action: PayloadAction<UpdateDataAction>) {
      state.data[action.payload.key] = action.payload.value;
    }
  }
})

export const { setSignUpData } = signUpSlice.actions
export default signUpSlice.reducer
