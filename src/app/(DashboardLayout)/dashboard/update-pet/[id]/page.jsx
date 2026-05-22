/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
import { showErrorToast, showSuccessToast } from '@/lib/toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '@/components/ui/Spinner'
import { authClient } from '@/lib/auth-client'

const Updatepage = () => {
  const { id } = useParams()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formValues, setFormValues] = useState({
    petName: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    adoptionFee: '',
    imageSrc: '',
    vaccinationStatus: false,
    healthStatus: '',
    location: '',
    ownerEmail: '',
    description: ''
  })

  const ownerEmailValue = useMemo(() => {
    return session?.user?.email || formValues.ownerEmail || ''
  }, [session?.user?.email, formValues.ownerEmail])

  useEffect(() => {
    if (!id) return

    const loadPet = async () => {
      try {
        const res = await fetch(`http://localhost:5000/pet-detail?petId=${id}`)
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data?.message || 'Failed to fetch pet details')
        }

        const pet = data?.pet || {}
        setFormValues((prev) => ({
          ...prev,
          petName: pet?.petName || '',
          species: pet?.species || '',
          breed: pet?.breed || '',
          age: pet?.age || '',
          gender: pet?.gender || '',
          adoptionFee: pet?.adoptionFee ?? '',
          imageSrc: pet?.imageSrc || '',
          vaccinationStatus: Boolean(pet?.vaccinationStatus),
          healthStatus: pet?.healthStatus || '',
          location: pet?.location || '',
          ownerEmail: pet?.ownerEmail || prev.ownerEmail || '',
          description: pet?.description || ''
        }))
      } catch (error) {
        showErrorToast(error.message || 'Failed to load pet details')
      } finally {
        setLoading(false)
      }
    }

    loadPet()
  }, [id])

  useEffect(() => {
    if (!session?.user?.email) return
    setFormValues((prev) => ({
      ...prev,
      ownerEmail: prev.ownerEmail || session.user.email
    }))
  }, [session?.user?.email])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!id) {
      showErrorToast('Missing pet id')
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        ...formValues,
        ownerEmail: ownerEmailValue
      }

      const token = await authClient.token()
      const tokenValue = token?.data?.token || ''
      if (!tokenValue) {
        console.warn('auth token missing')
      }
      console.log('auth token:', tokenValue)

      const res = await fetch(`http://localhost:5000/update-pet?petId=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenValue}`
        },
        body: JSON.stringify(payload)
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data?.message || 'Failed to update pet')
      }

      showSuccessToast('Pet updated successfully')
    } catch (error) {
      showErrorToast(error.message || 'Failed to update pet')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen px-2 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-md p-8">
        <h1 className="text-2xl mb-4 font-semibold text-[#651028] mb-1">Update your pet listing</h1>

        {loading ? (
          <div className="flex min-h-[240px] items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
                  <input
                    type="text"
                    name="petName"
                    placeholder="e.g. Buddy"
                    value={formValues.petName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
                  <input
                    type="text"
                    name="species"
                    placeholder="e.g. Dog/Cat/Bird/etc."
                    value={formValues.species}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                  <input
                    type="text"
                    name="breed"
                    placeholder="e.g. Golden Retriever"
                    value={formValues.breed}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="text"
                    name="age"
                    placeholder="e.g. 2 years"
                    value={formValues.age}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
                  />
                </div>
                <div className="flex items-center gap-4 col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <div className="flex gap-2">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formValues.gender === 'Male'}
                        onChange={handleChange}
                        className="accent-[#651028]"
                      />
                      <span className="ml-1">Male</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formValues.gender === 'Female'}
                        onChange={handleChange}
                        className="accent-[#651028] ml-4"
                      />
                      <span className="ml-1">Female</span>
                    </label>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adoption Fee ($)</label>
                  <input
                    type="number"
                    name="adoptionFee"
                    placeholder="0.00"
                    value={formValues.adoptionFee}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#651028] mb-4">Health & Media</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image Source</label>
                  <input
                    type="url"
                    name="imageSrc"
                    placeholder="Paste image URL here"
                    value={formValues.imageSrc}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
                  />
                </div>
                <div className="flex items-center gap-2 mt-6 md:mt-0">
                  <label className="block text-sm font-medium text-gray-700">Vaccination Status</label>
                  <input
                    type="checkbox"
                    name="vaccinationStatus"
                    checked={formValues.vaccinationStatus}
                    onChange={handleChange}
                    className="accent-[#651028] ml-2"
                  />
                  <span className="text-sm text-gray-700">Up to date</span>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Health Status & Medical History</label>
                  <input
                    type="text"
                    name="healthStatus"
                    placeholder="e.g. Healthy, Neutered, Microchipped"
                    value={formValues.healthStatus}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#651028] mb-4">Location & Listing info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="City, Country"
                    value={formValues.location}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Owner Email (Auto-filled)</label>
                  <input
                    type="email"
                    name="ownerEmail"
                    value={ownerEmailValue}
                    readOnly
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-gray-100 text-gray-500 outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    placeholder="Tell potential owners about the pet's personality, habits, and why they need a new home..."
                    rows={4}
                    value={formValues.description}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-[#651028] px-6 py-2 text-white font-semibold hover:bg-[#4b0f1d] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Updatepage
