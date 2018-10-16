module.exports = {
    plugins: {
        // Illustrational
        'autoprefixer': {
            "browsers": [
                "iOS >= 8",
                "Firefox >= 20",
                "Android > 4.4"
            ]
        },
        'postcss-preset-env': {
            stage: 0
        },
        'cssnano': {}
    }
}