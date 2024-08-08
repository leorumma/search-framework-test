// import {App, Plugin} from 'vue';
// import * as components from './index';
//
// interface SearchFrameworkOptions {
//     projectName: string;
//     prefixLabelI18n: string;
// }
//
// const install: Plugin = (app: App, options: SearchFrameworkOptions) => {
//     if (!options) {
//         app.config.globalProperties.$searchFrameworkOptions = {
//             projectName: 'projectName',
//             prefixLabelI18n: 'label',
//         };
//     } else {
//         app.config.globalProperties.$searchFrameworkOptions = options;
//     }
//     Object.entries(components).forEach(([componentName, component]) => {
//         app.component(componentName, component);
//     });
// };
//
// export default install;
//
// export * from './index';


import {App, Plugin} from 'vue';
import * as components from './index';

// Definição das opções do plugin
interface SearchFrameworkOptions {
    projectName: string;
    prefixLabelI18n: string;
}

// Função de instalação executada por Vue.use()
const install: Plugin = (app: App, options?: SearchFrameworkOptions) => {
    if (!options) {
        app.config.globalProperties.$searchFrameworkOptions = {
            projectName: 'projectName',
            prefixLabelI18n: 'label',
        };
    } else {
        app.config.globalProperties.$searchFrameworkOptions = options;
    }
    Object.entries(components).forEach(([componentName, component]) => {
        app.component(componentName, component);
    });
};

// Definindo o plugin explicitamente como um objeto com a função install
const SearchFrameworkPlugin: Plugin = {
    install
};

// Anexar exportações nomeadas diretamente ao plugin
type NamedExports = Exclude<typeof components, 'default'>;
type ExtendedPlugin = typeof SearchFrameworkPlugin & NamedExports;
Object.entries(components).forEach(([componentName, component]) => {
    if (componentName !== 'default') {
        const key = componentName as Exclude<keyof NamedExports, 'default'>;
        (SearchFrameworkPlugin as ExtendedPlugin)[key] = component as Exclude<ExtendedPlugin, typeof SearchFrameworkPlugin>;
    }
});

export default SearchFrameworkPlugin;
export * from './index';
