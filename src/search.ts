import Fuse from 'fuse.js'
import type { Video } from './types'
import { kataToHira } from './utils'

const normalize = (inp: string): string => {
  let y = inp
  y = kataToHira(y)
  return y
}

let fuse: Fuse<Video>
let videos: Video[]

;(async () => {
  videos = Object.values(
    await fetch('/DB.json').then((res) => res.json()),
  ) as Video[]
  fuse = new Fuse(videos, {
    keys: ['description', 'title'],
    getFn (video, path) {
      const v = video[path as keyof Video]
      return typeof v === 'string' ? normalize(v) : []
    }
  })
})()

self.onmessage = ({ data: query }: { data: string }) => {
  const result = fuse.search(normalize(query))
  self.postMessage(result)
}
