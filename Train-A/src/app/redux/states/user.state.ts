export enum UserRole {
  Guest = 'Guest',
  GeneralUser = 'GeneralUser',
  Manager = 'Manager',
}

export interface UserState {
  userRole: UserRole;
}

export const initialUserState: UserState = {
  userRole: UserRole.Guest,
};
