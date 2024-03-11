document.addEventListener('DOMContentLoaded', function() {
    // Function to get the value of a specific cookie by name
    function getCookieValue(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Function to parse the cookieyes-consent cookie value
    function checkCookieConsent() {
        const cookieValue = getCookieValue('cookieyes-consent');
        if (!cookieValue) return false;

        try {
            const consentObj = JSON.parse(cookieValue);
            return consentObj.functional === 'no';
        } catch (e) {
            console.error('Error parsing cookieyes-consent value', e);
            return false;
        }
    }

    // Initially checks for the cookie but does nothing further.
    // This step ensures that the cookie's presence and value are noted, but no action is taken yet.
    const functionalCookieSetToNo = checkCookieConsent(); // This checks the cookie consent but doesn't act on it immediately.

    // Function to show the .calendly-cookie-popup
    function showCalendlyCookiePopup() {
        document.querySelector('.calendly-cookie-popup').style.display = 'block';
    }

    // Listener for the Calendly CTA click
    document.querySelector('[trainual-button="calendly"]').addEventListener('click', function() {
        if (functionalCookieSetToNo) {
            // If the functional cookie is set to no, show the .calendly-cookie-popup
            showCalendlyCookiePopup();
        }
    });
});
