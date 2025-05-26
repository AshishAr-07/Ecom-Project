import React from 'react'

const CategoryForm = ({handleSubmit, value, setValue}) => {
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="max-w-screen-md p-8 mx-auto border rounded-xl flex flex-col gap-2">
                <label className='text-lg'>Category Name</label>
                <input 
                    type="text" 
                    className="border py-1 pl-1 rounded-md" 
                    placeholder="Enter Category Name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus
                />
                <button className='mt-2 bg-blue-700 py-1 rounded-md text-white cursor-pointer' type="submit">Submit</button>
            </div>
        </form>
        </>
    )
}

export default CategoryForm
