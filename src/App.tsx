import type { Component } from 'solid-js'
import { createSignal, createEffect, Show, For } from 'solid-js'
import DB from './DB.json'

type video = {
  id: string
  title: string
  registeredAt: string
  thumbnail: {
    url: string
  }
}

const App: Component = () => {
  const [ keys, setKeys ] = createSignal<string[]>([])
  const [ results, setResults ] = createSignal<video[]>([])
  const [ startIndex, setStartIndex ] = createSignal<number>(0)
  createEffect(() => {
    const regex = new RegExp('^' + keys().map((key:string) => `(?=.*${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`).join(''))
    //@ts-ignore
    setResults(Object.values(DB).filter((video: video) => regex.test(video.title)))
  })
  return (
    <div class="px-10 sm:px-20 mb-20">
      <h1 class="mt-20 w-full text-center text-3xl font-cutiveMono">NICOSEARCH</h1>
      <input onChange={(e) => { setKeys(e.target.value.replace('　',' ').split(' ')); setStartIndex(0); }} placeholder='And検索はスペース区切りで！' class='mt-5 border border-gray-400 border-1 w-full h-14 px-5 rounded-full'/>
      <Show when={keys().length && keys()[0] != ""}>
        <For each={results().slice(startIndex(), startIndex()+10 )}>{(result) => 
          <Result video={result}/>
        }</For>
        <p class="w-full text-center mt-5 text-lg">
          <For each={Array.from({ length: Math.floor(results().length / 10) + 1 }, (_, i) => i * 10)}>{(indexNum) => 
            <>
              <Show when={indexNum != startIndex()} fallback={<span class="text-gray-500 mr-2">{(indexNum/10) + 1}</span>}>
                <span class="text-blue-500 underline mr-2" onClick={() => setStartIndex(indexNum)}>{(indexNum/10) + 1}</span>
              </Show>
              <Show when={(indexNum + 10) % 100 == 0}><br /></Show>
            </>
          }</For>
        </p>
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

const Result: Component<{ video: video }> = (props) => {
  return (
    <a href={`https://www.nicovideo.jp/watch_tmp/${props.video.id}`}>
      <div class="mt-5 w-full grid grid-cols-4 gap-2">
        <div class="grid col-span-2 sm:col-span-1">
          <img src={props.video.thumbnail.url} alt="thumbnail" class="m-auto" loading="lazy"/>
        </div>
        <div class="grid col-span-2 sm:col-span-3">
          <p class="font-bold text-base sm:text-lg">{props.video.title}</p>
          <p class="text-gray-500 text-sm sm:text-base">
            {new Date(props.video.registeredAt).toLocaleDateString('ja-JP')}
          </p>
        </div>
      </div>
    </a>
  )
}

export default App
