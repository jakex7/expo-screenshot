// Reexport the native module. On web, it will be resolved to ExpoScreenshotModule.web.ts
// and on native platforms to ExpoScreenshotModule.ts
export { default } from './ExpoScreenshotModule';
export { default as ExpoScreenshotView } from './ExpoScreenshotView';
export * from  './ExpoScreenshot.types';
