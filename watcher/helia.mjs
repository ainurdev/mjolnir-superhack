import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
import { ipns } from '@helia/ipns'

export async function createNode() {
  return await createHelia()
}

export async function createUnixFs(helia) {
  return await unixfs(helia)
}

export async function createIPNS(helia) {
  return await ipns(helia)
}
