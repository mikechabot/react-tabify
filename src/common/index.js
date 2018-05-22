import React from 'react';
import Maybe from 'maybe-baby';
import { Tab } from '../components';

export const __hasValues = (...values) => {
    return values.every(value => __hasValue(value));
};

export const __hasValue = val => {
    return val !== undefined && val !== null;
};

export const __isEmpty = obj => {
    if (!obj) return true;
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const __valOrDefault = (accessor, defaultValue) => {
    return Maybe.of(accessor)
        .orElse(defaultValue)
        .join();
};

export const __getType = instance => {
    if (!instance.type) return 'Unknown';
    if (typeof instance.type === 'function') {
        return instance.type.name;
    }
    return instance.type;
};

export const __logTypeMismatches = typeMismatches => {
    if (!typeMismatches) return;
    typeMismatches.forEach(typeMismatch => {
        console.error(
            `Expected children of "Tabs" to be of type "Tab", but found type "${__getType(
                typeMismatch
            )}"`
        );
    });
};

export const __getTypeMismatches = tabs => {
    if (!tabs) return [];
    return tabs.filter(child => child.type !== <Tab />.type);
};
