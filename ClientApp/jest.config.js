module.exports = {
    moduleNameMapper: {
        "^@testing-library/jest-dom/(.*)$": "<rootDir>/node_modules/@testing-library/jest-dom/$1",
        setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
    },
};