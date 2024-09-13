import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "./types";

export const userApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004' }),
	tagTypes: ["Users"],
	endpoints: builder => ({
		getUsers: builder.query<IUser[], null>({
			query: () => '/users',
			providesTags: ["Users"]
		}),
		getUserById: builder.query<IUser, string>({
			query: (id) => '/users/' + id,
			providesTags: ["Users"]
		}),
		addUser: builder.mutation<IUser, IUser>({
			query: (param) => ({
				url: '/users',
				method: 'POST',
				body: param
			}),
			invalidatesTags: ["Users"]
		}),
		removeUser: builder.mutation<IUser, string>({
			query: (id) => ({
				url: '/users/' + id,
				method: 'DELETE',
				body: id
			}),
			invalidatesTags: ["Users"]
		}),
		updateUser: builder.mutation<IUser, IUser>({
			query: (user) => ({
				url: '/users/' + user.id,
				method: 'PUT',
				body: user,
			}),
			invalidatesTags: ["Users"],
		}),
		
	})
})

export const {
	useGetUsersQuery,
	useAddUserMutation,
	useRemoveUserMutation,
	useGetUserByIdQuery,
	useUpdateUserMutation
} = userApi