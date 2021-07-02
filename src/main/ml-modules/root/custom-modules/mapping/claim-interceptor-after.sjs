/**
 * This interceptor looks at NPI fields.  If all are missing then it gets flagged
 */

var contentArray;

// Iterate over content
contentArray.forEach(content => {
    const claim = content.value.toObject().envelope.instance.Claim;
    const rendering = claim.npiRenderingProvider || '';
    const billing = claim.npiBillingProvider || '';
    const attending = claim.npiAttendingProvider || '';
    const referring = claim.npiReferringProvider || '';
    const facility = claim.npiFacilityProvider || '';
    const operating = claim.OperatingProvider || '';
    const other = claim.npiOtherProvider || '';

    const gender = claim.patientGender || '';

    const npis = rendering + billing + attending + referring + facility + operating + other;

    // Remove Claim-Mapping collection if we are missing content
    if (gender === '' || npis === '') {
        const idx = content.context.collections.indexOf("Claim-Mapping");
        if (idx > -1) {
            content.context.collections.splice(idx, 1);
        }
        content.context.collections.push("DATA_ERROR");
        
        // Add specific error collection
        if (gender === '') {
            content.context.collections.push("GENDER_MISSING_ERROR");
        }

        if (npis === '') {
            content.context.collections.push("NPI_MISSING_ERROR");
        }
    }
});
