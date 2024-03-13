document.addEventListener('DOMContentLoaded', function() {
    let hidePopupTimeout; // Declare a variable to store the timeout, making it accessible for resetting

    function getCookieValue(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function checkCookieConsent() {
        const cookieValue = getCookieValue('cookieyes-consent');
        if (!cookieValue) return false;

        const keyValuePairs = cookieValue.split(',');
        const consentObj = keyValuePairs.reduce((obj, pair) => {
            const [key, value] = pair.split(':');
            obj[key] = value;
            return obj;
        }, {});

        return consentObj.functional === 'no';
    }

    function toggleCalendlyCookiePopup(displayState, resetOpacity = false) {
        const popup = document.querySelector('.calendly-cookie-popup');
        if (popup) {
            if (resetOpacity) {
                popup.style.opacity = '1'; // Reset opacity to full when showing the popup
            }
            popup.style.display = displayState;
            if (displayState === 'flex') {
                clearTimeout(hidePopupTimeout); // Clear any previous timeout
                hidePopupTimeout = setTimeout(() => {
                    popup.style.opacity = '0';
                    setTimeout(() => popup.style.display = 'none', 500); // Adjust 500ms as needed for your transition
                }, 8000); // 8 seconds before initiating the opacity change
            }
        }
    }

    // Select all buttons with the attribute `trainual-button="calendly"` and apply the event listener to each
    const calendlyButtons = document.querySelectorAll('[trainual-button="calendly"]');
    calendlyButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (checkCookieConsent()) {
                toggleCalendlyCookiePopup('flex', true); // Pass true to reset opacity
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
