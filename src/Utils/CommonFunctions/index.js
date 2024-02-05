export const setDecimalFormat = (currentValue) => {
    if(currentValue !== null && !isNaN(currentValue) && currentValue !== "") {
        currentValue = parseFloat(currentValue).toFixed(2)
    } else {
        currentValue = "0.00";
    }
    return isNaN(currentValue) ? "0.00" : currentValue
}

export const setRateFormat = (currentValue) => {
    if(isNaN(currentValue)) {
        currentValue = 0;
    } 
    if(currentValue <= 1) {
        currentValue *= 100;
    }
    return parseFloat(currentValue).toFixed(2)
}

export const cleanUpSpecialCharacters = (currentValue) => {
    if(currentValue) {
        currentValue = currentValue.trim().replaceAll('  ', ' ')
        const regex = /[^A-Za-z0-9\-& ]/g;
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
        currentValue = currentValue.trim().replaceAll('  ', ' ')
        return currentValue.replace(/\w*[-\S]/g, function (txt) {
            if(txt.length > 2) {
                let text = txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
                return text.replace("Atv", "ATV").replace("Atx", "ATX");
            } else {
                return txt;
            }
        });
    }
}

export const capitalizeFirstWord = (currentValue) => {    
    if(currentValue) {        
        currentValue = currentValue.trim().replaceAll('  ', ' ')
        return currentValue.charAt(0).toUpperCase() + currentValue.slice(1).toLowerCase();
    }
}

export const codeFormat = (currentValue) => {    
    if(currentValue) {        
        currentValue = currentValue.trim().replaceAll('  ', ' ')
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
        currentValue = currentValue.trim().replaceAll('  ', ' ')
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

export const calcNetRate = (public_price, rate, current_net_rate) => {
    if(rate !== null && !isNaN(rate) && rate !== "") {
        if(rate > 1) {
            rate /= 100;
        }
        if(public_price != null && !isNaN(public_price) && public_price !== "") {
            current_net_rate = public_price * rate;
        }
    }
    return parseFloat(current_net_rate).toFixed(2);
}

export const calcYouSave = (our_price, ship_price, compare_at, current_you_save) => {
    if(ship_price !== null && !isNaN(ship_price) && ship_price !== "" && ship_price > 0) {
        current_you_save = (1 - (our_price/ship_price)) * 100;
    } else if (compare_at !== null && !isNaN(compare_at) && compare_at !== "" && compare_at > 0) {
        current_you_save = (1 - (our_price/compare_at)) * 100;
    }
    if(current_you_save === 100) {
        return ""
    }
    return parseFloat(current_you_save).toFixed(0) + ".00";
}

export const calcEffRate = (net_price, our_price, current_eff_rate) => {
    if(our_price !== null && !isNaN(our_price) && our_price !== "" && our_price > 0) {
        if(net_price !== null && !isNaN(net_price) && net_price !== "") {
            current_eff_rate = (1 - (net_price/our_price)) * 100;
        }
    }
    return parseFloat(current_eff_rate).toFixed(2);
}
export const calcCommission = (our_price, rate, current_commission) => {
    if(our_price !== null && !isNaN(our_price) && our_price !== "") {
        if(rate !== null && !isNaN(rate) && rate !== "") {
            if(rate > 1) {
                rate /= 100
            }
            current_commission = our_price * rate;
        }
    }
    return parseFloat(current_commission).toFixed(2);
}

export const calcDeposit = (our_price, collect, commission, current_deposit) => {
    if(our_price !== null && !isNaN(our_price) && our_price !== "") {
        switch (collect) {
            case "100% Deposit":
                current_deposit = our_price;
            break;
            case "50% Deposit":
                current_deposit = our_price * 0.5;
            break;
            case "40% Deposit":
                current_deposit = our_price * 0.4;
            break;
            case "35% Deposit":
                current_deposit = our_price * 0.35;
            break;
            case "30% Deposit":
                current_deposit = our_price * 0.3;
            break;
            case "20% Deposit":
                current_deposit = our_price * 0.2;
            break;
            case "Commission":
                current_deposit = commission;
            break;
            default:
            break;
        }
    }
    return parseFloat(current_deposit).toFixed(2);
}

export const calcNetPrice = (our_price, commission, current_net_price) => {
    if(our_price !== null && !isNaN(our_price) && our_price !== "") {
        if(commission !== null && !isNaN(commission) && commission !== "") {
            current_net_price = our_price - commission;
        }
    }
    return parseFloat(current_net_price).toFixed(2);
}