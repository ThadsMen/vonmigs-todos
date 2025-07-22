/* eslint-disable react/prop-types */
import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { postSection } from '../services/apiService'

export default function SectionForm({ isOpen, closeForm, setSectionsData }) {
  const [title, setTitle] = useState('')

  if (!isOpen) return null
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newSection = {
      section: title,
    }
    const section = await postSection(newSection)

    setSectionsData((prevState) => {
      return {
        ...prevState,
        [section.section]: [], // Initialize the new section with an empty array
      }
    })
    closeForm()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-200 rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 relative">
        <button
          onClick={closeForm}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose />
        </button>
        <p className="text-3xl font-bold">New Section</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Section
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
