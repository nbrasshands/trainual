// This is V1.3 - March 4, 2024
// Changed to trigger attribute instead of ID
// Added for the instance user is on homepage the UTM will update
// Added for the instance user is on mobile the UTM will update
document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the attribute trainual-button="calendly"
    var buttons = document.querySelectorAll('[trainual-button="calendly"]');

    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior

            // Check if the user is on a mobile device
            var isMobile = window.innerWidth <= 800; // or any other logic to determine mobile

            // Check if on the homepage or no URL path, default to "homepage", else convert slashes to hyphens
            // If on mobile, set utmTerm to "mobile-responsive", otherwise use the page path
            var pathname = window.location.pathname;
            var utmTerm = isMobile ? 'mobile-responsive' : 
                pathname === '/' || pathname === '' ? 'homepage' : pathname.slice(1).replace(/\//g, '-');
            var encodedUTMTerm = encodeURIComponent(utmTerm);

            // Retrieve UTM parameters from session storage with 'query.' prefix
            var utmParams = getUTMParametersFromSession();
            console.log("UTM Parameters from Session Storage:", utmParams); // Log retrieved UTM parameters

            // Construct the Calendly URL with UTM parameters
            var calendlyUrl = `https://calendly.com/d/2dz-wq6-6bk?utm_term=${encodedUTMTerm}${utmParams}`;
            console.log("Final Calendly URL:", calendlyUrl); // Log the final URL

            Calendly.initPopupWidget({url: calendlyUrl});
            return false;
        });
    });
});


function getUTMParametersFromSession() {
    const utmKeys = ['query.utm_source', 'query.utm_medium', 'query.utm_campaign', 'query.utm_content'];
    let utmParamsString = '';

    utmKeys.forEach(key => {
        const value = sessionStorage.getItem(key);
        console.log(`Checking for ${key}:`, value); // Log each UTM parameter check
        if (value) {
            // Remove 'query.' prefix from key when appending to URL
            const cleanKey = key.replace('query.', '');
            utmParamsString += `&${encodeURIComponent(cleanKey)}=${encodeURIComponent(value)}`;
        }
    });

    return utmParamsString;
}

