import React, { useState } from 'react'
import UsersList from './UsersList'
import { useNavigate } from 'react-router-dom'
function UsersTable() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddUser = () => {
        try {
            navigate('/addUser')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div class="relative overflow-x-auto shadow-md ">
                <div class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">

                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} type="text" id="table-search-users" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />

                    </div>
                    <button
                        onClick={handleAddUser}
                        className="w-30 bg-gradient-to-r from-green-800 to-green-500 hover:from-green-900 hover:to-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Add User
                    </button>
                </div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                NO.
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Display Picture
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Edit
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Delete User
                            </th>

                        </tr>
                    </thead>

                    <UsersList searchTerm={searchTerm} />

                </table>

            </div>

        </div>
    )
}

export default UsersTable
