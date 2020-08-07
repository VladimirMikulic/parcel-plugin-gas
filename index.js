const fs = require('fs');
const gasEntryGenerator = require('gas-entry-generator');

module.exports = async bundler => {
  bundler.on('bundled', bundle => {
    const bundlePath = bundle.name;
    const bundleSource = fs.readFileSync(bundlePath, 'utf8');

    const bundleForEntryGen = bundleSource.replace(/GAS\./g, 'global.');
    const gasBundle = bundleSource.replace(/GAS\./g, 'globalThis.');

    const entryFunctions = gasEntryGenerator(bundleForEntryGen);
    let finalBundle = `${entryFunctions}${gasBundle}`;

    if (bundler.options.minify) {
      finalBundle = finalBundle.split('\n').join('');
    }

    fs.writeFileSync(bundlePath, finalBundle);
  });
};
