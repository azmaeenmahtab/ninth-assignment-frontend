"use client";

import React, { useState } from 'react'
import { useDeleteConfirmModal } from '@/lib/contexts/deleteconfirmmodalcontext'

const DeleteConfirmModal = () => {
  const {
    isOpen,
    title,
    message,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
    closeDeleteModal
  } = useDeleteConfirmModal()
  const [isWorking, setIsWorking] = useState(false)

  if (!isOpen) return null

  const handleClose = () => {
    if (onCancel) {
      onCancel()
    }
    closeDeleteModal()
  }

  const handleConfirm = async () => {
    if (!onConfirm) {
      closeDeleteModal()
      return
    }

    try {
      setIsWorking(true)
      await onConfirm()
      closeDeleteModal()
    } catch (error) {
      // Keep modal open on error; caller can handle feedback if needed.
    } finally {
      setIsWorking(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-[#651028]">{title}</h3>
            <p className="mt-1 text-[12px] text-gray-500">{message}</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full px-2 py-1 text-sm text-gray-500 hover:text-[#651028]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border border-[#651028] px-4 py-2 text-xs font-semibold text-[#651028]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isWorking}
            className="rounded-full bg-[#651028] px-4 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isWorking ? 'Deleting...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
