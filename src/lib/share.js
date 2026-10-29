const APP_LINK = 'https://dzikirapp.my.id';

// Native share sheet available (mostly mobile). Its menu already includes "copy",
// so UIs show a single Bagikan button there and a Salin button elsewhere.
export const canShare = () => typeof navigator.share === 'function';

// Shares text via the native share sheet, falling back to the clipboard.
// Returns 'shared' | 'cancelled' | 'copied' | 'failed'.
export const shareText = async ({ title, text }) => {
    const body = `${text}\n\n— Daily Dzikr · ${APP_LINK}`;

    if (navigator.share) {
        try {
            await navigator.share({ title, text: body });
            return 'shared';
        } catch (error) {
            if (error.name === 'AbortError') return 'cancelled';
        }
    }

    try {
        await navigator.clipboard.writeText(body);
        return 'copied';
    } catch {
        return 'failed';
    }
};

// Formats an Arabic text entry (dzikir, doa, ayat) for sharing
export const formatEntry = ({ title, arabic, latin, translation, source }) =>
    [title, arabic, latin, translation && `"${translation}"`, source]
        .filter(Boolean)
        .join('\n\n');
