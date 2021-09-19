"use strict";
const JSZip = require('jszip')
const FileType = require('file-type/browser')
const FileSaver = require('file-saver')
require('regenerator-runtime')

window.zip = new JSZip()

export const extractImages = async (file, progress) => {
  const adobeXD = await JSZip.loadAsync(file)
  const entries = []
  let manifest
  adobeXD.forEach((_, zipEntry) => {
    if (!zipEntry.dir && /^resources\/[0-9a-f]+$/.test(zipEntry.name)) {
      entries.push(zipEntry)
    } else if (!zipEntry.dir && /^manifest$/.test(zipEntry.name)) {
      manifest = zipEntry
    }
  })
  if (!manifest) throw new Error('Could not find manifest file')
  manifest = await manifest.async('text')
  manifest = JSON.parse(manifest)

  const resources = manifest.children.find(child => child.name === 'resources' && child.path === 'resources')
  if (!resources) throw new Error('Could not find resources')
  const components = resources.components

  let i = 0
  for (const entry of entries) {
    const hash = entry.name.split('/').slice(-1)[0]
    const component = components.find(component => component.path === hash)
    if (!component) throw new Error('Could not find component')
    const [mime, ext] = component.type.split('/')
    const newName = hash + '.' + ext
    const data = await entry.async('blob')
    if (progress) progress(++i / entries.length)
    FileSaver.saveAs(data, newName)
  }
};
