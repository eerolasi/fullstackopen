"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(g => g.toString()).includes(param);
};
const parseName = (name) => {
    if (!isString(name)) {
        throw new Error('Incorrent or missing name');
    }
    return name;
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrent or missing date: ' + date);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!isString(ssn)) {
        throw new Error('Incorrent or missing name');
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!isString(occupation)) {
        throw new Error('Incorrent or missing name');
    }
    return occupation;
};
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        const newPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: []
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.default = toNewPatient;
