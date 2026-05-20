import { toast } from 'react-toastify'

const baseOptions = {
  position: 'top-center',
  style: {
    background: '#651028',
    color: '#fff',
    borderRadius: '1rem',
    fontWeight: 600,
    fontSize: '1rem',
    boxShadow: '0 2px 8px rgba(75,15,29,0.15)'
  },
  autoClose: 3000,
  hideProgressBar: true
}

export const showErrorToast = (msg) => toast.error(msg, baseOptions)
export const showSuccessToast = (msg) => toast.success(msg, baseOptions)
