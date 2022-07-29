import { defineConfig } from "vite";
import path from 'path'
import fs from 'fs'

// resolve packages 目录下路径
const resolvePackagePath = (...filePaths: string[]) => {
  return path.resolve(__dirname, 'packages', ...filePaths)
}

// 解析 package.json
const resolvePackConfig = (pack) => {
  try {
    const packPath = resolvePackagePath(pack, 'package.json')
    const text = fs.readFileSync(packPath, 'utf8')
    return JSON.parse(text)
  } catch {
    return {}
  }
}

// 查找所有可用的 package
const resolveUsablePackages = () => {
  const packages = fs.readdirSync(resolvePackagePath())
  const ret: {[entryAlias: string]: string} = {}
  for (const pack of packages) {
    const { main, private: isPrivate } = resolvePackConfig(pack)
    if (!isPrivate) {
      if (main) {
        ret[pack] = resolvePackagePath(pack, main)
      } else {
        console.error(`ResolveUsablePackagesWarn: ${pack} has no main file`)
      }
    }
  }
  return ret
}

export default defineConfig((env) => {
  return {
    esbuild: {
      target: ['node14']
    },
    build: {
      minify: env.mode === 'production',
      rollupOptions: {
        input: resolveUsablePackages(),
        preserveEntrySignatures: "exports-only",
        output: {
          dir: resolvePackagePath(),
          preserveModules: true,
          entryFileNames: () => 'dist/index.js',
        },
      }
    },
  };
});
