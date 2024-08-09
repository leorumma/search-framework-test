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

const SearchFrameworkPlugin: Plugin<SearchFrameworkOptions> = {
    install
};

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
