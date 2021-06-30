/**
 * This interceptor replaces an ingested field
 * FIRST_&_MIDDLE_INITIAL with FIRST_AND_MIDDLE
 * This is necessary since MarkLogic's XQuery does not allow & in a property name
 */

var contentArray;
var options;

// This can be passed in because it's defined in the interceptors config in the flow file
var optVariable;

// Iterate over content
contentArray.forEach(content => {
    let instance = content.value.envelope.instance;
    let clone = {};
    // Create a clone containing the original instance except where we want to change the property name
    for (let prop in instance) {
        if (instance.hasOwnProperty(prop)) {
            if (prop === "FIRST_&_MIDDLE_INITIAL") {
                clone["FIRST_AND_MIDDLE"] = instance[prop];
            }
            else {
                clone[prop] = instance[prop];
            }
        }
    }
    // Replace the instance
    content.value.envelope.instance = clone;
});
