import type { Component } from 'solid-js';
import { createSignal, createEffect, Show, For } from 'solid-js'
import DB from './DB.json'

type video = {
  id: string, 
  title: string,
  registeredAt: string,
  thumbnail: string
}

const App: Component = () => {
  const [ keys, setKeys ] = createSignal<string[]>([])
  const [ results, setResults ] = createSignal<video[]>([])
  createEffect(() => {
    const regex = new RegExp('^' + keys().map((key:string) => `(?=.*${key})`).join(''))
    //@ts-ignore
    setResults(Object.values(DB).filter((video: video) => regex.test(video.title)))
  })
  return (
    <div class="container px-20">
      <h1 class="mt-20 w-full text-center text-3xl font-bold">NICOSEARCH</h1>
      <input onInput={(e) => setKeys(e.target.value.replace('　',' ').split(' '))} placeholder='検索ワード' class='mt-5 border border-gray-400 border-1 w-full h-14 px-5 rounded-full'/>
      <Show when={keys().length && keys()[0] != ""}>
        <For each={results()}>{(result) => 
          <Result video={result}/>
        }</For>
      </Show>
    </div>
  );
};

const Result: Component<{video: video}> = (props) => {
  return (
    <a href={`https://www.nicovideo.jp/watch_tmp/${props.video.id}`}>
      <div class="mt-5 w-full grid grid-cols-4 gap-2">
        <div class="grid col-span-2 sm:col-span-1">
          <img src={props.video.thumbnail} alt="thumbnail" />
        </div>
        <div class="grid col-span-2 sm:col-span-3">
          <p class="font-bold text-base sm:text-lg">{props.video.title}</p>
          <p class="text-gray-800 text-sm sm:text-base">{props.video.registeredAt}</p>
        </div>
      </div>
    </a>
  )
}

export default App;
