module.exports = {
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/components$1',
    '^pages(.*)$': '<rootDir>/pages$1',
    '^helpers(.*)$': '<rootDir>/helpers$1',
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
};
