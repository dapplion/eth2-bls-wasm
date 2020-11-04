# exit when any command fails
set -e

# For local setups make sure emcc is activated:
# $ ./emsdk/emsdk activate
# source "./emsdk/emsdk_env.sh"

export LIB_DIR=lib/
export DIST_DIR=dist/

rm -rf $LIB_DIR
rm -rf $DIST_DIR
mkdir -p $LIB_DIR
mkdir -p $DIST_DIR

# Copy to bls-eth-wasm to prevent causing git differences
rm -rf bls-eth-wasm
cp -r -T bls-eth-wasm-upstream bls-eth-wasm

# Build herumi's C lib with emcc
rm -f bls-eth-wasm/bls_c.js && rm -f bls-eth-wasm/bls_c.wasm
cd bls && make clean && make bls-eth-wasm && cd ..
cp bls-eth-wasm/bls_c.js $LIB_DIR

# Add types
cp types/* bls-eth-wasm/
