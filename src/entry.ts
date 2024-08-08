import plugin, * as components from './entry.esm.ts';

type NamedExports = Exclude<typeof components, 'default'>;
type ExtendedPlugin = typeof plugin & NamedExports;
Object.entries(components).forEach(([componentName, component]) => {
    if (componentName !== 'default') {
        const key = componentName as Exclude<keyof NamedExports, 'default'>;
        (plugin as ExtendedPlugin)[key] = component as Exclude<ExtendedPlugin, typeof plugin>;
    }
});

export default plugin;
