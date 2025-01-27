import en from '../locales/en.json';// Import the default language file

export const loadMessages = async (lang) => {
    try {
        switch (lang) {
            case 'en':
                return en;
            case 'ar':
                return (await import('../locales/ar.json')).default;
            case 'fr':
                return (await import('../locales/fr.json')).default;
            // Add other languages as needed
            default:
                return en; // Fallback to English
        }
    } catch (error) {
        console.error('Error loading locale file:', error);
        return en; // Fallback to English on error
    }
};
