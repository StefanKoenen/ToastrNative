const bundlewatchConfig = {
    files: [
        {
            path: './dist/*.js',
            maxSize: '75kb',
            compression: 'none',
        },
    ],
    bundlewatchServiceHost: 'https://service.bundlewatch.io', // Can be a custom service
    // ci: {
    //     githubAccessToken: ciEnv.githubAccessToken,
    //     repoOwner: ciEnv.repoOwner,
    //     repoName: ciEnv.repoName,
    //     repoCurrentBranch: ciEnv.repoCurrentBranch,
    //     repoBranchBase: ciEnv.repoBranchBase || 'master', // Branch PR is being merged into
    //     commitSha: ciEnv.commitSha,
    //     trackBranches: ['master', 'develop'],
    // },
    defaultCompression: 'gzip',
};

module.exports = bundlewatchConfig;
