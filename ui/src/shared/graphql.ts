import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  UUID: any;
};

/** Type to add new room. */
export type AddRoomInput = {
  /** Name of a new room. */
  name: Scalars['String'];
};

export type AddRoomPayload = {
  __typename?: 'AddRoomPayload';
  id: Scalars['UUID'];
  isSuccess: Scalars['Boolean'];
};

/** Type to add user. */
export type AddUserInput = {
  /** Nickname of new user. */
  nickname: Scalars['String'];
};

export type AddUserPayload = {
  __typename?: 'AddUserPayload';
  id: Scalars['UUID'];
  isSuccess: Scalars['Boolean'];
};

/** Type for add user to room. */
export type AddUserToRoomInput = {
  /** Room id. */
  roomId: Scalars['UUID'];
  /** User id. */
  userId: Scalars['UUID'];
};

export type AddUserToRoomPayload = {
  __typename?: 'AddUserToRoomPayload';
  isSuccess: Scalars['Boolean'];
  roomId: Scalars['UUID'];
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type CommandPayload = {
  __typename?: 'CommandPayload';
  commandType: CommandTypeEnum;
  isSuccess: Scalars['Boolean'];
  roomId: Scalars['UUID'];
  userId: Scalars['UUID'];
};

export enum CommandTypeEnum {
  Pause = 'PAUSE',
  Play = 'PLAY',
  Rewind = 'REWIND',
  SourceHasChanged = 'SOURCE_HAS_CHANGED'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Add room. */
  addRoom: AddRoomPayload;
  /** Add user. */
  addUser: AddUserPayload;
  /** Add user to room. */
  addUserToRoom: AddUserToRoomPayload;
  /** Input for remove user from room. */
  removeUserFromRoom: RemoveUserFromRoomPayload;
  /** Send command. */
  sendCommand: SendCommandPayload;
  /** Change room source */
  setRoomSource: SetRoomSourcePayload;
  /** Update user. */
  updateUser: UpdateUserPayload;
};


export type MutationAddRoomArgs = {
  input: AddRoomInput;
};


export type MutationAddUserArgs = {
  input: AddUserInput;
};


export type MutationAddUserToRoomArgs = {
  input: AddUserToRoomInput;
};


export type MutationRemoveUserFromRoomArgs = {
  input: RemoveUserFromRoomInput;
};


export type MutationSendCommandArgs = {
  input: SendCommandInput;
};


export type MutationSetRoomSourceArgs = {
  input: SetRoomSourceInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  /** Get room by id. */
  room?: Maybe<Room>;
  /** Get rooms. */
  rooms?: Maybe<Array<Maybe<Room>>>;
  /** Get user by id. */
  user?: Maybe<User>;
  /** Get users. */
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryRoomArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

/** Input for remove user from room. */
export type RemoveUserFromRoomInput = {
  /** Room id. */
  roomId: Scalars['UUID'];
  /** User id. */
  userId: Scalars['UUID'];
};

export type RemoveUserFromRoomPayload = {
  __typename?: 'RemoveUserFromRoomPayload';
  isSuccess: Scalars['Boolean'];
  roomId: Scalars['UUID'];
};

export type Room = {
  __typename?: 'Room';
  adminId: Scalars['UUID'];
  /** Room Id. */
  id?: Maybe<Scalars['UUID']>;
  isAdmin: Scalars['Boolean'];
  /** Room name. */
  name?: Maybe<Scalars['String']>;
  /** Room media source is playing now. */
  source?: Maybe<Scalars['String']>;
  /** Room users. */
  users: Array<User>;
};


export type RoomIsAdminArgs = {
  userId: Scalars['UUID'];
};

export type SendCommandInput = {
  /** Command. */
  commandType: CommandTypeEnum;
  /** Room id. */
  roomId: Scalars['UUID'];
  /** User id. */
  userId: Scalars['UUID'];
};

export type SendCommandPayload = {
  __typename?: 'SendCommandPayload';
  isSuccess: Scalars['Boolean'];
};

export type SetRoomSourceInput = {
  /** Room id. */
  roomId: Scalars['UUID'];
  /** New source. */
  source: Scalars['String'];
};

export type SetRoomSourcePayload = {
  __typename?: 'SetRoomSourcePayload';
  isSuccess: Scalars['Boolean'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Fired when some user use command. */
  consumeRoomCommands: CommandPayload;
};


export type SubscriptionConsumeRoomCommandsArgs = {
  roomId: Scalars['UUID'];
};

export type UpdateUserInput = {
  id: Scalars['UUID'];
  nickname: Scalars['String'];
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  id: Scalars['UUID'];
  isSuccess: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  /** User Id. */
  id?: Maybe<Scalars['UUID']>;
  /** User nickname. */
  nickname?: Maybe<Scalars['String']>;
};

export type AddRoomMutationVariables = Exact<{
  input: AddRoomInput;
}>;


export type AddRoomMutation = { __typename?: 'Mutation', addRoom: { __typename?: 'AddRoomPayload', id: any } };

export type SetRoomSourceMutationVariables = Exact<{
  input: SetRoomSourceInput;
}>;


export type SetRoomSourceMutation = { __typename?: 'Mutation', setRoomSource: { __typename?: 'SetRoomSourcePayload', isSuccess: boolean } };

export type RoomQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RoomQuery = { __typename?: 'Query', room?: { __typename?: 'Room', id?: any | null, name?: string | null, source?: string | null } | null };

export type RoomSourceQueryVariables = Exact<{
  roomId: Scalars['ID'];
}>;


export type RoomSourceQuery = { __typename?: 'Query', room?: { __typename?: 'Room', source?: string | null } | null };

export type RoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomsQuery = { __typename?: 'Query', rooms?: Array<{ __typename?: 'Room', id?: any | null, name?: string | null } | null> | null };

export type RoomCommandSubscriptionVariables = Exact<{
  roomId: Scalars['UUID'];
}>;


export type RoomCommandSubscription = { __typename?: 'Subscription', consumeRoomCommands: { __typename?: 'CommandPayload', commandType: CommandTypeEnum, roomId: any, userId: any } };

export type CreateUserMutationVariables = Exact<{
  user: AddUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', addUser: { __typename?: 'AddUserPayload', id: any } };

export type UpdateUserMutationVariables = Exact<{
  user: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UpdateUserPayload', id: any } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id?: any | null, nickname?: string | null } | null };


export const AddRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddRoomMutation, AddRoomMutationVariables>;
export const SetRoomSourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setRoomSource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetRoomSourceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setRoomSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSuccess"}}]}}]}}]} as unknown as DocumentNode<SetRoomSourceMutation, SetRoomSourceMutationVariables>;
export const RoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Room"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}}]}}]} as unknown as DocumentNode<RoomQuery, RoomQueryVariables>;
export const RoomSourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"roomSource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"source"}}]}}]}}]} as unknown as DocumentNode<RoomSourceQuery, RoomSourceQueryVariables>;
export const RoomsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RoomsQuery, RoomsQueryVariables>;
export const RoomCommandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"roomCommand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"consumeRoomCommands"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commandType"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<RoomCommandSubscription, RoomCommandSubscriptionVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;