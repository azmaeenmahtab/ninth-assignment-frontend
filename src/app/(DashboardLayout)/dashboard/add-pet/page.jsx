
"use client";
import React from 'react';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showErrorToast, showSuccessToast } from '@/lib/toast';
import { authClient } from '@/lib/auth-client';

const AddPet = () => {
  const { data: session } = useSession();
  const router = useRouter();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('add pet submit clicked');
    console.log("user session:", session);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // Checkbox handling (vaccinationStatus)
    data.vaccinationStatus = formData.get('vaccinationStatus') === 'on';
    // Add userId from session
    data.userId = session?.user?.id || null;
    console.log("form data to submit:", data);

    try {
      const token = await authClient.token();
      const tokenValue = token?.data?.token || '';
      if (!tokenValue) {
        console.warn('auth token missing');
      }
      console.log('auth token:', tokenValue);
      const res = await fetch('http://localhost:5000/add-pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenValue}`
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        // Optionally redirect or show success
        showSuccessToast('Pet added successfully.');
        router.push('/dashboard/my-listings');
      } else {
        // Optionally handle error
        showErrorToast('Failed to add pet.');
      }
    } catch (err) {
      showErrorToast('Error submitting form.');
    }
  };

  return (
    <div className="min-h-screen px-2 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-md p-8">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-[#651028] mb-1">Create New Listing</h1>
        <p className="text-sm text-gray-500 mb-6">Help a furry friend find their forever home.</p>

        {/* Form */}
        <form className="space-y-8" onSubmit={handleSubmit}>
    {/* Pet Details */}
    <div>
        <h2 className="text-lg font-semibold text-[#651028] mb-4">Pet Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
                <input type="text" name="petName" placeholder="e.g. Buddy" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
                <input type="text" name="species" placeholder="e.g. Dog/Cat/Bird/etc." className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                <input type="text" name="breed" placeholder="e.g. Golden Retriever" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input type="text" name="age" placeholder="e.g. 2 years" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]" />
            </div>
            <div className="flex flex-col gap-2 col-span-1 md:col-span-2 md:flex-row md:items-center md:gap-4">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <div className="flex gap-4">
                    <label>
                        <input type="radio" name="gender" value="Male" className="accent-[#651028]" />
                        <span className="ml-1">Male</span>
                    </label>
                    <label>
                        <input type="radio" name="gender" value="Female" className="accent-[#651028]" />
                        <span className="ml-1">Female</span>
                    </label>
                </div>
            </div>
            <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Adoption Fee ($)</label>
                <input type="number" name="adoptionFee" placeholder="0.00" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]" />
            </div>
        </div>
    </div>

    {/* Health & Media */}
    <div>
        <h2 className="text-lg font-semibold text-[#651028] mb-4">Health & Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Source</label>
                <input type="url" name="imageSrc" placeholder="Paste image URL here" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]" />
            </div>
            <div className="flex items-center gap-2">
                <label className="block text-sm font-medium text-gray-700">Vaccination Status</label>
                <input type="checkbox" name="vaccinationStatus" className="accent-[#651028] ml-2" />
                <span className="text-sm text-gray-700">Up to date</span>
            </div>
            <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Health Status & Medical History</label>
                <input type="text" name="healthStatus" placeholder="e.g. Healthy, Neutered, Microchipped" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]" />
            </div>
        </div>
    </div>

    {/* Location & Listing info */}
    <div>
        <h2 className="text-lg font-semibold text-[#651028] mb-4">Location & Listing info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" name="location" placeholder="City, Country" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Owner Email (Auto-filled)</label>
                <input type="email" name="ownerEmail" value={session?.user?.email || ''} readOnly className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-gray-100 text-gray-500 outline-none" />
            </div>
            <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" placeholder="Tell potential owners about the pet's personality, habits, and why they need a new home..." rows={4} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#7a1633]" />
            </div>
        </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-col-reverse gap-3 mt-6 sm:flex-row sm:justify-end sm:gap-4">
        <button type="button" className="rounded-full border border-gray-300 px-6 py-2 text-[#651028] font-semibold bg-white hover:bg-gray-100">
            Save Draft
        </button>
        <button type="submit" className="rounded-full bg-[#651028] px-6 py-2 text-white font-semibold hover:bg-[#4b0f1d]">
            Submit Listing
        </button>
    </div>
</form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddPet;
