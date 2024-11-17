import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserProps } from 'src/interface/UserContact';

interface UserContactsState {
  contacts: UserProps[];
}

const initialState: UserContactsState = {
  contacts: [],
};

const userContactsSlice = createSlice({
  name: 'userContacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<UserProps>) => {
      state.contacts.push(action.payload);
    },
    
    editContact: (state, action: PayloadAction<UserProps>) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.phoneNum !== action.payload);
    },
    
    setContacts: (state, action: PayloadAction<UserProps[]>) => {
      state.contacts = action.payload;
    },
  },
});

export const { addContact, editContact, deleteContact, setContacts } = userContactsSlice.actions;


export default userContactsSlice.reducer;
