"use client";

import React, { createContext, useContext, useMemo, useState } from 'react'

const DeleteConfirmModalContext = createContext(null)

const defaultState = {
    isOpen: false,
    title: 'Delete listing',
    message: 'Are you sure you want to delete this item?',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    onConfirm: null,
    onCancel: null
}

export const DeleteConfirmModalProvider = ({ children }) => {
    const [state, setState] = useState(defaultState)

    const openDeleteModal = (options = {}) => {
        setState({
            ...defaultState,
            ...options,
            isOpen: true,
            onConfirm: options.onConfirm || null,
            onCancel: options.onCancel || null
        })
    }

    const closeDeleteModal = () => {
        setState(defaultState)
    }

    const value = useMemo(
        () => ({ ...state, openDeleteModal, closeDeleteModal }),
        [state]
    )

    return (
        <DeleteConfirmModalContext.Provider value={value}>
            {children}
        </DeleteConfirmModalContext.Provider>
    )
}

export const useDeleteConfirmModal = () => {
    const context = useContext(DeleteConfirmModalContext)
    if (!context) {
        throw new Error('useDeleteConfirmModal must be used within DeleteConfirmModalProvider')
    }
    return context
}
