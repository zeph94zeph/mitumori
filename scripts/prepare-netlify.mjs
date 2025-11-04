#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const clientDir = path.join(projectRoot, 'client');
const distDir = path.join(clientDir, 'dist');
const outputDir = path.join(projectRoot, 'netlify-deploy');

console.log('\n=== Netlify 配布用フォルダ作成スクリプト ===');
console.log('1. フロントエンドのビルドを実行します...');
try {
  execSync('npm --workspace client run build', {
    cwd: projectRoot,
    stdio: 'inherit',
  });
} catch (error) {
  console.error('\nビルドに失敗しました。依存関係が不足している、もしくはビルドエラーが発生しています。');
  process.exit(error.status ?? 1);
}

if (!existsSync(distDir)) {
  console.error(`\nビルド成果物が見つかりませんでした: ${distDir}`);
  process.exit(1);
}

console.log('2. 既存の netlify-deploy フォルダを削除します...');
rmSync(outputDir, { force: true, recursive: true });

console.log('3. netlify-deploy フォルダを作成し、dist の内容をコピーします...');
mkdirSync(outputDir, { recursive: true });
cpSync(distDir, outputDir, { recursive: true });

const netlifyToml = path.join(projectRoot, 'netlify.toml');
if (existsSync(netlifyToml)) {
  console.log('4. netlify.toml を同梱します...');
  cpSync(netlifyToml, path.join(outputDir, 'netlify.toml'));
}

console.log('\n完了しました。netlify-deploy フォルダを Zip 化して Netlify Drop にアップロードするか、Netlify CLI の deploy コマンドに指定してください。');
