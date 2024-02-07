// This is V1.1 - Feb 7, 2024
// Changed to trigger attribute instead of ID
document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the attribute trainual-button="calendly"
    var buttons = document.querySelectorAll('[trainual-button="calendly"]');

    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior

            // Convert slashes in the pathname to hyphens, excluding the leading slash
            var utmTerm = window.location.pathname.slice(1).replace(/\//g, '-');
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
