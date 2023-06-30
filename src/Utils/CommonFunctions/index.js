export const setDecimalFormat = (currentValue) => {
    return parseFloat(currentValue).toFixed(2)
}

export const setRateFormat = (currentValue) => {
    return parseFloat(currentValue).toFixed(4)
}

export const cleanUpSpecialCharacters = (currentValue) => {
    if(currentValue) {
        var currentValue = currentValue.trim().replaceAll('  ', ' ')
        const regex = /[^A-Za-z0-9\-\& ]/g;
        if (currentValue.match(regex) != null) {
            let matches = currentValue.match(regex)
            matches.map((value, index) => {
                currentValue = currentValue.replaceAll(value, '');
            });
        }
        return currentValue
    }
}

export const capitalizeWords2 = (currentValue) => {    
    if(currentValue) {        
        var currentValue = currentValue.trim().replaceAll('  ', ' ')
        return currentValue.replace(/\w*[\-\S]/g, function (txt) {
            if(txt.length > 2) {
                return txt.charAt(0).toUpperCase() + txt.slice(1);
            } else {
                return txt;
            }
        });
    }
}

export const capitalizeFirstWord = (currentValue) => {    
    if(currentValue) {        
        var currentValue = currentValue.trim().replaceAll('  ', ' ')
        return currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
    }
}

export const codeFormat = (currentValue) => {    
    if(currentValue) {        
        var currentValue = currentValue.trim().replaceAll('  ', ' ')
        if(currentValue.length > 2) {
            currentValue = currentValue.substring(0,2)
        }
        return currentValue.toUpperCase();
    } else {
        return currentValue
    }
}

export const nameFormat = (currentValue) => {    
    if(currentValue) {
        var currentValue = currentValue.trim().replaceAll('  ', ' ')
        const regex = /[^A-Za-z ]/g;
        if (currentValue.match(regex) != null) {
            let matches = currentValue.match(regex)
            matches.map((value, index) => {
                currentValue = currentValue.replaceAll(value, '');
            });
        }
        return capitalizeWords2(currentValue)
    }
}