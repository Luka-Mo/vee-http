module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'ci',
                'fix',
                'feat',
                'test',
                'perf',
                'chore',
                'version',
                'refactor'
            ]
        ]
    }
};
