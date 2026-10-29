import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes, faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';
import { shareText, canShare } from '@/lib/share';

const ShareButton = ({ title, text, className = '' }) => {
    const [status, setStatus] = useState(null);
    const label = canShare() ? 'Bagikan' : 'Salin';

    const handleClick = async (e) => {
        // Don't trigger tap-to-count or swipe handlers on the parent
        e.stopPropagation();
        const result = await shareText({ title, text });
        if (result === 'copied' || result === 'failed') {
            setStatus(result);
            setTimeout(() => setStatus(null), 2000);
        }
    };

    return (
        <button
            onClick={handleClick}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            className={`inline-flex items-center px-4 py-2 text-sm rounded-full transition-all text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
            aria-label={label}
        >
            <FontAwesomeIcon icon={status === 'copied' ? faCheck : canShare() ? faShareNodes : faCopy} className="mr-2" />
            {status === 'copied' ? 'Disalin ke clipboard' : status === 'failed' ? `Gagal ${label.toLowerCase()}` : label}
        </button>
    );
};

export default ShareButton;
