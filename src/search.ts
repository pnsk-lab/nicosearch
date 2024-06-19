import Fuse from 'fuse.js'
import type { Video } from './types'

let fuse: Fuse<Video>
let videos: Video[]

;(async () => {
  videos = Object.values(await fetch('/DB.json').then(res => res.json())) as Video[]
  fuse = new Fuse(videos, {
    keys: ['title', 'description']
  })
})()

self.onmessage = ({ data: query }: { data: string }) => {
  const result = fuse.search(query)
  self.postMessage(result)
}