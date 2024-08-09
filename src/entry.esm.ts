import {App, Plugin} from 'vue';
import * as components from './index';

interface SearchFrameworkOptions {
    projectName: string;
    prefixLabelI18n: string;
}

const install: Plugin<SearchFrameworkOptions> = (app: App, options?: SearchFrameworkOptions) => {
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

const SearchFrameworkVue3: Plugin<SearchFrameworkOptions> = {
    install
};

type NamedExports = Exclude<typeof components, 'default'>;
type ExtendedPlugin = typeof SearchFrameworkVue3 & NamedExports;
Object.entries(components).forEach(([componentName, component]) => {
    if (componentName !== 'default') {
        const key = componentName as Exclude<keyof NamedExports, 'default'>;
        (SearchFrameworkVue3 as ExtendedPlugin)[key] = component as Exclude<ExtendedPlugin, typeof SearchFrameworkVue3>;
    }
});

export default SearchFrameworkVue3;
export * from './index';
