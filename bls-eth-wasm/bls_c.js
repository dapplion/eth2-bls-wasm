
var Module = (function() {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(Module) {
  Module = Module || {};

var Module=typeof Module!=="undefined"?Module:{};var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var arguments_=[];var thisProgram="./this.program";var quit_=function(status,toThrow){throw toThrow};var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof process.versions==="object"&&typeof process.versions.node==="string";ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;var nodeFS;var nodePath;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=function shell_read(filename,binary){if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);return nodeFS["readFileSync"](filename,binary?null:"utf8")};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);quit_=function(status){process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){read_=function shell_read(f){return read(f)}}readBinary=function readBinary(f){var data;if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){arguments_=scriptArgs}else if(typeof arguments!="undefined"){arguments_=arguments}if(typeof quit==="function"){quit_=function(status){quit(status)}}if(typeof print!=="undefined"){if(typeof console==="undefined")console={};console.log=print;console.warn=console.error=typeof printErr!=="undefined"?printErr:print}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(document.currentScript){scriptDirectory=document.currentScript.src}if(_scriptDir){scriptDirectory=_scriptDir}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=function shell_read(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=function readBinary(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=function(title){document.title=title}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime;if(Module["noExitRuntime"])noExitRuntime=Module["noExitRuntime"];if(typeof WebAssembly!=="object"){err("no native wasm support detected")}var wasmMemory;var wasmTable=new WebAssembly.Table({"initial":197,"maximum":197+0,"element":"anyfunc"});var ABORT=false;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;var WASM_PAGE_SIZE=65536;var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var DYNAMIC_BASE=5272016,DYNAMICTOP_PTR=28976;var INITIAL_INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;if(Module["wasmMemory"]){wasmMemory=Module["wasmMemory"]}else{wasmMemory=new WebAssembly.Memory({"initial":INITIAL_INITIAL_MEMORY/WASM_PAGE_SIZE,"maximum":INITIAL_INITIAL_MEMORY/WASM_PAGE_SIZE})}if(wasmMemory){buffer=wasmMemory.buffer}INITIAL_INITIAL_MEMORY=buffer.byteLength;updateGlobalBufferAndViews(buffer);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what+="";out(what);err(what);ABORT=true;EXITSTATUS=1;what="abort("+what+"). Build with -s ASSERTIONS=1 for more info.";throw new WebAssembly.RuntimeError(what)}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return String.prototype.startsWith?filename.startsWith(dataURIPrefix):filename.indexOf(dataURIPrefix)===0}var wasmBinaryFile="bls_c.wasm";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(){try{if(wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(wasmBinaryFile)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary()})}return new Promise(function(resolve,reject){resolve(getBinary())})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiatedSource(output){receiveInstance(output["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&typeof fetch==="function"){fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiatedSource,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");instantiateArrayBuffer(receiveInstantiatedSource)})})}else{return instantiateArrayBuffer(receiveInstantiatedSource)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}__ATINIT__.push({func:function(){___wasm_call_ctors()}});function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}function _emscripten_resize_heap(requestedSize){return false}var asmLibraryArg={"a":_emscripten_memcpy_big,"b":_emscripten_resize_heap,"memory":wasmMemory,"table":wasmTable};var asm=createWasm();Module["asm"]=asm;var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["c"]).apply(null,arguments)};var _blsSetETHmode=Module["_blsSetETHmode"]=function(){return(_blsSetETHmode=Module["_blsSetETHmode"]=Module["asm"]["d"]).apply(null,arguments)};var _blsInit=Module["_blsInit"]=function(){return(_blsInit=Module["_blsInit"]=Module["asm"]["e"]).apply(null,arguments)};var _blsSetETHserialization=Module["_blsSetETHserialization"]=function(){return(_blsSetETHserialization=Module["_blsSetETHserialization"]=Module["asm"]["f"]).apply(null,arguments)};var _blsMalloc=Module["_blsMalloc"]=function(){return(_blsMalloc=Module["_blsMalloc"]=Module["asm"]["g"]).apply(null,arguments)};var _blsFree=Module["_blsFree"]=function(){return(_blsFree=Module["_blsFree"]=Module["asm"]["h"]).apply(null,arguments)};var _blsIdSetInt=Module["_blsIdSetInt"]=function(){return(_blsIdSetInt=Module["_blsIdSetInt"]=Module["asm"]["i"]).apply(null,arguments)};var _blsSecretKeySetLittleEndian=Module["_blsSecretKeySetLittleEndian"]=function(){return(_blsSecretKeySetLittleEndian=Module["_blsSecretKeySetLittleEndian"]=Module["asm"]["j"]).apply(null,arguments)};var _blsSecretKeySetLittleEndianMod=Module["_blsSecretKeySetLittleEndianMod"]=function(){return(_blsSecretKeySetLittleEndianMod=Module["_blsSecretKeySetLittleEndianMod"]=Module["asm"]["k"]).apply(null,arguments)};var _blsGetPublicKey=Module["_blsGetPublicKey"]=function(){return(_blsGetPublicKey=Module["_blsGetPublicKey"]=Module["asm"]["l"]).apply(null,arguments)};var _blsHashToSignature=Module["_blsHashToSignature"]=function(){return(_blsHashToSignature=Module["_blsHashToSignature"]=Module["asm"]["m"]).apply(null,arguments)};var _blsSign=Module["_blsSign"]=function(){return(_blsSign=Module["_blsSign"]=Module["asm"]["n"]).apply(null,arguments)};var _blsVerify=Module["_blsVerify"]=function(){return(_blsVerify=Module["_blsVerify"]=Module["asm"]["o"]).apply(null,arguments)};var _blsMultiVerify=Module["_blsMultiVerify"]=function(){return(_blsMultiVerify=Module["_blsMultiVerify"]=Module["asm"]["p"]).apply(null,arguments)};var _blsAggregateSignature=Module["_blsAggregateSignature"]=function(){return(_blsAggregateSignature=Module["_blsAggregateSignature"]=Module["asm"]["q"]).apply(null,arguments)};var _blsSignatureAdd=Module["_blsSignatureAdd"]=function(){return(_blsSignatureAdd=Module["_blsSignatureAdd"]=Module["asm"]["r"]).apply(null,arguments)};var _blsPublicKeyAdd=Module["_blsPublicKeyAdd"]=function(){return(_blsPublicKeyAdd=Module["_blsPublicKeyAdd"]=Module["asm"]["s"]).apply(null,arguments)};var _blsFastAggregateVerify=Module["_blsFastAggregateVerify"]=function(){return(_blsFastAggregateVerify=Module["_blsFastAggregateVerify"]=Module["asm"]["t"]).apply(null,arguments)};var _blsAggregateVerifyNoCheck=Module["_blsAggregateVerifyNoCheck"]=function(){return(_blsAggregateVerifyNoCheck=Module["_blsAggregateVerifyNoCheck"]=Module["asm"]["u"]).apply(null,arguments)};var _blsIdSerialize=Module["_blsIdSerialize"]=function(){return(_blsIdSerialize=Module["_blsIdSerialize"]=Module["asm"]["v"]).apply(null,arguments)};var _blsSecretKeySerialize=Module["_blsSecretKeySerialize"]=function(){return(_blsSecretKeySerialize=Module["_blsSecretKeySerialize"]=Module["asm"]["w"]).apply(null,arguments)};var _blsPublicKeySerialize=Module["_blsPublicKeySerialize"]=function(){return(_blsPublicKeySerialize=Module["_blsPublicKeySerialize"]=Module["asm"]["x"]).apply(null,arguments)};var _blsSignatureSerialize=Module["_blsSignatureSerialize"]=function(){return(_blsSignatureSerialize=Module["_blsSignatureSerialize"]=Module["asm"]["y"]).apply(null,arguments)};var _blsIdDeserialize=Module["_blsIdDeserialize"]=function(){return(_blsIdDeserialize=Module["_blsIdDeserialize"]=Module["asm"]["z"]).apply(null,arguments)};var _blsSecretKeyDeserialize=Module["_blsSecretKeyDeserialize"]=function(){return(_blsSecretKeyDeserialize=Module["_blsSecretKeyDeserialize"]=Module["asm"]["A"]).apply(null,arguments)};var _blsPublicKeyDeserialize=Module["_blsPublicKeyDeserialize"]=function(){return(_blsPublicKeyDeserialize=Module["_blsPublicKeyDeserialize"]=Module["asm"]["B"]).apply(null,arguments)};var _blsSignatureDeserialize=Module["_blsSignatureDeserialize"]=function(){return(_blsSignatureDeserialize=Module["_blsSignatureDeserialize"]=Module["asm"]["C"]).apply(null,arguments)};var _blsIdIsEqual=Module["_blsIdIsEqual"]=function(){return(_blsIdIsEqual=Module["_blsIdIsEqual"]=Module["asm"]["D"]).apply(null,arguments)};var _blsSecretKeyIsEqual=Module["_blsSecretKeyIsEqual"]=function(){return(_blsSecretKeyIsEqual=Module["_blsSecretKeyIsEqual"]=Module["asm"]["E"]).apply(null,arguments)};var _blsPublicKeyIsEqual=Module["_blsPublicKeyIsEqual"]=function(){return(_blsPublicKeyIsEqual=Module["_blsPublicKeyIsEqual"]=Module["asm"]["F"]).apply(null,arguments)};var _blsSignatureIsEqual=Module["_blsSignatureIsEqual"]=function(){return(_blsSignatureIsEqual=Module["_blsSignatureIsEqual"]=Module["asm"]["G"]).apply(null,arguments)};var _blsIdIsZero=Module["_blsIdIsZero"]=function(){return(_blsIdIsZero=Module["_blsIdIsZero"]=Module["asm"]["H"]).apply(null,arguments)};var _blsSecretKeyIsZero=Module["_blsSecretKeyIsZero"]=function(){return(_blsSecretKeyIsZero=Module["_blsSecretKeyIsZero"]=Module["asm"]["I"]).apply(null,arguments)};var _blsPublicKeyIsZero=Module["_blsPublicKeyIsZero"]=function(){return(_blsPublicKeyIsZero=Module["_blsPublicKeyIsZero"]=Module["asm"]["J"]).apply(null,arguments)};var _blsSignatureIsZero=Module["_blsSignatureIsZero"]=function(){return(_blsSignatureIsZero=Module["_blsSignatureIsZero"]=Module["asm"]["K"]).apply(null,arguments)};var _blsSecretKeyShare=Module["_blsSecretKeyShare"]=function(){return(_blsSecretKeyShare=Module["_blsSecretKeyShare"]=Module["asm"]["L"]).apply(null,arguments)};var _blsPublicKeyShare=Module["_blsPublicKeyShare"]=function(){return(_blsPublicKeyShare=Module["_blsPublicKeyShare"]=Module["asm"]["M"]).apply(null,arguments)};var _blsSecretKeyRecover=Module["_blsSecretKeyRecover"]=function(){return(_blsSecretKeyRecover=Module["_blsSecretKeyRecover"]=Module["asm"]["N"]).apply(null,arguments)};var _blsPublicKeyRecover=Module["_blsPublicKeyRecover"]=function(){return(_blsPublicKeyRecover=Module["_blsPublicKeyRecover"]=Module["asm"]["O"]).apply(null,arguments)};var _blsSignatureRecover=Module["_blsSignatureRecover"]=function(){return(_blsSignatureRecover=Module["_blsSignatureRecover"]=Module["asm"]["P"]).apply(null,arguments)};var _blsSecretKeyAdd=Module["_blsSecretKeyAdd"]=function(){return(_blsSecretKeyAdd=Module["_blsSecretKeyAdd"]=Module["asm"]["Q"]).apply(null,arguments)};var _blsSignatureVerifyOrder=Module["_blsSignatureVerifyOrder"]=function(){return(_blsSignatureVerifyOrder=Module["_blsSignatureVerifyOrder"]=Module["asm"]["R"]).apply(null,arguments)};var _blsPublicKeyVerifyOrder=Module["_blsPublicKeyVerifyOrder"]=function(){return(_blsPublicKeyVerifyOrder=Module["_blsPublicKeyVerifyOrder"]=Module["asm"]["S"]).apply(null,arguments)};var _blsSignatureIsValidOrder=Module["_blsSignatureIsValidOrder"]=function(){return(_blsSignatureIsValidOrder=Module["_blsSignatureIsValidOrder"]=Module["asm"]["T"]).apply(null,arguments)};var _blsPublicKeyIsValidOrder=Module["_blsPublicKeyIsValidOrder"]=function(){return(_blsPublicKeyIsValidOrder=Module["_blsPublicKeyIsValidOrder"]=Module["asm"]["U"]).apply(null,arguments)};var _blsVerifyAggregatedHashes=Module["_blsVerifyAggregatedHashes"]=function(){return(_blsVerifyAggregatedHashes=Module["_blsVerifyAggregatedHashes"]=Module["asm"]["V"]).apply(null,arguments)};var _blsSignHash=Module["_blsSignHash"]=function(){return(_blsSignHash=Module["_blsSignHash"]=Module["asm"]["W"]).apply(null,arguments)};var _blsPublicKeySerializeUncompressed=Module["_blsPublicKeySerializeUncompressed"]=function(){return(_blsPublicKeySerializeUncompressed=Module["_blsPublicKeySerializeUncompressed"]=Module["asm"]["X"]).apply(null,arguments)};var _blsSignatureSerializeUncompressed=Module["_blsSignatureSerializeUncompressed"]=function(){return(_blsSignatureSerializeUncompressed=Module["_blsSignatureSerializeUncompressed"]=Module["asm"]["Y"]).apply(null,arguments)};var _blsPublicKeyDeserializeUncompressed=Module["_blsPublicKeyDeserializeUncompressed"]=function(){return(_blsPublicKeyDeserializeUncompressed=Module["_blsPublicKeyDeserializeUncompressed"]=Module["asm"]["Z"]).apply(null,arguments)};var _blsSignatureDeserializeUncompressed=Module["_blsSignatureDeserializeUncompressed"]=function(){return(_blsSignatureDeserializeUncompressed=Module["_blsSignatureDeserializeUncompressed"]=Module["asm"]["_"]).apply(null,arguments)};var _blsVerifyPairing=Module["_blsVerifyPairing"]=function(){return(_blsVerifyPairing=Module["_blsVerifyPairing"]=Module["asm"]["$"]).apply(null,arguments)};var _blsVerifyHash=Module["_blsVerifyHash"]=function(){return(_blsVerifyHash=Module["_blsVerifyHash"]=Module["asm"]["aa"]).apply(null,arguments)};var _blsSecretKeySub=Module["_blsSecretKeySub"]=function(){return(_blsSecretKeySub=Module["_blsSecretKeySub"]=Module["asm"]["ba"]).apply(null,arguments)};var _blsPublicKeySub=Module["_blsPublicKeySub"]=function(){return(_blsPublicKeySub=Module["_blsPublicKeySub"]=Module["asm"]["ca"]).apply(null,arguments)};var _blsSignatureSub=Module["_blsSignatureSub"]=function(){return(_blsSignatureSub=Module["_blsSignatureSub"]=Module["asm"]["da"]).apply(null,arguments)};var _blsGetOpUnitSize=Module["_blsGetOpUnitSize"]=function(){return(_blsGetOpUnitSize=Module["_blsGetOpUnitSize"]=Module["asm"]["ea"]).apply(null,arguments)};var _blsGetCurveOrder=Module["_blsGetCurveOrder"]=function(){return(_blsGetCurveOrder=Module["_blsGetCurveOrder"]=Module["asm"]["fa"]).apply(null,arguments)};var _blsGetFieldOrder=Module["_blsGetFieldOrder"]=function(){return(_blsGetFieldOrder=Module["_blsGetFieldOrder"]=Module["asm"]["ga"]).apply(null,arguments)};var _blsGetSerializedSecretKeyByteSize=Module["_blsGetSerializedSecretKeyByteSize"]=function(){return(_blsGetSerializedSecretKeyByteSize=Module["_blsGetSerializedSecretKeyByteSize"]=Module["asm"]["ha"]).apply(null,arguments)};var _blsGetFrByteSize=Module["_blsGetFrByteSize"]=function(){return(_blsGetFrByteSize=Module["_blsGetFrByteSize"]=Module["asm"]["ia"]).apply(null,arguments)};var _blsGetSerializedPublicKeyByteSize=Module["_blsGetSerializedPublicKeyByteSize"]=function(){return(_blsGetSerializedPublicKeyByteSize=Module["_blsGetSerializedPublicKeyByteSize"]=Module["asm"]["ja"]).apply(null,arguments)};var _blsGetG1ByteSize=Module["_blsGetG1ByteSize"]=function(){return(_blsGetG1ByteSize=Module["_blsGetG1ByteSize"]=Module["asm"]["ka"]).apply(null,arguments)};var _blsGetSerializedSignatureByteSize=Module["_blsGetSerializedSignatureByteSize"]=function(){return(_blsGetSerializedSignatureByteSize=Module["_blsGetSerializedSignatureByteSize"]=Module["asm"]["la"]).apply(null,arguments)};var _blsGetGeneratorOfPublicKey=Module["_blsGetGeneratorOfPublicKey"]=function(){return(_blsGetGeneratorOfPublicKey=Module["_blsGetGeneratorOfPublicKey"]=Module["asm"]["ma"]).apply(null,arguments)};var _blsIdSetDecStr=Module["_blsIdSetDecStr"]=function(){return(_blsIdSetDecStr=Module["_blsIdSetDecStr"]=Module["asm"]["na"]).apply(null,arguments)};var _blsIdSetHexStr=Module["_blsIdSetHexStr"]=function(){return(_blsIdSetHexStr=Module["_blsIdSetHexStr"]=Module["asm"]["oa"]).apply(null,arguments)};var _blsIdSetLittleEndian=Module["_blsIdSetLittleEndian"]=function(){return(_blsIdSetLittleEndian=Module["_blsIdSetLittleEndian"]=Module["asm"]["pa"]).apply(null,arguments)};var _blsIdGetDecStr=Module["_blsIdGetDecStr"]=function(){return(_blsIdGetDecStr=Module["_blsIdGetDecStr"]=Module["asm"]["qa"]).apply(null,arguments)};var _blsIdGetHexStr=Module["_blsIdGetHexStr"]=function(){return(_blsIdGetHexStr=Module["_blsIdGetHexStr"]=Module["asm"]["ra"]).apply(null,arguments)};var _blsHashToSecretKey=Module["_blsHashToSecretKey"]=function(){return(_blsHashToSecretKey=Module["_blsHashToSecretKey"]=Module["asm"]["sa"]).apply(null,arguments)};var _blsGetPop=Module["_blsGetPop"]=function(){return(_blsGetPop=Module["_blsGetPop"]=Module["asm"]["ta"]).apply(null,arguments)};var _blsVerifyPop=Module["_blsVerifyPop"]=function(){return(_blsVerifyPop=Module["_blsVerifyPop"]=Module["asm"]["ua"]).apply(null,arguments)};var _blsIdGetLittleEndian=Module["_blsIdGetLittleEndian"]=function(){return(_blsIdGetLittleEndian=Module["_blsIdGetLittleEndian"]=Module["asm"]["va"]).apply(null,arguments)};var _blsSecretKeySetDecStr=Module["_blsSecretKeySetDecStr"]=function(){return(_blsSecretKeySetDecStr=Module["_blsSecretKeySetDecStr"]=Module["asm"]["wa"]).apply(null,arguments)};var _blsSecretKeySetHexStr=Module["_blsSecretKeySetHexStr"]=function(){return(_blsSecretKeySetHexStr=Module["_blsSecretKeySetHexStr"]=Module["asm"]["xa"]).apply(null,arguments)};var _blsSecretKeyGetLittleEndian=Module["_blsSecretKeyGetLittleEndian"]=function(){return(_blsSecretKeyGetLittleEndian=Module["_blsSecretKeyGetLittleEndian"]=Module["asm"]["ya"]).apply(null,arguments)};var _blsSecretKeyGetDecStr=Module["_blsSecretKeyGetDecStr"]=function(){return(_blsSecretKeyGetDecStr=Module["_blsSecretKeyGetDecStr"]=Module["asm"]["za"]).apply(null,arguments)};var _blsSecretKeyGetHexStr=Module["_blsSecretKeyGetHexStr"]=function(){return(_blsSecretKeyGetHexStr=Module["_blsSecretKeyGetHexStr"]=Module["asm"]["Aa"]).apply(null,arguments)};var _blsPublicKeySetHexStr=Module["_blsPublicKeySetHexStr"]=function(){return(_blsPublicKeySetHexStr=Module["_blsPublicKeySetHexStr"]=Module["asm"]["Ba"]).apply(null,arguments)};var _blsPublicKeyGetHexStr=Module["_blsPublicKeyGetHexStr"]=function(){return(_blsPublicKeyGetHexStr=Module["_blsPublicKeyGetHexStr"]=Module["asm"]["Ca"]).apply(null,arguments)};var _blsSignatureSetHexStr=Module["_blsSignatureSetHexStr"]=function(){return(_blsSignatureSetHexStr=Module["_blsSignatureSetHexStr"]=Module["asm"]["Da"]).apply(null,arguments)};var _blsSignatureGetHexStr=Module["_blsSignatureGetHexStr"]=function(){return(_blsSignatureGetHexStr=Module["_blsSignatureGetHexStr"]=Module["asm"]["Ea"]).apply(null,arguments)};var _blsDHKeyExchange=Module["_blsDHKeyExchange"]=function(){return(_blsDHKeyExchange=Module["_blsDHKeyExchange"]=Module["asm"]["Fa"]).apply(null,arguments)};var _blsMultiAggregateSignature=Module["_blsMultiAggregateSignature"]=function(){return(_blsMultiAggregateSignature=Module["_blsMultiAggregateSignature"]=Module["asm"]["Ga"]).apply(null,arguments)};var _blsMultiAggregatePublicKey=Module["_blsMultiAggregatePublicKey"]=function(){return(_blsMultiAggregatePublicKey=Module["_blsMultiAggregatePublicKey"]=Module["asm"]["Ha"]).apply(null,arguments)};var dynCall_vi=Module["dynCall_vi"]=function(){return(dynCall_vi=Module["dynCall_vi"]=Module["asm"]["Ia"]).apply(null,arguments)};Module["asm"]=asm;var calledRun;Module["then"]=function(func){if(calledRun){func(Module)}else{var old=Module["onRuntimeInitialized"];Module["onRuntimeInitialized"]=function(){if(old)old();func(Module)}}return Module};dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0)return;function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}noExitRuntime=true;run();


  return Module
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
      module.exports = Module;
    else if (typeof define === 'function' && define['amd'])
      define([], function() { return Module; });
    else if (typeof exports === 'object')
      exports["Module"] = Module;
    