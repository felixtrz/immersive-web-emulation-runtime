/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
        preset: 'ts-jest/presets/default-esm',
        extensionsToTreatAsEsm: ['.ts'],
        moduleNameMapper: {
                '^(\\.{1,2}/.*)\\.js$': '$1',
        },
        transform: {
                '^.+\\.ts$': ['ts-jest', { useESM: true }],
        },
        testEnvironment: 'jsdom',
        collectCoverage: true,
        coverageProvider: 'v8',
       collectCoverageFrom: [
               'src/input/**/*.ts',
               'src/views/**/*.ts',
               'src/session/XRRenderState.ts',
               'src/events/**/*.ts',
       ],
       coveragePathIgnorePatterns: [
               '/node_modules/',
               '<rootDir>/src/index.ts',
               '<rootDir>/src/private.ts',
               '<rootDir>/src/version.ts',
       ],
        coverageThreshold: {
                global: { lines: 100, functions: 100, statements: 100 },
        },
};
