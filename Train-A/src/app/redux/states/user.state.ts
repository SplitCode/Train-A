export enum UserRole {
  Guest = 'Guest',
  GeneralUser = 'GeneralUser',
  Manager = 'Manager',
}

export interface UserState {
  name: string;
  email: string;
  userRole: UserRole;
}

export const initialUserState: UserState = {
  userRole: UserRole.Guest,
  name: '',
  email: '',
};
