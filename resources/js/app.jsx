import '../css/app.css';
import './bootstrap';
import './assets/sass/style.react.scss';
import './assets/css/custom.css';
import './assets/css/style.css';
import './assets/css/frontend.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux'; // Import Redux Provider
import store from './store/store.jsx'; // Import your Redux store
import { useEffect } from 'react';
import { setLanguage } from './store/languageSlice.jsx';
import { IntlProvider } from 'react-intl';
import { ToastContainer } from 'react-toastify';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// LanguageInitializer Component
const LanguageInitializer = ({ children }) => {
    const { lang, messages } = useSelector((state) => state.language);

    // Wait until messages are loaded
    if (!messages) {
        return <div>Loading...</div>; // You can replace this with a loader component
    }

    return <>
        <IntlProvider
            locale={lang}
            messages={messages[lang]}
        >
            <ToastContainer />
            
            {children}
        </IntlProvider>
    </>;
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Provider store={store}>
                <LanguageInitializer>
                    <App {...props} />
                </LanguageInitializer>
            </Provider >
        );
    },
    progress: {
        color: '#4B5563',
        showSpinner: true,
    },
});
