"use client"

import PageHeader from '@/components/PageHeader'
import NoDataFound from '@/components/table/NoDataFound'
import Table from '@/components/table/Table'
import { API_URL } from '@/utils/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


interface WorkoutPlan {
    workoutPlanName?: string,
    id?: string,
    pkgDesc?: string,
}

const Users = () => {

    const [users, setUsers] = useState([]);
    const fetchData = async () => {
        const res = await fetch(`${API_URL}/api/v1/workout-plan`, {
            method: "GET",
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json",
                // Add any other necessary headers here (e.g., authentication tokens)
            },
        });

        // If the response is not successful, handle the error
        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }

        // Parse the JSON response into product data
        const users = await res.json();
        setUsers(users)
    }

    // const goToCreate = () => {
    //     router.push('/admin/products/create')
    // }
    // const goToEdit = (id) => {
    //     router.push(`/admin/products/${id}`)
    // }

    // const handleDelete = async (id) => {
    //     const res = await fetch(`${API_URL}/products/${id}`, {
    //         method: "Delete"
    //     });

    //     if (!res.ok) {
    //         throw new Error("Failed to delete product");
    //     } else {
    //         fetchData()

    //     }
    // }

    useEffect(() => {
        fetchData()
    }, [])

    const route = useRouter()
    const goToCreate = () => {
        route.push('/dashboard/workout-plans/create')
    }

    const headers = [
        {
            title: "Name"
        },
    
        {
            title: "Workouts"
        },
        {
            title: "Action"
        },
    ];

    return (<div >
        <PageHeader button_text='Create Workout Plan' onClick={goToCreate} title='Workout Plan List' />
        <Table headers={headers}>
            {users?.length > 0 ? users?.map((item: WorkoutPlan) => (

                <tr key={item?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item?.workoutPlanName || "--"}
                    </th>
                    <td className="px-6 py-4">
                        {item?.pkgDesc || "--"}
                    </td>
                   

                    <td className="flex items-center px-6 py-4">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                    </td>
                </tr>
            )) : <NoDataFound colSpan={headers?.length}/>}
        </Table>
    </div>
    )
}

export default Users