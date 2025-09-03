import React, { useState } from 'react'
import Dialog from '../components/ui/Dialog';



 const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none backdrop-blur-sm';
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60 shadow-sm hover:shadow-md',
    outline: 'border border-slate-300/60 bg-white/80 hover:bg-slate-50/80 text-slate-700 shadow-sm hover:shadow-md backdrop-blur-sm',
    ghost: 'hover:bg-slate-100/80 text-slate-600 hover:text-slate-700 transition-colors',
    destructive: 'bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Plan = () => {
  const [showDialog, setShowDialog] = useState(false);

  // Prevent modal content click from closing modal by stopping propagation
  const stopPropagation = (e) => e.stopPropagation();

  return(
    <div>
      <Button
    
    onClick={() => setShowDialog(!showDialog)}
    size='sm'
    variant='outline'
    className='gap-2'>
      Open Dialog
    </Button>

    <Dialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        title="Select visible fields"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowDialog(false)}>
              Close
            </Button>
            <Button variant="primary" size="sm" onClick={() => setShowDialog(false)}>
              Done
            </Button>
          </div>
        }
      >
        {/* Modal main content */}
        these main part of it
      </Dialog>
    </div>
  )
};

export default Plan