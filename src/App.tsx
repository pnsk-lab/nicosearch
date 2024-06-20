import type { Component } from 'solid-js'
import { createSignal, createEffect, Show, For, onMount, createMemo } from 'solid-js'
import type { Video } from './types'
import Fuse, { type FuseResult } from 'fuse.js'
import SearchWorker from './search.ts?worker'

const App: Component = () => {
  const [query, setQuery] = createSignal<string>('')
  const [result, setResult] = createSignal<Video[]>()

  const worker = new SearchWorker()

  createEffect(() => {
    worker.postMessage(query())
  })

  worker.onmessage = ({ data }) => {
    setResult(data)
  }
  return (
    <div class="px-10 sm:px-20 mb-20">
      <h1 class="mt-20 w-full text-center text-3xl font-cutiveMono">NICOSEARCH</h1>
      <input value={query()} onChange={(e) => {
        setQuery(e.target.value)
      }} placeholder='' class='mt-5 border border-gray-400 border-1 w-full h-14 px-5 rounded-full'/>
      <Show when={true} fallback={<div class="text-center text-2xl p-4">Downloading Database...</div>}>
        <Show when={result()?.length !== 0} fallback={<div class="text-center text-2xl p-4">結果がありません...</div>}>
          <For each={result()}>{(v) => <VideoPreview video={v} />}</For>
        </Show>
      </Show>
      <div class="text-center text-gray-500 mt-10">
        <hr class="h-0.5 my-3" />
        <p>
          NICOSEARCHは
          <a href="https://www.nicovideo.jp" class="underline">
            ニコニコ動画®︎
          </a>
          公式のものではありません。
        </p>
        <p>
          <a href="https://github.com/pnsk-lab/nicosearch" class="underline">
            GitHub Repository
          </a>
        </p>
      </div>
    </div>
  )
}

const VideoPreview: Component<{ video: FuseResult<Video> }> = (props) => {
  return (
    <a href={`https://www.nicovideo.jp/watch_tmp/${props.video.item.id}`} target="_blank" rel="noreferrer">
      <div class="mt-5 w-full grid grid-cols-4 gap-2">
        <div class="grid col-span-2 sm:col-span-1">
          <img src={props.video.item.thumbnail.url} alt="thumbnail" class="m-auto" loading="lazy"/>
        </div>
        <div class="grid col-span-2 sm:col-span-3">
          <p class="font-bold text-base sm:text-lg">{props.video.item.title}</p>
          <p class="text-gray-500 text-sm sm:text-base">
            {new Date(props.video.item.registeredAt).toLocaleDateString('ja-JP')}
          </p>
        </div>
      </div>
    </a>
  )
}

export default App
