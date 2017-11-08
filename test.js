const bls = require('./bls.js')
const assert = require('assert')

bls.init()
  .then(() => {
    const order = bls.capi.blsGetCurveOrder()
    console.log('order=' + order)
    signatureTest()
    pairingTest()
    miscTest()
    shareTest()
    console.log('all ok')
    benchAll()
  })

function signatureTest() {
  const sec = new bls.SecretKey()

  sec.setByCSPRNG()
  sec.dump('secretKey ')

  const pub = sec.getPublicKey()
  pub.dump('publicKey ')

  const msg = 'doremifa'
  console.log('msg ' + msg)
  const sig = sec.sign(msg)
  sig.dump('signature ')

  assert(pub.verify(sig, msg))
}

function pairingTest() {
  const capi = bls.capi
  const a = capi.mclBnFr_malloc()
  const b = capi.mclBnFr_malloc()
  const ab = capi.mclBnFr_malloc()
  const P = capi.mclBnG1_malloc()
  const aP = capi.mclBnG1_malloc()
  const Q = capi.mclBnG2_malloc()
  const bQ = capi.mclBnG2_malloc()
  const e1 = capi.mclBnGT_malloc()
  const e2 = capi.mclBnGT_malloc()

  capi.mclBnFr_setStr(a, '123')
  capi.mclBnFr_setStr(b, '456')
  capi.mclBnFr_mul(ab, a, b)
  assert.equal(capi.mclBnFr_getStr(ab), 123 * 456)

  capi.mclBnG1_hashAndMapTo(P, 'aaa')
  capi.mclBnG2_hashAndMapTo(Q, 'bbb')
  capi.mclBnG1_mul(aP, P, a)
  capi.mclBnG2_mul(bQ, Q, b)

  capi.mclBn_pairing(e1, P, Q);
  capi.mclBn_pairing(e2, aP, bQ);
  capi.mclBnGT_pow(e1, e1, ab)
  assert(capi.mclBnGT_isEqual(e1, e2), 'e(aP, bQ) == e(P, Q)^ab')

  capi.mcl_free(e2)
  capi.mcl_free(e1)
  capi.mcl_free(bQ)
  capi.mcl_free(Q)
  capi.mcl_free(aP)
  capi.mcl_free(P)
  capi.mcl_free(ab)
  capi.mcl_free(b)
  capi.mcl_free(a)
}

function bench(label, count, func) {
  const start = Date.now()
  for (let i = 0; i < count; i++) {
    func()
  }
  const end = Date.now()
  const t = (end - start) / count
  console.log(label + ' ' + t)
}

function benchPairing() {
  const capi = bls.capi
  const a = capi.mclBnFr_malloc()
  const P = capi.mclBnG1_malloc()
  const Q = capi.mclBnG2_malloc()
  const e = capi.mclBnGT_malloc()

  const msg = 'hello wasm'

  capi.mclBnFr_setByCSPRNG(a)
  capi.mclBnG1_hashAndMapTo(P, 'abc')
  capi.mclBnG2_hashAndMapTo(Q, 'abc')
  bench('time_pairing', 50, () => capi.mclBn_pairing(e, P, Q))
  bench('time_g1mul', 50, () => capi.mclBnG1_mulCT(P, P, a))
  bench('time_g2mul', 50, () => capi.mclBnG2_mulCT(Q, Q, a))
  bench('time_mapToG1', 50, () => capi.mclBnG1_hashAndMapTo(P, msg))

  capi.mcl_free(e)
  capi.mcl_free(Q)
  capi.mcl_free(P)

  const sec = new bls.SecretKey()
  bench('time_setByCSPRNG', 50, () => sec.setByCSPRNG())
}

function benchBls() {
  const msg = 'hello wasm'
  {
    const capi = bls.capi
    const sec = capi.blsSecretKey_malloc()
    const pub = capi.blsPublicKey_malloc()
    const sig = capi.blsSignature_malloc()

    capi.blsSecretKeySetByCSPRNG(sec)
    bench('time_sign', 50, () => capi.blsSign(sig, sec, msg))
    bench('time_verify', 50, () => capi.blsVerify(sig, pub, msg))

    capi.bls_free(sec)
    capi.bls_free(pub)
    capi.bls_free(sig)
  }
  {
    const sec = new bls.SecretKey()
    sec.setByCSPRNG()
    const pub = sec.getPublicKey()
    bench('time_sign_class', 50, () => sec.sign(msg))
    const sig = sec.sign(msg)
    bench('time_verify_class', 50, () => pub.verify(sig, msg))
  }
}

function benchAll() {
  benchPairing()
  benchBls()
}

/*
  return [min, max)
  assume min < max
*/
function randRange(min, max) {
  return min + Math.floor(Math.random() * (max - min))
}

/*
  select k of [0, n)
  @note not uniformal distribution
*/
function randSelect(k, n) {
  let a = []
  let prev = -1
  for (let i = 0; i < k; i++) {
    const v = randRange(prev + 1, n - (k - i) + 1)
    a.push(v)
    prev = v
  }
  return a
}

function miscTest()
{
  const idDec = '65535'
  const id = new bls.Id()
  id.setStr(idDec)
  assert(id.getStr(), '65535')
  assert(id.getStr(16), 'ffff')
}

function shareTest()
{
  const k = 4
  const n = 10
  const msg = 'this is a pen'
  const msk = []
  const mpk = []
  const idVec = []
  const secVec = []
  const pubVec = []
  const sigVec = []

  /*
    setup master secret key
  */
  for (let i = 0; i < k; i++) {
    let sk = new bls.SecretKey()
    sk.setByCSPRNG()
    msk.push(sk)

    let pk = sk.getPublicKey()
    mpk.push(pk)
  }
  const secStr = msk[0].toHexStr()
  const pubStr = mpk[0].toHexStr()
  const sigStr = msk[0].sign(msg).toHexStr()
  assert(mpk[0].verify(msk[0].sign(msg), msg))

  /*
    key sharing
  */
  for (let i = 0; i < n; i++) {
    const id = new bls.Id()
//    blsIdSetInt(id, i + 1)
    id.setByCSPRNG()
    idVec.push(id)
    const sk = new bls.SecretKey()
    sk.share(msk, idVec[i])
    secVec.push(sk)

    const pk = new bls.PublicKey()
    pk.share(mpk, idVec[i])
    pubVec.push(pk)

    const sig = sk.sign(msg)
    sigVec.push(sig)
  }

  /*
    recover
  */
  const idxVec = randSelect(k, n)
  console.log('idxVec=' + idxVec)
  let subIdVec = []
  let subSecVec = []
  let subPubVec = []
  let subSigVec = []
  for (let i = 0; i < idxVec.length; i++) {
    let idx = idxVec[i]
    subIdVec.push(idVec[idx])
    subSecVec.push(secVec[idx])
    subPubVec.push(pubVec[idx])
    subSigVec.push(sigVec[idx])
  }
  {
    const sec = new bls.SecretKey()
    const pub = new bls.PublicKey()
    const sig = new bls.Signature()

    sec.recover(subSecVec, subIdVec)
    pub.recover(subPubVec, subIdVec)
    sig.recover(subSigVec, subIdVec)
    let s = sec.toHexStr()
    assert(sec.toHexStr(), secStr)
    assert(pub.toHexStr(), pubStr)
    assert(sig.toHexStr(), sigStr)
  }
}