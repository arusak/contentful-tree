import { visualizer } from 'rollup-plugin-visualizer'
import templates, { type TemplateType } from 'rollup-plugin-visualizer/dist/plugin/template-types'

const visualisationType = process.env.VISUALIZER || ''
const isTemplateType = (value: string): value is TemplateType =>
  (templates as unknown as { default: TemplateType[] }).default.map(String).includes(value)

// use template types as VISUALIZER env variables to show bundle stats
export const visualizationPlugin = () =>
  isTemplateType(visualisationType)
    ? {
        ...visualizer({
          gzipSize: true,
          open: true,
          template: visualisationType,
          filename: 'dist/bundle-stats.html',
        }),
      }
    : undefined
