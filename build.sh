# exit when any command fails
set -e

export TARGET_DIR=bls-eth-wasm-dist/
export DIST_DIR=dist/

mkdir -p $TARGET_DIR
mkdir -p $DIST_DIR

# Step 0: Copy to bls-eth-wasm to prevent causing git differences
cp -r bls-eth-wasm-upstream bls-eth-wasm

# Step 1: Build herumi's C lib with emcc
rm -f bls-eth-wasm/bls_c.js && rm -f bls-eth-wasm/bls_c.wasm
cd bls && make clean && make bls-eth-wasm && yarn run build:lib && cd ..
cp bls-eth-wasm/bls_c.js $TARGET_DIR
cp bls-eth-wasm/bls_c.wasm $TARGET_DIR

# Step 2: Apply custom code as a diff to herumi's JS wrapper in herumi/bls-eth-wasm
yarn patch-package
cp node_modules/@herumi/bls-eth-wasm/bls.js $TARGET_DIR
cp node_modules/@herumi/bls-eth-wasm/test.js $TARGET_DIR

# Step 3: Inline WASM code to bls.js for easy distribution of the package
rm -rf dist
yarn babel $TARGET_DIR -d $DIST_DIR --copy-files

# Step 4: Test
node $DIST_DIR/test