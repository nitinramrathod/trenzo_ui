"use client"

import { delete_icon, edit_icon } from '@/assets/icons/dashboard'
import Modal from '@/components/common/Modal'
import Button, { CancelButton } from '@/components/forms/Button'
import PageHeader from '@/components/PageHeader'
import { ActionTD } from '@/components/table/Common'
import NoDataFound from '@/components/table/NoDataFound'
import Table from '@/components/table/Table'
import TableLoader from '@/components/table/TableLoader'
import { API_URL } from '@/utils/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Package {
    id: string;
    pkgName?: string;
    duration?: string;
    pkgDesc?: string;
    pkgPrice?: number;
    pkgDiscount?: number;
    pkgDiscountedPrice?: number;
}

const Users = () => {

    const [users, setUsers] = useState<Package[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);    
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const fetchData = async () => {
        const res = await fetch(`${API_URL}/api/v1/gym-package`, {
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
            setIsLoading(false);
        }

        // Parse the JSON response into product data
        const users = await res.json();
        setUsers(users);
        setIsLoading(false);
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
        route.push('/dashboard/packages/create')
    }

    const headers = [
        {
            title: "Name",
            input: "text"
        },
        {
            title: "Duration",
            input: "text"
        },
        {
            title: "Description",
            input: "text"
        },
        {
            title: " Actual Price",
            input: "text"
        },
        {
            title: "Discount",
            input: "text"
        },
        {
            title: "Discount Price",
            input: "text"
        },
        {
            title: "Action"
        },
    ];

    return (< >
        <PageHeader button_text='Create Package' onClick={goToCreate} title='Package List' />
        <Table headers={headers}>
            {isLoading ? (<TableLoader cols={headers?.length}/>) : users?.length > 0 ? users?.map((item: Package) => (

                <tr key={item?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item?.pkgName || "--"}
                    </th>
                    <td className="px-6 py-4">
                        {item?.duration || "--"}
                    </td>
                    <td className="px-6 py-4">
                        {item?.pkgDesc || "--"}
                    </td>
                    <td className="px-6 py-4">
                        ₹ {item?.pkgPrice || "--"}
                    </td>
                    <td className="px-6 py-4">
                        {item?.pkgDiscount || "--"}%
                    </td>
                    <td className="px-6 py-4">
                        ₹  {item?.pkgDiscountedPrice || "--"}
                    </td>

                    <ActionTD>
                        <a href={`/dashboard/packages/${item.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{edit_icon}</a>
                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">{delete_icon}</button>
                    </ActionTD>
                </tr>
            )) : <NoDataFound colSpan={headers?.length}/>}
        </Table>

        <Modal open ={deleteModal} setOpen={setDeleteModal} backgroundBlur={true} position='top' title="Are you absolutely sure?">
            <div className='flex flex-col items-start justify-start h-full md:w-sm'>               
                    <p className='text-gray-600 text-md'>
                        This action will permanently delete the user from the system.
                    </p>
                    <div className='mt-6 flex justify-end w-full gap-3'>
                    <CancelButton>Cancel</CancelButton>
                    <Button>Confirm</Button>
                </div>
            </div>
        </Modal>
    </>
    )
}

export default Users