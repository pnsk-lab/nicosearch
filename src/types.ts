export interface Video {
  type: 'essential'
  id: string
  title: string
  description?: string
  registeredAt: string
  count: { view: number; comment: number; mylist: number; like: number }
  thumbnail: {
    url: string
    middleUrl: null
    largeUrl: null
    listingUrl: string
    nHdUrl: string
  }
  duration: number
  shortDescription: string
  latestCommentSummary: string
  isChannelVideo: false
  isPaymentRequired: false
  playbackPosition: null
  owner: {
    ownerType: 'hidden'
    type: 'unknown'
    visibility: 'hidden'
    id: null
    name: null
    iconUrl: null
  }
  requireSensitiveMasking: false
  videoLive: null
  isMuted: false
  '9d091f87': true
  acf68865: false
}
