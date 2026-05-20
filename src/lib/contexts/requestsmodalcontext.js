"use client";

import React, { createContext, useContext, useMemo, useState } from 'react'

const RequestsModalContext = createContext(null)

export const RequestsModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [petId, setPetId] = useState('')
    const [petName, setPetName] = useState('')

    const openModal = (nextPetId, nextPetName) => {
        setPetId(nextPetId || '')
        setPetName(nextPetName || '')
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        setPetId('')
        setPetName('')
    }

    const value = useMemo(() => ({ isOpen, petId, petName, openModal, closeModal }), [isOpen, petId, petName])

    return (
        <RequestsModalContext.Provider value={value}>
            {children}
        </RequestsModalContext.Provider>
    )
}

export const useRequestsModal = () => {
    const context = useContext(RequestsModalContext)
    if (!context) {
        throw new Error('useRequestsModal must be used within RequestsModalProvider')
    }
    return context
}
