// vue.config.js
module.exports = {
    chainWebpack: (config) => {
        // quitamos la configuración de compatibilidad global para Vue 2
        // config.resolve.alias.set('vue', '@vue/compat')
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap((options) => {
                return {
                    ...options,
                    // comentamos la configuración de compatibilidad de compilación para Vue 2
                    /*compilerOptions: {
                        compatConfig: {
                            MODE: 2
                        }
                    }*/
                }
            })
    }
}