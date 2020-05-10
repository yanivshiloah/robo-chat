module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false
            }
        ],
        '@babel/preset-react'
    ],
    plugins: [
        'react-hot-loader/babel',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        'babel-plugin-styled-components',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining'
    ],
    env: {
        production: {
            only: ['client'],
            plugins: [
                [
                    'transform-react-remove-prop-types',
                    {
                        removeImport: true
                    }
                ],
                '@babel/plugin-transform-react-inline-elements',
                '@babel/plugin-transform-react-constant-elements'
            ]
        }
    }
};
