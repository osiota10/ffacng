import React, { useState } from 'react';
import { Button, Toast } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

const CopyToClipboardButton = ({ text }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(text)
            .then(() => setIsCopied(true))
            .catch(() => setIsCopied(false));

        // Reset the "isCopied" state after a certain duration
        setTimeout(() => {
            setIsCopied(false);
        }, 5000);
    };

    return (
        <>
            <Badge bg="primary" onClick={handleCopyToClipboard}>
                {isCopied ? 'Copied!!!' : 'Copy to Clipboard'}
            </Badge>
        </>
    );
};

export default CopyToClipboardButton;
