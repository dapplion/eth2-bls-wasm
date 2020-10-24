export TARGET_DIR=bls-eth-wasm-dist

# Apply a diff against the local submodule herumi/bls-eth-wasm
yarn patch-package

mkdir -p $TARGET_DIR
cp node_modules/@herumi/bls-eth-wasm/bls.js $TARGET_DIR
cp node_modules/@herumi/bls-eth-wasm/test.js $TARGET_DIR