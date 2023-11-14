export default class ClipBoardUtils {

    public static copyToClipboard(text: string) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard')
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy')
        });
    }
}