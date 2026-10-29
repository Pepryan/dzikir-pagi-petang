import { describe, it, expect, vi, afterEach } from 'vitest';
import { shareText, formatEntry } from '@/lib/share';

describe('shareText', () => {
    afterEach(() => {
        delete navigator.share;
    });

    it('uses the native share sheet when available', async () => {
        navigator.share = vi.fn().mockResolvedValue(undefined);
        expect(await shareText({ title: 'T', text: 'body' })).toBe('shared');
        expect(navigator.share.mock.calls[0][0].text).toContain('body');
    });

    it('treats a dismissed share sheet as cancelled, not copied', async () => {
        navigator.share = vi.fn().mockRejectedValue(Object.assign(new Error(), { name: 'AbortError' }));
        expect(await shareText({ title: 'T', text: 'body' })).toBe('cancelled');
        expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
    });

    it('falls back to the clipboard', async () => {
        expect(await shareText({ title: 'T', text: 'body' })).toBe('copied');
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('body'));
    });
});

describe('formatEntry', () => {
    it('skips missing fields', () => {
        expect(formatEntry({ title: 'A', arabic: 'ب', translation: 'c' })).toBe('A\n\nب\n\n"c"');
    });
});
