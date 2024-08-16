export interface UserState {
  userRole: 'Guest' | 'GeneralUser' | 'Manager';
}

export const initialUserState: UserState = {
  userRole: 'Guest',
};
