import React, { useState } from 'react';
import './styles/dialog.css';

const Dialog = ({ title, content, onClose }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="dialog-overlay">
                    <div className="dialog">
                        <div className="dialog-header">
                            <h2>{title}</h2>
                            <button onClick={handleClose}>Close</button>
                        </div>
                        <div className="dialog-content">
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dialog;
