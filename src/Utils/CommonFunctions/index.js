import { round } from "lodash";

export const setDecimalFormat = (currentValue) => {
    if(currentValue !== null && !isNaN(currentValue) && currentValue !== "") {
        currentValue = parseFloat(currentValue)
    } else {
        currentValue = "";
    }
    return isNaN(currentValue) || currentValue === "" ? "" : currentValue.toFixed(2)
}

export const setDecimalFormatVBalance = (currentValue, currencySelected) => {
    if(currentValue !== null && !isNaN(currentValue) && currentValue !== "") {
        if(currencySelected === "MXN $" || currencySelected === "MXN") {
            currentValue = parseFloat(currentValue).toFixed(0)
        } else {
            currentValue = parseFloat(currentValue).toFixed(2)
        }
    } else {
        currentValue = "";
    }
    return isNaN(currentValue) ? "" : currentValue
}

export const setRateFormat = (currentValue) => {
    if(isNaN(currentValue) || currentValue === "" || currentValue === null) {
        currentValue = "";
    } else if(currentValue <= 1) {
        currentValue *= 100;
        currentValue = (Math.round(parseFloat(currentValue) * 10) / 10).toFixed(2)
    } else if(currentValue > 1) {
        currentValue = (Math.round(parseFloat(+currentValue) * 10) / 10).toFixed(2)
    }
    return currentValue
}

export const setYouSaveFormat = (currentValue) => {
    if(isNaN(currentValue) || currentValue === "" || currentValue === null) {
        currentValue = "";
    } else if(currentValue <= 1) {
        currentValue *= 100;
        currentValue = roundNearest5(currentValue).toFixed(0)
    } else {
        currentValue = roundNearest5(+currentValue).toFixed(0)
    }
    return currentValue
}

export const cleanUpSpecialCharacters = (currentValue) => {
    if(currentValue) {
        currentValue = currentValue.trim().replaceAll('  ', ' ')
        const regex = /[^A-Za-z0-9\-& ]/g;
        if (currentValue.match(regex) != null) {
            let matches = currentValue.match(regex)
            matches.map((value, index) => {
                currentValue = currentValue.replaceAll(value, '');
                return true
            });
        }
        return currentValue
    }
}

export const capitalizeWords2 = (currentValue) => {
    if (!currentValue) return;

    const acronyms = {
        atv: 'ATV',
        atx: 'ATX',
        utv: 'UTV',
        utx: 'UTX',
        rv:  'RV',
        rzr: 'RZR',
        bob: 'BOB',
        suv: 'SUV',
    };

    return currentValue
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map(word => {
            // Respeta palabras con guiones
            return word
                .split('-')
                .map(part => {
                    // ACRÓNIMOS solo si es palabra completa
                    if (acronyms[part]) {
                        return acronyms[part];
                    }

                    if (part.length <= 2) return part;

                    return part.charAt(0).toUpperCase() + part.slice(1);
                })
                .join('-');
        })
        .join(' ');
};


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
                return true
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
            current_net_rate = public_price * (1 - rate);
            current_net_rate = round(current_net_rate,2).toFixed(2)
        }
    }
    return current_net_rate;
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
            case "Affiliate":
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
            case "25% Deposit":
                current_deposit = our_price * 0.25;
            break;
            case "20% Deposit":
                current_deposit = our_price * 0.2;
            break;
            case "Commission":
                current_deposit = commission;
            break;
            case "Cash Only":
                current_deposit = 0;
            break;
            case "Deposit":
                current_deposit = current_deposit;
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

const roundNearest5 = (num) => {
    return Math.round(num / 5) * 5;
}

export const titleCapitalize = (texto) => {
    const excepciones = [
        'de', 'del', 'la', 'y', 'en', 'el', 'con', 'a', 'por', 'para', // Español
        'of', 'the', 'and', 'in', 'on', 'at', 'with', 'for', 'by', 'to', 'from' // Inglés
    ];

    return texto
        .toLowerCase() // Convierte todo a minúsculas
        .split(' ') // Divide el texto en palabras
        .map((palabra, index) => {
            // Capitaliza solo si no está en la lista de excepciones o es la primera palabra
            if (excepciones.includes(palabra) && index !== 0) {
                return palabra;
            }
            return palabra.charAt(0).toUpperCase() + palabra.slice(1);
        })
        .join(' '); // Une las palabras en una cadena de texto
}

export const setDecimalFormatFee = (currentValue, extraFeeSelected) => {
    if(currentValue !== null && !isNaN(currentValue) && currentValue !== "") {
        if(+extraFeeSelected === 1) {
            currentValue = parseFloat(currentValue).toFixed(1)
        } else if(+extraFeeSelected === 2) {
            currentValue = currentValue
        } else {
            currentValue = parseFloat(currentValue).toFixed(2)
        }
    } else {
        currentValue = "";
    }
    return isNaN(currentValue) ? "" : currentValue
}