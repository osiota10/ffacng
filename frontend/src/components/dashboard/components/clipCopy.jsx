import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" style={{ backgroundColor: 'blue' }} {...props} >
            {isCopied ? 'Copied!!!' : 'Copy'}
        </Tooltip>
    );

    return (
        <>
            <OverlayTrigger
                placement="right"
                overlay={renderTooltip}
            >
                <span onClick={handleCopyToClipboard}>
                    <i className="fa-regular fa-clipboard text-primary"></i>
                </span>
            </OverlayTrigger>
        </>
    );
};

export default CopyToClipboardButton;
